package footervariable

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	footerVariableDB "github.com/JamsMendez/SION-sw/models/footer_variable"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... !OK
func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(footerVariableDB.KeyID)

	if id == constants.ListParam {

		var footerVariables []footerVariableDB.FooterVariable
		var err error

		footerVariable := footerVariableDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		customVariable := customVariableDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		userID := userSession.ID
		where := map[string]interface{}{footerVariableDB.KeyUserID: userID}
		footerVariables, err = footerVariable.Find(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		size := len(footerVariables)
		for i := 0; i < size; i++ {
			footerVariableOne := footerVariables[i]
			if footerVariableOne.IsCustom {
				where := map[string]interface{}{
					customVariableDB.KeyID: footerVariableOne.VariableID,
				}

				variableOne, err := customVariable.FindOne(where)
				if err == nil && variableOne.ID > 0 {
					footerVariables[i].Unit = variableOne.Unit
				}
			}
		}

		resJSON := constants.ResJSONs{Docs: footerVariables}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	footerVariable := footerVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	customVariable := customVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var footerVariableOne footerVariableDB.FooterVariable
	userID := userSession.ID

	where := map[string]interface{}{
		footerVariableDB.KeyID:     iID,
		footerVariableDB.KeyUserID: userID,
	}

	footerVariableOne, err = footerVariable.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if footerVariableOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "la variable de pie de página")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if footerVariableOne.IsCustom {
		where := map[string]interface{}{
			customVariableDB.KeyID: footerVariableOne.VariableID,
		}

		variableOne, err := customVariable.FindOne(where)
		if err == nil && variableOne.ID > 0 {
			footerVariableOne.Unit = variableOne.Unit
		}
	}

	resJSON := constants.ResJSON{Doc: footerVariableOne}
	return c.JSON(http.StatusOK, resJSON)
}
