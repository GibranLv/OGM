package event

import (
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	eventDB "github.com/JamsMendez/SION-sw/models/event"
	"github.com/JamsMendez/SION-sw/routers"
)

func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(eventDB.KeyID)

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if id == constants.ListParam {
		event := eventDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var events []eventDB.Event
		var err error

		startDateValue := c.QueryParam(startDateQuery)
		finalDateValue := c.QueryParam(finalDateQuery)
		typeValue := c.QueryParam(typeQuery)

		var startDate, finalDate string
		var eType uint8

		location, err := time.LoadLocation(constants.TZ)
		if err != nil {
			location = time.Local
		}

		if typeValue != "" {
			value, err := routers.ParseInt(typeValue)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			eType = uint8(value)
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

		if startDate == "" && finalDate == "" {
			nD := time.Now().UTC()
			fD := time.Date(nD.Year(), nD.Month(), nD.Day(), 0, 0, 0, 0, time.UTC)
			fD = fD.AddDate(0, 0, 1)

			sD := fD.AddDate(0, 0, -30)

			startDate = sD.Format(constants.DateTimeFormat)
			finalDate = fD.Format(constants.DateTimeFormat)
		}

		if isRoot || isSystemAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)

			if userIDValue != "" {
				// Acceso a todos los eventos
				var userID int64

				if userIDValue == constants.SelfValue {
					userID = userSession.ID

				} else {
					vInt, err := routers.ParseInt(userIDValue)
					if err != nil {
						msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
						return c.JSON(http.StatusAccepted, msgJSON)
					}

					userID = int64(vInt)
				}

				where := map[string]interface{}{eventDB.KeyUserID: userID}
				if eType != 0 {
					where[eventDB.KeyType] = eType
				}

				events, err = event.FindForRange(where, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				userID := userSession.ID

				// Acceso a todos los eventos
				where := map[string]interface{}{
					eventDB.KeyUserID: userID,
				}

				if eType != 0 {
					where[eventDB.KeyType] = eType
				}

				events, err = event.FindForRange(where, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)

			if userIDValue != "" {
				/*
					Acceso a todos los eventos con el ID del usuario
				*/
				var userID int64

				if userIDValue == constants.SelfValue {
					userID = userSession.ID

				} else {
					vInt, err := routers.ParseInt(userIDValue)
					if err != nil {
						msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
						return c.JSON(http.StatusAccepted, msgJSON)
					}

					userID = int64(vInt)
				}

				where := map[string]interface{}{
					eventDB.KeyUserID: userID,
				}

				if eType != 0 {
					where[eventDB.KeyType] = eType
				}

				events, err = event.FindByUserAndLowerValue(where, userSession.Value, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Acceso a todos los eventos de la sesión del usuario
				userID := userSession.ID

				where := map[string]interface{}{
					eventDB.KeyUserID: userID,
				}

				if eType != 0 {
					where[eventDB.KeyType] = eType
				}

				events, err = event.FindForRange(where, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isOperator || isGuest {
			// Acceso a todos los eventos de la sesión del usuario
			userID := userSession.ID

			where := map[string]interface{}{
				eventDB.KeyUserID: userID,
			}

			if eType != 0 {
				where[eventDB.KeyType] = eType
			}

			events, err = event.FindForRange(where, startDate, finalDate)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		size := len(events)
		for i := 0; i < size; i++ {
			events[i].CreatedAtOut = events[i].CreatedAt.In(location).Format(constants.DateTimeFormat)
		}

		resJSON := constants.ResJSONs{Docs: events}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	event := eventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var eventOne eventDB.Event

	if isRoot || isSystemAdmin {
		// Acceso a todos los eventos
		where := map[string]interface{}{eventDB.KeyID: iID}
		eventOne, err = event.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a cualquier evento de los usuarios con menor valor
			a la sesión del usuario
		*/
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)

		eventOne, err = event.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		// Acceso a los eventos de la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)

		eventOne, err = event.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if eventOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del evento")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	eventOne.CreatedAtOut = eventOne.CreatedAt.In(location).Format(constants.DateTimeFormat)

	resJSON := constants.ResJSON{Doc: eventOne}
	return c.JSON(http.StatusOK, resJSON)
}

func getNotificationListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	event := eventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var events []eventDB.Event
	var err error

	var isSeen bool
	var typeIn uint8
	var limit int

	isSeenValue := c.QueryParam(isSeenQuery)
	if isSeenValue == constants.TrueValue {
		isSeen = true
	}

	typeValue := c.QueryParam(typeQuery)
	if typeValue != "" {
		typeInt, err := routers.ParseInt(typeValue)
		if err != nil {
			fmt.Println("event.getNotificationList.Type.ParseInt: ", err)

			return c.NoContent(http.StatusUnauthorized)
		}

		if typeInt != 0 {
			typeIn = uint8(typeInt)
		}
	}

	limitValue := c.QueryParam(constants.LimitQuery)
	if limitValue != "" {
		limit, err = routers.ParseInt(limitValue)
		if err != nil {
			fmt.Println("event.getNotificationList.Limit.ParseInt: ", err)

			return c.NoContent(http.StatusUnauthorized)
		}
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if isRoot || isSystemAdmin {
		userID := userSession.ID

		events, err = event.FindByUserAndSeen(userID, limit, typeIn, isSeen)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		userID := userSession.ID

		events, err = event.FindByUserAndSeen(userID, limit, typeIn, isSeen)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		userID := userSession.ID

		events, err = event.FindByUserAndSeen(userID, limit, typeIn, isSeen)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	size := len(events)
	for i := 0; i < size; i++ {
		events[i].CreatedAtOut = events[i].CreatedAt.In(location).Format(constants.DateTimeFormat)
	}

	resJSON := constants.ResJSONs{Docs: events}
	return c.JSON(http.StatusOK, resJSON)
}
