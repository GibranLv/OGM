package operation

import (
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

const operationsPath = "/operations"

const startDateQuery = "start_date"
const finalDateQuery = "final_date"
const matrixIDQuery = "matrix_id"
const groupIDQuery = "group_id"

// Operation ...
type Operation struct {
	Server *echo.Group
}

// New ...
func (o *Operation) New() {
	o.Server.GET(operationsPath+"/:id", getOrListServer, routers.IsServerAuth)
	o.Server.POST(operationsPath, createServer, routers.IsServerAuth)
	o.Server.PUT(operationsPath+"/:id", updateServer, routers.IsServerAuth)
	o.Server.DELETE(operationsPath+"/:id", deleteServer, routers.IsServerAuth)
}
