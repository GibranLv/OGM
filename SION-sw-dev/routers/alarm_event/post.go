package event

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	variableAlarmEventDB "github.com/JamsMendez/SION-sw/models/variable_alarm_event"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	event := variableAlarmEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	oJSON := getEventReq{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("events.getOrListServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("events.getOrListServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &oJSON); err != nil {
		fmt.Println("events.getOrListServer.Unmarshal: ", err)
		return c.NoContent(http.StatusBadRequest)
	}

	startDateString := oJSON.StartDate
	finalDateString := oJSON.FinalDate
	startString := oJSON.Start
	limitString := oJSON.Limit
	variables := oJSON.Variables

	var start, limit int
	var startDate, finalDate string

	variablesOut := []variableRes{}

	if startString != "" {
		start, err = routers.ParseInt(startString)
		if err != nil {
			fmt.Println("events.getOrListServer.routers.ParseInt.startString: ", err)

			return c.NoContent(http.StatusBadRequest)
		}

		if start <= 0 {
			fmt.Println("events.getOrListServer.routers.ParseInt.startString: start is <= 0")

			return c.NoContent(http.StatusBadRequest)
		}
	}

	if limitString != "" {
		if limitString == "all" {
			limit = 0
		} else {
			limit, err = routers.ParseInt(limitString)
			if err != nil {
				fmt.Println("events.getOrListServer.routers.ParseInt.limitString: ", err)

				return c.NoContent(http.StatusBadRequest)
			}

			if limit <= 0 {
				fmt.Println("events.getOrListServer.routers.ParseInt.limitString: limit is <= 0")

				return c.NoContent(http.StatusBadRequest)
			}
		}
	} else {
		limit = 100
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		fmt.Println("events.getOrListServer.LoadLocation: ", err)

		location = time.Local
	}

	startTime, err := time.ParseInLocation(constants.DateTimeFormat, startDateString, location)
	if err != nil {
		fmt.Println("events.getOrListServer.ParseInLocation.Start: ", err)

		return c.NoContent(http.StatusBadRequest)
	}

	startDate = startTime.UTC().Format(constants.DateTimeFormat)

	finalTime, err := time.ParseInLocation(constants.DateTimeFormat, finalDateString, location)
	if err != nil {
		fmt.Println("events.getOrListServer.ParseInLocation.Final: ", err)

		return c.NoContent(http.StatusBadRequest)
	}

	finalDate = finalTime.UTC().Format(constants.DateTimeFormat)

	if userSession.Role == constants.RootUser {
		userIDValue := c.QueryParam(constants.UserIDQuery)
		if userIDValue != "" {
			// Usuario usuario
			// Acceso a todas los Eventos de todos los usuarios
			userID, err := routers.ParseInt(userIDValue)
			if err != nil {
				return c.NoContent(http.StatusBadRequest)
			}

			i64 := int64(userID)

			for _, variableOne := range variables {
				variableID := variableOne.ID
				isCustom := variableOne.IsCustom

				events, err := event.FindByUser(i64, start, limit, variableID, isCustom, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				variableOut := variableRes{
					VariableID: variableOne.ID,
					IsCustom:   variableOne.IsCustom,
					Events:     events,
				}

				variablesOut = append(variablesOut, variableOut)
			}

		} else {
			// Usuario usuario
			// Acceso a todas los Eventos
			for _, variableOne := range variables {
				variableID := variableOne.ID
				isCustom := variableOne.IsCustom

				events, err := event.Find(start, limit, variableID, isCustom, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				variableOut := variableRes{
					VariableID: variableOne.ID,
					IsCustom:   variableOne.IsCustom,
					Events:     events,
				}

				variablesOut = append(variablesOut, variableOut)
			}
		}

	} else if userSession.Role == constants.AdminUser {
		allValue := c.QueryParam(constants.AllQuery)
		userIDValue := c.QueryParam(constants.UserIDQuery)

		if allValue == constants.TrueValue {
			// Administrador
			// Acceso a todas los Eventos de usuarios con roles de valor inferior
			// y de la sesión del usuario
			for _, variableOne := range variables {
				variableID := variableOne.ID
				isCustom := variableOne.IsCustom

				events, err := event.FindByUserOrLowerValue(userSession.ID, userSession.Value, start, limit, variableID, isCustom, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				variableOut := variableRes{
					VariableID: variableOne.ID,
					IsCustom:   variableOne.IsCustom,
					Events:     events,
				}

				variablesOut = append(variablesOut, variableOut)
			}

		} else if userIDValue == constants.TrueValue {
			// Administrador
			// Acceso a todas los Eventos con el ID del usuario siempre
			// que no tenga un role con valor superior
			userID, err := routers.ParseInt(userIDValue)
			if err != nil {
				return c.NoContent(http.StatusBadRequest)
			}

			i64 := int64(userID)
			for _, variableOne := range variables {
				variableID := variableOne.ID
				isCustom := variableOne.IsCustom

				events, err := event.FindByUserAndLowerValue(i64, userSession.Value, start, limit, variableID, isCustom, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				variableOut := variableRes{
					VariableID: variableOne.ID,
					IsCustom:   variableOne.IsCustom,
					Events:     events,
				}

				variablesOut = append(variablesOut, variableOut)
			}

		} else {
			// Administrador
			// Acceso a todas los Eventos de la sesión del usuario
			for _, variableOne := range variables {
				variableID := variableOne.ID
				isCustom := variableOne.IsCustom

				events, err := event.FindByUser(userSession.ID, start, limit, variableID, isCustom, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				variableOut := variableRes{
					VariableID: variableOne.ID,
					IsCustom:   variableOne.IsCustom,
					Events:     events,
				}

				variablesOut = append(variablesOut, variableOut)
			}
		}

	} else if userSession.Role == constants.OperatorUser {
		// Operador
		// Acceso a todas los Eventos de la sesión del usuario
		for _, variableOne := range variables {
			variableID := variableOne.ID
			isCustom := variableOne.IsCustom

			events, err := event.FindByUser(userSession.ID, start, limit, variableID, isCustom, startDate, finalDate)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			variableOut := variableRes{
				VariableID: variableOne.ID,
				IsCustom:   variableOne.IsCustom,
				Events:     events,
			}

			variablesOut = append(variablesOut, variableOut)
		}

	} else if userSession.Role == constants.GuestUser {
		// Invitado
		// Acceso a todas los Eventos de la sesión del usuario
		for _, variableOne := range variables {
			variableID := variableOne.ID
			isCustom := variableOne.IsCustom

			events, err := event.FindByUser(userSession.ID, start, limit, variableID, isCustom, startDate, finalDate)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			variableOut := variableRes{
				VariableID: variableOne.ID,
				IsCustom:   variableOne.IsCustom,
				Events:     events,
			}

			variablesOut = append(variablesOut, variableOut)
		}

	} else {
		// El role de usuario es indefinido.
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	resJSON := constants.ResJSONs{Docs: variablesOut}
	return c.JSON(http.StatusOK, resJSON)
}

func createServer(c echo.Context) error {
	return c.NoContent(http.StatusOK)
}
