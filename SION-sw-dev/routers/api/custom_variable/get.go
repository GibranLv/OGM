package customvariable

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	variableActiveAlarmDB "github.com/JamsMendez/SION-sw/models/variable_active_alarm"
	"github.com/JamsMendez/SION-sw/routers/api/middlewares"
)

// SION ... !OK
func GetAlarms(c echo.Context) error {
	userSession, isAuth := middlewares.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(customVariableDB.KeyID)

	if id == constants.ListParam {

		isRoot := userSession.Role == constants.RootUser
		isSystemAdmin := userSession.Role == constants.SystemAdminUser
		isAdmin := userSession.Role == constants.AdminUser
		isOperator := userSession.Role == constants.OperatorUser
		isGuest := userSession.Role == constants.GuestUser

		isAdmins := isRoot || isSystemAdmin || isAdmin
		isOperators := isOperator || isGuest

		if !isAdmins && !isOperators {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

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

		nAlarms := []customVariableDB.Alarm{}

		alarms, err := customVariable.FindAlarmsByUser(userSession.ID)
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
					if alarmOne.VariableID == activeOne.VariableID && activeOne.IsCustom {

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
				nAlarmOne := customVariableDB.Alarm{
					VariableID: alarmOne.VariableID,
					IsCustom:   true,
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
		alarms = []customVariableDB.Alarm{}

		res := constants.ResJSONs{
			Docs: nAlarms,
		}

		return c.JSON(http.StatusOK, res)
	}

	msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
	return c.JSON(http.StatusAccepted, msgJSON)
}

// SION ... !OK
func GetLastRecords(c echo.Context) error {
	userSession, isAuth := middlewares.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(customVariableDB.KeyID)

	if id == constants.ListParam {

		customVariable := customVariableDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var customVariables []customVariableDB.CustomVariable
		var err error

		isRoot := userSession.Role == constants.RootUser
		isSystemAdmin := userSession.Role == constants.SystemAdminUser
		isAdmin := userSession.Role == constants.AdminUser
		isOperator := userSession.Role == constants.OperatorUser
		isGuest := userSession.Role == constants.GuestUser

		isOperators := isOperator || isGuest

		if isRoot || isSystemAdmin || isAdmin {
			customVariables, err = customVariable.FindLastRecord()
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else if isOperators {
			userID := userSession.ID

			customVariables, err = customVariable.FindLastRecordByUser(userID)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)

			}

		} else {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		res := constants.ResJSONs{
			Docs: customVariables,
		}

		return c.JSON(http.StatusOK, res)
	}

	return c.NoContent(http.StatusNotFound)
}
