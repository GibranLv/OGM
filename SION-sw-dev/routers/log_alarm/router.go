package logalarm

import (
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

const logAlarmsPath = "/log/alarms"

const startDateQuery = "sd"
const finalDateQuery = "fd"
const checkedQuery = "checked"

// LogAlarm ...
type LogAlarm struct {
	Server *echo.Group
}

// New ...
func (l *LogAlarm) New() {
	l.Server.GET(logAlarmsPath+"/:id", getOrListServer, routers.IsServerAuth)
	l.Server.PUT(logAlarmsPath+"/:id/comment", updateServer, routers.IsServerAuth)
	l.Server.DELETE(logAlarmsPath+"/:id", deleteServer, routers.IsServerAuth)
}
