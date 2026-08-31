package chartevent

import (
	"fmt"
	"net/http"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	chartEventDB "github.com/JamsMendez/SION-sw/models/chart_event"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(chartEventDB.KeyID)

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if id == constants.ListParam {
		chartEvent := chartEventDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var chartEvents []chartEventDB.ChartEvent

		now := time.Now().UTC()
		finalDate := now.Format(constants.DateTimeFormat)
		startDate := now.AddDate(-3, 0, 0).Format(constants.DateTimeFormat)
		//startDate := now.AddDate(0, -1, 0).Format(constants.DateTimeFormat)

		if isRoot || isSystemAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)
			if userIDValue != "" {
				// Usuario usuario
				// Acceso a todas los Eventos de Graficas de todos los usuarios
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(userID)
				eventsVars, err := chartEvent.FindByUserOfVariablesToTable(i64, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				eventsCustomVars, err := chartEvent.FindByUserOfCustomVariablesToTable(i64, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				chartEvents = append(chartEvents, eventsVars...)
				chartEvents = append(chartEvents, eventsCustomVars...)

			} else {
				// Usuario usuario
				// Acceso a todas los Eventos de Graficas

				eventsVars, err := chartEvent.FindOfVariablesToTable(startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				eventsCustomVars, err := chartEvent.FindOfCustomVariablesToTable(startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				chartEvents = append(chartEvents, eventsVars...)
				chartEvents = append(chartEvents, eventsCustomVars...)
			}

		} else if isAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)
			if userIDValue != "" {
				// Usuario usuario
				// Acceso a todas los Eventos de Graficas de todos los usuarios
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(userID)
				eventsVars, err := chartEvent.FindByUserAndLowerValueOfVariables(i64, userSession.Value, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				eventsCustomVars, err := chartEvent.FindByUserAndLowerValueOfCustomVariables(i64, userSession.Value, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				chartEvents = append(chartEvents, eventsVars...)
				chartEvents = append(chartEvents, eventsCustomVars...)

			} else {
				// Administrador
				// Acceso a todas los Eventos de Grafica de la sesión del usuario
				userID := userSession.ID
				eventsVars, err := chartEvent.FindByUserOrLowerValueOfVariables(userID, userSession.Value, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				eventsCustomVars, err := chartEvent.FindByUserOrLowerValueOfCustomVariables(userID, userSession.Value, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				chartEvents = append(chartEvents, eventsVars...)
				chartEvents = append(chartEvents, eventsCustomVars...)
			}

		} else if isOperator || isGuest {
			// Acceso a todas los Eventos de Graficas de la sesión del usuario
			eventsVars, err := chartEvent.FindByUserOfVariablesToTable(userSession.ID, startDate, finalDate)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			eventsCustomVars, err := chartEvent.FindByUserOfCustomVariablesToTable(userSession.ID, startDate, finalDate)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			chartEvents = append(chartEvents, eventsVars...)
			chartEvents = append(chartEvents, eventsCustomVars...)

		} else {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		resJSON := constants.ResJSONs{Docs: chartEvents}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	chartEvent := chartEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var chartEventOne chartEventDB.ChartEvent

	if isRoot || isSystemAdmin {
		// Super usuario
		// Acceso a cualquier Evento de Grafica
		where := map[string]interface{}{chartEventDB.KeyID: iID}
		chartEventOne, err = chartEvent.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if chartEventOne.ID > 0 {
			chartEventOne, err = chartEvent.FindOneTotable(chartEventOne.ID, chartEventOne.IsCustom)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}
		}

	} else if isAdmin {
		// Administrador
		// Acceso a cualquier Evento de Grafica de un usuario con role de valor inferior
		// o la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)
		chartEventOne, err = chartEvent.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if chartEventOne.ID > 0 {
			chartEventOne, err = chartEvent.FindOneTotable(chartEventOne.ID, chartEventOne.IsCustom)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}
		}

	} else if isOperator || isGuest {
		userID := userSession.ID
		i64 := int64(iID)
		chartEventOne, err = chartEvent.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if chartEventOne.ID > 0 {
			chartEventOne, err = chartEvent.FindOneTotable(chartEventOne.ID, chartEventOne.IsCustom)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if chartEventOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del evento en la gráfica")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	chartEventOne.CreatedAtOut = chartEventOne.CreatedAt.In(location).Format(constants.DateTimeFormat)

	resJSON := constants.ResJSON{Doc: chartEventOne}
	return c.JSON(http.StatusOK, resJSON)
}
