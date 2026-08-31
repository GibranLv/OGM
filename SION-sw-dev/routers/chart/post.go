package chart

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	chartDB "github.com/JamsMendez/SION-sw/models/chart"
	"github.com/JamsMendez/SION-sw/routers"
)

type variableItem struct {
	VariableID int64  `json:"variable_id"`
	IsCustom   bool   `json:"is_custom"`
	UnitID     int64  `json:"unit_id"`
	Name       string `json:"name"`
	Color      string `json:"color"`
}

// SION ... !OK
func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	oJSON := []variableItem{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("chart.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("chart.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &oJSON); err != nil {
		fmt.Println("chart.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	size := len(oJSON)
	if size == 0 {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	isntAdmins := !isRoot && !isSystemAdmin && !isAdmin && !isGuest
	if isntAdmins && !isOperator {
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

	where := map[string]interface{}{chartDB.KeyUserID: userSession.ID}
	variables, err := chart.Find(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	for _, variableIn := range oJSON {
		isNew := true
		for _, variableOne := range variables {
			if variableOne.VariableID == variableIn.VariableID {
				if variableOne.IsCustom == variableIn.IsCustom {

					isntEqualUnit := variableOne.UnitID != variableIn.UnitID
					isntEqualName := variableOne.Name != variableIn.Name
					isntEqualColor := variableOne.Color != variableIn.Color

					if isntEqualUnit || isntEqualName || isntEqualColor {
						values := map[string]interface{}{
							chartDB.KeyID:    variableOne.ID,
							chartDB.KeyName:  variableIn.Name,
							chartDB.KeyColor: variableIn.Color,
						}

						if variableIn.UnitID == -1 {
							values[chartDB.KeyUnitID] = nil
						} else {
							if variableIn.UnitID > 0 {
								values[chartDB.KeyUnitID] = variableIn.UnitID
							}
						}

						_, err := chart.Update(values)
						if err != nil {
							fmt.Println("charts.updateServer.chart.Update: ", err)
						}
					}

					isNew = false
					break
				}
			}
		}

		if isNew {
			values := map[string]interface{}{
				chartDB.KeyUserID:     userSession.ID,
				chartDB.KeyVariableID: variableIn.VariableID,
				chartDB.KeyIsCustom:   variableIn.IsCustom,
				chartDB.KeyUnitID:     variableIn.UnitID,
				chartDB.KeyName:       variableIn.Name,
				chartDB.KeyColor:      variableIn.Color,
			}

			_, err := chart.Create(values)
			if err != nil {
				fmt.Println("charts.updateServer.chart.Create: ", err)
			}
		}
	}

	variables, err = chart.Find(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	res := constants.ResJSONs{
		Docs: variables,
	}

	return c.JSON(http.StatusOK, res)
}
