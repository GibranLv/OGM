package chart

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	chartDB "github.com/JamsMendez/SION-sw/models/chart"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... !OK
func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(chartDB.KeyID)

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if id == constants.ListParam {

		var charts []chartDB.Chart
		var err error

		isntAdmins := !isRoot && !isSystemAdmin && !isAdmin
		isntOperations := !isOperator && !isGuest

		if isntAdmins && isntOperations {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		chart := chartDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		userID := userSession.ID
		where := map[string]interface{}{chartDB.KeyUserID: userID}
		charts, err = chart.Find(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		resJSON := constants.ResJSONs{Docs: charts}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isAdmins := !isRoot && !isSystemAdmin && !isAdmin
	isOperations := !isOperator && !isGuest

	if !isAdmins && !isOperations {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	chart := chartDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var chartOne chartDB.Chart

	userID := userSession.ID

	where := map[string]interface{}{
		chartDB.KeyID:     iID,
		chartDB.KeyUserID: userID,
	}

	chartOne, err = chart.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if chartOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "la configuración de la variable en la grafica")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	resJSON := constants.ResJSON{Doc: chartOne}
	return c.JSON(http.StatusOK, resJSON)
}
