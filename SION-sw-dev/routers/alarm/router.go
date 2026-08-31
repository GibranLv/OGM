package alarm

import (
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

const alarmsPath = "/alarms"

const updateRelationsQuery = "update_relations"

type relationsReq struct {
	Variables       []int64 `json:"variables,omitempty"`
	CustomVariables []int64 `json:"custom_variables,omitempty"`
}

// Alarm ...
type Alarm struct {
	Server *echo.Group
}

// New ...
func (a *Alarm) New() {
	a.Server.POST(alarmsPath+"/static", createStaticServer, routers.IsServerAuth)
	a.Server.PUT(alarmsPath+"/:id/notification", updateNotificationServer, routers.IsServerAuth)

	a.Server.GET(alarmsPath+"/:id", getOrListServer, routers.IsServerAuth)
	a.Server.POST(alarmsPath, createServer, routers.IsServerAuth)
	a.Server.PUT(alarmsPath+"/:id", updateServer, routers.IsServerAuth)
	a.Server.DELETE(alarmsPath+"/:id", deleteServer, routers.IsServerAuth)
}
