package vehicle

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

const vehiclesPath = "/vehicles"

// Vehicle ...
type Vehicle struct {
	Server *echo.Group
}

type reqPoints struct {
	VehicleID int64  `json:"vehicle_id"`
	StartDate string `json:"start_date"`
	FinalDate string `json:"final_date"`
	Mode      uint8  `json:"speed"`
}

// New ...
func (v *Vehicle) New() {
	v.Server.GET(vehiclesPath+"/:id", getOrListServer, routers.IsServerAuth)
	v.Server.POST(vehiclesPath, createServer, routers.IsServerAuth)
	v.Server.PUT(vehiclesPath+"/:id", updateServer, routers.IsServerAuth)
	v.Server.DELETE(vehiclesPath+"/:id", deleteServer, routers.IsServerAuth)

	v.Server.POST(vehiclesPath+"/points", getPointsServer, routers.IsServerAuth)
	v.Server.PUT(vehiclesPath+"/:id/visibility", updateVisibilityServer, routers.IsServerAuth)
}
