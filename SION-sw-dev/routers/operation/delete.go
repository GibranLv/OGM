package operation

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	operationDB "github.com/JamsMendez/SION-sw/models/operation"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
)

func deleteServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(operationDB.KeyID)
	if id == "" {
		return c.NoContent(http.StatusBadRequest)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
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
	var numAffected int64

	if userSession.Role == constants.RootUser || userSession.Role == constants.SystemAdminUser {
		// Super usuario
		// Acceso a las Operaciones
		where := map[string]interface{}{operationDB.KeyID: iID}
		operationOne, err = operation.FindOne(where)
		if err != nil {
			fmt.Println("operation.deleteServer.operation.FindOne: ", err)
		}

		// Se elimina la Operación
		where = map[string]interface{}{operationDB.KeyID: iID}
		numAffected, err = operation.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.AdminUser {
		// Administrador
		// Acceso a las Operaciones de los usuarios con role de valor inferior
		// y sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene la Operación para validar permisos de acceso
		operationOne, err = operation.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if operationOne.ID == 0 {
			return c.NoContent(http.StatusNonAuthoritativeInfo)
		}

		// Se elimina la Operación
		where := map[string]interface{}{operationDB.KeyID: operationOne.ID}
		numAffected, err = operation.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.OperatorUser {
		// Operador
		// Acceso a las Operaciones de los usuarios con role de valor inferior
		// y sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene la Operación para validar permisos de acceso
		operationOne, err = operation.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if operationOne.ID == 0 {
			return c.NoContent(http.StatusNonAuthoritativeInfo)
		}

		isCreator := userID == operationOne.UserID
		if !isCreator {
			return c.NoContent(http.StatusNonAuthoritativeInfo)
		}

		// Se elimina la Operación
		where := map[string]interface{}{operationDB.KeyID: operationOne.ID}
		numAffected, err = operation.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.GuestUser {
		// Invitado
		// Acceso a las Operaciones de la sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID

		// Se obtiene la Operación para validar permisos de acceso
		operationOne, err = operation.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if operationOne.ID == 0 {
			return c.NoContent(http.StatusNonAuthoritativeInfo)
		}

		isCreator := userID == operationOne.UserID
		if !isCreator {
			return c.NoContent(http.StatusNonAuthoritativeInfo)
		}

		// Se elimina la Operación
		where := map[string]interface{}{operationDB.KeyID: operationOne.ID}
		numAffected, err = operation.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la operación")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeDeleteOperation
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se eliminó la operación %s", operationOne.Title)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}
