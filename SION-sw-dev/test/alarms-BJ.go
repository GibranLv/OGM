package main

import (
	"fmt"

	"github.com/JamsMendez/SION-sw/constants"
	userAlarmDB "github.com/JamsMendez/SION-sw/models/user/alarm"
	userVariableDB "github.com/JamsMendez/SION-sw/models/user/variable"
	variableAlarmDB "github.com/JamsMendez/SION-sw/models/user/variable_alarm"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
)

func updateConfigALarmsBJ() {
	var alarmsIn = []int64{
		586,
		587,
		588,
		589,
		749,
		750,
		751,
		752,
		753,
		754,
		755,
		756,
	}

	// fmt.Println(alarmsIn)

	userVariable := userVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userAlarm := userAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	variableAlarm := variableAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var baseUserID int64 = 4
	var usersID = []int64{
		2,
		3,
		55,
		61,
		62,
		72,
		73,
		74,
		75,
		78,
		79,
		81,
		82,
		83,
		112,
		131,
		132,
		133,
		134,
		135,
		136,
		137,
		138,
		139,
		140,
		141,
		142,
		143,
		144,
		145,
		146,
		147,
		150,
		151,
		152,
		153,
		154,
		64,
		63,
		174,
		175,
		176,
		177,
		178,
	}

	fmt.Println(baseUserID)

	for _, userID := range usersID {
		for _, alarmID := range alarmsIn {
			where := map[string]interface{}{
				userAlarmDB.KeyAlarmID: alarmID,
				userAlarmDB.KeyUserID:  userID,
			}

			userAlarmRow, err := userAlarm.FindOne(where)
			if err != nil {
				fmt.Println(where, err)
				return
			}

			if userAlarmRow.ID == 0 {
				values := map[string]interface{}{
					userAlarmDB.KeyAlarmID:   alarmID,
					userAlarmDB.KeyUserID:    userID,
					userAlarmDB.KeyIsCreator: false,
				}

				userAlarmRow, err = userAlarm.Create(values)
				if err != nil {
					fmt.Println(where, err)
				}

				fmt.Println("UserAlarm.Create: ", err)
			}

			if userAlarmRow.ID > 0 {
				variableRow, err := variable.FindOneUVA(baseUserID, alarmID)
				if err != nil {
					fmt.Println("Variable.FindOneUVA", err, baseUserID, alarmID)
				}

				variableID := variableRow.ID
				if variableID > 0 {
					where = map[string]interface{}{
						userVariableDB.KeyUserID:     userID,
						userVariableDB.KeyVariableID: variableID,
					}

					userVariableRows, err := userVariable.Find(where)
					if err != nil {
						fmt.Println(err)
					}

					size := len(userVariableRows)
					if err == nil && size > 0 {
						for _, userVariableRow := range userVariableRows {

							where := map[string]interface{}{
								variableAlarmDB.KeyUserVariableID: userVariableRow.ID,
								variableAlarmDB.KeyUserAlarmID:    userAlarmRow.ID,
							}

							variableAlarmRows, err := variableAlarm.Find(where)
							if err != nil {
								fmt.Println(err)
							}

							size := len(variableAlarmRows)
							if err == nil && size == 0 {
								values := map[string]interface{}{
									variableAlarmDB.KeyUserVariableID: userVariableRow.ID,
									variableAlarmDB.KeyUserAlarmID:    userAlarmRow.ID,
								}

								variableAlarmRow, err := variableAlarm.Create(values)
								if err != nil {
									fmt.Println("VariableAlarm.Create: ", err)
								}

								if variableAlarmRow.ID > 0 {
									fmt.Println("VariableAlarm.Created: SUCCESS:", variableAlarmRow.ID)
								}
							}
						}
					}
				}
			}
		}
	}
}
