package main

import (
	"fmt"

	"github.com/JamsMendez/SION-sw/constants"
	userReportDB "github.com/JamsMendez/SION-sw/models/user/report"

	// MySQL Driver
	_ "github.com/go-sql-driver/mysql"
)

func updateReportsBJ() {
	userReport := userReportDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var reports = []int64{
		127,
		151,
		152,
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
	}

	for _, reportID := range reports {
		for _, userID := range users {
			where := map[string]interface{}{
				userReportDB.KeyReportID: reportID,
				userReportDB.KeyUserID:   userID,
			}

			userReportRows, err := userReport.Find(where)
			if err == nil {
				if len(userReportRows) == 0 {
					values := map[string]interface{}{
						userReportDB.KeyIsCreator: false,
						userReportDB.KeyUserID:    userID,
						userReportDB.KeyReportID:  reportID,
					}

					userReportRow, err := userReport.Create(values)
					if err != nil {
						fmt.Println("UserReport.Created.Error", err, values)
					} else {
						if userReportRow.ID > 0 {
							fmt.Println("UserReport.Created New", userReportRow.ID, userReportRow.UserID)
						} else {
							fmt.Println("UserReport.Created", userReportRow.ID, userReportRow.UserID)
						}
					}
				}
			}
		}
	}

	fmt.Println("Finish")
}
