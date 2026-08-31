package event

import (
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

const eventsPath = "/log/events"

const startDateQuery = "start_date"
const finalDateQuery = "final_date"
const typeQuery = "type"
const isSeenQuery = "is_seen"

// Event ...
type Event struct {
	Server *echo.Group
}

// New ...
func (e *Event) New() {
	e.Server.GET(eventsPath+"/notifications", getNotificationListServer, routers.IsServerAuth)
	e.Server.PUT(eventsPath+"/notifications/:id", updateSeenNotificationServer, routers.IsServerAuth)

	e.Server.GET(eventsPath+"/:id", getOrListServer, routers.IsServerAuth)
	//e.Server.POST(eventsPath, createServer, routers.IsServerAuth)
	//e.Server.PUT(eventsPath+"/:id", updateServer, routers.IsServerAuth)
	e.Server.DELETE(eventsPath+"/:id", deleteServer, routers.IsServerAuth)
}
