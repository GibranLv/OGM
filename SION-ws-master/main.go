package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-ws/authentication"
	"github.com/JamsMendez/SION-ws/tcp"
	"github.com/JamsMendez/SION-ws/ws"
)

const (
	keyOrigin      = "Origin"
	nameConfigFile = "app.config"
)

// Config is configuración de la aplicación
type Config struct {
	URLWS   string `json:"URL_WS"`
	PortTCP string `json:"PORT_TCP"`

	SecretAccessTokenWS    string `json:"SECRET_ACCESS_TOKEN_WS"`
	SecretAccessTokenWSTCP string `json:"SECRET_ACCESS_TOKEN_WS_TCP"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  64,
	WriteBufferSize: 64,
	Subprotocols:    []string{constants.TTXProtocol},
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	buffer, err := ioutil.ReadFile(nameConfigFile)
	if err != nil {
		fmt.Println("app.config.ReadFile: ", err)
		return
	}

	config := Config{}
	err = json.Unmarshal(buffer, &config)
	if err != nil {
		fmt.Println("app.config.Unmarshal: ", err)
		return
	}

	hub := ws.NewHub()
	go hub.Run()

	server := echo.New()
	server.HTTPErrorHandler = errorHandler

	// Servidor Websocket
	server.GET("/ws", func(c echo.Context) error {
		wsHandler(config, hub, c.Response().Writer, c.Request())
		return nil
	})

	// Servidor TCP para los servicios (Variables, Reportes y GPS)
	serverTCP := tcp.Server{
		Port: config.PortTCP,
		Hub:  hub,

		SecretAccessToken: config.SecretAccessTokenWSTCP,
	}

	go serverTCP.Run()

	err = server.Start(config.URLWS)
	if err != nil {
		fmt.Println("Server.Start.error: ", err)
	}
}

func wsHandler(config Config, hub *ws.Hub, w http.ResponseWriter, r *http.Request) {
	session, isAuth := authentication.LogIn(r, config.SecretAccessTokenWS)
	fmt.Println(session, isAuth)
	if !isAuth {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("wsHandler.error: ", err)
		return
	}

	client := ws.Client{Hub: hub, Conn: conn, ID: session.UserID}
	hub.Register <- &client
	client.Listen()
}

func errorHandler(err error, c echo.Context) {
	code := http.StatusInternalServerError
	if he, ok := err.(*echo.HTTPError); ok {
		code = he.Code
	}

	errPage := fmt.Sprintf("./%d.html", code)
	if err := c.File(errPage); err != nil {
		c.Logger().Error(err)
	}

	c.Logger().Error(err)
}
