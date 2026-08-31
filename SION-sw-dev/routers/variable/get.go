package variable

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	naDB "github.com/JamsMendez/SION-sw/models/na_variable"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	variableActiveAlarmDB "github.com/JamsMendez/SION-sw/models/variable_active_alarm"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... !OK
func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

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

		if isRoot || isSystemAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)
			alarmIDValue := c.QueryParam(alarmIDQuery)

			if userIDValue != "" {
				/*
					Acceso a todas las variables de los usuarios con valor menor
					a la sesión del usuario
				*/
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(userID)
				variables, err = variable.FindByUser(i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else if alarmIDValue != "" {
				/*
					Acceso a todas las variables y alarmas de los usuarios con valor menor
					a la sesión del usuario
				*/
				alarmID, err := routers.ParseInt(alarmIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(alarmID)
				userID := userSession.ID

				variables, err = variable.FindByUserAndAlarm(userID, i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Acceso a todas las variables
				where := map[string]interface{}{}
				variables, err = variable.Find(where)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isAdmin {

			userIDValue := c.QueryParam(constants.UserIDQuery)
			alarmIDValue := c.QueryParam(alarmIDQuery)

			if userIDValue != "" {
				/*
					Acceso a todas las variables de los usuarios con valor menor
					a la sesión del usuario
				*/
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(userID)
				value := userSession.Value

				variables, err = variable.FindByUserAndLowerValue(i64, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else if alarmIDValue != "" {
				/*
					Acceso a todas las variables y alarmas de los usuarios con valor menor
					a la sesión del usuario
				*/
				alarmID, err := routers.ParseInt(alarmIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(alarmID)
				userID := userSession.ID

				variables, err = variable.FindByUserAndAlarm(userID, i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				/*
					Acceso a todas las variables de los usuarios con menor valor
					a la sesión del usuario
				*/
				userID := userSession.ID
				value := userSession.Value

				variables, err = variable.FindByUserOrLowerValue(userID, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isOperator || isGuest {
			alarmIDValue := c.QueryParam(alarmIDQuery)

			if alarmIDValue != "" {
				// Acceso a todas las variables y alarmas de la sesión del usuario
				alarmID, err := routers.ParseInt(alarmIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(alarmID)
				variables, err = variable.FindByUserAndAlarm(userSession.ID, i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Acceso a todas las variables de la sesión del usuario
				variables, err = variable.FindByUser(userSession.ID)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else {
			// El role de usuario es indefinido.
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		resJSON := constants.ResJSONs{Docs: variables}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var variableOne variableDB.Variable

	if isRoot || isSystemAdmin {
		// Acceso a cualquier Variable
		where := map[string]interface{}{variableDB.KeyID: iID}
		variableOne, err = variable.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		variableOne, err = variable.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		// Acceso a la variable relacionada a la sesión del usuario
		userID := userSession.ID
		i64 := int64(iID)

		variableOne, err = variable.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if variableOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	resJSON := constants.ResJSON{Doc: variableOne}
	return c.JSON(http.StatusOK, resJSON)
}

func getAlarms(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
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

func getLastRecords(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
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

func getAllLastRecords(c echo.Context) error {
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

	variables, err = variable.FindLastRecord()
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// UPDATE orbcomms_variables SET name = 'parameter04' WHERE variable_id = 32;
	// UPDATE orbcomms_variables SET name = 'parameter03' WHERE variable_id = 33;

	var variablesOut []variableDB.Variable
	all := []int64{1399, 1400, 1401, 1402, 1403, 1404, 1405, 1406, 1409, 1413, 1414, 1415, 1417, 1421, 1422, 1423, 1426, 1427, 1432}

	for i := 0; i < len(all); i++ {
		for _, variableOne := range variables {
			i64 := all[i]
			if variableOne.ID == i64 {

				/*nValue := variableOne.Value * 0.070307
				nValue = toFixed(nValue, 4)
				variableOne.Value = nValue*/

				variablesOut = append(variablesOut, variableOne)
			}
		}
	}

	res := constants.ResJSONs{
		Docs: variablesOut,
	}

	return c.JSON(http.StatusOK, res)
}

func getListNAs(c echo.Context) error {
	_, isAuth := routers.HasUserSession(c)
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
