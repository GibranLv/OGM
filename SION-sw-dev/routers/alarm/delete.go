package alarm

import (
	"fmt"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	alarmDB "github.com/JamsMendez/SION-sw/models/alarm"
	userAlarmDB "github.com/JamsMendez/SION-sw/models/user/alarm"
	notificationDB "github.com/JamsMendez/SION-sw/models/user/alarm_notification"
	customVariableAlarmDB "github.com/JamsMendez/SION-sw/models/user/custom_variable_alarm"
	variableAlarmDB "github.com/JamsMendez/SION-sw/models/user/variable_alarm"
	variableActiveAlarmDB "github.com/JamsMendez/SION-sw/models/variable_active_alarm"
	variableAlarmEventDB "github.com/JamsMendez/SION-sw/models/variable_alarm_event"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

// SION ... !OK
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

	id := c.Param(alarmDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
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

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	var alarmOne alarmDB.Alarm
	var numAffected int64

	if isRoot || isSystemAdmin {
		where := map[string]interface{}{alarmDB.KeyID: iID}
		alarmOne, err = alarm.FindOne(where)
		if err != nil {
			fmt.Println("alarm.deleteServer.Alarm.FindOne")

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if alarmOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "de la alarma")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err := removeRelationsOfAlarm(alarmOne.ID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina la alarma
		where = map[string]interface{}{alarmDB.KeyID: iID}
		numAffected, err = alarm.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a las alarmas de los usuarios con menos valor
			y sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene la alarma para validar permisos de acceso
		alarmOne, err = alarm.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if alarmOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "de la alarma")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err := removeRelationsOfAlarm(alarmOne.ID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina la Alarma
		where := map[string]interface{}{alarmDB.KeyID: alarmOne.ID}
		numAffected, err = alarm.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator {
		/*
			Acceso a las alarmas de la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID

		// Se obtiene la alarma para validar permisos de acceso
		alarmOne, err = alarm.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if alarmOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "de la alarma")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		isCreator := userID == alarmOne.UserID && alarmOne.IsCreator
		if !isCreator {
			msg := fmt.Sprintf("No tienes permisos de la alarma %s", alarmOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err := removeRelationsOfAlarm(alarmOne.ID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina la Alarma
		where := map[string]interface{}{alarmDB.KeyID: alarmOne.ID}
		numAffected, err = alarm.Remove(where)
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

	// Registro del Evento
	typeIn := constants.TypeDeleteAlarm
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se eliminó la alarma %s", alarmOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}

func removeRelationsOfAlarm(alarmID int64) error {
	customVariableAlarm := customVariableAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	variableActiveAlarm := variableActiveAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	variableAlarm := variableAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	variableAlarmEvent := variableAlarmEventDB.Model{
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

	notification := notificationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{userAlarmDB.KeyAlarmID: alarmID}
	usersAlarms, err := userAlarm.Find(where)
	if err != nil {
		fmt.Println("alarm.deleteServer.UserAlarm.Find")

		return err
	}

	if len(usersAlarms) > 0 {
		for _, usersAlarmOne := range usersAlarms {
			// Se eliminan las relaciones usuario-alarma y variables personalizadas
			where := map[string]interface{}{customVariableAlarmDB.KeyUserAlarmID: usersAlarmOne.ID}
			_, err := customVariableAlarm.Remove(where)
			if err != nil {
				fmt.Println("alarm.deleteServer.UserCustomVariableAlarm.Remove")
			}

			// Se eliminan las relaciones usuario-alarma y variable
			where = map[string]interface{}{variableAlarmDB.KeyUserAlarmID: usersAlarmOne.ID}
			_, err = variableAlarm.Remove(where)
			if err != nil {
				fmt.Println("alarm.deleteServer.UserVariableAlarm.Remove")
			}

			// Se eliminan las relaciones usuario-alarma y notification
			where = map[string]interface{}{notificationDB.KeyUserAlarmID: usersAlarmOne.ID}
			_, err = notification.Remove(where)
			if err != nil {
				fmt.Println("alarm.deleteServer.UserVariableNotification.Remove")
			}
		}
	}

	// Se eliminan las relaciones alarmas activas de las variables y alarmas
	where = map[string]interface{}{variableActiveAlarmDB.KeyAlarmID: alarmID}
	_, err = variableActiveAlarm.Remove(where)
	if err != nil {
		fmt.Println("alarm.deleteServer.VariableActiveAlarm.Remove")
	}

	// Se eliminan las relaciones variable y eventos de alarma
	where = map[string]interface{}{variableAlarmEventDB.KeyAlarmID: alarmID}
	_, err = variableAlarmEvent.Remove(where)
	if err != nil {
		fmt.Println("alarm.deleteServer.VariableAlarmEvent.Remove")
	}

	// Se eliminan las relaciones usuario y alarma
	where = map[string]interface{}{userAlarmDB.KeyAlarmID: alarmID}
	_, err = userAlarm.Remove(where)
	if err != nil {
		fmt.Println("alarm.deleteServer.UserAlarm.Remove: ", err)

		return err
	}

	return nil
}
