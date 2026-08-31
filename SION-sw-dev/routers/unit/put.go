package unit

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	unitDB "github.com/JamsMendez/SION-sw/models/unit"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(unitDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	unit := unitDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var unitOne unitDB.Unit

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	if isRoot || isSystemAdmin {
		where := map[string]interface{}{unitDB.KeyID: iID}
		unitOne, err = unit.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			 	Acceso a las unidades de los usuarios con menor valor
				a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		unitOne, err = unit.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		isCreator := userID == unitOne.UserID && unitOne.IsCreator
		if !isCreator {
			msg := fmt.Sprintf("No tienes los permisos de la unidad %s", unitOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator {
		// Acceso a las unidades de la sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID

		unitOne, err := unit.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if unitOne.ID == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		isCreator := userID == unitOne.UserID && unitOne.IsCreator
		if !isCreator {
			msg := fmt.Sprintf("No tienes permisos sobre la unidad %s", unitOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if unitOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la unidad")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	uJSON := unitDB.Unit{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("unit.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("unit.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &uJSON); err != nil {
		fmt.Println("unit.updateServer.Unmarshal: ", err)
		return c.NoContent(http.StatusBadRequest)
	}

	values := map[string]interface{}{}

	if uJSON.Name != "" {
		values[unitDB.KeyName] = uJSON.Name
	}

	if uJSON.Expression != "" {
		values[unitDB.KeyExpression] = uJSON.Expression
	}

	if uJSON.Display != "" {
		values[unitDB.KeyDisplay] = uJSON.Display
	}

	if len(values) == 0 {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[unitDB.KeyID] = iID

	unitOne, err = unit.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeUpdateUnit
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se actualizó la unidad %s", unitOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: unitOne}
	return c.JSON(http.StatusOK, resJSON)
}
