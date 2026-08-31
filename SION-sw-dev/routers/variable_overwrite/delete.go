package voverwrite

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	vOverwriteDB "github.com/JamsMendez/SION-sw/models/variable_overwrite"
	"github.com/JamsMendez/SION-sw/routers"
)

func deleteServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isROOT := userSession.Role == constants.RootUser
	if !isROOT {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(vOverwriteDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	overwrite := vOverwriteDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	var overwriteOne vOverwriteDB.VariableOverwrite

	if isROOT {
		where := map[string]interface{}{vOverwriteDB.KeyID: iID}
		overwriteOne, err = overwrite.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if overwriteOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	where := map[string]interface{}{vOverwriteDB.KeyID: overwriteOne.ID}
	numAffected, err := overwrite.Remove(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	return c.NoContent(http.StatusOK)
}
