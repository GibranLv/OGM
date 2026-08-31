package orbcomm

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	orbcommDB "github.com/JamsMendez/SION-sw/models/orbcomm"
	"github.com/JamsMendez/SION-sw/routers"
)

func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(orbcommDB.KeyID)

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isSS := userSession.ID == 18

	if id == constants.ListParam {
		logVariable := orbcommDB.Model{
			UserDB: constants.DB.UserO,
			PwdDB:  constants.DB.PwdO,
			NameDB: constants.DB.NameO,
			Host:   constants.DB.HostO,
			Port:   constants.DB.PortO,
			Debug:  true,
		}

		var variables []orbcommDB.LogVariable
		var err error

		if isRoot || isSystemAdmin || isAdmin || isSS {
			where := map[string]interface{}{}
			variables, err = logVariable.FindVariables(where)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			// El role de usuario es indefinido.
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
		resJSON := constants.ResJSONs{Docs: variables}

		return c.JSON(http.StatusOK, resJSON)
	}

	return c.NoContent(http.StatusNotFound)
}
