package operation

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	operationDB "github.com/JamsMendez/SION-sw/models/operation"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(operationDB.KeyID)

	iID, err := routers.ParseInt(id)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	oJSON := operationDB.Operation{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("operation.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("operation.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &oJSON); err != nil {
		fmt.Println("operation.updateServer.Unmarshal: ", err)
		return c.NoContent(http.StatusBadRequest)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	values := map[string]interface{}{}

	if oJSON.MatrixID != 0 {
		values[operationDB.KeyMatrixID] = oJSON.MatrixID
	}

	if oJSON.GroupID != 0 {
		values[operationDB.KeyGroupID] = oJSON.GroupID
	}

	if oJSON.Title != "" {
		values[operationDB.KeyTitle] = oJSON.Title
	}

	if oJSON.Description != "" {
		values[operationDB.KeyDescription] = oJSON.Description
	}

	if oJSON.CreatedAtIn != "" {
		createdAt, err := time.ParseInLocation(constants.DateTimeFormat, oJSON.CreatedAtIn, location)
		if err != nil {
			fmt.Println("operation.updateServer.ParseInLocation: ", err)

			return c.NoContent(http.StatusBadRequest)
		}

		values[operationDB.KeyCreatedAt] = createdAt
	}

	if len(values) == 0 {
		fmt.Println("operation.updateServer.Values Input is 0: ")

		msg := "No se detectaron cambios ha realizar en la operación"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	operation := operationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var operationOne operationDB.Operation

	if userSession.Role == constants.RootUser || userSession.Role == constants.SystemAdminUser {
		// Super usuario
		// Acceso a cualquier Operación
		where := map[string]interface{}{operationDB.KeyID: iID}
		operationOne, err = operation.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.AdminUser {
		// Administrador
		// Acceso a cualquier Operación de un usuario con role de valor inferior
		// o la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)
		operationOne, err = operation.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.OperatorUser {
		// Operador
		// Acceso a cualquier Operación de un usuario con role de valor inferior
		// o la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)
		operationOne, err = operation.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.GuestUser {
		// Invitado
		// Acceso a la Operación relacionada a la sesión del usuario
		userID := userSession.ID
		i64 := int64(iID)
		operationOne, err = operation.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	if operationOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la operación")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[operationDB.KeyID] = iID
	values[operationDB.KeyUpdatedAt] = time.Now().UTC()

	// Se actualiza la Operación
	operationOne, err = operation.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	operationOne.CreatedAtOut = operationOne.CreatedAt.In(location).Format(constants.DateTimeFormat)

	// Registro del Evento
	typeIn := constants.TypeUpdateOperation
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se actualizó la operación %s", operationOne.Title)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: operationOne}
	return c.JSON(http.StatusOK, resJSON)
}
