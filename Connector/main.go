package main

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	"math"
	"math/big"
	"time"

	grdDB "github.com/JamsMendez/Connector/models/GRD"
	historicalDB "github.com/JamsMendez/Connector/models/historical"
	recordDB "github.com/JamsMendez/Connector/models/record"
	variableDB "github.com/JamsMendez/Connector/models/variable"
	"github.com/JamsMendez/Connector/request"
	"github.com/JamsMendez/SION-sw/constants"
)

// const nameConfigFile = "app.config"

// GRD SEPEC
// Config ... Configuración del puerto y IP
/* type Config struct {
	HTTPPort string `json:"HTTP_PORT"`
	IP       string `json:"IP"`
	Delay    int32  `json:"DELAY"`
	DEBUG    bool   `json:"DEBUG"`
}

var config = func() Config {
	var values Config
	buffer, err := ioutil.ReadFile(nameConfigFile)
	if err != nil {
		fmt.Println("configuration: ", err)
		return values
	}

	err = json.Unmarshal(buffer, &values)
	if err != nil {
		fmt.Println("configuration", err)
		return values
	}

	return values
}() */

const (
	baseRound            = 1000
	delaySeconds         = 20
	maxSecondsRandom     = 10
	maxThousandthsRandom = 9
)

// variableID: historicalID
var historicalInMemory = map[int64]int64{}

var mapGRDOne = map[int16]int16{
	// 15: 1,
	// 35: 2,
	// 55: 4,
	//
	// 65: 5,
	// 75: 6,
	// 95: 8,
	//
	// 105: 9,
	// 115: 10,
	// 125: 11,
	65: 6,
	75: 7,
	95: 9,

	105: 10,
	115: 11,
	125: 12,
}

var mapGRDTwo = map[int16]int16{
	// 15: 1,
	// 25: 2,
	// 35: 3,
	//
	// 45: 4,
	// 55: 5,
	// 65: 6,
	//
	// 95:  9,
	// 105: 10,
	// 115: 11,
	95:  1,
	105: 2,
	115: 3,
}

var mapGRDFive = map[int16]int16{
	15: 1,
	25: 2,
	35: 3,
	45: 4,
	55: 5,
	65: 6,
	75: 7,
	85: 8,
}

var mapGRDEight = map[int16]int16{
	15: 1,
	25: 2,
}

var mapGRDNine = map[int16]int16{
	15: 1,
	25: 2,
	35: 3,
	45: 4,
}

var mapGRDTeen = map[int16]int16{
	15: 1,
	25: 2,
	35: 3,
	45: 4,
	55: 5,
	65: 6,
	75: 7,
	85: 8,
}

var mapGRDEleven = map[int16]int16{
	15: 1,
	25: 2,
	35: 3,
	45: 4,
	55: 5,
	65: 6,
}

var mapGRDTwelve = map[int16]int16{
	15:  1,
	25:  2,
	75:  7,
	85:  8,
	95:  9,
	105: 10,
	115: 11,
	125: 12,
}

var mapGRDThirteen = map[int16]int16{
	15:  1,
	25:  2,
	35:  3,
	45:  4,
	55:  5,
	65:  6,
	75:  7,
	85:  8,
	95:  9,
	105: 10,
	115: 11,
	125: 12,
	135: 13,
	145: 14,
	155: 15,
	165: 16,
	175: 17,
	185: 18,
	195: 19,
	205: 20,
}

var mapAll = map[int64]map[int16]int16{
	// Connector
	1:  mapGRDOne,
	2:  mapGRDTwo,
	5:  mapGRDFive,
	8:  mapGRDEight,
	9:  mapGRDNine,
	10: mapGRDTeen,
	11: mapGRDEleven,
	12: mapGRDTwelve,
	13: mapGRDThirteen,
}

var mapURLS = map[int64]string{
	1:  "http://137.184.184.187:3003",
	2:  "http://137.184.184.187:3003",
	5:  "http://137.184.184.187:3003",
	8:  "http://138.68.224.153:3003",
	9:  "http://137.184.184.187:3003",
	10: "http://137.184.184.187:3003",
	11: "http://137.184.184.187:3003",
	12: "http://137.184.184.187:3003",
	13: "http://137.184.184.187:3003",
}

func main() {
	fmt.Println("== Conector == ")

	variable := variableDB.Model{}
	GRD := grdDB.Model{}
	record := recordDB.Model{}
	historical := historicalDB.Model{}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		fmt.Println("Connector.Time.LoadLocation.ERROR: ", err)

		location = time.Local
	}

	for {
		where := map[string]interface{}{}
		GRDs, err := GRD.Find(where)
		if err != nil {
			fmt.Println("Connector.GRD.Find.ERROR: ", err)

			continue
		}

		for _, grd := range GRDs {
			if !grd.Active {
				continue
			}

			where := map[string]interface{}{}
			variablesRows, err := variable.Find(where)
			if err != nil {
				fmt.Println("Connector.Variable.Find.ERROR: ", err)

				continue
			}

			variables := []variableDB.Variable{}

			for _, variablesRow := range variablesRows {
				if variablesRow.GRDID == grd.ID && variablesRow.Active {
					variables = append(variables, variablesRow)
				}
			}

			fmt.Println("Connector.Variable.Actives: ", len(variables))

			updates := []constants.UpdateJSON{}

			mapGRD, isOk := mapAll[grd.ID]
			if !isOk {
				continue
			}

			/*
				version without linter
				r := rand.New(rand.NewSource(time.Now().UnixNano()))
				secs := r.Intn(10) + 1
			*/
			secs, err := getRandomNumber(maxSecondsRandom)
			if err != nil {
				fmt.Println("Connector.Variable.Random.Value: ", err)

				continue
			}

			d := time.Second * time.Duration(secs)
			for _, variable := range variables {
				active := variable.Active
				if !active {
					continue
				}

				address := variable.Address
				if address == 0 {
					continue
				}

				qNum := mapGRD[address]
				if qNum == 0 {
					continue
				}

				ID := grd.ID

				device := variable.Device
				name := variable.Name

				alias := fmt.Sprintf("%s.%s", device, name)
				// log record find one last
				// fmt.Println("GRD Record", grd.ID, " ", time.Now().UTC().Format(constants.DateTimeFormat))
				recordOne, err := record.FindOneLast(alias)
				if err != nil {
					fmt.Println("Connector.Record.FindOneLast.ERROR: ", err)

					continue
				}

				// log post record find one last
				// fmt.Println("GRD Record", grd.ID, " ", time.Now().UTC().Format(constants.DateTimeFormat))
				if recordOne.ID == 0 {
					fmt.Println("Connector.Record.FindOneLast: NOT FOUND ", alias)

					continue
				}

				// rt es TZ MX
				rString := recordOne.Timestamp.Format(constants.DateTimeFormat)
				rt, err := time.ParseInLocation(constants.DateTimeFormat, rString, location)
				if err != nil {
					fmt.Println("Connector.RecordOne.ParseInLocation.ERROR: ", err)

					continue
				}

				// log grd ID and local timestamp
				// fmt.Println("GRD Historial Inicio", grd.ID, "    ", vA, "    ", time.Now().UTC().Format(constants.DateTimeFormat))
				historicals, err := historical.FindLast(ID, qNum, rt.UTC())
				if err != nil {
					fmt.Println("Connector.Historical.FindLast.ERROR: ", err)

					continue
				}

				if len(historicals) == 0 {
					fmt.Println(
						"Connector.Historical.FindLast NOT FOUND ",
						variable.GRDID,
						variable.Device,
						variable.Name,
						variable.Address,
					)

					continue
				}

				// logs timezone timestamp
				// fmt.Println("GRD Historial Inicio", grd.ID, "    ", vA, "    ", time.Now().UTC().Format(constants.DateTimeFormat))
				countZero := 0
				for _, historical := range historicals {
					value := historical.Value
					if value == 0 {
						countZero++

						continue
					}

					key := variable.ID
					isNew := true

					if ID, hasID := historicalInMemory[key]; hasID {
						if ID == historical.HistoricalID {
							isNew = false
						}
					}

					if !isNew {
						continue
					}

					// UTC
					ht := historical.Timestamp
					// logs timestamp local and historicals grd database
					// fmt.Println("RT: ", rt.Format(constants.DateTimeFormat), " .... ", rString)
					// fmt.Println("RT UTC: ", rt.UTC().Format(constants.DateTimeFormat))
					// fmt.Println("Timestamp: ", ht.Format(constants.DateTimeFormat))
					// fmt.Println("InsertTimestamp: ", historicalOne.InsertTimestamp.Format(constants.DateTimeFormat))

					fmt.Println(ht.In(location).Format(constants.DateTimeFormat), rt.Format(constants.DateTimeFormat), ht.UTC().After(rt.UTC()))

					// if !ht.UTC().After(rt.UTC()) {
					if ht.UTC().Before(rt.UTC()) {
						continue
					}

					historicalInMemory[key] = historical.HistoricalID

					timestamp := ht.Add(d).In(location).Format(constants.DateTimeFormat)

					// version get number random using math/rand
					// r := rand.New(rand.NewSource(time.Now().UnixNano()))
					// vMil := float32(r.Intn(9)+1) * 0.001
					number, err := getRandomNumber(maxThousandthsRandom)
					if err != nil {
						fmt.Println("Connector.Historical.Random.Value.Thousandths: ", err)
						continue
					}

					vMil := float32(number) * 0.001

					// version without golang lint
					// value = value / 100
					value *= 0.01

					if value > 0 {
						fmt.Println(value, vMil, value+vMil)
						value += vMil
					} else if value < 0 {
						fmt.Println(value, vMil, value-vMil)
						value -= vMil
					}

					unit := variable.Unit

					values := map[string]interface{}{
						recordDB.KeyAlias:     alias,
						recordDB.KeyValue:     math.Floor(float64(value)*baseRound) / baseRound,
						recordDB.KeyUnit:      unit,
						recordDB.KeyTimeStamp: ht.In(location).Format(constants.DateTimeFormat),
					}

					_, err = record.Create(values)
					if err != nil {
						fmt.Println("Connector.Record.Create.Record.ERROR: ", alias, err)

						continue
					}

					mask := variable.Mask

					if mask != "" {
						update := constants.UpdateJSON{
							Alias:     mask,
							Timestamp: timestamp,
							Value:     value,
						}

						updates = append(updates, update)
					}
				}

				if countZero > 0 {
					fmt.Printf("Connector.%s.%s.HasZero: %d\n", variable.Device, variable.Name, countZero)
				}
			}

			fmt.Println("Connector.JSON.Push: ", len(updates))

			if len(updates) > 0 {
				urlStr, ok := mapURLS[grd.ID]
				if ok {
					req := constants.UpdateJSONReq{
						AccessToken: "",
						Variables:   updates,
					}

					s, err := json.Marshal(req)
					fmt.Println(string(s), urlStr, err)

					go request.UpdateVariables(req, urlStr)
				}
			}
		}

		time.Sleep(delaySeconds * time.Second)
	}
}

func getRandomNumber(max int64) (int64, error) {
	value, err := rand.Int(rand.Reader, big.NewInt(max))
	if err != nil {
		return value.Int64(), err
	}

	number := value.Int64() + 1

	return number, nil
}
