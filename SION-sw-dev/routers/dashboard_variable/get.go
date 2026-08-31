package dashboardvariable

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	dashboardVariableDB "github.com/JamsMendez/SION-sw/models/dashboard_variable"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... !OK
func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(dashboardVariableDB.KeyID)

	if id == constants.ListParam {

		values := []int64{41, 42, 43, 115, 116}

		var dashboardVariables []dashboardVariableDB.DashboardVariable

		customVariable := customVariableDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		userID := userSession.ID
		for index, valueID := range values {
			where := map[string]interface{}{customVariableDB.KeyID: valueID}
			customVariableOne, err := customVariable.FindOne(where)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			if customVariableOne.ID > 0 {
				i16 := int16(index)

				variableOne := dashboardVariableDB.DashboardVariable{
					ID:         customVariableOne.ID,
					UserID:     userID,
					VariableID: customVariableOne.ID,
					IsCustom:   true,
					Position:   i16,
					Unit:       customVariableOne.Unit,
				}

				dashboardVariables = append(dashboardVariables, variableOne)
			}

		}

		resJSON := constants.ResJSONs{Docs: dashboardVariables}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	dashboardVariable := dashboardVariableDB.Model{
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

	var dashboardVariableOne dashboardVariableDB.DashboardVariable
	userID := userSession.ID

	where := map[string]interface{}{
		dashboardVariableDB.KeyID:     iID,
		dashboardVariableDB.KeyUserID: userID,
	}

	dashboardVariableOne, err = dashboardVariable.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if dashboardVariableOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "la variable de pie de página")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if dashboardVariableOne.IsCustom {
		where := map[string]interface{}{
			customVariableDB.KeyID: dashboardVariableOne.VariableID,
		}

		variableOne, err := customVariable.FindOne(where)
		if err == nil && variableOne.ID > 0 {
			dashboardVariableOne.Unit = variableOne.Unit
		}
	}

	resJSON := constants.ResJSON{Doc: dashboardVariableOne}
	return c.JSON(http.StatusOK, resJSON)
}
