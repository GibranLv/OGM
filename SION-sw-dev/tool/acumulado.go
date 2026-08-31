package main

import (
	"fmt"
	"time"

	"github.com/JamsMendez/SION-sw/constants"

	recordDB "github.com/JamsMendez/SION-sw/models/record"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
)

type whereDate struct {
	Gte time.Time
	Lt  time.Time
}

type whereJSON struct {
	Gte    string   `json:"gte"`
	Lt     string   `json:"lt"`
	Tables []string `json:"tables"`
}

func main() {
	var first, last string
	var variables, variablesInsert []int64

	first = "2020-01-11"
	last = "2020-01-16"

	variables = []int64{30, 86, 111, 136, 165, 207, 232, 257}
	variablesInsert = []int64{28, 85, 110, 135, 164, 206, 231, 256}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	firstDate, err := time.ParseInLocation(constants.DateFormat, first, location)
	if err != nil {
		fmt.Println(err)
		return
	}

	lastDate, err := time.ParseInLocation(constants.DateFormat, last, location)
	if err != nil {
		fmt.Println(err)
		return
	}

	firstDate = firstDate.UTC().Add(time.Hour * 5).Add(time.Hour * -24)
	lastDate = lastDate.Add(time.Hour * 5)

	wheres := getWheresForDay(firstDate, lastDate)
	sizeWheres := len(wheres)

	fmt.Println(sizeWheres)

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	record := recordDB.Model{
		UserDB: constants.DB.UserRecords,
		PwdDB:  constants.DB.PwdRecords,
		NameDB: constants.DB.NameRecords,
		Host:   constants.DB.HostRecords,
		Port:   constants.DB.PortRecords,
		Debug:  true,
	}

	for index, variableID := range variables {
		where := map[string]interface{}{}

		where[variableDB.KeyID] = variableID
		variableOne, err := variable.FindOne(where)
		if err == nil {
			alias := variableOne.Alias

			for i := 0; i < sizeWheres; i++ {
				w := wheres[i]

				tables := getTablesForDates(alias, w.Gte.UTC(), w.Lt.UTC())

				start := w.Gte.UTC().Add(time.Hour * 2)
				final := w.Lt.UTC().Add(time.Hour * -2)

				if len(tables) > 0 {
					table := tables[0]
					avgOne, err := record.AvgForRange(table, start, final)
					if err == nil {
						//fmt.Println(variableOne.Device, variableOne.Name, alias, avgOne.Value, w.Gte.UTC().In(location).Format(constants.DateTimeFormat))

						variableIDIn := variablesInsert[index]
						where[variableDB.KeyID] = variableIDIn
						variableOne, err := variable.FindOne(where)
						if err == nil {
							alias := variableOne.Alias

							tables := getTablesForDates(alias, w.Gte.UTC(), w.Lt.UTC())

							start := w.Lt.UTC().Add(time.Hour * -24).Add(time.Hour * -2)
							final := w.Lt.UTC().Add(time.Hour * -24).Add(time.Hour * 2)

							s := start.Format(constants.DateTimeFormat)
							f := final.Format(constants.DateTimeFormat)

							if len(tables) > 0 {
								table := tables[0]
								recordRows, err := record.Find(table, s, f)
								if err == nil {
									var value float64
									var ID int64
									for _, recordRow := range recordRows {
										if recordRow.Value >= value {
											value = recordRow.Value
											ID = recordRow.ID
										}
									}

									if ID > 0 {
										//fmt.Println(variableOne.Device, variableOne.Name, alias, ID, value, start.In(location).Format(constants.DateTimeFormat))
										queryS := "SELECT * FROM %s WHERE id = %d;\n"
										queryU := "UPDATE %s SET value = %f WHERE id = %d;\n"

										fmt.Printf(queryS, table, ID)
										fmt.Printf(queryU, table, avgOne.Value, ID)
										fmt.Println()
									}
								}
							}

						}

					}
				}
			}

		} else {
			fmt.Println("Variable.FindOne: ", err)
		}
	}

}

// Obtener las consultas de los reportes por mes
func getWheresForDay(first, last time.Time) []whereDate {
	wheres := []whereDate{}

	for first.Before(last) {
		next := first.AddDate(0, 0, 1)

		where := whereDate{Gte: first, Lt: next}
		wheres = append(wheres, where)

		first = next
	}

	return wheres
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
		//nextMonth := start.Month()
		//if nextMonth != month {
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
		//}
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
