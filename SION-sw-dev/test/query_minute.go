package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
)

type settingQuery struct {
	Variables []string `json:"variables"`
	DateOf    string   `json:"date_of"`
	DateTo    string   `json:"date_to"`
}

type intervalDay struct {
	Gte time.Time
	Lt  time.Time
}

type variableDetail struct {
	Name   string
	Device string
	Alias  string
}

func getSettingFile() (*settingQuery, error) {
	var s settingQuery

	buffer, err := os.ReadFile("settings-query.json")
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(buffer, &s)
	if err != nil {
		return nil, err
	}

	return &s, nil
}

func queryByMinute() {
	sQ, err := getSettingFile()
	if err != nil {
		fmt.Println(err)
		return
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		fmt.Println("Load Timezone ERROR: ", err)
		return
	}

	dateOf, err := time.ParseInLocation(constants.DateTimeFormat, sQ.DateOf, location)
	if err != nil {
		fmt.Println("Parse DateOf Settings: ", err)
		return
	}

	dateTo, err := time.ParseInLocation(constants.DateTimeFormat, sQ.DateTo, location)
	if err != nil {
		fmt.Println("Parse DateTo Settings ERROR: ", err)
		return
	}

	intervals := getIntervalByDays(dateOf, dateTo, constants.Day)
	variables := getVariables(sQ.Variables)

	record := recordDB.Model{
		UserDB: constants.DB.UserRecords,
		PwdDB:  constants.DB.PwdRecords,
		NameDB: constants.DB.NameRecords,
		Host:   constants.DB.HostRecords,
		Port:   constants.DB.PortRecords,
		Debug:  true,
	}

	for index := range intervals {
		interval := intervals[index]
		start := interval.Gte.UTC().Format(constants.DateTimeFormat)
		final := interval.Lt.UTC().Format(constants.DateTimeFormat)

		startTz := interval.Gte.Format(constants.DateTimeFormat)
		finalTz := interval.Lt.Format(constants.DateTimeFormat)

		fmt.Println("===")
		fmt.Printf("Dia %s\n(%s al %s)\n", startTz, startTz, finalTz)
		fmt.Println("===")

		for _, variable := range variables {
			tables := getTablesForDates(variable.Alias, interval.Gte.UTC(), interval.Lt.UTC())

			var rows []recordDB.Record
			for _, table := range tables {
				fmt.Println("Create Table: ", table)
				err := record.CreateTable(table)
				if err != nil {
					fmt.Printf("Record.CreateTable.%s.ERROR: %v\n", table, err)
				}

				recordRows, err := record.FindByMinute(table, start, final)
				if err != nil {
					fmt.Println("Record.FindByMinute.ERROR: ", table, err)

					return
				}

				rows = append(rows, recordRows...)
			}

			timeStart := interval.Gte
			timeFinal := interval.Lt

			var countSuccess int
			var invalids []string
			var nonExistents []string

			for timeStart.Before(timeFinal) {
				mTimestamp := timeStart.Format(constants.DateTimeFormat)

				var exists, isValid bool
				for index := range rows {
					row := rows[index]
					if row.TimestampString == mTimestamp {
						exists = true

						if row.Value == 0 || row.Value >= 999999 {
							invalids = append(invalids, row.TimestampString)

							break
						}

						isValid = true

						break
					}
				}

				if exists && isValid {
					countSuccess++
				} else {
					nonExistents = append(nonExistents, mTimestamp)
				}

				timeStart = timeStart.Add(time.Minute)
			}

			variableName := fmt.Sprintf("%s.%s", variable.Name, variable.Device)

			fmt.Printf(
				"%s\t%d\n",
				variableName,
				countSuccess,
			)

			/*
			   fmt.Println(
			   				"Registros invalidos: ",
			   				len(invalids),
			   				// strings.Join(invalids, ", "),
			   			)

			   			fmt.Println(
			   				"Registro faltantes: ",
			   				len(nonExistents),
			   				// strings.Join(nonExistents, ", "),
			   			)
			*/

			fmt.Println()
		}
	}
}

func getVariables(input []string) []variableDetail {
	variables := []variableDetail{}

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	for index := range input {
		s := input[index]

		elements := strings.Split(s, ".")
		if len(elements) != 2 {
			continue
		}

		where := map[string]interface{}{
			variableDB.KeyName:   elements[1],
			variableDB.KeyDevice: elements[0],
		}

		variableRow, err := variable.FindOne(where)
		if err != nil {
			fmt.Println("Variable.FindOne.ERROR: ", err)

			continue
		}

		if variableRow.ID == 0 {
			fmt.Println("Variable.FindOne: ", where, " NOT FOUND")

			continue
		}

		variable := variableDetail{
			Name:   variableRow.Name,
			Device: variableRow.Device,
			Alias:  variableRow.Alias,
		}

		variables = append(variables, variable)
	}

	return variables
}

func getIntervalByDays(first, last time.Time, segment string) []intervalDay {
	intervals := []intervalDay{}

	var addedTime time.Duration
	var isDay bool

	if segment == constants.Day {
		isDay = true

	} else if segment == constants.Hour {
		addedTime = time.Hour

	} else if segment == constants.Minute {
		addedTime = time.Minute

	} else if segment == constants.NA {
		interval := intervalDay{Gte: first, Lt: last}
		intervals = append(intervals, interval)
		return intervals

	} else {
		return intervals
	}

	for first.Before(last) {
		var next time.Time

		if isDay {
			next = first.AddDate(0, 0, 1)
		} else {
			next = first.Add(addedTime)
		}

		interval := intervalDay{Gte: first, Lt: next}
		intervals = append(intervals, interval)

		first = next
	}

	return intervals
}

func getTablesForDates(alias string, start, final time.Time) []string {
	tables := []string{}

	year := start.Year()
	month := start.Month()
	var m string
	if month < 10 {
		m = fmt.Sprintf("0%d", month)
	} else {
		m = fmt.Sprintf("%d", month)
	}

	s := fmt.Sprintf("%s_%s_%d", alias, m, year)
	tables = append(tables, s)

	for start.Before(final) || start.Equal(final) {
		start = start.Add(time.Hour * 24)
		year := start.Year()
		month := start.Month()
		var m string
		if month < 10 {
			m = fmt.Sprintf("0%d", month)
		} else {
			m = fmt.Sprintf("%d", month)
		}

		s := fmt.Sprintf("%s_%s_%d", alias, m, year)
		tables = append(tables, s)
	}

	tables = unique(tables)

	return tables
}

func unique(intSlice []string) []string {
	keys := make(map[string]bool)
	list := []string{}
	for _, entry := range intSlice {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}
