package orbcomm

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

const orbcommsPath = "/log/orbcomms"

// Orbcomm ...
type Orbcomm struct {
	Server *echo.Group
}

// New ...
func (o *Orbcomm) New() {
	o.Server.GET(orbcommsPath+"/:id", getOrListServer, routers.IsServerAuth)
}
