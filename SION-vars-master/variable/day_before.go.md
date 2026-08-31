package variable

import (
	"fmt"
	"time"

	dayBeforeDB "github.com/JamsMendez/SION-orbcomm/models/short_day_before"
	"github.com/JamsMendez/SION-sw/constants"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
)

// GetDayBefore ..
func GetDayBefore(variableID int64, isCustom bool, updates []constants.UpdateJSON, location *time.Location) (value float32, isOk bool) {
	dayBefore := dayBeforeDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	where := map[string]interface{}{
		dayBeforeDB.KeyVariableID: variableID,
		dayBeforeDB.KeyIsCustom:   isCustom,
	}

	dayBeforeOne, err := dayBefore.FindOne(where)
	if err != nil || dayBeforeOne.ID == 0 {

		fmt.Println(where, err)

		return value, isOk
	}

	value = float32(dayBeforeOne.Value)

	alias := dayBeforeOne.AccumulatedAlias

	var timestamp string
	var previousValue float64
	var currentValue float64
	var exists bool

	for _, updateOne := range updates {
		if !updateOne.IsEmpty {
			if updateOne.Alias == alias {
				exists = true
				timestamp = updateOne.Timestamp
				currentValue = float64(updateOne.Value)
				break
			}
		}
	}

	if !exists {
		fmt.Println(where, " Exists: ", exists)

		return value, isOk
	}

	tsTZ, err := time.ParseInLocation(constants.DateTimeFormat, timestamp, location)
	if err != nil {
		fmt.Println(where, " ParseInLocation: ", timestamp)
	}

	now := tsTZ.UTC()
	table := getTable(alias, now)

	record := recordDB.Model{
		UserDB: constants.DB.UserRecords,
		PwdDB:  constants.DB.PwdRecords,
		NameDB: constants.DB.NameRecords,
		Host:   constants.DB.HostRecords,
		Port:   constants.DB.PortRecords,
		Debug:  true,
	}

	lastRecords, err := record.FindLastByTimestamp(table, 1, now)
	size := len(lastRecords)
	if err != nil || size == 0 {

		fmt.Println(where, err, " size: ", size)

		return value, isOk
	}

	lastRecordOne := lastRecords[0]
	previousValue = lastRecordOne.Value

	fmt.Println("PRE-CURRENT", previousValue, currentValue)

	// get last records
	if previousValue > currentValue {
		diff := currentValue - previousValue
		if diff < 0 {
			positiveDiff := diff * (-1)
			middle := previousValue * 0.5
			if positiveDiff > middle {
				isOk = true
			}
		}
	}

	hour := tsTZ.Hour()
	minute := tsTZ.Minute()

	fmt.Println("HRS: ", hour, minute)

	if hour == 4 && (minute >= 50 && minute <= 58) {

		fmt.Println("VALIDATE.JAMS.< 5 AM ", variableID, false, hour, minute, dayBeforeOne.IsUpdated, dayBeforeOne.Value)

		if dayBeforeOne.IsUpdated == true {
			values := map[string]interface{}{
				dayBeforeDB.KeyID:        dayBeforeOne.ID,
				dayBeforeDB.KeyIsUpdated: false,
			}

			dayBeforeOne, err = dayBefore.Update(values)
			if err != nil || dayBeforeOne.ID == 0 {
				isOk = false

				return value, isOk
			}

			fmt.Println("JAMS.< 5 AM ", variableID, false, dayBeforeOne.IsUpdated, dayBeforeOne.Value)
		}
	}

	if isOk {
		if hour == 5 && (minute >= 0 && minute <= 10) {

			fmt.Println("VALIDATE.JAMS.5 AM ", variableID, false, hour, minute, dayBeforeOne.IsUpdated, dayBeforeOne.Value)

			if dayBeforeOne.IsUpdated == false {
				values := map[string]interface{}{
					dayBeforeDB.KeyID:        dayBeforeOne.ID,
					dayBeforeDB.KeyValue:     (previousValue + (currentValue * 0.5)) * 0.0421,
					dayBeforeDB.KeyIsUpdated: true,
				}

				dayBeforeOne, err = dayBefore.Update(values)
				if err != nil || dayBeforeOne.ID == 0 {
					isOk = false

					return value, isOk
				}

				fmt.Println("JAMS.5 AM ", variableID, false, dayBeforeOne.IsUpdated, dayBeforeOne.Value)
			}
		}
	}

	value = float32(dayBeforeOne.Value)
	isOk = true

	return value, isOk
}

func getTable(alias string, timestamp time.Time) string {
	utc := timestamp.UTC()

	year := utc.Year()
	var m string
	month := utc.Month()
	if month < 10 {
		m = fmt.Sprintf("0%d", month)
	} else {
		m = fmt.Sprintf("%d", month)
	}

	table := fmt.Sprintf("%s_%s_%d", alias, m, year)

	return table
}
