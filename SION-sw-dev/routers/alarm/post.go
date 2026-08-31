package alarm

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	alarmDB "github.com/JamsMendez/SION-sw/models/alarm"
	userAlarmDB "github.com/JamsMendez/SION-sw/models/user/alarm"
	notificationDB "github.com/JamsMendez/SION-sw/models/user/alarm_notification"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

// SION ... !OK
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

	aJSON := alarmDB.Alarm{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("alarm.createServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("alarm.createServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &aJSON); err != nil {
		fmt.Println("alarm.createServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	if !isRoot && !isSystemAdmin && !isAdmin && !isOperator {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if aJSON.Name == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "nombre")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if aJSON.Alias == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "alias")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if aJSON.IsTimeout {
		if aJSON.Timeout == 0 {
			msg := fmt.Sprintf(constants.MsgFieldRequired, "tiempo de espera")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		if aJSON.Color == "" {
			msg := fmt.Sprintf(constants.MsgFieldRequired, "color")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if aJSON.Expression == "" {
			msg := fmt.Sprintf(constants.MsgFieldRequired, "expresión")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	if aJSON.Message == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "mensaje")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[alarmDB.KeyName] = aJSON.Name
	values[alarmDB.KeyAlias] = aJSON.Alias
	values[alarmDB.KeyColor] = aJSON.Color
	values[alarmDB.KeyExpression] = aJSON.Expression
	values[alarmDB.KeyMessage] = aJSON.Message
	values[alarmDB.KeySetpoint] = aJSON.Setpoint
	values[alarmDB.KeyTimeout] = aJSON.Timeout
	values[alarmDB.KeyIsTimeout] = aJSON.IsTimeout
	values[alarmDB.KeyPriorityLevel] = aJSON.PriorityLevel
	values[alarmDB.KeySound] = aJSON.Sound
	values[alarmDB.KeyStatus] = aJSON.Status

	if aJSON.UnitID != 0 {
		if aJSON.UnitID == -1 {
			values[alarmDB.KeyUnitID] = nil
		} else {
			values[alarmDB.KeyUnitID] = aJSON.UnitID
		}
	}

	alarm := alarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userAlarm := userAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	alarmOne, err := alarm.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values = map[string]interface{}{
		userAlarmDB.KeyUserID:    userSession.ID,
		userAlarmDB.KeyAlarmID:   alarmOne.ID,
		userAlarmDB.KeyIsCreator: true,
	}

	// Se relaciona la Alarma con el usuario
	userAlarmOne, err := userAlarm.Create(values)
	if err != nil {
		fmt.Println("alarm.createServer.userAlarm.Create")

		// Si ocurrió un error al crear la relación de elimina la Alarma
		// que fue creada.
		where := map[string]interface{}{alarmDB.KeyID: alarmOne.ID}
		_, err := alarm.Remove(where)
		if err != nil {
			fmt.Println("alarm.createServer.alarm.Remove")
		}

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if userAlarmOne.ID > 0 {
		notification := notificationDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		valueIn := map[string]interface{}{
			notificationDB.KeyUserAlarmID: userAlarmOne.ID,
			notificationDB.KeySendEmail:   aJSON.SendEmail,
			notificationDB.KeySendSMS:     aJSON.SendSMS,
		}

		notificationOne, err := notification.Create(valueIn)
		if err == nil {
			if notificationOne.ID > 0 {
				alarmOne.SendEmail = notificationOne.SendEmail
				alarmOne.SendSMS = notificationOne.SendSMS
			}
		}
	}

	// Registro del Evento
	typeIn := constants.TypeInsertAlarm
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se creó la alarma %s", alarmOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: alarmOne}
	return c.JSON(http.StatusCreated, resJSON)
}

// SION ... !OK
func createStaticServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	oJSON := []alarmDB.Alarm{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("alarm.createStaticServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("alarm.createStaticServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &oJSON); err != nil {
		fmt.Println("alarm.createStaticServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	size := len(oJSON)
	if size == 0 {
		fmt.Println("alarm.createStaticServer: size == 0")

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	if !isRoot && !isSystemAdmin && !isAdmin && !isOperator {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	alarms := []alarmDB.Alarm{}

	for i := 0; i < size; i++ {
		aJSON := oJSON[i]

		values := map[string]interface{}{}

		if aJSON.Name == "" {
			msg := fmt.Sprintf(constants.MsgFieldRequired, "nombre")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if aJSON.Alias == "" {
			msg := fmt.Sprintf(constants.MsgFieldRequired, "alias")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if aJSON.IsTimeout {
			if aJSON.Timeout == 0 {
				msg := fmt.Sprintf(constants.MsgFieldRequired, "tiempo de espera")
				msgJSON := constants.MsgError{Message: msg}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			if aJSON.Color == "" {
				msg := fmt.Sprintf(constants.MsgFieldRequired, "color")
				msgJSON := constants.MsgError{Message: msg}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			if aJSON.Expression == "" {
				msg := fmt.Sprintf(constants.MsgFieldRequired, "expresión")
				msgJSON := constants.MsgError{Message: msg}
				return c.JSON(http.StatusAccepted, msgJSON)
			}
		}

		if aJSON.Message == "" {
			msg := fmt.Sprintf(constants.MsgFieldRequired, "mensaje")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		values[alarmDB.KeyName] = aJSON.Name
		values[alarmDB.KeyAlias] = aJSON.Alias
		values[alarmDB.KeyColor] = aJSON.Color
		values[alarmDB.KeyExpression] = aJSON.Expression
		values[alarmDB.KeyMessage] = aJSON.Message
		values[alarmDB.KeySetpoint] = aJSON.Setpoint
		values[alarmDB.KeyTimeout] = aJSON.Timeout
		values[alarmDB.KeyIsTimeout] = aJSON.IsTimeout
		values[alarmDB.KeyPriorityLevel] = aJSON.PriorityLevel
		values[alarmDB.KeySound] = aJSON.Sound
		values[alarmDB.KeyStatus] = aJSON.Status

		if aJSON.UnitID != 0 {
			if aJSON.UnitID == -1 {
				values[alarmDB.KeyUnitID] = nil
			} else {
				values[alarmDB.KeyUnitID] = aJSON.UnitID
			}
		}

		alarm := alarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		userAlarm := userAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		alarmOne, err := alarm.Create(values)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		values = map[string]interface{}{
			userAlarmDB.KeyUserID:    userSession.ID,
			userAlarmDB.KeyAlarmID:   alarmOne.ID,
			userAlarmDB.KeyIsCreator: true,
		}

		// Se relaciona la Alarma con el usuario
		userAlarmOne, err := userAlarm.Create(values)
		if err != nil {
			fmt.Println("alarm.createStaticServer.userAlarm.Create: ", err)

			// Si ocurrió un error al crear la relación de elimina la Alarma
			// que fue creada.
			where := map[string]interface{}{alarmDB.KeyID: alarmOne.ID}
			_, err := alarm.Remove(where)
			if err != nil {
				fmt.Println("alarm.createStaticServer.alarm.Remove: ", err)
			}

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if userAlarmOne.ID > 0 {
			notification := notificationDB.Model{
				UserDB: constants.DB.UserSW,
				PwdDB:  constants.DB.PwdSW,
				NameDB: constants.DB.NameSW,
				Host:   constants.DB.HostSW,
				Port:   constants.DB.PortSW,
				Debug:  true,
			}

			valueIn := map[string]interface{}{
				notificationDB.KeyUserAlarmID: userAlarmOne.ID,
				notificationDB.KeySendEmail:   aJSON.SendEmail,
				notificationDB.KeySendSMS:     aJSON.SendSMS,
			}

			notificationOne, err := notification.Create(valueIn)
			if err == nil {
				if notificationOne.ID > 0 {
					alarmOne.SendEmail = notificationOne.SendEmail
					alarmOne.SendSMS = notificationOne.SendSMS
				}
			}
		}

		// Registro del Evento
		typeIn := constants.TypeInsertAlarm
		ui8 := uint8(typeIn)
		message := fmt.Sprintf("Se creó la alarma %s", alarmOne.Name)
		util.InsertLogEvent(userSession.ID, ui8, message)

		alarms = append(alarms, alarmOne)
	}

	resJSON := constants.ResJSONs{Docs: alarms}
	return c.JSON(http.StatusCreated, resJSON)
}
