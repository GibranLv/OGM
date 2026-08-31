package customvariable

import (
	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

const customVariablesPath = "/custom_variables"

const withVariablesQuery = "with_variables"
const withVariablesJSONQuery = "with_variables_json"

const alarmIDQuery = "alarm_id"

type recordReq struct {
	VariableID int64   `json:"variable_id"`
	Variables  []int64 `json:"variables"`
	StartDate  string  `json:"start_date"`
	FinalDate  string  `json:"final_date"`
	Mode       uint8   `json:"mode"`
}

// CustomVariable ...
type CustomVariable struct {
	Server *echo.Group
	Config constants.ConfigServer
}

// New ...
func (cv *CustomVariable) New() {
	cv.Server.GET(customVariablesPath+"/:id", getOrListServer, routers.IsServerAuth)
	cv.Server.POST(customVariablesPath, createServer, routers.IsServerAuth)
	cv.Server.PUT(customVariablesPath+"/:id", updateServer, routers.IsServerAuth)
	cv.Server.DELETE(customVariablesPath+"/:id", deleteServer, routers.IsServerAuth)

	cv.Server.GET(customVariablesPath+"/:id/alarms", getAlarms, routers.IsServerAuth)
	cv.Server.GET(customVariablesPath+"/:id/last_record", getLastRecords, routers.IsServerAuth)

	cv.Server.POST(customVariablesPath+"/record", func(c echo.Context) error {
		return getRecords(c, cv.Config)
	}, routers.IsServerAuth)

	cv.Server.PUT(customVariablesPath+"/:id/comment", updateComment, routers.IsServerAuth)
}
