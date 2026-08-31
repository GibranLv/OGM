package graphic

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	graphicDB "github.com/JamsMendez/SION-sw/models/graphic"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(graphicDB.KeyID)

	iID, err := routers.ParseInt(id)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	oJSON := graphicDB.Graphic{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("graphic.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("graphic.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &oJSON); err != nil {
		fmt.Println("graphic.updateServer.Unmarshal: ", err)
		return c.NoContent(http.StatusBadRequest)
	}

	values := map[string]interface{}{}

	if oJSON.MatrixID != 0 {
		values[graphicDB.KeyMatrixID] = oJSON.MatrixID
	}

	if oJSON.GroupID != 0 {
		values[graphicDB.KeyGroupID] = oJSON.GroupID
	}

	if oJSON.Background != "" {
		values[graphicDB.KeyBackground] = oJSON.Background
	}

	if len(oJSON.Variables) > 0 {
		var sJSON string
		buffer, err := json.Marshal(oJSON.Variables)
		if err == nil {
			sJSON = string(buffer)
			values[graphicDB.KeyJSON] = sJSON
		}
	}

	if len(values) == 0 {
		fmt.Println("graphic.updateServer.Values Input is 0: ")

		return c.NoContent(http.StatusBadRequest)
	}

	values[graphicDB.KeyID] = iID
	values[graphicDB.KeyUpdatedAt] = time.Now().UTC()

	graphic := graphicDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var graphicOne graphicDB.Graphic

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if isRoot {
		// Super usuario
		// Acceso a cualquier Operación
		where := map[string]interface{}{graphicDB.KeyID: iID}
		graphicOne, err = graphic.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isSystemAdmin || isAdmin {
		// Administrador
		// Acceso a cualquier Operación de un usuario con role de valor inferior
		// o la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)
		graphicOne, err = graphic.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator {
		// Operador
		// Acceso a cualquier Operación de un usuario con role de valor inferior
		// o la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)
		graphicOne, err = graphic.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isGuest {
		// Invitado
		// Acceso a el Gráfico relacionada a la sesión del usuario
		userID := userSession.ID
		i64 := int64(iID)
		graphicOne, err = graphic.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	if graphicOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del Gráfico")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Se actualiza la Gráfica
	graphicOne, err = graphic.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeUpdateDynamicGraphic
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se actualizó un gráfico dinámico")
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: graphicOne}
	return c.JSON(http.StatusOK, resJSON)
}
