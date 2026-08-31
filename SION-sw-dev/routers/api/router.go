package api

import (
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/routers/api/auth"
	customVariable "github.com/JamsMendez/SION-sw/routers/api/custom_variable"
	"github.com/JamsMendez/SION-sw/routers/api/matrix"
	"github.com/JamsMendez/SION-sw/routers/api/middlewares"
	"github.com/JamsMendez/SION-sw/routers/api/user"
	"github.com/JamsMendez/SION-sw/routers/api/variable"
)

// API ...
type API struct {
	API *echo.Group
}

const authPath = "/auth"
const matricesPath = "/matrices"
const variablesPath = "/variables"
const customVariablesPath = "/custom_variables"
const usersPath = "/users"
const logAlarmsPath = "/log/alarms"

// New ...
func (a API) New() {
	a.API.GET(usersPath+"/profile", user.GetProfileServer, middlewares.IsEncrypt, middlewares.IsAPIAuth)
	a.API.GET(usersPath+"/configuration", user.GetConfigurationServer, middlewares.IsEncrypt, middlewares.IsAPIAuth)
	a.API.GET(usersPath+"/sounds/matrix", user.GetMatrixSoundsServer, middlewares.IsEncrypt, middlewares.IsAPIAuth)

	a.API.GET(matricesPath+"/:id", matrix.GetOrListServer, middlewares.IsEncrypt, middlewares.IsAPIAuth)

	a.API.GET(variablesPath+"/all/last_record", variable.GetAllLastRecords, middlewares.IsAPIAuthv2)
	a.API.GET(variablesPath+"/all/update", variable.GetUpdateVariables, middlewares.IsEncrypt, middlewares.IsAPIAuth)
	a.API.GET(variablesPath+"/na", variable.GetListNAs, middlewares.IsEncrypt, middlewares.IsAPIAuth)
	a.API.GET(variablesPath+"/:id/alarms", variable.GetAlarms, middlewares.IsEncrypt, middlewares.IsAPIAuth)
	a.API.GET(variablesPath+"/:id/last_record", variable.GetLastRecords, middlewares.IsEncrypt, middlewares.IsAPIAuth)

	a.API.GET(logAlarmsPath+"/:id", variable.GetLogAlarms, middlewares.IsEncrypt, middlewares.IsAPIAuth)

	a.API.GET(customVariablesPath+"/:id/alarms", customVariable.GetAlarms, middlewares.IsEncrypt, middlewares.IsAPIAuth)
	a.API.GET(customVariablesPath+"/:id/last_record", customVariable.GetLastRecords, middlewares.IsEncrypt, middlewares.IsAPIAuth)

	a.API.POST(authPath+"/login", auth.LogInAPI, middlewares.IsEncrypt)
	a.API.POST(authPath+"/logout", auth.LogOutAPI, middlewares.IsEncrypt)
	a.API.POST(authPath+"/refresh", auth.RefreshAPI, middlewares.IsEncrypt)

	a.API.PUT(usersPath+"/sounds", user.UpdateSoundsServer, middlewares.IsEncrypt, middlewares.IsAPIAuth)
}
