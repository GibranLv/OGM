package logalarm

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	logAlarmDB "github.com/JamsMendez/SION-sw/models/log_alarm"
	userLogAlarmDB "github.com/JamsMendez/SION-sw/models/user/log_alarm"
	"github.com/JamsMendez/SION-sw/routers"
)

func deleteServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
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

	var logAlarmOne logAlarmDB.LogAlarm
	var numAffected int64

	if isRoot || isSystemAdmin {
		where := map[string]interface{}{logAlarmDB.KeyID: iID}
		logAlarmOne, err = logAlarm.FindOne(where)
		if err != nil {
			fmt.Println("alarm.deleteServer.Alarm.FindOne")

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if logAlarmOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "de la alarma")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina la alarma
		where = map[string]interface{}{logAlarmDB.KeyID: iID}
		numAffected, err = logAlarm.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin || isOperator {
		/*
			Acceso a las alarmas de los usuarios con menos valor
			y sesión del usuario
		*/
		userID := userSession.ID

		where := map[string]interface{}{logAlarmDB.KeyID: iID}
		logAlarmOne, err = logAlarm.FindOneByUserID(where, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if logAlarmOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "de la alarma")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina la alarma
		where = map[string]interface{}{logAlarmDB.KeyID: iID}
		numAffected, err = logAlarm.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la alarma")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	userLogAlarm := userLogAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Elimina la relación de usuario y alarma
	where := map[string]interface{}{userLogAlarmDB.KeyLogAlarmID: iID}
	_, _ = userLogAlarm.Remove(where)

	// Registro del Evento
	/*typeIn := constants.TypeDeleteAlarm
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se eliminó la alarma %s", alarmOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)*/

	return c.NoContent(http.StatusOK)
}
