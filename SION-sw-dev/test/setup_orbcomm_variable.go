package main

import (
	"fmt"
	"math"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
)

func setUpOrbcommVariable() {
	list := []uint64{
		1525,
		1526,
		1527,
		1528,
		1529,
		1530,
		1531,
		1532,
		1533,
		1534,
		1535,
		1536,
		1537,
		1538,
		1539,
		1544,
		1545,
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

	var queriesTimeoutActives, queriesVariableFactors, queriesVariableTimeout string

	for _, variableID := range list {
		// fmt.Println(variableID)
		where := map[string]interface{}{
			variableDB.KeyID: variableID,
		}

		variableRow, err := variable.FindOne(where)
		if err != nil {
			fmt.Printf("faild found variable ID %d: %v\n", variableID, err)

			continue
		}

		if variableRow.ID == 0 {
			fmt.Printf("not found variable ID %d\n", variableID)

			continue
		}

		now := time.Now().UTC()

		var table string
		startTime := now.Add(-2 * time.Hour)
		finalTime := now.UTC()
		tables := getTablesForDates(variableRow.Alias, startTime, finalTime)
		if len(tables) > 0 {
			table = tables[0]
		}

		if table == "" {
			continue
		}

		start := startTime.Format(constants.DateTimeFormat)
		final := finalTime.Format(constants.DateTimeFormat)
		max, min, err := record.FindMaxMin(table, start, final)
		if err != nil {
			fmt.Printf("not found records max-min in variable ID: %d\n", variableID)

			continue
		}

		diff := max - min
		value := diff * 0.20
		vMin := min + value
		vMax := max - value


		recordRows, err := record.FindByMinuteLast(table, 5)
		if err != nil {
			fmt.Printf("not found records last in variable ID: %d\n", variableID)

			continue
		}

        lenLast := len(recordRows) - 1
        var avg []float64
        for index := range recordRows {
            next := index + 1

            if next > lenLast {
                break
            }

            recordRowOne := recordRows[index]
            recordRowTwo := recordRows[next]
            value = math.Abs(recordRowOne.Value - recordRowTwo.Value)
            
            avg = append(avg, value)
        }

        var vAvg float64
        for _, v := range avg {
            vAvg += v
        }

        vAvg = vAvg / float64(len(avg))

		queriesTimeoutActives = fmt.Sprintf(
			"INSERT INTO timeout_actives SET variable_id = %d, is_custom = 0, active = 1, timestamp = NOW();\n%s",
			variableID,
			queriesTimeoutActives,
		)

		queriesVariableFactors = fmt.Sprintf(
			"INSERT INTO variable_factors SET variable_id = %d, is_custom = 0, value = %.4f, probability = '=,=,=', is_incremental = 0, is_random = 0;\n%s",
			variableID,
			vAvg,
			queriesVariableFactors,
		)

		queriesVariableTimeout = fmt.Sprintf(
			"INSERT INTO variable_timeouts SET variable_id = %d, value_min = %.4f, value_max = %.4f, value_zero_min = 0, value_zero_max = 0, is_int = 0, is_bool = 0;\n%s",
			variableID,
			vMin,
			vMax,
			queriesVariableTimeout,
		)
	}

	fmt.Println(queriesTimeoutActives)
	fmt.Println(queriesVariableFactors)
	fmt.Println(queriesVariableTimeout)
}
