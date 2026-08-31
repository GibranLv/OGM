package variable

import (
	"net/http"
	"sort"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	apiVariableDB "github.com/JamsMendez/SION-sw/models/api_variable"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
)

type VariableMin struct {
	ID          int64   `json:"id"`
	Name        string  `json:"name"`
	Device      string  `json:"device"`
	ReadingUnit string  `json:"reading_unit"`
	Value       float64 `json:"value"`
	Timestamp   string  `json:"timestamp"`
}

func GetAllLastRecords(c echo.Context) error {
	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	variableRows, err := variable.FindLastRecord()
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	apiVariable := apiVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var variablesOut []VariableMin

	where := map[string]interface{}{}
	apiVariableRows, err := apiVariable.Find(where)
	if err != nil {
		res := constants.ResJSONs{
			Docs: variablesOut,
		}

		return c.JSON(http.StatusOK, res)
	}

	sort.Slice(apiVariableRows, func(i, j int) bool {
		return apiVariableRows[i].Position < apiVariableRows[j].Position
	})

	for _, apiVariableRow := range apiVariableRows {
		if apiVariableRow.Active {
			if !apiVariableRow.IsCustom {
				for _, variableRow := range variableRows {
					if apiVariableRow.VariableID == variableRow.ID {
						variableMin := VariableMin{
							ID:        variableRow.ID,
							Name:      variableRow.Name,
							Device:    variableRow.Device,
							Value:     variableRow.Value,
							Timestamp: variableRow.Timestamp,
						}

						variablesOut = append(variablesOut, variableMin)

						break
					}
				}
			}
		}
	}

	res := constants.ResJSONs{
		Docs: variablesOut,
	}

	return c.JSON(http.StatusOK, res)
}
