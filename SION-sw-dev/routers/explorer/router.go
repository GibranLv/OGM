package explorer

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

const explorersPath = "/explorers"

// Explorer ...
type Explorer struct {
	Server  *echo.Group
	PathWSE string
}

// New ...
func (e *Explorer) New() {
	e.Server.GET(explorersPath+"/view/:id", func(c echo.Context) error {
		return viewServer(c, e.PathWSE)
	}, routers.IsServerAuth)

	e.Server.GET(explorersPath+"/download/:id", func(c echo.Context) error {
		return downloadServer(c, e.PathWSE)
	}, routers.IsServerAuth)
}
