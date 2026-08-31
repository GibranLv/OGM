package main

import (
	"fmt"
	"log"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

func getDateTime() {
	// sFinishDate := "2023-01-01 06:00:00"
	sFinishDate := "2023-01-02 06:00:00"
	sStartDate := "2023-01-09 06:00:00"

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		log.Println(err)

		location = time.Local
	}

	finishDate, err := time.ParseInLocation(constants.DateTimeFormat, sFinishDate, location)
	if err != nil {
		log.Println(err)

		return
	}

	startDate, err := time.ParseInLocation(constants.DateTimeFormat, sStartDate, location)
	if err != nil {
		log.Println(err)

		return
	}

	minutes := finishDate.Sub(startDate).Minutes()

	fmt.Println("Duration: ", minutes)
}
