package graphic

import (
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

const graphicsPath = "/graphics"

// Graphic ...
type Graphic struct {
	Server *echo.Group
}

// New ...
func (g *Graphic) New() {
	g.Server.GET(graphicsPath+"/:id", getOrListServer, routers.IsServerAuth)
	g.Server.POST(graphicsPath, createServer, routers.IsServerAuth)
	g.Server.PUT(graphicsPath+"/:id", updateServer, routers.IsServerAuth)
	g.Server.DELETE(graphicsPath+"/:id", deleteServer, routers.IsServerAuth)

	g.Server.POST(graphicsPath+"/one", getServerForMatrixGroup, routers.IsServerAuth)
}
