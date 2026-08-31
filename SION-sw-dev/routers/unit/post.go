package unit

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	unitDB "github.com/JamsMendez/SION-sw/models/unit"
	userUnitDB "github.com/JamsMendez/SION-sw/models/user/unit"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
)

func createServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	uJSON := unitDB.Unit{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("unit.createServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("unit.createServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &uJSON); err != nil {
		fmt.Println("unit.createServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	isntAdmins := !isRoot && !isSystemAdmin && !isAdmin
	if isntAdmins && !isOperator {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if uJSON.Name == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "nombre")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if uJSON.Expression == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "expresión")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if uJSON.Display == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "unidad")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[unitDB.KeyName] = uJSON.Name
	values[unitDB.KeyExpression] = uJSON.Expression
	values[unitDB.KeyDisplay] = uJSON.Display

	unit := unitDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userUnit := userUnitDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se crea la Unidad
	unitOne, err := unit.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values = map[string]interface{}{
		userUnitDB.KeyUserID:    userSession.ID,
		userUnitDB.KeyUnitID:    unitOne.ID,
		userUnitDB.KeyIsCreator: true,
	}

	// Se relaciona la Unidad con el usuario
	_, err = userUnit.Create(values)
	if err != nil {
		fmt.Println("unit.createServer.userUnit.Create: ", err)

		// Si ocurrió un error al crear la relación de elimina la Unidad
		// que fue creada.
		where := map[string]interface{}{unitDB.KeyID: unitOne.ID}
		_, err := unit.Remove(where)
		if err != nil {
			fmt.Println("unit.createServer.unit.Remove: ", err)
		}

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeInsertUnit
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se creó la unidad %s", unitOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: unitOne}
	return c.JSON(http.StatusCreated, resJSON)
}
