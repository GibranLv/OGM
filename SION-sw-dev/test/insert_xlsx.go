package main

import (
	"bufio"
	"fmt"
	"log"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
)

func generateValuesForVariables() {
	file, err := os.Open("./vars.txt")
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

	all := map[int]string{
		1: "lv",
		2: "lw",
		3: "lx",
		4: "ly",
		5: "lz",
		6: "ma",
		7: "mb",
	}

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		values := strings.Split(line, ",")
		if len(values) > 2 {
			sTimestamp := values[3]
			sAddress := values[4]
			sValue := values[5]

			address, err := strconv.Atoi(sAddress)
			if err == nil {
				alias := all[address]

				value, err := strconv.Atoi(sValue)
				if err == nil {

					tsDB, err := time.ParseInLocation(constants.DateTimeFormat, sTimestamp, location)
					if err == nil {
						vR := randomInt3(0, 15)
						secs := int32(vR)
						ts := tsDB.Add(time.Second * time.Duration(secs))
						dateString := ts.Format("2006-01-02")
						valuesD := strings.Split(dateString, "-")
						if len(valuesD) == 3 {
							table := fmt.Sprintf("%s_%s_%s", alias, valuesD[1], valuesD[0])
							f64 := float64(value) / 1000.000

							fmt.Println(table, f64, ts.UTC().Format(constants.DateTimeFormat))

							time.Sleep(time.Millisecond * 1500)

							err := record.CreateTable(table)
							if err == nil {
								o := map[string]interface{}{
									recordDB.KeyValue:     f64,
									recordDB.KeyTimestamp: ts.UTC().Format(constants.DateTimeFormat),
								}

								_, _ = record.Create(table, o)
							}
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

// Returns an int >= min, < max
func randomInt3(min, max int) int {
	r := rand.New(rand.NewSource(time.Now().UTC().UnixNano()))
	return min + r.Intn(max-min)
}
