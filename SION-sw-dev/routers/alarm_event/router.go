package event

import (
	variableAlarmEventDB "github.com/JamsMendez/SION-sw/models/variable_alarm_event"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

const eventsPath = "/alarm/events"

type getEventReq struct {
	StartDate string `json:"start_date"`
	FinalDate string `json:"final_date"`
	Start     string `json:"start"`
	Limit     string `json:"limit"`
	Variables []struct {
		ID       int64 `json:"id"`
		IsCustom bool  `json:"is_custom"`
	} `json:"variables"`
}

type variableRes struct {
	VariableID int64                                     `json:"variable_id"`
	IsCustom   bool                                      `json:"is_custom"`
	Events     []variableAlarmEventDB.VariableAlarmEvent `json:"events"`
}

// Event ...
type Event struct {
	Server *echo.Group
}

// New ...
func (e *Event) New() {
	e.Server.POST(eventsPath+"/list", getOrListServer, routers.IsServerAuth)
	e.Server.POST(eventsPath, createServer, routers.IsServerAuth)
}
