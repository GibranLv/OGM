package report

import (
	"net/http"
	"path"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

const reportsPath = "/reports"

const withStructureQuery = "with_structure"
const withStructureJSONQuery = "with_structure_json"

// Report ...
type Report struct {
	Server *echo.Group
	Config constants.ConfigServer
}

// New ...
func (r *Report) New() {
	r.Server.GET(reportsPath+"/:id", getOrListServer, routers.IsServerAuth)
	r.Server.POST(reportsPath, createServer, routers.IsServerAuth)
	r.Server.PUT(reportsPath+"/:id", updateServer, routers.IsServerAuth)
	r.Server.DELETE(reportsPath+"/:id", deleteServer, routers.IsServerAuth)

	r.Server.GET(reportsPath+"/generate/:id", func(c echo.Context) error {
		fileName := c.Param(constants.IDParam)
		if fileName == "" {
			return c.NoContent(http.StatusNotFound)
		}

		src := path.Join("./files/report", fileName)
		return c.Attachment(src, fileName)

	}, routers.IsServerAuth)

	r.Server.POST(reportsPath+"/generate", func(c echo.Context) error {
		return generateServer(c, r.Config)
	}, routers.IsServerAuth)
}
