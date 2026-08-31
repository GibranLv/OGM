package chart

import (
	"fmt"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	chartDB "github.com/JamsMendez/SION-sw/models/chart"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

// SION ... !OK
func deleteServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(chartDB.KeyID)
	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	isntAdmins := !isRoot && !isSystemAdmin && !isAdmin
	if isntAdmins && !isOperator && !isGuest {
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

	where := map[string]interface{}{
		chartDB.KeyUserID: userSession.ID,
		chartDB.KeyID:     iID,
	}

	numAffected, err := chart.Remove(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		message := fmt.Sprintf(constants.MsgNotFoundData, "de la variable")
		msgJSON := constants.MsgError{Message: message}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	return c.NoContent(http.StatusOK)
}
