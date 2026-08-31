package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"

	recordDB "github.com/JamsMendez/SION-sw/models/record"
)

func insertValuesInDB() {
	file, err := os.Open("./update_vars_2")
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		return
	}

	record := recordDB.Model{
		UserDB: constants.DB.UserRecords,
		PwdDB:  constants.DB.PwdRecords,
		NameDB: constants.DB.NameRecords,
		Host:   constants.DB.HostRecords,
		Port:   constants.DB.PortRecords,
		Debug:  true,
	}

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		values := strings.Split(line, ",")
		if len(values) == 2 {
			timestamp := values[0]
			value := values[1]

			ts, err := time.ParseInLocation(constants.DateTimeFormat, timestamp, location)
			if err == nil {
				f64, err := strconv.ParseFloat(value, 64)
				if err == nil {
					dateString := ts.Format("2006-01-02")
					values := strings.Split(dateString, "-")
					if len(values) == 3 {
						table := fmt.Sprintf("b_%s_%s", values[1], values[0])
						err := record.CreateTable(table)
						if err == nil {
							o := map[string]interface{}{
								recordDB.KeyValue:     f64,
								recordDB.KeyTimestamp: ts,
							}

							_, _ = record.Create(table, o)
						}
					}
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	fmt.Println("Finish")
}
