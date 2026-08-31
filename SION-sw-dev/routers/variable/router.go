package variable

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/routers"
)

const variablesPath = "/variables"

const alarmIDQuery = "alarm_id"

// Estructura para solicitar registros de las variables
type recordReq struct {
	VariableID int64   `json:"variable_id"`
	Variables  []int64 `json:"variables"`
	StartDate  string  `json:"start_date"`
	FinalDate  string  `json:"final_date"`
	Mode       uint8   `json:"mode"`
}

// Variable ...
type Variable struct {
	Server *echo.Group
	Config constants.ConfigServer
}

// New ...
func (v *Variable) New() {
	v.Server.GET(variablesPath+"/na", getListNAs, routers.IsServerAuth)

	v.Server.GET(variablesPath+"/:id", getOrListServer, routers.IsServerAuth)
	v.Server.PUT(variablesPath+"/:id", updateServer, routers.IsServerAuth)
	v.Server.DELETE(variablesPath+"/:id", deleteServer, routers.IsServerAuth)

	// v.Server.GET(variablesPath+"/all/last_record", getAllLastRecords)
	v.Server.GET(variablesPath+"/:id/alarms", getAlarms, routers.IsServerAuth)
	v.Server.GET(variablesPath+"/:id/last_record", getLastRecords, routers.IsServerAuth)

	v.Server.POST(variablesPath+"/coriolis", addCoriolis, routers.IsServerAuth)

	v.Server.POST(variablesPath+"/record", func(c echo.Context) error {
		return getRecords(c, v.Config)
	}, routers.IsServerAuth)

	v.Server.PUT(variablesPath+"/:id/comment", updateComment, routers.IsServerAuth)
}
