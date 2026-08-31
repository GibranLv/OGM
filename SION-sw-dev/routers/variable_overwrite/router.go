package voverwrite

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

const overwritesPath = "/overwrites"

// VariableOverwrite ...
type VariableOverwrite struct {
	Server *echo.Group
}

// New ...
func (o *VariableOverwrite) New() {
	o.Server.GET(overwritesPath+"/:id", getOrListServer, routers.IsServerAuth)
	o.Server.POST(overwritesPath, createServer, routers.IsServerAuth)
	o.Server.PUT(overwritesPath+"/:id", updateServer, routers.IsServerAuth)
	o.Server.DELETE(overwritesPath+"/:id", deleteServer, routers.IsServerAuth)
}
