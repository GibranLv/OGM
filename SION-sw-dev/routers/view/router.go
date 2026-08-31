package view

import (
	"fmt"
	"html/template"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	configurationDB "github.com/JamsMendez/SION-sw/models/configuration"
	dashboardDB "github.com/JamsMendez/SION-sw/models/user/dashboard"
	"github.com/JamsMendez/SION-sw/routers"
)

// View ... Rutas de las vistas
type View struct {
	Server       *echo.Echo
	ConfigServer constants.ConfigServer
}

// New ...
func (v View) New() {

	t := &Template{
		templates: map[string]*template.Template{
			"dashboard_module":  template.Must(template.ParseFiles("views/dashboard_module.html", "views/base.html")),
			"matrices_module_m": template.Must(template.ParseFiles("views/matrices_module_m.html", "views/base.html")),
			"coriolis_module":   template.Must(template.ParseFiles("views/coriolis_module.html", "views/base.html")),

			"matrices_module":           template.Must(template.ParseFiles("views/matrices_module.html", "views/base.html")),
			"reports_module":            template.Must(template.ParseFiles("views/reports_module.html", "views/base.html")),
			"locator_module":            template.Must(template.ParseFiles("views/locator_module.html", "views/base.html")),
			"location_module":           template.Must(template.ParseFiles("views/location_module.html", "views/base.html")),
			"explorer_module":           template.Must(template.ParseFiles("views/explorer_module.html", "views/base.html")),
			"charts_module":             template.Must(template.ParseFiles("views/charts_module.html", "views/base.html")),
			"dynamometer_charts_module": template.Must(template.ParseFiles("views/dynamometer_charts_module.html", "views/base.html")),
			"dynamic_graphics_module":   template.Must(template.ParseFiles("views/dynamic_graphics_module.html", "views/base.html")),
			"operations_module":         template.Must(template.ParseFiles("views/operations_module.html", "views/base.html")),
			"events_module":             template.Must(template.ParseFiles("views/events_module.html", "views/base.html")),
			"remote_shutdown_module":    template.Must(template.ParseFiles("views/remote_shutdown_module.html", "views/base.html")),
			"configuration":             template.Must(template.ParseFiles("views/configuration.html", "views/base.html")),
			"configuration-min":         template.Must(template.ParseFiles("views/configuration-min.html", "views/base-min.html")),
			"profile":                   template.Must(template.ParseFiles("views/profile.html", "views/base.html")),
			"users":                     template.Must(template.ParseFiles("views/users.html", "views/base.html")),
			"login":                     template.Must(template.ParseFiles("views/login.html")),

			"orbcomms_module":   template.Must(template.ParseFiles("views/orbcomms_module.html", "views/base.html")),
			"overwrites_module": template.Must(template.ParseFiles("views/overwrites_module.html", "views/base.html")),
		},
	}

	v.Server.Renderer = t

	v.Server.GET("/", redirectDefault, routers.IsServerAuth)
	v.Server.GET("/login", login, routers.IsntServerAuth)

	v.Server.GET("/dashboard", func(c echo.Context) error {
		return dashboardModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/matrices_m", func(c echo.Context) error {
		return matricesModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/matrices", func(c echo.Context) error {
		return matricesModuleM(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/charts", func(c echo.Context) error {
		return chartsModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/charts/:id", func(c echo.Context) error {
		return quickChartModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/charts/:id/:is_custom", func(c echo.Context) error {
		return quickChartModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/dynamometer_charts", func(c echo.Context) error {
		return dynamometerChartsModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/reports", func(c echo.Context) error {
		return reportsModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/dynamic_graphics", func(c echo.Context) error {
		return dynamicGraphicsModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/dynamic_graphics/:matrix_id/:group_id", func(c echo.Context) error {
		return dynamicGraphicsModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/operations", func(c echo.Context) error {
		return operationsModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/events", func(c echo.Context) error {
		return eventsModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/locator", func(c echo.Context) error {
		return locatorModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/location", func(c echo.Context) error {
		return locationModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/explorer", func(c echo.Context) error {
		return explorerModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/s-orbcomms", func(c echo.Context) error {
		return orbcommsModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/s-overwrites", func(c echo.Context) error {
		return overwritesModule(c, v.ConfigServer)
	}, routers.IsServerAuth)

	v.Server.GET("/users", users, routers.IsServerAuth)

	v.Server.GET("/configuration", configuration, routers.IsServerAuth)
	v.Server.GET("/profile", profile, routers.IsServerAuth)
	v.Server.GET("/remote_shutdown", remoteShutdownModule, routers.IsServerAuth)

	v.Server.GET("/configuration-min", configurationMin, routers.IsServerAuth)
	v.Server.GET("/coriolis", coriolisModule, routers.IsServerAuth)
}

func redirectDefault(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.Redirect(http.StatusFound, "/login")
	}

	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	path := "/matrices"

	if configOne.ID == 0 {
		return c.Redirect(http.StatusFound, path)
	}

	if configOne.MainModule == constants.MatricesModule {
		path = "/matrices"

	} else if configOne.MainModule == constants.ChartsModule {
		path = "/charts"

	} else if configOne.MainModule == constants.ReportsModule {
		path = "/reports"

	} else if configOne.MainModule == constants.EventsModule {
		path = "/events"

	} else if configOne.MainModule == constants.LocationModule {
		path = "/location"

	} else if configOne.MainModule == constants.LocatorModule {
		path = "/locator"

	} else if configOne.MainModule == constants.ExplorerModule {
		path = "/explorer"

	} else if configOne.MainModule == constants.ConfigurationModule {
		path = "/configuration"

	} else if configOne.MainModule == constants.OperationsModule {
		path = "/operations"

	} else if configOne.MainModule == constants.ProfileModule {
		path = "/profile"

	} else if configOne.MainModule == constants.ShutdownRemoteModule {
		path = "/remote_shutdown"
	}

	return c.Redirect(http.StatusFound, path)
}

func dashboardModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	if config.System == "SEPEC" || config.System == "SCADA" {
		fmt.Println("El sistema no soporta el Dashboard")

		return c.Redirect(http.StatusFound, "/")
	}

	dashboard := dashboardDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{dashboardDB.KeyUserID: userSession.ID}
	dashboardOne, err := dashboard.FindOne(where)
	if err != nil || dashboardOne.ID == 0 {
		fmt.Println("El usuario no soporta el Dashboard")

		return c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		URLWS:  config.URLWS,
		URLWSA: config.URLWSA,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var isDashboardMin bool
	if userSession.Username == "Pemex" {
		isDashboardMin = true
	}

	where = map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err == nil {
		extra.MatrixID = int(configOne.MainMatrix)
		extra.ChartTheme = int(configOne.ChartTheme)
		extra.RT = int(configOne.RT)
		extra.IsDashboardMin = isDashboardMin
	}

	return c.Render(http.StatusOK, "dashboard_module", extra)
}

func matricesModuleM(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	extra := Extra{
		URLWS:  config.URLWS,
		URLWSA: config.URLWSA,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err == nil {
		extra.MatrixID = int(configOne.MainMatrix)
		extra.RT = int(configOne.RT)
		extra.ChartTheme = int(configOne.ChartTheme)
		extra.CommentColumn = configOne.CommentColumn
	}

	return c.Render(http.StatusOK, "matrices_module_m", extra)
}

func matricesModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	extra := Extra{
		URLWS:  config.URLWS,
		URLWSA: config.URLWSA,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err == nil {
		extra.MatrixID = int(configOne.MainMatrix)
		extra.RT = int(configOne.RT)
		extra.ChartTheme = int(configOne.ChartTheme)
		extra.CommentColumn = configOne.CommentColumn
	}

	return c.Render(http.StatusOK, "matrices_module", extra)
}

func chartsModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	extra := Extra{
		URLWS:  config.URLWS,
		URLWSA: config.URLWSA,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err == nil {
		extra.RT = int(configOne.RT)
		extra.ChartTheme = int(configOne.ChartTheme)
	}

	return c.Render(http.StatusOK, "charts_module", extra)
}

func quickChartModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	extra := Extra{
		URLWS:  config.URLWS,
		URLWSA: config.URLWSA,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	ID := c.Param(constants.IDParam)
	if ID != "" {
		variableID, err := routers.ParseInt(ID)
		if err == nil {
			extra.VariableID = variableID
		}
	}

	isCustomValue := c.Param(constants.IsCustomParam)
	if isCustomValue != "" {
		isCustom, err := strconv.ParseBool(isCustomValue)
		if err == nil {
			extra.IsCustom = isCustom
		}
	}

	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err == nil {
		extra.RT = int(configOne.RT)
		extra.ChartTheme = int(configOne.ChartTheme)
	}

	return c.Render(http.StatusOK, "charts_module", extra)
}

func dynamometerChartsModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		URLWS:  config.URLWS,
		URLWSA: config.URLWSA,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "dynamometer_charts_module", extra)
}

func reportsModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	extra := Extra{
		URLWSR: config.URLWSR,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "reports_module", extra)
}

func dynamicGraphicsModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		URLWS:  config.URLWS,
		URLWSA: config.URLWSA,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	matrixIDValue := c.Param(constants.MatrixIDParam)
	groupIDValue := c.Param(constants.GroupIDParam)

	if matrixIDValue != "" && groupIDValue != "" {
		matrixID, err := routers.ParseInt(matrixIDValue)
		if err == nil {
			extra.MatrixID = matrixID
		}

		groupID, err := routers.ParseInt(groupIDValue)
		if err == nil {
			extra.GroupID = groupID
		}

		if groupID == 0 || matrixID == 0 {
			return c.Redirect(http.StatusFound, "/dynamic_graphics")
		}
	}

	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err == nil {
		extra.RT = int(configOne.RT)
	}

	return c.Render(http.StatusOK, "dynamic_graphics_module", extra)
}

func operationsModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "operations_module", extra)
}

func eventsModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "events_module", extra)
}

func locatorModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	accessTokenWS := routers.GetAccessToken(userSession.ID, config.SecretAccessTokenWS)

	expiration := time.Now().Add(time.Second * 60)
	cookieWS := http.Cookie{Name: constants.KeyAccessTokenWS, Value: accessTokenWS, Expires: expiration}
	c.SetCookie(&cookieWS)

	extra := Extra{
		URLWS: config.URLWS,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "locator_module", extra)
}

func locationModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		URLWS:  config.URLWS,
		URLWSA: config.URLWSA,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err == nil {
		extra.MatrixID = int(configOne.MainMatrix)
	}

	return c.Render(http.StatusOK, "location_module", extra)
}

func orbcommsModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		URLWSR: config.URLWSR,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "orbcomms_module", extra)
}

func overwritesModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		URLWSR: config.URLWSR,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "overwrites_module", extra)
}

func explorerModule(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		URLWSE: config.URLWSE,

		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "explorer_module", extra)
}

func users(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.Redirect(http.StatusFound, "/login")
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	isRoot := userSession.Role == constants.RootUser
	isAdmin := userSession.Role == constants.AdminUser
	if !isRoot && !isAdmin {
		c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "users", extra)
}

func login(c echo.Context) error {
	return c.Render(http.StatusOK, "login", nil)
}

func configuration(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	var role string
	if userSession.Role == constants.RootUser {
		role = constants.RootUserLabel
	} else if userSession.Role == constants.SystemAdminUser {
		role = constants.SystemAdminUserLabel
	} else if userSession.Role == constants.AdminUser {
		role = constants.AdminUserLabel
	} else if userSession.Role == constants.OperatorUser {
		role = constants.OperatorUserLabel
	} else if userSession.Role == constants.GuestUser {
		role = constants.GuestUserLabel
	}

	extra := Extra{
		UserName:   userSession.Name,
		UserRole:   role,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "configuration", extra)
}

func profile(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	extra := Extra{
		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "profile", extra)
}

func remoteShutdownModule(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "remote_shutdown_module", extra)
}

func configurationMin(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	var role string
	if userSession.Role == constants.RootUser {
		role = constants.RootUserLabel
	} else if userSession.Role == constants.SystemAdminUser {
		role = constants.SystemAdminUserLabel
	} else if userSession.Role == constants.AdminUser {
		role = constants.AdminUserLabel
	} else if userSession.Role == constants.OperatorUser {
		role = constants.OperatorUserLabel
	} else if userSession.Role == constants.GuestUser {
		role = constants.GuestUserLabel
	}

	extra := Extra{
		UserName:   userSession.Name,
		UserRole:   role,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "configuration-min", extra)
}

func coriolisModule(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	// Usuario sin permisos
	if userSession.Username == "LitoralCostero" || userSession.Username == "MedicionCostero" {
		return c.Redirect(http.StatusFound, "/")
	}

	if userSession.Username != "ISIPP_SUNUAPA" && userSession.Username != "ROOT" {
		return c.Redirect(http.StatusFound, "/")
	}

	extra := Extra{
		UserName:   userSession.Name,
		UserJob:    userSession.Job,
		UserAvatar: userSession.Avatar,
	}

	headerOne := getHeaderUser(userSession.ID)

	extra.TitleOne = headerOne.TitleOne
	extra.TitleTwo = headerOne.TitleTwo
	extra.TitleOneLeft = headerOne.TitleOneLeft
	extra.TitleTwoLeft = headerOne.TitleTwoLeft
	extra.LogoLeft = headerOne.LogoLeft

	return c.Render(http.StatusOK, "coriolis_module", extra)
}
