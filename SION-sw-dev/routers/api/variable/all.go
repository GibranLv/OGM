package variable

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	variableActiveAlarmDB "github.com/JamsMendez/SION-sw/models/variable_active_alarm"
	"github.com/JamsMendez/SION-sw/routers/api/middlewares"
)

// All ...
type All struct {
	Variables       []variableDB.Variable             `json:"variables"`
	CustomVariables []customVariableDB.CustomVariable `json:"custom_variables"`
	VAlarms         []variableDB.Alarm                `json:"v_alarms"`
	CVAlarms        []customVariableDB.Alarm          `json:"cv_alarms"`
}

// GetUpdateVariables ...
func GetUpdateVariables(c echo.Context) error {
	userSession, isAuth := middlewares.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
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

	var variables []variableDB.Variable
	var customVariables []customVariableDB.CustomVariable
	var nvAlarms []variableDB.Alarm
	var ncvAlarms []customVariableDB.Alarm
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

		customVariables, err = customVariable.FindLastRecord()
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

		customVariables, err = customVariable.FindLastRecordByUser(userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	vAlarms, err := variable.FindAlarmsByUser(userSession.ID)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	cvAlarms, err := customVariable.FindAlarmsByUser(userSession.ID)
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

	for _, alarmOne := range vAlarms {
		var isActive bool
		for _, activeOne := range actives {
			if alarmOne.AlarmID == activeOne.AlarmID {
				if alarmOne.VariableID == activeOne.VariableID && !activeOne.IsCustom {

					insert := true
					size := len(nvAlarms)
					for i := 0; i < size; i++ {
						if nvAlarms[i].VariableID == alarmOne.VariableID {
							if nvAlarms[i].IsCustom == alarmOne.IsCustom {
								if alarmOne.PriorityLevel > nvAlarms[i].PriorityLevel {
									nvAlarms[i] = alarmOne

									insert = false
									break
								}
							}
						}
					}

					if insert {
						nvAlarms = append(nvAlarms, alarmOne)
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
			for _, nAlarm := range nvAlarms {
				if nAlarm.VariableID == nAlarmOne.VariableID {
					if nAlarm.IsCustom == nAlarmOne.IsCustom {
						insert = false
						break
					}
				}
			}

			if insert {
				nvAlarms = append(nvAlarms, nAlarmOne)
			}
		}
	}

	for _, alarmOne := range cvAlarms {
		var isActive bool
		for _, activeOne := range actives {
			if alarmOne.AlarmID == activeOne.AlarmID {
				if alarmOne.VariableID == activeOne.VariableID && activeOne.IsCustom {

					insert := true
					size := len(ncvAlarms)
					for i := 0; i < size; i++ {
						if ncvAlarms[i].VariableID == alarmOne.VariableID {
							if ncvAlarms[i].IsCustom == alarmOne.IsCustom {
								if alarmOne.PriorityLevel > ncvAlarms[i].PriorityLevel {
									ncvAlarms[i] = alarmOne

									insert = false
									break
								}
							}
						}
					}

					if insert {
						ncvAlarms = append(ncvAlarms, alarmOne)
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
			for _, nAlarm := range ncvAlarms {
				if nAlarm.VariableID == nAlarmOne.VariableID {
					if nAlarm.IsCustom == nAlarmOne.IsCustom {
						insert = false
						break
					}
				}
			}

			if insert {
				ncvAlarms = append(ncvAlarms, nAlarmOne)
			}

		}
	}

	actives = []variableActiveAlarmDB.VariableActiveAlarm{}
	vAlarms = []variableDB.Alarm{}
	cvAlarms = []customVariableDB.Alarm{}

	res := constants.ResJSON{
		Doc: All{
			Variables:       variables,
			CustomVariables: customVariables,
			VAlarms:         nvAlarms,
			CVAlarms:        ncvAlarms,
		},
	}

	return c.JSON(http.StatusOK, res)
}
