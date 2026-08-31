package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-vars/tcp"
	"github.com/JamsMendez/SION-vars/variable"
)

func main() {
	buffer, err := ioutil.ReadFile(constants.NameConfigFile)
	if err != nil {
		fmt.Println(err)
		return
	}

	config := constants.ConfigServer{}
	err = json.Unmarshal(buffer, &config)
	if err != nil {
		fmt.Println("ConfigServer: ", err)
		return
	}

	clientWS := tcp.ClientWS{URL: config.URLTCPWS, SecretAccessToken: config.SecretAccessTokenWSTCP}
	clientWSA := tcp.ClientWSA{URL: config.URLTCPWSA, SecretAccessToken: config.SecretAccessTokenWSATCP}

	// go clientWS.Connect()
	go clientWSA.Connect()

	server := echo.New()

	server.Server.ReadTimeout = time.Second * time.Duration(rand.Int31n(config.ReadTimeoutVars))
	server.Server.WriteTimeout = time.Second * time.Duration(rand.Int31n(config.WriteTimeoutVars))

	api := server.Group(config.PublicAPIVars)

	//rsVariable := variable.Variable{API: api, ClientWS: &clientWS, ClientWSA: &clientWSA, ConfigServer: config}
	rsVariable := variable.Variable{API: api, ClientWS: &clientWS, ClientWSA: &clientWSA, ConfigServer: config}
	rsVariable.New()

	fmt.Printf("Service SION-vars running on %s\n", config.PortVars)

	//go orbcomm.Start(&clientWS, &clientWSA, config)

	if err := server.Start(config.PortVars); err != nil {
		server.Logger.Fatal(err)
	}
}
