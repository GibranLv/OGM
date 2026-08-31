package alarm

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	alarmDB "github.com/JamsMendez/SION-sw/models/alarm"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	userAlarmDB "github.com/JamsMendez/SION-sw/models/user/alarm"
	notificationDB "github.com/JamsMendez/SION-sw/models/user/alarm_notification"
	userCustomVariableDB "github.com/JamsMendez/SION-sw/models/user/custom_variable"
	userCustomVariableAlarmDB "github.com/JamsMendez/SION-sw/models/user/custom_variable_alarm"
	userVariableDB "github.com/JamsMendez/SION-sw/models/user/variable"
	userVariableAlarmDB "github.com/JamsMendez/SION-sw/models/user/variable_alarm"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	variableActiveAlarmDB "github.com/JamsMendez/SION-sw/models/variable_active_alarm"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

// SION ... OK!
func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
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

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("alarm.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("alarm.updateServer.c.Request().Body.Close(): ", err)
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
	isGuest := userSession.Role == constants.GuestUser

	var alarmOne alarmDB.Alarm

	if isRoot || isSystemAdmin {
		// Acceso a todas las alarmas
		where := map[string]interface{}{alarmDB.KeyID: iID}

		alarmOne, err = alarm.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a las alarmas de los usuarios con menos valor
			a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		alarmOne, err = alarm.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		/* Acceso a las alarmas de la sesión del usuario */
		i64 := int64(iID)
		userID := userSession.ID

		alarmOne, err = alarm.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if alarmOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la alarma")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Actualización de las variables, variables personalizadas
	updateRelations := c.QueryParam(updateRelationsQuery)
	if updateRelations == constants.TrueValue {
		rJSON := relationsReq{}

		if err := json.Unmarshal(b, &rJSON); err != nil {
			fmt.Println("alarm.updateServer.updateRelations.Unmarshal: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err := updateAlarmVariables(userSession.ID, iID, rJSON.Variables)
		if err != nil {
			msg := "Ocurrió un error al actualizar las variables de la alarma"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err = updateAlarmCustomVariables(userSession.ID, iID, rJSON.CustomVariables)
		if err != nil {
			msg := "Ocurrió un error al actualizar las variables personalizadas de la alarma"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		resJSON := constants.ResJSON{Doc: alarmOne}
		return c.JSON(http.StatusOK, resJSON)
	}

	if isOperator || isGuest {
		userID := userSession.ID
		isCreator := userID == alarmOne.UserID && alarmOne.IsCreator
		if !isCreator {
			msg := fmt.Sprintf("No tienes permisos sobre la alarma %s", alarmOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	aJSON := alarmDB.Alarm{}

	if err := json.Unmarshal(b, &aJSON); err != nil {
		fmt.Println("alarma.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	var removeActive bool

	values := map[string]interface{}{}

	if aJSON.UnitID != 0 {
		if aJSON.UnitID == -1 {
			values[alarmDB.KeyUnitID] = nil
		} else {
			values[alarmDB.KeyUnitID] = aJSON.UnitID
		}
	}

	if aJSON.Name != "" {
		if alarmOne.Name != aJSON.Name {
			values[alarmDB.KeyName] = aJSON.Name
		}
	}

	if aJSON.Alias != "" {
		if alarmOne.Alias != aJSON.Alias {
			values[alarmDB.KeyAlias] = aJSON.Alias
		}
	}

	if aJSON.Color != "" {
		if alarmOne.Color != aJSON.Color {
			values[alarmDB.KeyColor] = aJSON.Color
		}
	}

	if aJSON.Expression != "" {
		if alarmOne.Expression != aJSON.Expression {
			values[alarmDB.KeyExpression] = aJSON.Expression
			removeActive = true
		}
	}

	if aJSON.Message != "" {
		if alarmOne.Message != aJSON.Message {
			values[alarmDB.KeyMessage] = aJSON.Message
		}
	}

	if alarmOne.Setpoint != aJSON.Setpoint {
		values[alarmDB.KeySetpoint] = aJSON.Setpoint
	}

	if aJSON.Timeout != 0 {
		if alarmOne.Timeout != aJSON.Timeout {
			values[alarmDB.KeyTimeout] = aJSON.Timeout
		}
	}

	if alarmOne.IsTimeout != aJSON.IsTimeout {
		values[alarmDB.KeyIsTimeout] = aJSON.IsTimeout

		isTimeout := values[alarmDB.KeyIsTimeout].(bool)
		if isTimeout {
			values[alarmDB.KeyExpression] = ""
		} else {
			values[alarmDB.KeyTimeout] = 0
		}

		removeActive = true
	}

	if aJSON.Sound != 0 {
		if aJSON.Sound == -1 {
			values[alarmDB.KeySound] = 0
		} else {
			values[alarmDB.KeySound] = aJSON.Sound
		}
	}

	if aJSON.PriorityLevel != 0 {
		if aJSON.PriorityLevel == -1 {
			values[alarmDB.KeyPriorityLevel] = 0
		} else {
			values[alarmDB.KeyPriorityLevel] = aJSON.PriorityLevel
		}
	}

	if alarmOne.Status != aJSON.Status {
		values[alarmDB.KeyStatus] = aJSON.Status

		if !aJSON.Status {
			removeActive = true
		}
	}

	if len(values) == 0 {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[alarmDB.KeyID] = iID

	alarmOne, err = alarm.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if alarmOne.ID > 0 {
		// Notificationes de la alarma
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
		if err == nil && userAlarmOne.ID > 0 {
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
					valueIn := map[string]interface{}{
						notificationDB.KeyID:        notificationOne.ID,
						notificationDB.KeySendEmail: aJSON.SendEmail,
						notificationDB.KeySendSMS:   aJSON.SendSMS,
					}

					notificationOne, err := notification.Update(valueIn)
					if err == nil && notificationOne.ID > 0 {
						alarmOne.SendEmail = notificationOne.SendEmail
						alarmOne.SendSMS = notificationOne.SendSMS
					}

				} else {
					valueIn := map[string]interface{}{
						notificationDB.KeyUserAlarmID: userAlarmOne.ID,
						notificationDB.KeySendEmail:   aJSON.SendEmail,
						notificationDB.KeySendSMS:     aJSON.SendSMS,
					}

					notificationOne, err := notification.Create(valueIn)
					if err == nil && notificationOne.ID > 0 {
						alarmOne.SendEmail = notificationOne.SendEmail
						alarmOne.SendSMS = notificationOne.SendSMS
					}
				}
			}
		}
	}

	if removeActive {
		// Eliminar variables actives si se ha desactivo la alarma o su regla de activación ha cambiado
		variableActiveAlarm := variableActiveAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		// Se eliminan las relaciones alarmas activas de las variables y alarmas
		where := map[string]interface{}{variableActiveAlarmDB.KeyAlarmID: alarmOne.ID}
		_, err = variableActiveAlarm.Remove(where)
		if err != nil {
			fmt.Println("alarm.updateServer.VariableActiveAlarm.Remove")
		}
	}

	// Registro del Evento
	typeIn := constants.TypeUpdateAlarm
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se actualizó la alarma %s", alarmOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: alarmOne}
	return c.JSON(http.StatusOK, resJSON)
}

// SION ... OK!
func updateNotificationServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
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

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("alarm.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("alarm.updateServer.c.Request().Body.Close(): ", err)
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
	isGuest := userSession.Role == constants.GuestUser

	var alarmOne alarmDB.Alarm

	if isRoot || isSystemAdmin {
		// Acceso a todas las alarmas
		where := map[string]interface{}{alarmDB.KeyID: iID}

		alarmOne, err = alarm.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a las alarmas de los usuarios con menos valor
			a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		alarmOne, err = alarm.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		/* Acceso a las alarmas de la sesión del usuario */
		i64 := int64(iID)
		userID := userSession.ID

		alarmOne, err = alarm.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if alarmOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la alarma")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	aJSON := alarmDB.Alarm{}

	if err := json.Unmarshal(b, &aJSON); err != nil {
		fmt.Println("alarma.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if alarmOne.ID > 0 {
		// Notificationes de la alarma
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
		if err == nil && userAlarmOne.ID > 0 {
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
					valueIn := map[string]interface{}{
						notificationDB.KeyID:        notificationOne.ID,
						notificationDB.KeySendEmail: aJSON.SendEmail,
						notificationDB.KeySendSMS:   aJSON.SendSMS,
					}

					notificationOne, err := notification.Update(valueIn)
					if err == nil && notificationOne.ID > 0 {
						alarmOne.SendEmail = notificationOne.SendEmail
						alarmOne.SendSMS = notificationOne.SendSMS
					}

				} else {
					valueIn := map[string]interface{}{
						notificationDB.KeyUserAlarmID: userAlarmOne.ID,
						notificationDB.KeySendEmail:   aJSON.SendEmail,
						notificationDB.KeySendSMS:     aJSON.SendSMS,
					}

					notificationOne, err := notification.Create(valueIn)
					if err == nil && notificationOne.ID > 0 {
						alarmOne.SendEmail = notificationOne.SendEmail
						alarmOne.SendSMS = notificationOne.SendSMS
					}
				}
			}
		}
	}

	resJSON := constants.ResJSON{Doc: alarmOne}
	return c.JSON(http.StatusOK, resJSON)
}

func updateAlarmVariables(userID int64, alarmID int, variablesIn []int64) error {
	var err error

	sizeIn := len(variablesIn)
	if sizeIn > 0 {
		i64 := int64(alarmID)

		variable := variableDB.Model{
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

		userAlarm := userAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		userVariable := userVariableDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		userVariableAlarm := userVariableAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		where := map[string]interface{}{
			userAlarmDB.KeyUserID:  userID,
			userAlarmDB.KeyAlarmID: i64,
		}

		userAlarms, err := userAlarm.Find(where)
		if err != nil {
			fmt.Println("user.updateAlarmVariables.UserAlarm.FindOne: ", err)

			return err
		}

		if len(userAlarms) == 0 {
			return err
		}

		removed := make([]int64, 0)
		added := make([]int64, 0)

		if sizeIn == 1 {
			value := variablesIn[0]
			if value == -1 {
				userAlarmOne := userAlarms[0]

				where := map[string]interface{}{
					userVariableAlarmDB.KeyUserAlarmID: userAlarmOne.ID,
				}

				_, err := userVariableAlarm.Remove(where)
				if err != nil {
					fmt.Println("user.updateAlarmVariables.UserVariableAlarm.Remove: ", err)
				}

				return err
			}
		}

		// Relación de users_alarms
		userAlarmOne := userAlarms[0]

		variablesAlarm, err := variable.FindIDByUserAndAlarm(userID, i64)
		if err != nil {
			fmt.Println("user.updateAlarmVariables.Variable.FindIDByUserAndAlarm: ", err)
		}

		var variablesRm []int64

		for _, variableAlarm := range variablesAlarm {
			hasVariable := false

			for i := 0; i < sizeIn; i++ {
				vID := variableAlarm.ID
				variableID := variablesIn[i]
				if vID == variableID {
					hasVariable = true
					break
				}
			}

			if !hasVariable {
				// Lista de variables para eliminarlas de las alarmas activas
				var hasID bool
				for _, ID := range variablesRm {
					if ID == variableAlarm.ID {
						hasID = true
						break
					}
				}

				if !hasID {
					variablesRm = append(variablesRm, variableAlarm.ID)
				}

				removed = append(removed, variableAlarm.UserVariableAlarmID)
			}
		}

		size := len(variablesAlarm)
		for _, variableID := range variablesIn {
			isNew := true

			for i := 0; i < size; i++ {
				variableAlarm := variablesAlarm[i]
				vID := variableAlarm.ID
				if variableID == vID {
					isNew = false
					break
				}
			}

			if isNew {
				added = append(added, variableID)
			}
		}

		if len(removed) > 0 {
			for _, ID := range removed {
				where := map[string]interface{}{userVariableAlarmDB.KeyID: ID}
				_, err := userVariableAlarm.Remove(where)
				if err != nil {
					fmt.Println("user.updateAlarmVariables.UserVariableAlarm.Remove: ", err)
				}
			}

			// Se eliminan las relaciones alarmas activas de las variables y alarmas
			sizeRM := len(variablesRm)
			if err == nil && sizeRM > 0 {
				for _, ID := range variablesRm {
					where := map[string]interface{}{
						variableActiveAlarmDB.KeyAlarmID:    alarmID,
						variableActiveAlarmDB.KeyVariableID: ID,
						variableActiveAlarmDB.KeyIsCustom:   false,
					}

					_, err = variableActiveAlarm.Remove(where)
					if err != nil {
						fmt.Println("alarm.updateServer.VariableActiveAlarm.Remove")
					}
				}
			}
		}

		if len(added) > 0 {
			where := map[string]interface{}{userVariableDB.KeyUserID: userID}
			userVariables, err := userVariable.Find(where)
			if err == nil {

				for _, variableID := range added {
					for _, userVariable := range userVariables {
						if variableID == userVariable.VariableID {
							// Se crea la relación users_variables_alarms
							values := map[string]interface{}{
								userVariableAlarmDB.KeyUserVariableID: userVariable.ID,
								userVariableAlarmDB.KeyUserAlarmID:    userAlarmOne.ID,
							}

							_, err := userVariableAlarm.Create(values)
							if err != nil {
								fmt.Println("user.updateAlarmVariables.UserVariableAlarm.Create: ", err)
							}

							break
						}
					}
				}
			}

		}
	}

	return err
}

func updateAlarmCustomVariables(userID int64, alarmID int, variablesIn []int64) error {
	var err error

	sizeIn := len(variablesIn)
	if sizeIn > 0 {
		i64 := int64(alarmID)

		customVariable := customVariableDB.Model{
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

		userAlarm := userAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		userCustomVariable := userCustomVariableDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		userCustomVariableAlarm := userCustomVariableAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		where := map[string]interface{}{
			userAlarmDB.KeyUserID:  userID,
			userAlarmDB.KeyAlarmID: i64,
		}

		userAlarms, err := userAlarm.Find(where)
		if err != nil {
			fmt.Println("user.updateAlarmCustomVariables.UserAlarm.FindOne: ", err)

			return err
		}

		if len(userAlarms) == 0 {
			return err
		}

		removed := make([]int64, 0)
		added := make([]int64, 0)

		if sizeIn == 1 {
			value := variablesIn[0]
			if value == -1 {
				userAlarmOne := userAlarms[0]

				where := map[string]interface{}{
					userCustomVariableAlarmDB.KeyUserAlarmID: userAlarmOne.ID,
				}

				_, err := userCustomVariableAlarm.Remove(where)
				if err != nil {
					fmt.Println("user.updateAlarmCustomVariables.UserCustomVariableAlarm.Remove: ", err)
				}

				return err
			}
		}

		// Relación de users_alarms
		userAlarmOne := userAlarms[0]

		variablesAlarm, err := customVariable.FindIDByUserAndAlarm(userID, i64)
		if err != nil {
			fmt.Println("user.updateAlarmCustomVariables.CustomVariable.FindIDByUserAndAlarm: ", err)
		}

		var variablesRm []int64

		for _, variableAlarm := range variablesAlarm {
			hasVariable := false

			for i := 0; i < sizeIn; i++ {
				vID := variableAlarm.ID
				variableID := variablesIn[i]
				if vID == variableID {
					hasVariable = true
					break
				}
			}

			if !hasVariable {
				// Lista de variables para eliminarlas de las alarmas activas
				var hasID bool
				for _, ID := range variablesRm {
					if ID == variableAlarm.ID {
						hasID = true
						break
					}
				}

				if !hasID {
					variablesRm = append(variablesRm, variableAlarm.ID)
				}

				removed = append(removed, variableAlarm.UserCustomVariableAlarmID)
			}
		}

		size := len(variablesAlarm)
		for _, variableID := range variablesIn {
			isNew := true

			for i := 0; i < size; i++ {
				variableAlarm := variablesAlarm[i]
				vID := variableAlarm.ID
				if variableID == vID {
					isNew = false
					break
				}
			}

			if isNew {
				added = append(added, variableID)
			}
		}

		if len(removed) > 0 {
			for _, ID := range removed {
				where := map[string]interface{}{userCustomVariableAlarmDB.KeyID: ID}
				_, err := userCustomVariableAlarm.Remove(where)
				if err != nil {
					fmt.Println("user.updateAlarmCustomVariables.UserCustomVariableAlarm.Remove: ", err)
				}
			}

			// Se eliminan las relaciones alarmas activas de las variables y alarmas
			sizeRM := len(variablesRm)
			if err == nil && sizeRM > 0 {
				for _, ID := range variablesRm {
					where := map[string]interface{}{
						variableActiveAlarmDB.KeyAlarmID:    alarmID,
						variableActiveAlarmDB.KeyVariableID: ID,
						variableActiveAlarmDB.KeyIsCustom:   true,
					}

					_, err = variableActiveAlarm.Remove(where)
					if err != nil {
						fmt.Println("alarm.updateServer.VariableActiveAlarm.Remove")
					}
				}
			}
		}

		if len(added) > 0 {
			where := map[string]interface{}{userVariableDB.KeyUserID: userID}
			userCustomVariables, err := userCustomVariable.Find(where)
			if err == nil {
				for _, variableID := range added {
					for _, userCustomVariable := range userCustomVariables {
						if variableID == userCustomVariable.CustomVariableID {
							// Se crea la relación users_variables_alarms
							values := map[string]interface{}{
								userCustomVariableAlarmDB.KeyUserCustomVariableID: userCustomVariable.ID,
								userCustomVariableAlarmDB.KeyUserAlarmID:          userAlarmOne.ID,
							}

							_, err := userCustomVariableAlarm.Create(values)
							if err != nil {
								fmt.Println("user.updateAlarmCustomVariables.UserCustomVariableAlarm.Create: ", err)
							}

							break
						}
					}
				}
			}
		}

	}

	return err
}
