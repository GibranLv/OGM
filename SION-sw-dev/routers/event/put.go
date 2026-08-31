package event

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	eventDB "github.com/JamsMendez/SION-sw/models/event"
	userEventDB "github.com/JamsMendez/SION-sw/models/user/event"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.SystemAdminUser

	isntAdmins := !isRoot && !isSystemAdmin && !isAdmin
	if isntAdmins {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(eventDB.KeyID)

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	eJSON := eventDB.Event{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("event.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("event.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &eJSON); err != nil {
		fmt.Println("event.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	values := map[string]interface{}{}

	if eJSON.Type != 0 {
		values[eventDB.KeyType] = eJSON.Type
	}

	if eJSON.Description != "" {
		values[eventDB.KeyDescription] = eJSON.Description
	}

	if eJSON.CreatedAtIn != "" {
		createdAt, err := time.ParseInLocation(constants.DateTimeFormat, eJSON.CreatedAtIn, location)
		if err != nil {
			fmt.Println("event.updateServer.ParseInLocation: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		values[eventDB.KeyCreatedAt] = createdAt
	}

	if len(values) == 0 {
		fmt.Println("event.updateServer.Values Input is 0: ")

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[eventDB.KeyID] = iID
	values[eventDB.KeyUpdatedAt] = time.Now().UTC()

	event := eventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se actualiza la Operación
	eventOne, err := event.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	eventOne.CreatedAtOut = eventOne.CreatedAt.In(location).Format(constants.DateTimeFormat)

	resJSON := constants.ResJSON{Doc: eventOne}
	return c.JSON(http.StatusOK, resJSON)
}

func updateSeenNotificationServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(eventDB.KeyID)

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	userEvent := userEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userID := userSession.ID

	where := map[string]interface{}{
		userEventDB.KeyUserID:  userID,
		userEventDB.KeyEventID: iID,
	}

	userEvents, err := userEvent.Find(where)
	if err != nil {
		fmt.Println("event.updateSeenNotificationServer.UserEvent.Find: ", err)
	}

	size := len(userEvents)
	if size == 0 {
		message := "No se encontró la información de la notificación"
		msgJSON := constants.MsgError{Message: message}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	userEventOne := userEvents[0]

	values := map[string]interface{}{
		userEventDB.KeyID:     userEventOne.ID,
		userEventDB.KeyIsSeen: true,
	}

	// Se actualiza el evento como visto
	_, err = userEvent.Update(values)
	if err != nil {
		fmt.Println("event.updateSeenNotificationServer.UserEvent.Update: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	return c.NoContent(http.StatusOK)
}
