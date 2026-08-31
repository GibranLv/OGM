package footervariable

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

const footerVariablesPath = "/footer_variables"

// FooterVariable ...
type FooterVariable struct {
	Server *echo.Group
}

// New ...
func (f *FooterVariable) New() {
	f.Server.GET(footerVariablesPath+"/:id", getOrListServer, routers.IsServerAuth)
}
