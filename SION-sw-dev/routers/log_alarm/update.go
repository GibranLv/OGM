package logalarm

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	logAlarmDB "github.com/JamsMendez/SION-sw/models/log_alarm"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... OK!
func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(logAlarmDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("LogAlarm.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("LogAlarm.updateServer.c.Request().Body.Close(): ", err)
	}

	logAlarm := logAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	var logAlarmOne logAlarmDB.LogAlarm

	if isRoot || isSystemAdmin {
		// Acceso a todas las alarmas
		where := map[string]interface{}{logAlarmDB.KeyID: iID}

		logAlarmOne, err = logAlarm.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin || isOperator {
		/*
			Acceso a las alarmas de los usuarios con menos valor
			a la sesión del usuario
		*/
		userID := userSession.ID

		where := map[string]interface{}{logAlarmDB.KeyID: iID}
		logAlarmOne, err = logAlarm.FindOneByUserID(where, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if logAlarmOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la alarma")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	aJSON := logAlarmDB.LogAlarm{}

	if err := json.Unmarshal(b, &aJSON); err != nil {
		fmt.Println("LogAlarm.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	values := map[string]interface{}{}

	if logAlarmOne.Checked {
		msg := "La alarma ya fue aprovada"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if aJSON.Comment != "" {
		if logAlarmOne.Comment != aJSON.Comment {
			values[logAlarmDB.KeyComment] = aJSON.Comment
		}
	}

	if aJSON.Checked {
		values[logAlarmDB.KeyUserID] = userSession.ID
		values[logAlarmDB.KeyChecked] = true
		values[logAlarmDB.KeyUpdatedAt] = time.Now().UTC()
	}

	if len(values) == 0 {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[logAlarmDB.KeyID] = iID

	logAlarmOne, err = logAlarm.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	logAlarmOne.CreatedAtOut = logAlarmOne.CreatedAt.In(location).Format(constants.DateTimeFormat)
	logAlarmOne.UpdatedAtOut = logAlarmOne.UpdatedAt.In(location).Format(constants.DateTimeFormat)

	// Registro del Evento
	//typeIn := constants.TypeUpdateAlarm
	//ui8 := uint8(typeIn)
	//message := fmt.Sprintf("Se actualizó la alarma %s", alarmOne.Name)
	//util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: logAlarmOne}
	return c.JSON(http.StatusOK, resJSON)
}
