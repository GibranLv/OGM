package chart

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

const chartsPath = "/charts"

// Chart ...
type Chart struct {
	Server *echo.Group
}

// New ...
func (c *Chart) New() {
	c.Server.GET(chartsPath+"/:id", getOrListServer, routers.IsServerAuth)
	c.Server.POST(chartsPath, updateServer, routers.IsServerAuth)
	c.Server.DELETE(chartsPath+"/:id", deleteServer, routers.IsServerAuth)
}
