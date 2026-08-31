package logalarm

import (
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	logAlarmDB "github.com/JamsMendez/SION-sw/models/log_alarm"
	"github.com/JamsMendez/SION-sw/routers"
)

func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
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

		if isRoot || isSystemAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)

			if userIDValue != "" {
				// Acceso a todos los logAlarmos
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
				// Acceso a todos los logAlarmos
				where := map[string]interface{}{}

				if checkedIn {
					where[logAlarmDB.KeyChecked] = checkedBool
				}

				if startDate != "" && finalDate != "" {
					userID := userSession.ID

					fmt.Println("if ", where, startDate, finalDate)

					logAlarms, err = logAlarm.FindForRange(where, userID, startDate, finalDate)
					if err != nil {
						msgJSON := constants.MsgError{Message: constants.MsgErr}
						return c.JSON(http.StatusAccepted, msgJSON)
					}

					fmt.Println("Finish Query .... ")

				} else {
					fmt.Println("else ", where, startDate, finalDate)
					logAlarms, err = logAlarm.Find(where)
					if err != nil {
						msgJSON := constants.MsgError{Message: constants.MsgErr}
						return c.JSON(http.StatusAccepted, msgJSON)
					}
				}
			}

		} else if isAdmin || isOperator || isGuest {
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

		if isRoot {
			fmt.Println("SIZE: ", size)
		}

		for i := 0; i < size; i++ {
			logAlarms[i].CreatedAtOut = logAlarms[i].CreatedAt.In(location).Format(constants.DateTimeFormat)
			logAlarms[i].UpdatedAtOut = logAlarms[i].UpdatedAt.In(location).Format(constants.DateTimeFormat)
		}

		if isRoot {
			fmt.Println("Finish LogAlarms")
		}

		resJSON := constants.ResJSONs{Docs: logAlarms}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
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

	if isRoot || isSystemAdmin {
		// Acceso a todos los logAlarms
		where := map[string]interface{}{logAlarmDB.KeyID: iID}
		logAlarmOne, err = logAlarm.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin || isOperator || isGuest {
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
