package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/JamsMendez/SION-orbcomm/service"
	"github.com/JamsMendez/SION-sw/constants"
)

func main() {
	buffer, err := os.ReadFile(constants.NameConfigFile)
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

	service.StartService(config)
}
