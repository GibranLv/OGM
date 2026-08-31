package chartevent

import (
	"github.com/labstack/echo/v4"

	chartEventDB "github.com/JamsMendez/SION-sw/models/chart_event"
	"github.com/JamsMendez/SION-sw/routers"
)

const chartEventsPath = "/chart_events"

type getEventReq struct {
	StartDate string `json:"start_date"`
	FinalDate string `json:"final_date"`
	Start     string `json:"start"`
	Limit     string `json:"limit"`
	IsTable   bool   `json:"is_table"`
	Variables []struct {
		ID       int64 `json:"id"`
		IsCustom bool  `json:"is_custom"`
	} `json:"variables"`
}

type variableRes struct {
	VariableID int64                     `json:"variable_id"`
	IsCustom   bool                      `json:"is_custom"`
	Events     []chartEventDB.ChartEvent `json:"events"`
}

// ChartEvent ...
type ChartEvent struct {
	Server *echo.Group
}

// New ...
func (c *ChartEvent) New() {
	c.Server.GET(chartEventsPath+"/file/:id/:file", getFile, routers.IsServerAuth)
	c.Server.POST(chartEventsPath+"/:id", getListServer, routers.IsServerAuth)

	c.Server.GET(chartEventsPath+"/:id", getOrListServer, routers.IsServerAuth)
	c.Server.POST(chartEventsPath, createServer, routers.IsServerAuth)
	c.Server.PUT(chartEventsPath+"/:id", updateServer, routers.IsServerAuth)
	c.Server.DELETE(chartEventsPath+"/:id", deleteServer, routers.IsServerAuth)
}
