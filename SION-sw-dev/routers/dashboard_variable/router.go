package dashboardvariable

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

const dashboardVariablesPath = "/dashboard_variables"

// DashboardVariable ...
type DashboardVariable struct {
	Server *echo.Group
}

// New ...
func (f *DashboardVariable) New() {
	f.Server.GET(dashboardVariablesPath+"/:id", getOrListServer, routers.IsServerAuth)
}
