package service

import (
	"fmt"
	"time"

	timeoutActiveDB "github.com/JamsMendez/SION-orbcomm/models/timeout_active"
	"github.com/JamsMendez/SION-sw/constants"
)

func updateTimeoutActive(variableID int64, isCustom bool) {
	timeoutActive := timeoutActiveDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	where := map[string]interface{}{
		timeoutActiveDB.KeyVariableID: variableID,
		timeoutActiveDB.KeyIsCustom:   isCustom,
	}

	timeoutRow, err := timeoutActive.FindOne(where)
	if err != nil {
		fmt.Println("UpdateTimeoutActive.TimeoutActive.FindOne.Err: ", err)
	}

	if timeoutRow.ID > 0 && !timeoutRow.Active {
		values := map[string]interface{}{
			timeoutActiveDB.KeyID:     timeoutRow.ID,
			timeoutActiveDB.KeyActive: true,
			timeoutActiveDB.KeyTimestamp: time.Now(),
		}

		timeoutRow, err = timeoutActive.Update(values)
		if err != nil {
			fmt.Println("UpdateTimeoutActive.TimeoutActive.Update.Err: ", err)
		}

		if timeoutRow.ID == 0 {
			fmt.Println("UpdateTimeoutActive.TimeoutActive.Update.IsZero: ", variableID, isCustom)
		}
	}
}
