package matrix

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

const matricesPath = "/matrices"

const withStructureQuery = "with_structure"
const withStructureJSONQuery = "with_structure_json"

// Matrix ...
type Matrix struct {
	Server *echo.Group
}

// New ...
func (m *Matrix) New() {
	m.Server.GET(matricesPath+"/:id", getOrListServer, routers.IsServerAuth)
	m.Server.POST(matricesPath, createServer, routers.IsServerAuth)
	m.Server.PUT(matricesPath+"/:id", updateServer, routers.IsServerAuth)
	m.Server.DELETE(matricesPath+"/:id", deleteServer, routers.IsServerAuth)
}
