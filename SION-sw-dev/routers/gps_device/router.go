package gpsDevice

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

const gpsDevicesPath = "/gps_devices"

// GPSDevice ...
type GPSDevice struct {
	Server *echo.Group
}

// New ...
func (g *GPSDevice) New() {
	g.Server.GET(gpsDevicesPath+"/:id", getOrListServer, routers.IsServerAuth)
	g.Server.POST(gpsDevicesPath, createServer, routers.IsServerAuth)
	g.Server.PUT(gpsDevicesPath+"/:id", updateServer, routers.IsServerAuth)
	g.Server.DELETE(gpsDevicesPath+"/:id", deleteServer, routers.IsServerAuth)
}
