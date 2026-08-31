package unit

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

const unitsPath = "/units"

// Unit ...
type Unit struct {
	Server *echo.Group
}

// New ...
func (u *Unit) New() {
	u.Server.GET(unitsPath+"/:id", getOrListServer, routers.IsServerAuth)
	u.Server.POST(unitsPath, createServer, routers.IsServerAuth)
	u.Server.PUT(unitsPath+"/:id", updateServer, routers.IsServerAuth)
	u.Server.DELETE(unitsPath+"/:id", deleteServer, routers.IsServerAuth)
}
