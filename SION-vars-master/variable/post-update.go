package variable

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	"github.com/JamsMendez/SION-sw/node"
	"github.com/JamsMendez/SION-vars/tcp"
)

func updateVariables(c echo.Context, clientWS *tcp.ClientWS, clientWSA *tcp.ClientWSA, configServer constants.ConfigServer) error {
	uJSON := constants.UpdateJSONReq{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("updateVariables.ReadAll: ", err)
	}

	fmt.Println("Update.REQ.JSON: ", string(b))

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("updateVariables.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &uJSON); err != nil {
		fmt.Println("updateVariables.Unmarshal: ", err)

		msg := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusBadRequest, msg)
	}

	var isCustom bool
	var rUpdate constants.UpdateRes
	var status bool
	var accessToken string
	var updated int

	sizeUpdates := len(uJSON.Variables)
	if sizeUpdates == 0 {
		rUpdate = constants.UpdateRes{
			Status:      status,
			AccessToken: accessToken,
			Updated:     updated,
		}

		return c.JSON(http.StatusOK, rUpdate)
	}

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

	updates := []constants.UpdateVariableJSON{}
	updatesIn := []constants.UpdateVariableJSON{}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	// QUITAR ... SOLO LOCAL
	//tsUpdate := time.Now().UTC().In(location).Format(constants.DateTimeFormat)

	/*isEmptyVars := true

	for i := 0; i < sizeUpdates; i++ {
		oJSON := uJSON.Variables[i]
		if !oJSON.IsEmpty {
			isEmptyVars = false
			break
		}
	}*/

	for i := 0; i < sizeUpdates; i++ {
		oJSON := uJSON.Variables[i]
		// QUITAR ... SOLO LOCAL
		//oJSON.Timestamp = tsUpdate

		where := map[string]interface{}{variableDB.KeyAlias: oJSON.Alias}
		variableOne, err := variable.FindOne(where)
		if variableOne.ID != 0 && err == nil {

			if !oJSON.IsEmpty {

				valueIn := oJSON.Value
				f64 := float64(valueIn)
				hasOk := node.EvalueExpressionInsert(variableOne.ExpressionInsert, f64)
				if hasOk {
					ts := oJSON.Timestamp

					timestamp, err := time.ParseInLocation(constants.DateTimeFormat, ts, location)
					if err == nil {
						table := GetTable(variableOne.Alias, timestamp)
						values := map[string]interface{}{
							recordDB.KeyValue:     oJSON.Value,
							recordDB.KeyTimestamp: timestamp.UTC(),
						}

						err := record.CreateTable(table)
						if err == nil {
							recordOne, err := record.Create(table, values)
							if err == nil {
								if recordOne.ID != 0 {
									updated = updated + 1

									addUpdate := true

									lastRecordOne := getLastRecord(variableOne.ID, isCustom)
									if lastRecordOne.ID > 0 {
										tsOne := lastRecordOne.Timestamp.UTC()
										if timestamp.UTC().Before(tsOne) {
											fmt.Println(oJSON.Alias, " Update out of sync: ", tsOne.Format(constants.DateTimeFormat), timestamp.Format(constants.DateTimeFormat))

											addUpdate = false
										}
									}

									if addUpdate {

										InsertLastRecord(variableOne.ID, isCustom, recordOne)

										f64 := float64(oJSON.Value)
										nF64 := ToFixed(f64, 4)

										update := constants.UpdateVariableJSON{
											RecordID:   recordOne.ID,
											VariableID: variableOne.ID,
											Value:      nF64,
											Timestamp:  oJSON.Timestamp,
											IsCustom:   false,

											Device: variableOne.Device,
											Name:   variableOne.Name,
										}

										updates = append(updates, update)

										updatesIn = append(updatesIn, update)

									} else {
										f64 := float64(oJSON.Value)
										nF64 := ToFixed(f64, 4)

										updateIn := constants.UpdateVariableJSON{
											RecordID:   recordOne.ID,
											VariableID: variableOne.ID,
											Value:      nF64,
											Timestamp:  oJSON.Timestamp,
											IsCustom:   false,

											Device: variableOne.Device,
											Name:   variableOne.Name,
										}

										updatesIn = append(updatesIn, updateIn)
									}

								}

							} else {
								fmt.Println(oJSON.Alias, "CREATE: ", err)
							}

						} else {
							fmt.Println(oJSON.Alias, "CREATE_TABLE: ", err)
						}

					} else {
						fmt.Println(oJSON.Alias, "TIMESTAMP: ", err)
					}

				} else {
					fmt.Println(oJSON.Alias, "EvaluateExpressionInsert: hasOk FALSE")
				}

			} else {

				addUpdate := true

				ts := oJSON.Timestamp
				timestamp, err := time.ParseInLocation(constants.DateTimeFormat, ts, location)
				if err == nil {

					lastRecordOne := getLastRecord(variableOne.ID, isCustom)
					if lastRecordOne.ID > 0 {
						tsOne := lastRecordOne.Timestamp.UTC()
						if timestamp.UTC().Before(tsOne) {
							fmt.Println(oJSON.Alias, " Update out of sync: ", tsOne.Format(constants.DateTimeFormat), timestamp.UTC().Format(constants.DateTimeFormat))

							addUpdate = false
						}
					}

					// Not save in records
					recordOne := recordDB.Record{
						Value:     0,
						Timestamp: timestamp.UTC(),
					}

					/*if !isEmptyVars {
						if variableOne.Name == "VELOCIDAD MOTOR" {
							recordOne.Value = lastRecordOne.Value
						}
					}*/

					if addUpdate {
						InsertLastRecord(variableOne.ID, isCustom, recordOne)
					}
				}

				if addUpdate {
					f64 := float64(oJSON.Value)

					update := constants.UpdateVariableJSON{
						VariableID: variableOne.ID,
						Value:      f64,
						Timestamp:  oJSON.Timestamp,
						IsCustom:   false,
						IsEmpty:    true,

						Device: variableOne.Device,
						Name:   variableOne.Name,
					}

					updates = append(updates, update)

					updatesIn = append(updatesIn, update)

				} else {
					f64 := float64(oJSON.Value)

					updateIn := constants.UpdateVariableJSON{
						VariableID: variableOne.ID,
						Value:      f64,
						Timestamp:  oJSON.Timestamp,
						IsCustom:   false,
						IsEmpty:    true,

						Device: variableOne.Device,
						Name:   variableOne.Name,
					}

					updatesIn = append(updatesIn, updateIn)
				}
			}

		} else {
			fmt.Println(oJSON.Alias, "updateVariables: variable.FindOne ", err)
		}

	}

	sizeUpdatesIn := len(updatesIn)
	if sizeUpdatesIn > 0 {

		nUpdates := GetCustomVariableUpdates(updatesIn, configServer)
		sizeNUpdates := len(nUpdates)
		if sizeNUpdates > 0 {
			updates = append(updates, nUpdates...)
		}

		updatesWSA := []constants.UpdateVariableJSON{}

		for _, updateOne := range updates {
			if !updateOne.IsEmpty {
				updatesWSA = append(updatesWSA, updateOne)
			}
		}

		sizeUpdates = len(updates)
		if sizeUpdates > 0 {
			msg := constants.ContentJSON{Event: constants.EventUpdateVars, Content: updates}
			buffer, err := json.Marshal(msg)
			if err == nil {
				s := string(buffer)
				if clientWS.Connected {
					fmt.Println("ClientWS Send ... OK")
					clientWS.Send(s)
				}
			}
		}

		sizeWSA := len(updatesWSA)
		if sizeWSA > 0 {
			msg := constants.ContentJSON{Event: constants.EventUpdateVars, Content: updatesWSA}
			buffer, err := json.Marshal(msg)
			if err == nil {
				if clientWSA.Connected {
					s := string(buffer)
					fmt.Println("ClientWSA Send ... OK")
					clientWSA.Send(s)
				}
			}
		}

		updates = []constants.UpdateVariableJSON{}
		updatesIn = []constants.UpdateVariableJSON{}
	}

	status = updated > 0

	rUpdate = constants.UpdateRes{
		Status:      status,
		AccessToken: accessToken,
		Updated:     updated,
	}

	return c.JSON(http.StatusOK, rUpdate)
}

func isAliasAvailable(variable variableDB.Model, alias string) string {
	nextAlias := getAliasOfVariable(alias)

	where := map[string]interface{}{variableDB.KeyAlias: nextAlias}
	variableOne, err := variable.FindOne(where)
	if err != nil {
		return ""
	}

	if variableOne.ID == 0 {
		return nextAlias
	}

	return isAliasAvailable(variable, nextAlias)
}
