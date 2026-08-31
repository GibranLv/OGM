package variable

import (
	"fmt"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	activeRecordDB "github.com/JamsMendez/SION-sw/models/active_record"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
	node "github.com/JamsMendez/SION-sw/node"
)

// GetCustomVariableUpdates ...
func GetCustomVariableUpdates(variablesIn []constants.UpdateVariableJSON, configServer constants.ConfigServer) []constants.UpdateVariableJSON {
	isCustom := true
	nUpdates := []constants.UpdateVariableJSON{}

	customVariable := customVariableDB.Model{
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

	activeRecord := activeRecordDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{customVariableDB.KeyStatus: true}
	customVariables, err := customVariable.Find(where)
	if err == nil {

		location, err := time.LoadLocation(constants.TZ)
		if err != nil {
			location = time.Local
		}

		sizeIn := len(variablesIn)
		for _, customVariableOne := range customVariables {
			var hasEmpty, isComplete, hasVariables bool

			expression := customVariableOne.Expression
			if expression != "" {
				variablesJSON := customVariableOne.VariablesJSON
				var timestampString string

				for _, variableID := range variablesJSON {
					for i := 0; i < sizeIn; i++ {
						variableIn := variablesIn[i]
						if variableIn.VariableID == variableID {

							hasVariables = true

							if variableIn.IsEmpty {
								hasEmpty = true
							}

							timestampString = variableIn.Timestamp

							s := fmt.Sprintf("%.4f", variableIn.Value)
							key := fmt.Sprintf("${%d}", variableID)
							expression = strings.ReplaceAll(expression, key, s)

							break
						}
					}
				}

				isComplete = strings.Index(expression, "${") == -1
				if isComplete {

					value, isOk := node.EvalueExpressionValue(expression)

					fmt.Println(customVariableOne.Device, customVariableOne.Name, " ===> ", expression, value, isOk, timestampString)

					value = ToFixed(value, 4)

					addUpdate := true

					timestamp, err := time.ParseInLocation(constants.DateTimeFormat, timestampString, location)
					if err == nil {
						alias := fmt.Sprintf(constants.TmpCustomVariable, customVariableOne.ID)
						table := GetTable(alias, timestamp)

						// Se crea la tabla en SION_records
						err := record.CreateTable(table)
						if err == nil {

							lastRecordOne := getLastRecord(customVariableOne.ID, isCustom)
							if lastRecordOne.ID > 0 {
								tsOne := lastRecordOne.Timestamp.UTC()
								if timestamp.UTC().Before(tsOne) {
									fmt.Println(customVariableOne.Name, " Update out of sync: ", tsOne.Format(constants.DateTimeFormat), timestamp.UTC().Format(constants.DateTimeFormat))

									addUpdate = false
								}
							}

							if hasEmpty || !isOk {
								hasEmpty = false

								recordOne := recordDB.Record{
									Timestamp: timestamp.UTC(),
								}

								where := map[string]interface{}{
									activeRecordDB.KeyVariableID: customVariableOne.ID,
									activeRecordDB.KeyIsCustom:   true,
								}

								activeOne, err := activeRecord.FindOne(where)
								if err == nil {
									if activeOne.ID > 0 && activeOne.Status {
										if activeOne.IsDefault {
											recordOne.Value = activeOne.DefaultValue

										} else {
											recordOne.Value = value
										}

										values := map[string]interface{}{
											recordDB.KeyValue:     recordOne.Value,
											recordDB.KeyTimestamp: recordOne.Timestamp,
										}

										_, err := record.Create(table, values)
										if err != nil {
											fmt.Println("variable.getCustomVariableUpdates.Record.Create: ", err, values, where)
										}

									} else {
										recordOne.Value = 0
									}

								} else {
									fmt.Println("variable.getCustomVariableUpdates.ActiveRecord.FindOne: ", err, where)

									recordOne.Value = 0
								}

								if addUpdate {
									InsertLastRecord(customVariableOne.ID, isCustom, recordOne)
								}

							} else {
								values := map[string]interface{}{
									recordDB.KeyValue:     value,
									recordDB.KeyTimestamp: timestamp.UTC(),
								}

								// Se guarda el valor en SION_records
								recordOne, err := record.Create(table, values)
								if err == nil {
									if recordOne.ID != 0 {
										if addUpdate {
											// Se actualiza el ultimo valor de la variable
											InsertLastRecord(customVariableOne.ID, isCustom, recordOne)
										}
									}
								}
							}

						}
					}

					update := constants.UpdateVariableJSON{
						VariableID: customVariableOne.ID,
						Value:      value,
						Timestamp:  timestampString,
						IsCustom:   isCustom,
						IsEmpty:    hasEmpty,
					}

					nUpdates = append(nUpdates, update)

				} else {
					if hasVariables {
						fmt.Println("variable.getCustomVariableUpdates.IsComplete.FALSE: ", expression)
					}
				}
			}
		}

		customVariables = []customVariableDB.CustomVariable{}

	} else {
		fmt.Println("variable.getCustomVariableUpdates.customVariable.Find: ", err)
	}

	return nUpdates
}
