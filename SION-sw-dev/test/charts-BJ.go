package main

import (
	"fmt"

	"github.com/JamsMendez/SION-sw/constants"
	chartDB "github.com/JamsMendez/SION-sw/models/chart"
	userVariableDB "github.com/JamsMendez/SION-sw/models/user/variable"

	// MySQL Driver
	_ "github.com/go-sql-driver/mysql"
)

func updateChartsBJ() {
	chart := chartDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userVariable := userVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var variables = []int64{
		251,
		1484,
		1488,
	}

	var colors = []string{
		"#2fc189",
		"#a11b1b",
		"#c7a733",
		"#2fc189",
		"#a11b1b",
		"#c7a733",
		"#2fc189",
		"#a11b1b",
		"#c7a733",
		"#2fc189",
		"#a11b1b",
		"#c7a733",
		"#2fc189",
		"#a11b1b",
		"#c7a733",
		"#2fc189",
		"#a11b1b",
		"#c7a733",
		"#2fc189",
		"#a11b1b",
		"#c7a733",
		"#2fc189",
		"#a11b1b",
		"#c7a733",
		"#2fc189",
		"#a11b1b",
		"#c7a733",
		"#2fc189",
		"#a11b1b",
		"#c7a733",
		"#2fc189",
		"#a11b1b",
		"#c7a733",
	}

	var users = []int64{
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
		180,
	}

	for index, variableID := range variables {
		for _, userID := range users {
			where := map[string]interface{}{
				userVariableDB.KeyVariableID: variableID,
				userVariableDB.KeyUserID:     userID,
			}

			userVariableRows, err := userVariable.Find(where)
			if err == nil {
				size := len(userVariableRows)
				if size > 0 {
					where := map[string]interface{}{
						chartDB.KeyUserID:     userID,
						chartDB.KeyVariableID: variableID,
					}

					chartRow, err := chart.FindOne(where)
					if err == nil {
						if chartRow.ID == 0 {
							color := colors[index]

							values := map[string]interface{}{
								chartDB.KeyUserID:     userID,
								chartDB.KeyVariableID: variableID,
								chartDB.KeyIsCustom:   false,
								chartDB.KeyUnitID:     1,
								chartDB.KeyName:       "",
								chartDB.KeyColor:      color,
							}

							chartRow, err = chart.Create(values)
							if err != nil {
								fmt.Println("Chart.Created.Error", err)
							} else {
								if chartRow.ID > 0 {
									fmt.Println("Chart.Created New", chartRow.ID, chartRow.UserID)
								}
							}
						}
					}
				}
			}
		}
	}

	fmt.Println("Finish")
}
