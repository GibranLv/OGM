package main

import (
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/routers/alarm"
	alarmEvent "github.com/JamsMendez/SION-sw/routers/alarm_event"
	api "github.com/JamsMendez/SION-sw/routers/api"
	auth "github.com/JamsMendez/SION-sw/routers/authentication"
	"github.com/JamsMendez/SION-sw/routers/chart"
	chartEvent "github.com/JamsMendez/SION-sw/routers/chart_event"
	customVariable "github.com/JamsMendez/SION-sw/routers/custom_variable"
	dashboardVariable "github.com/JamsMendez/SION-sw/routers/dashboard_variable"
	"github.com/JamsMendez/SION-sw/routers/event"
	"github.com/JamsMendez/SION-sw/routers/explorer"
	footerVariable "github.com/JamsMendez/SION-sw/routers/footer_variable"
	gpsDevice "github.com/JamsMendez/SION-sw/routers/gps_device"
	"github.com/JamsMendez/SION-sw/routers/graphic"
	"github.com/JamsMendez/SION-sw/routers/group"
	logAlarm "github.com/JamsMendez/SION-sw/routers/log_alarm"
	"github.com/JamsMendez/SION-sw/routers/matrix"
	"github.com/JamsMendez/SION-sw/routers/operation"
	"github.com/JamsMendez/SION-sw/routers/orbcomm"
	"github.com/JamsMendez/SION-sw/routers/report"
	"github.com/JamsMendez/SION-sw/routers/unit"
	"github.com/JamsMendez/SION-sw/routers/user"
	"github.com/JamsMendez/SION-sw/routers/variable"
	overwrite "github.com/JamsMendez/SION-sw/routers/variable_overwrite"
	"github.com/JamsMendez/SION-sw/routers/vehicle"
	"github.com/JamsMendez/SION-sw/routers/view"
)

const staticPath = "/static"
const staticSrc = "./public"

func main() {
	buffer, err := os.ReadFile(constants.NameConfigFile)
	if err != nil {
		fmt.Println(err)
		return
	}

	config := constants.ConfigServer{}
	err = json.Unmarshal(buffer, &config)
	if err != nil {
		fmt.Println(err)
		return
	}

	server := echo.New()
	// Configuration
	server.Server.ReadTimeout = time.Second * time.Duration(int32(config.ReadTimeoutSW))
	server.Server.WriteTimeout = time.Second * time.Duration(int32(config.WriteTimeoutSW))

	// Static
	server.Static(staticPath, staticSrc)

	// Session
	store := sessions.NewCookieStore([]byte(config.SecretSessionSW))
	sessionConfig := session.Config{Store: store}
	server.Use(session.MiddlewareWithConfig(sessionConfig))

	rsView := view.View{Server: server, ConfigServer: config}
	rsView.New()

	publicAPI := server.Group(config.PublicAPISW)
	privateAPI := server.Group(config.PrivateAPISW)

	rsAlarmEvent := alarmEvent.Event{Server: privateAPI}
	rsAlarm := alarm.Alarm{Server: privateAPI}
	rsAuth := auth.Auth{Server: privateAPI}
	rsEvent := event.Event{Server: privateAPI}
	rsExplorer := explorer.Explorer{Server: privateAPI, PathWSE: config.PathWSE}
	rsFooterVariable := footerVariable.FooterVariable{Server: privateAPI}
	rsDashboardVariable := dashboardVariable.DashboardVariable{Server: privateAPI}
	rsGraphic := graphic.Graphic{Server: privateAPI}
	rsGPSDevice := gpsDevice.GPSDevice{Server: privateAPI}
	rsGroup := group.Group{Server: privateAPI}
	rsLogAlarm := logAlarm.LogAlarm{Server: privateAPI}
	rsMatrix := matrix.Matrix{Server: privateAPI}
	rsChart := chart.Chart{Server: privateAPI}
	rsChartEvent := chartEvent.ChartEvent{Server: privateAPI}
	rsOperation := operation.Operation{Server: privateAPI}
	rsReport := report.Report{Server: privateAPI, Config: config}
	rsVariable := variable.Variable{Server: privateAPI, Config: config}
	rsVehicle := vehicle.Vehicle{Server: privateAPI}
	rsCustomVariable := customVariable.CustomVariable{Server: privateAPI, Config: config}
	rsUnit := unit.Unit{Server: privateAPI}
	rsOrbcomm := orbcomm.Orbcomm{Server: privateAPI}
	rsOverwrite := overwrite.VariableOverwrite{Server: privateAPI}
	rsUser := user.User{Server: privateAPI, Config: config}

	rsAPI := api.API{API: publicAPI}
	rsAPI.New()

	rsAlarmEvent.New()
	rsAlarm.New()
	rsAuth.New()
	rsEvent.New()
	rsExplorer.New()
	rsFooterVariable.New()
	rsDashboardVariable.New()
	rsGraphic.New()
	rsGPSDevice.New()
	rsGroup.New()
	rsMatrix.New()
	rsLogAlarm.New()
	rsChart.New()
	rsChartEvent.New()
	rsOperation.New()
	rsReport.New()
	rsVariable.New()
	rsVehicle.New()
	rsCustomVariable.New()
	rsUnit.New()
	rsOrbcomm.New()
	rsOverwrite.New()
	rsUser.New()

	address := fmt.Sprintf(":%s", config.PortSW)
	if err := server.Start(address); err != nil {
		server.Logger.Fatal(err)
	}
}
