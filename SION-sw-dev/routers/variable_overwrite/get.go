package voverwrite

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	vOverwriteDB "github.com/JamsMendez/SION-sw/models/variable_overwrite"
	"github.com/JamsMendez/SION-sw/routers"
)

func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isROOT := userSession.Role == constants.RootUser
	if !isROOT {
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	id := c.Param(vOverwriteDB.KeyID)
	if id == "" {
		return c.NoContent(http.StatusNoContent)
	}

	if id == constants.ListParam {
		vOverwrite := vOverwriteDB.Model{
			UserDB: constants.DB.UserO,
			PwdDB:  constants.DB.PwdO,
			NameDB: constants.DB.NameO,
			Host:   constants.DB.HostO,
			Port:   constants.DB.PortO,
			Debug:  true,
		}

		variable := variableDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var overwrites []vOverwriteDB.VariableOverwrite
		var err error

		if isROOT {
			where := map[string]interface{}{}
			overwrites, err = vOverwrite.Find(where)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			size := len(overwrites)
			for i := 0; i < size; i++ {
				variableID := overwrites[i].VariableID

				where := map[string]interface{}{variableDB.KeyID: variableID}
				variableOne, err := variable.FindOne(where)
				if err == nil && variableOne.ID > 0 {
					overwrites[i].VariableDevice = variableOne.Device
					overwrites[i].VariableName = variableOne.Name
				}
			}

			resJSON := constants.ResJSONs{Docs: overwrites}
			return c.JSON(http.StatusOK, resJSON)

		}

		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	vInt, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	vOverwrite := vOverwriteDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	var overwriteOne vOverwriteDB.VariableOverwrite

	where := map[string]interface{}{vOverwriteDB.KeyID: vInt}
	overwriteOne, err = vOverwrite.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if overwriteOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable")
		msgJSON := constants.MsgError{Message: msg}
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

	where = map[string]interface{}{variableDB.KeyID: overwriteOne.VariableID}
	variableOne, err := variable.FindOne(where)
	if err == nil && variableOne.ID > 0 {
		overwriteOne.VariableDevice = variableOne.Device
		overwriteOne.VariableName = variableOne.Name
	}

	resJSON := constants.ResJSON{Doc: overwriteOne}
	return c.JSON(http.StatusOK, resJSON)
}
