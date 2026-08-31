package customvariable

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
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

		var err error
		var customVariables []customVariableDB.CustomVariable

		if isRoot || isSystemAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)
			alarmIDValue := c.QueryParam(alarmIDQuery)

			if userIDValue != "" {
				// Acceso a todas las variables personalizadas de todos los usuarios
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(userID)
				customVariables, err = customVariable.FindByUser(i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else if alarmIDValue != "" {
				// Acceso a todas las variables personalizadas de todos los usuarios
				alarmID, err := routers.ParseInt(alarmIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(alarmID)
				userID := userSession.ID

				customVariables, err = customVariable.FindByUserAndAlarm(userID, i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Acceso a todas las variables personalizada
				where := map[string]interface{}{}
				customVariables, err = customVariable.Find(where)
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
					Acceso a todas las Varibles personalizada con el ID del usuario siempre
					que no tenga un role con valor superior
				*/
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(userID)
				value := userSession.Value

				customVariables, err = customVariable.FindByUserAndLowerValue(i64, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else if alarmIDValue != "" {
				/*
					Acceso a todas las Variables personalizdas con menos valor
					a la sesión del usuario
				*/
				alarmID, err := routers.ParseInt(alarmIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(alarmID)
				userID := userSession.ID

				customVariables, err = customVariable.FindByUserAndAlarm(userID, i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Acceso a todas las variables personalizada de la sesión del usuario
				customVariables, err = customVariable.FindByUser(userSession.ID)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isOperator || isGuest {
			userID := userSession.ID

			alarmIDValue := c.QueryParam(alarmIDQuery)
			if alarmIDValue != "" {
				// Acceso a todas las variables personalizadas de la sesión del usuario
				alarmID, err := routers.ParseInt(alarmIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(alarmID)
				customVariables, err = customVariable.FindByUserAndAlarm(userID, i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Acceso a todas las variables personalizadas de la sesión del usuario
				customVariables, err = customVariable.FindByUser(userID)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		withVariables := c.QueryParam(withVariablesQuery)
		if withVariables == constants.TrueValue {

			variable := variableDB.Model{
				UserDB: constants.DB.UserSW,
				PwdDB:  constants.DB.PwdSW,
				NameDB: constants.DB.NameSW,
				Host:   constants.DB.HostSW,
				Port:   constants.DB.PortSW,
				Debug:  true,
			}

			size := len(customVariables)
			for i := 0; i < size; i++ {
				variables := customVariables[i].VariablesJSON

				size := len(variables)
				for j := 0; j < size; j++ {
					ID := variables[j]

					where := map[string]interface{}{variableDB.KeyID: ID}
					vOne, err := variable.FindOne(where)
					if err == nil {
						customVariables[i].Variables = append(customVariables[i].Variables, vOne)
					}
				}
			}
		}

		withVariablesJSON := c.QueryParam(withVariablesJSONQuery)
		if withVariablesJSON == constants.FalseValue {
			size := len(customVariables)
			for i := 0; i < size; i++ {
				customVariables[i].VariablesJSON = nil
			}
		}

		resJSON := constants.ResJSONs{Docs: customVariables}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
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

	var customVariableOne customVariableDB.CustomVariable

	if isRoot || isSystemAdmin {
		// Acceso a cualquier variable personalizadas
		where := map[string]interface{}{customVariableDB.KeyID: iID}
		customVariableOne, err = customVariable.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
				Acceso a cualquier Variable personalizada de un usuario con menor valor
			 	a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		customVariableOne, err = customVariable.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		// Acceso las variables personalizadas de la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)

		customVariableOne, err = customVariable.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if customVariableOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable personalizada")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	withVariables := c.QueryParam(withVariablesJSONQuery)
	if withVariables == constants.TrueValue {
		variable := variableDB.Model{}
		variables := customVariableOne.VariablesJSON
		size := len(variables)
		for i := 0; i < size; i++ {
			variableID := variables[i]

			where := map[string]interface{}{variableDB.KeyID: variableID}
			variableOne, err := variable.FindOne(where)
			if err == nil {
				customVariableOne.Variables = append(customVariableOne.Variables, variableOne)
			}
		}
	}

	withVariablesJSON := c.QueryParam(withVariablesJSONQuery)
	if withVariablesJSON == constants.FalseValue {
		customVariableOne.VariablesJSON = nil
	}

	resJSON := constants.ResJSON{Doc: customVariableOne}
	return c.JSON(http.StatusOK, resJSON)
}

// SION ... !OK
func getAlarms(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
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

		res := constants.ResJSONs{
			Docs: nAlarms,
		}

		return c.JSON(http.StatusOK, res)
	}

	msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
	return c.JSON(http.StatusAccepted, msgJSON)
}

// SION ... !OK
func getLastRecords(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
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

		if isRoot || isSystemAdmin {
			customVariables, err = customVariable.FindLastRecord()
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else if isAdmin || isOperators {
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
