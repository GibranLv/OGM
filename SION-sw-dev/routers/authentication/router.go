package authentication

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers"
)

// Auth ...
type Auth struct {
	Server *echo.Group
}

type logInReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// New ...
func (a Auth) New() {
	a.Server.GET("/auth/logout", logOut, routers.IsServerAuth)
	a.Server.POST("/auth/login", logIn, routers.IsntServerAuth)
}
