package user

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/routers"
)

const usersPath = "/users"

const updateRelationsQuery = "update_relations"

type relationsReq struct {
	Variables       []int64 `json:"variables,omitempty"`
	CustomVariables []int64 `json:"custom_variables,omitempty"`
	Matrices        []int64 `json:"matrices,omitempty"`
	Reports         []int64 `json:"reports,omitempty"`
	Alarms          []int64 `json:"alarms,omitempty"`
	Vehicles        []int64 `json:"vehicles,omitempty"`
}

type profileReq struct {
	Email   string `json:"email,omitempty"`
	Name    string `json:"name,omitempty"`
	Company string `json:"company,omitempty"`
	Job     string `json:"job,omitempty"`
	Phone   string `json:"phone,omitempty"`
	Avatar  string `json:"avatar,omitempty"`
}

type tokenRes struct {
	AccessTokenWS  string `json:"access_token_ws,omitempty"`
	AccessTokenWSA string `json:"access_token_wsa,omitempty"`
	AccessTokenWSE string `json:"access_token_wse,omitempty"`
}

// User ...
type User struct {
	Server *echo.Group
	Config constants.ConfigServer
}

// New ...
func (u *User) New() {
	u.Server.GET(usersPath+"/tokens", func(c echo.Context) error {
		return getTokens(c, u.Config)
	}, routers.IsServerAuth)

	u.Server.GET(usersPath+"/configuration", getConfigurationServer, routers.IsServerAuth)
	u.Server.GET(usersPath+"/profile", getProfileServer, routers.IsServerAuth)
	u.Server.GET(usersPath+"/sounds/matrix", getMatrixSoundsServer, routers.IsServerAuth)
	u.Server.GET(usersPath+"/sounds/graphic", getGraphicSoundsServer, routers.IsServerAuth)
	u.Server.PUT(usersPath+"/sounds", updateSoundsServer, routers.IsServerAuth)

	u.Server.PUT(usersPath+"/configuration", updateConfigServer, routers.IsServerAuth)
	u.Server.PUT(usersPath+"/profile", updateProfileServer, routers.IsServerAuth)

	u.Server.GET(usersPath+"/:id", getOrListServer, routers.IsServerAuth)
	u.Server.POST(usersPath, createServer, routers.IsServerAuth)
	u.Server.PUT(usersPath+"/:id", updateServer, routers.IsServerAuth)
	u.Server.DELETE(usersPath+"/:id", deleteServer, routers.IsServerAuth)
}
