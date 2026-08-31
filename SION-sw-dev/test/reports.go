package main

import (
	"fmt"

	"github.com/JamsMendez/SION-sw/constants"
	userReportDB "github.com/JamsMendez/SION-sw/models/user/report"

	// MySQL Driver
	_ "github.com/go-sql-driver/mysql"
)

func updateConfigReports() {
	userReport := userReportDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var reports = []int64{
		103,
		104,
		105,
		106,
		111,
		112,
		113,
		114,
		115,
		117,
		118,
		128,
		141,
		146,
		150,
		155,
		156,
		157,
		159,
		160,
		162,
		163,
		164,
		168,
		169,
		170,
		171,
		172,
		173,
		174,
		175,
		176,
		64,
		68,
		69,
		71,
		72,
		73,
		74,
		75,
		81,
		87,
		89,
		93,
	}

	var users = []int64{
		2,
		3,
		51,
		64,
		63,
		155,
		156,
		157,
		158,
		159,
		160,
		161,
		162,
		163,
		164,
		165,
		166,
		167,
		168,
		169,
		170,
		171,
		174,
		175,
		176,
		177,
		178,
		181,
		182,
		183,
		184,
		185,
		186,
		187,
		188,
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
