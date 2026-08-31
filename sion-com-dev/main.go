package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	"github.com/JamsMendez/SION-com/service"
	"github.com/JamsMendez/SION-sw/constants"
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

	service.Start(config)
}
