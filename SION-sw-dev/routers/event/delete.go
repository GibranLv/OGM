package event

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	eventDB "github.com/JamsMendez/SION-sw/models/event"
	userEventDB "github.com/JamsMendez/SION-sw/models/user/event"
	"github.com/JamsMendez/SION-sw/routers"
)

func deleteServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(eventDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.SystemAdminUser
	isOperator := userSession.Role == constants.OperatorUser

	event := eventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userEvent := userEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var numAffected int64

	if isRoot || isSystemAdmin {
		// Acceso a todos los eventos
		where := map[string]interface{}{userEventDB.KeyEventID: iID}
		_, err = userEvent.Remove(where)
		if err != nil {
			fmt.Println("event.deleteServer.UserEvent.Remove: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a las eventos de los usuarios con menor valor
			a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene sl evento para validar permisos de acceso
		eventOne, err := event.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if eventOne.ID == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Acceso a todos las relaciones usuario y evento
		where := map[string]interface{}{userEventDB.KeyEventID: eventOne.ID}
		_, err = userEvent.Remove(where)
		if err != nil {
			fmt.Println("event.deleteServer.UserEvent.Remove: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator {
		// Acceso a los eventos de la sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene la Evento para validar permisos de acceso
		eventOne, err := event.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if eventOne.ID == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina la relación usuario y evento
		where := map[string]interface{}{userEventDB.KeyEventID: iID}
		_, err = userEvent.Remove(where)
		if err != nil {
			fmt.Println("event.deleteServer.UserEvent.Remove: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	where := map[string]interface{}{eventDB.KeyID: iID}
	numAffected, err = event.Remove(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del evento")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	return c.NoContent(http.StatusOK)
}
