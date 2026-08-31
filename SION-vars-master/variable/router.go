package variable

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-vars/tcp"
)

// Variable ...
type Variable struct {
	API       *echo.Group
	ClientWS  *tcp.ClientWS
	ClientWSA *tcp.ClientWSA

	ConfigServer constants.ConfigServer
}

// New ...
func (v Variable) New() {
	v.API.POST("/insert", func(c echo.Context) error {
		return createVariables(c, v.ConfigServer)
	})

	v.API.POST("/update", func(c echo.Context) error {
		return updateVariables(c, v.ClientWS, v.ClientWSA, v.ConfigServer)
	})
}
