package group

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

const groupsPath = "/groups"

// ImageGroupsSRC ... Rutas de las imagenes de Grupos
const ImageGroupsSRC = "./public/images/groups/"

// Group ...
type Group struct {
	Server *echo.Group
}

// New ...
func (g *Group) New() {
	g.Server.GET(groupsPath+"/:id/comment", getComment, routers.IsServerAuth)
	g.Server.PUT(groupsPath+"/:id/comment", updateComment, routers.IsServerAuth)

	g.Server.GET(groupsPath+"/:id", getOrListServer, routers.IsServerAuth)
	g.Server.POST(groupsPath, createServer, routers.IsServerAuth)
	g.Server.PUT(groupsPath+"/:id", updateServer, routers.IsServerAuth)
	g.Server.DELETE(groupsPath+"/:id", deleteServer, routers.IsServerAuth)
}
