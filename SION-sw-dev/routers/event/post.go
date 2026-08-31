package event

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	eventDB "github.com/JamsMendez/SION-sw/models/event"
	"github.com/JamsMendez/SION-sw/routers"
)

func createServer(c echo.Context) error {
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

	eJSON := eventDB.Event{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("event.createServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("event.createServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &eJSON); err != nil {
		fmt.Println("event.createServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if eJSON.Type == 0 {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "type")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if eJSON.Description == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "descripción")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if eJSON.CreatedAtIn == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "fecha")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	createdAt, err := time.ParseInLocation(constants.DateTimeFormat, eJSON.CreatedAtIn, location)
	if err != nil {
		fmt.Println("event.createServer.ParseInLocation: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[eventDB.KeyUserID] = userSession.ID
	values[eventDB.KeyType] = eJSON.Type
	values[eventDB.KeyDescription] = eJSON.Description
	values[eventDB.KeyCreatedAt] = createdAt.UTC()
	values[eventDB.KeyUpdatedAt] = time.Now()

	event := eventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se crea el evento, generalmente es una Operación
	eventOne, err := event.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	eventOne.CreatedAtOut = eventOne.CreatedAt.In(location).Format(constants.DateTimeFormat)

	resJSON := constants.ResJSON{Doc: eventOne}
	return c.JSON(http.StatusCreated, resJSON)
}
