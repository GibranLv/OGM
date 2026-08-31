package alarm

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	alarmDB "github.com/JamsMendez/SION-sw/models/alarm"
	userAlarmDB "github.com/JamsMendez/SION-sw/models/user/alarm"
	notificationDB "github.com/JamsMendez/SION-sw/models/user/alarm_notification"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... !OK
func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(alarmDB.KeyID)

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if id == constants.ListParam {
		alarm := alarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var alarms []alarmDB.Alarm
		var err error

		if isRoot || isSystemAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)
			if userIDValue != "" {
				// Acceso a todas las alarmas de todos los usuarios
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(userID)
				alarms, err = alarm.FindByUser(i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Acceso a todas las alarmas
				where := map[string]interface{}{}
				alarms, err = alarm.Find(where)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)
			if userIDValue != "" {
				/*
					Acceso a todas las alarmas de todos los usuarios
					con menos valor a la sesión del usuario
				*/
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(userID)
				value := userSession.Value
				alarms, err = alarm.FindByUserAndLowerValue(i64, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				/*
					Acceso a todas las alarmas de todos los usuarios
					con menos valor a la sesión del usuario
				*/
				userID := userSession.ID
				value := userSession.Value

				alarms, err = alarm.FindByUserOrLowerValue(userID, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isOperator || isGuest {
			// Acceso a todas las alarmas de la sesión del usuario
			userID := userSession.ID

			alarms, err = alarm.FindByUser(userID)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			// El role de usuario es indefinido.
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		resJSON := constants.ResJSONs{Docs: alarms}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	alarm := alarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var alarmOne alarmDB.Alarm

	if isRoot || isSystemAdmin {
		// Acceso a cualquier alarma
		where := map[string]interface{}{alarmDB.KeyID: iID}
		alarmOne, err = alarm.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a cualquier alarma de los usuarios con menos valor
			a la sesión del usuario
		*/
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)

		alarmOne, err = alarm.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		/*
			Acceso a las alarmas de la sesión del usuario
		*/
		userID := userSession.ID
		i64 := int64(iID)
		alarmOne, err = alarm.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if alarmOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la alarma")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	userAlarm := userAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{
		userAlarmDB.KeyUserID:  userSession.ID,
		userAlarmDB.KeyAlarmID: alarmOne.ID,
	}

	userAlarmOne, err := userAlarm.FindOne(where)
	if err == nil {
		if userAlarmOne.ID > 0 {
			notification := notificationDB.Model{
				UserDB: constants.DB.UserSW,
				PwdDB:  constants.DB.PwdSW,
				NameDB: constants.DB.NameSW,
				Host:   constants.DB.HostSW,
				Port:   constants.DB.PortSW,
				Debug:  true,
			}

			where := map[string]interface{}{
				notificationDB.KeyUserAlarmID: userAlarmOne.ID,
			}

			notificationOne, err := notification.FindOne(where)
			if err == nil {
				if notificationOne.ID > 0 {
					alarmOne.SendEmail = notificationOne.SendEmail
					alarmOne.SendSMS = notificationOne.SendSMS
				}
			}
		}
	}

	resJSON := constants.ResJSON{Doc: alarmOne}
	return c.JSON(http.StatusOK, resJSON)
}
