package variable

import (
	"fmt"

	"github.com/JamsMendez/SION-sw/constants"
	lastRecordDB "github.com/JamsMendez/SION-sw/models/last_record"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
)

// InsertLastRecord ...
func InsertLastRecord(ID int64, isCustom bool, recordOne recordDB.Record) {
	lastRecord := lastRecordDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{
		lastRecordDB.KeyVariableID: ID,
		lastRecordDB.KeyIsCustom:   isCustom,
	}

	lastRecordOne, err := lastRecord.FindOne(where)
	if err != nil {
		fmt.Println("InsertLastRecord.FindOne: ", where, err)

		return
	}

	if lastRecordOne.ID == 0 {
		values := map[string]interface{}{
			lastRecordDB.KeyVariableID: ID,
			lastRecordDB.KeyIsCustom:   isCustom,
			lastRecordDB.KeyValue:      recordOne.Value,
			lastRecordDB.KeyTimestamp:  recordOne.Timestamp,
		}

		_, err := lastRecord.Create(values)
		if err != nil {
			fmt.Println("InsertLastRecord.Create: ", values, err)

			return
		}
	}

	values := map[string]interface{}{
		lastRecordDB.KeyID:        lastRecordOne.ID,
		lastRecordDB.KeyValue:     recordOne.Value,
		lastRecordDB.KeyTimestamp: recordOne.Timestamp,
	}

	_, err = lastRecord.Update(values)
	if err != nil {
		fmt.Println("InsertLastRecord.Update: ", values, err)

		return
	}
}

// getLastRecord ...
func getLastRecord(ID int64, isCustom bool) lastRecordDB.LastRecord {
	lastRecord := lastRecordDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{
		lastRecordDB.KeyVariableID: ID,
		lastRecordDB.KeyIsCustom:   isCustom,
	}

	lastRecordOne, err := lastRecord.FindOne(where)
	if err != nil {
		fmt.Println("getLastRecord.FindOne: ", where, err)
	}

	return lastRecordOne
}
