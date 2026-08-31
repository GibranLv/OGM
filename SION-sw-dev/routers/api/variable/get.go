package variable

import (
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	logAlarmDB "github.com/JamsMendez/SION-sw/models/log_alarm"
	naDB "github.com/JamsMendez/SION-sw/models/na_variable"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	variableActiveAlarmDB "github.com/JamsMendez/SION-sw/models/variable_active_alarm"
	"github.com/JamsMendez/SION-sw/routers/api/middlewares"
)

const startDateQuery = "sd"
const finalDateQuery = "fd"
const checkedQuery = "checked"

func GetAlarms(c echo.Context) error {

	fmt.Println("ENTRO !!! GetListNAs")

	userSession, isAuth := middlewares.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(variableDB.KeyID)

	if id == constants.ListParam {
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

		nAlarms := []variableDB.Alarm{}

		alarms, err := variable.FindAlarmsByUser(userSession.ID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		where := map[string]interface{}{}
		actives, err := variableActiveAlarm.Find(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		for _, alarmOne := range alarms {
			var isActive bool
			for _, activeOne := range actives {
				if alarmOne.AlarmID == activeOne.AlarmID {
					if alarmOne.VariableID == activeOne.VariableID && !activeOne.IsCustom {

						insert := true
						size := len(nAlarms)
						for i := 0; i < size; i++ {
							if nAlarms[i].VariableID == alarmOne.VariableID {
								if nAlarms[i].IsCustom == alarmOne.IsCustom {
									if alarmOne.PriorityLevel > nAlarms[i].PriorityLevel {
										nAlarms[i] = alarmOne

										insert = false
										break
									}
								}
							}
						}

						if insert {
							nAlarms = append(nAlarms, alarmOne)
							isActive = true
							break
						}

					}
				}
			}

			if !isActive {
				nAlarmOne := variableDB.Alarm{
					VariableID: alarmOne.VariableID,
					IsCustom:   false,
				}

				insert := true
				for _, nAlarm := range nAlarms {
					if nAlarm.VariableID == nAlarmOne.VariableID {
						if nAlarm.IsCustom == nAlarmOne.IsCustom {
							insert = false
							break
						}
					}
				}

				if insert {
					nAlarms = append(nAlarms, nAlarmOne)
				}

			}
		}

		actives = []variableActiveAlarmDB.VariableActiveAlarm{}
		alarms = []variableDB.Alarm{}

		res := constants.ResJSONs{
			Docs: nAlarms,
		}

		return c.JSON(http.StatusOK, res)
	}

	msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
	return c.JSON(http.StatusAccepted, msgJSON)
}

func GetLastRecords(c echo.Context) error {

	fmt.Println("ENTRO !!! GetListNAs")

	userSession, isAuth := middlewares.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(variableDB.KeyID)

	if id == constants.ListParam {
		variable := variableDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var variables []variableDB.Variable
		var err error

		isRoot := userSession.Role == constants.RootUser
		isSystemAdmin := userSession.Role == constants.SystemAdminUser
		isAdmin := userSession.Role == constants.AdminUser
		isOperator := userSession.Role == constants.OperatorUser
		isGuest := userSession.Role == constants.GuestUser

		isAdmins := isRoot || isSystemAdmin || isAdmin
		if isAdmins {
			/*
				Acceso a el ultimo valor registrado de todas
				las variables
			*/
			variables, err = variable.FindLastRecord()
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else if isOperator || isGuest {
			/*
				Acceso a el ultimo valor registrado de todas
				las variables relacionadas con la sesión del
				usuario
			*/
			userID := userSession.ID

			variables, err = variable.FindLastRecordByUser(userID)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		res := constants.ResJSONs{
			Docs: variables,
		}

		return c.JSON(http.StatusOK, res)
	}

	msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
	return c.JSON(http.StatusAccepted, msgJSON)
}

func GetListNAs(c echo.Context) error {

	fmt.Println("ENTRO !!! GetListNAs")

	_, isAuth := middlewares.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	na := naDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var variables []naDB.NAVariable
	var err error

	where := map[string]interface{}{}
	variables, err = na.Find(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)

	}
	res := constants.ResJSONs{
		Docs: variables,
	}

	return c.JSON(http.StatusOK, res)
}

func GetLogAlarms(c echo.Context) error {
	userSession, isAuth := middlewares.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(logAlarmDB.KeyID)

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if id == constants.ListParam {
		logAlarm := logAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var logAlarms []logAlarmDB.LogAlarm
		var err error

		startDateValue := c.QueryParam(startDateQuery)
		finalDateValue := c.QueryParam(finalDateQuery)
		checkedValue := c.QueryParam(checkedQuery)

		var startDate, finalDate string
		var checkedIn bool
		var checkedBool bool

		location, err := time.LoadLocation(constants.TZ)
		if err != nil {
			location = time.Local
		}

		if startDateValue != "" {
			t, err := time.ParseInLocation(constants.DateTimeFormat, startDateValue, location)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			startDate = t.UTC().Format(constants.DateTimeFormat)
		}

		if finalDateValue != "" {
			t, err := time.ParseInLocation(constants.DateTimeFormat, finalDateValue, location)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			finalDate = t.UTC().Format(constants.DateTimeFormat)
		}

		if checkedValue != "" {
			if checkedValue == constants.TrueValue {
				checkedBool = true
				checkedIn = true
			}

			if checkedValue == constants.FalseValue {
				checkedBool = false
				checkedIn = true
			}
		}

		if startDate == "" && finalDate == "" {
			nD := time.Now().UTC()
			fD := time.Date(nD.Year(), nD.Month(), nD.Day(), 0, 0, 0, 0, time.UTC)
			fD = fD.AddDate(0, 0, 1)

			sD := fD.AddDate(0, 0, -2)

			startDate = sD.Format(constants.DateTimeFormat)
			finalDate = fD.Format(constants.DateTimeFormat)
		}

		if isRoot || isSystemAdmin || isAdmin || isOperator || isGuest {
			userID := userSession.ID

			where := map[string]interface{}{}

			if checkedIn {
				where[logAlarmDB.KeyChecked] = checkedBool
			}

			logAlarms, err = logAlarm.FindForRange(where, userID, startDate, finalDate)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		size := len(logAlarms)
		for i := 0; i < size; i++ {
			logAlarms[i].CreatedAtOut = logAlarms[i].CreatedAt.In(location).Format(constants.DateTimeFormat)
			logAlarms[i].UpdatedAtOut = logAlarms[i].UpdatedAt.In(location).Format(constants.DateTimeFormat)
		}

		resJSON := constants.ResJSONs{Docs: logAlarms}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := middlewares.ParseInt(id)
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

	var logAlarmOne logAlarmDB.LogAlarm

	if isRoot || isSystemAdmin || isAdmin || isOperator || isGuest {
		// Acceso a todos los logAlarms del usuario
		userID := userSession.ID

		where := map[string]interface{}{logAlarmDB.KeyID: iID}
		logAlarmOne, err = logAlarm.FindOneByUserID(where, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if logAlarmOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la alarma")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	logAlarmOne.CreatedAtOut = logAlarmOne.CreatedAt.In(location).Format(constants.DateTimeFormat)
	logAlarmOne.UpdatedAtOut = logAlarmOne.UpdatedAt.In(location).Format(constants.DateTimeFormat)

	resJSON := constants.ResJSON{Doc: logAlarmOne}
	return c.JSON(http.StatusOK, resJSON)
}
