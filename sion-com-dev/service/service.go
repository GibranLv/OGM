package service

import (
	"fmt"
	"math/rand"
	"sort"
	"strings"
	"time"

	"github.com/JamsMendez/SION-com/request"
	lastRecordDB "github.com/JamsMendez/SION-orbcomm/models/last_record"
	logDB "github.com/JamsMendez/SION-orbcomm/models/log"
	orbcommDB "github.com/JamsMendez/SION-orbcomm/models/orbcomm"
	orbcommTimeoutDB "github.com/JamsMendez/SION-orbcomm/models/orbcomm_timeout"
	orbcommVariableDB "github.com/JamsMendez/SION-orbcomm/models/orbcomm_variable"
	timeoutDB "github.com/JamsMendez/SION-orbcomm/models/timeout"
	timeoutActiveDB "github.com/JamsMendez/SION-orbcomm/models/timeout_active"
	vFactorDB "github.com/JamsMendez/SION-orbcomm/models/variable_factor"
	incrementalDB "github.com/JamsMendez/SION-orbcomm/models/variable_incremental"
	overwriteDB "github.com/JamsMendez/SION-orbcomm/models/variable_overwrite"
	variableTimeoutDB "github.com/JamsMendez/SION-orbcomm/models/variable_timeout"
	"github.com/JamsMendez/SION-sw/constants"
	lastRecordSWDB "github.com/JamsMendez/SION-sw/models/last_record"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
)

// var varsCostero = []string{
// 	"nz",
// 	"oa",
// 	"ob",
// 	"od",
// 	"oe",
// 	"of",
// 	"og",
// 	"oh",
// 	"oi",
// 	"oj",
// 	"ok",
// 	"ol",
// 	"om",
// 	"on",
// 	"oo",
// 	"or",
// 	"os",
// 	"ot",
// 	"ou",
// 	"ov",
// 	"ow",
// 	"ox",
// 	"oy",
// 	"oz",
// 	"pa",
// 	"pb",
// 	"pc",
// 	"pd",
// 	"pe",
// 	"pf",
// 	"pg",
// 	"ph",
// 	"pi",
// 	"pj",
// 	"pk",
// 	"qu",
// }

var hasInsertLittleZero = false

// var isRepeater = false

// Start ...
func Start(config constants.ConfigServer) {
	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		fmt.Println("Start.LoadLocation: ", err)

		location = time.Local
	}

	for {
		getLastRecordInOrbcomms(location, config)

		fmt.Println("Finish ...")

		time.Sleep(time.Second * 15)
	}

}

func getLastRecordInOrbcomms(location *time.Location, config constants.ConfigServer) {
	orbcomm := orbcommDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	orbcommTimeout := orbcommTimeoutDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	where := map[string]interface{}{orbcommDB.KeyStatus: true}
	orbcomms, err := orbcomm.Find(where)
	if err != nil {
		fmt.Println("Orbcomm.Find.ERROR: ", err)

		return
	}

	nowUTC := time.Now().UTC()

	for _, orbcommOne := range orbcomms {
		where := map[string]interface{}{
			orbcommTimeoutDB.KeyOrbcommID: orbcommOne.ID,
		}

		orbcommTimeoutOne, err := orbcommTimeout.FindOne(where)
		if err != nil {
			fmt.Println("OrbcommTimeout.FindOne.ERROR: ", err)

			return
		}

		if orbcommTimeoutOne.ID == 0 {
			fmt.Println("OrbcommTimeout.Find: Not found ", orbcommOne.ID)

		} else {
			getOrbcommVars(orbcommOne, nowUTC, orbcommTimeoutOne, location, orbcommTimeout, config)
		}

		if orbcommOne.Status {
			validateTimeout(orbcommOne, config)
		}
	}
}

func getOrbcommVars(orbcommOne orbcommDB.Orbcomm, now time.Time, orbcommTimeoutOne orbcommTimeoutDB.OrbcommTimeout, location *time.Location, orbcommTimeout orbcommTimeoutDB.Model, config constants.ConfigServer) {
	timeout := timeoutDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
	}

	orbcommVariable := orbcommVariableDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	where := map[string]interface{}{orbcommVariableDB.KeyOrbcommID: orbcommOne.ID}
	timeoutOne, err := timeout.FindOne(where)
	if err != nil {
		fmt.Println("getOrbcommVars.Timeout.FindOne: ", err, orbcommOne.ID)

		return
	}

	if timeoutOne.ID == 0 {
		fmt.Println("getOrbcommVars.TimeoutOne.ID: Is Zero", orbcommOne.ID)

		return
	}

	ovs, err := orbcommVariable.Find(where)
	if err != nil {
		fmt.Println("getOrbcommVars.OrbcommVariable.Find: ", err)

		return
	}

	lastRecord := lastRecordDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	lastRecordSW := lastRecordSWDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var isZero bool

	var isCustom bool
	var hasTimeout bool

	lastRecords := []lastRecordSWDB.LastRecord{}
	inserts := map[int64]lastRecordSWDB.LastRecord{}

	for _, ov := range ovs {
		where := map[string]interface{}{
			lastRecordSWDB.KeyVariableID: ov.VariableID,
			lastRecordSWDB.KeyIsCustom:   isCustom,
		}

		lastRecordSWOne, err := lastRecordSW.FindOne(where)
		if err == nil {
			if lastRecordSWOne.ID > 0 {
				tsUTC := lastRecordSWOne.Timestamp.UTC()
				if !tsUTC.IsZero() {
					minutes := now.Sub(tsUTC).Minutes()
					hasTimeout = minutes >= timeoutOne.Timeout
					if !hasTimeout {
						break
					}

					if orbcommTimeoutOne.VariableID == lastRecordSWOne.VariableID {
						if lastRecordSWOne.Value == 0 {
							isZero = true
						}
					}

					lastRecords = append(lastRecords, lastRecordSWOne)
					inserts[ov.VariableID] = lastRecordSWOne
				}
			}
		}
	}

	if !hasTimeout {
		fmt.Println("WITHOUT TIMEOUT ...", orbcommOne.MobileID)

		// lastRecords = []lastRecordSWDB.LastRecord{}
		// inserts = map[int64]lastRecordSWDB.LastRecord{}

		return
	}

	if !orbcommTimeoutOne.IsTimeout {
		for variableID, lastRecordSWOne := range inserts {
			where := map[string]interface{}{
				lastRecordDB.KeyVariableID: variableID,
				lastRecordDB.KeyIsCustom:   false,
			}

			lastRecordOne, err := lastRecord.FindOne(where)
			if err != nil {
				fmt.Println("getOrbcommVars.LastRecord.FindOne: ", err)

				return
			}

			if lastRecordOne.ID > 0 {
				values := map[string]interface{}{
					lastRecordDB.KeyID:        lastRecordOne.ID,
					lastRecordDB.KeyValue:     lastRecordSWOne.Value,
					lastRecordDB.KeyTimestamp: lastRecordSWOne.Timestamp.UTC(),
				}

				lastRecordOne, err = lastRecord.Update(values)
				if err != nil {
					fmt.Println("getOrbcommVars.LastRecord.Update: ", err)

					return
				}

			} else {
				values := map[string]interface{}{
					lastRecordDB.KeyVariableID: variableID,
					lastRecordDB.KeyIsCustom:   false,
					lastRecordDB.KeyValue:      lastRecordSWOne.Value,
					lastRecordDB.KeyTimestamp:  lastRecordSWOne.Timestamp.UTC(),
				}

				lastRecordOne, err = lastRecord.Create(values)
				if err != nil {
					fmt.Println("getOrbcommVars.LastRecord.Create: ", err)

					return
				}
			}
		}
	}

	values := map[string]interface{}{
		orbcommTimeoutDB.KeyID:        orbcommTimeoutOne.ID,
		orbcommTimeoutDB.KeyIsTimeout: true,
	}

	orbcommTimeoutOne, err = orbcommTimeout.Update(values)
	if err != nil {
		fmt.Println("OrbcommTimeout.Update.Timeout: TRUE, Not Updated", values)

		return
	}

	if orbcommTimeoutOne.ID == 0 {
		fmt.Println("OrbcommTimeout.Update.Timeout: Not Found")

		return
	}

	delayInt := int(timeoutOne.Delay)
	i32 := int32(delayInt)
	d := time.Duration(i32)

	nowInsert := now.Add(time.Second * d)
	tsTZ := nowInsert.In(location).Format(constants.DateTimeFormat)

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	updates := []constants.UpdateJSON{}

	// Actualizaciones de overwrites
	overwrite := overwriteDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	variableTimeout := variableTimeoutDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	whereO := map[string]interface{}{overwriteDB.KeyStatus: true}
	overwrites, err := overwrite.Find(whereO)
	if err != nil {
		fmt.Println("VariableOverwrite.Find.ERROR: ", err)
	}

	for _, lastRecordOneSW := range lastRecords {
		where := map[string]interface{}{variableDB.KeyID: lastRecordOneSW.VariableID}
		variableOne, err := variable.FindOne(where)
		if err == nil && variableOne.ID > 0 {

			where := map[string]interface{}{
				lastRecordDB.KeyVariableID: variableOne.ID,
				lastRecordDB.KeyIsCustom:   isCustom,
			}

			lastRecordOne, err := lastRecord.FindOne(where)
			if err == nil && lastRecordOne.ID > 0 {
				f64, isEmpty, isOk := getVariableValue(lastRecordOne, lastRecordOneSW, variableOne, isZero)

				if isOk {
					f32 := float32(f64)

					for _, overwriteOne := range overwrites {
						if overwriteOne.Status && overwriteOne.VariableID == variableOne.ID {

							whereT := map[string]interface{}{variableTimeoutDB.KeyVariableID: lastRecordOne.VariableID}
							variableTimeoutOne, err := variableTimeout.FindOne(whereT)
							if err == nil {
								// Sumar a la lectura
								if overwriteOne.Operator == "+" {
									f32 = f32 + float32(overwriteOne.ValueI)

									// Restar a la lectura
								} else if overwriteOne.Operator == "-" {
									f32 = f32 - float32(overwriteOne.ValueI)

									// Reescribir la lectura
								} else if overwriteOne.Operator == "=" {
									f32 = float32(overwriteOne.ValueI)

									// Generar valores
								} else if overwriteOne.Operator == "xf" {
									rand.Seed(time.Now().UnixNano())

									var valueMax = overwriteOne.ValueF
									var valueMin = overwriteOne.ValueI

									valueInsert := valueMin + rand.Float64()*(valueMax-valueMin)
									f32 = float32(ToFixed(valueInsert, 4))
								}
							}

							if variableTimeoutOne.IsInt {
								vInt := int(f32)

								f32 = float32(vInt)
							}
						}
					}

					update := constants.UpdateJSON{
						Alias:     variableOne.Alias,
						Value:     f32,
						Timestamp: tsTZ,
						IsEmpty:   isEmpty,
					}

					update.IsEmpty = false

					updates = append(updates, update)

					// REPLIQUE
					// if isRepeater {
					// 	for _, alias := range varsCostero {
					// 		if alias == update.Alias {
					// 			updates2 = append(updates2, update)
					// 			break
					// 		}
					// 	}
					// }
				}

			} else {
				fmt.Println("LastRecord.FindOne.Variable: ", err, lastRecordOne.ID)
			}
		}
	}

	if len(updates) > 0 {
		r := constants.UpdateJSONReq{
			AccessToken: "",
			Variables:   updates,
		}

		where := map[string]interface{}{orbcommTimeoutDB.KeyOrbcommID: orbcommOne.ID}
		orbcommTimeoutOne, err := orbcommTimeout.FindOne(where)
		if err != nil {
			fmt.Println("Orbcomm.Find.ERROR.Before.Update: ", err)

			return
		}

		if orbcommTimeoutOne.IsTimeout {
			// for _, s := config.URLS {
			// 	go request.UpdateVariables(r, s)
			// }
			go request.UpdateVariables(r, "http://127.0.0.1:3003")

			// if isRepeater {
			// 	go request.UpdateVariables(r2, "http://138.68.28.188:3003")
			// }
		}
	}
}

func getVariableValue(lastRecordOne lastRecordDB.LastRecord, lastRecordOneSW lastRecordSWDB.LastRecord, variableOne variableDB.Variable, isZero bool) (f32 float32, isEmpty, isOk bool) {
	table := getTable(variableOne.Alias, lastRecordOne.Timestamp)

	record := recordDB.Model{
		UserDB: constants.DB.UserRecords,
		PwdDB:  constants.DB.PwdRecords,
		NameDB: constants.DB.NameRecords,
		Host:   constants.DB.HostRecords,
		Port:   constants.DB.PortRecords,
		Debug:  true,
	}

	err := record.CreateTable(table)
	if err != nil {
		fmt.Println("getVariableValue.Record.CreateTable: ", err)

		isEmpty = true

		return f32, isEmpty, isOk
	}

	recordOne, err := record.FindOneLast(table)
	if err != nil {
		fmt.Println("getVariableValue.Record.FindOneLast: ", err)

		isEmpty = true

		return f32, isEmpty, isOk
	}

	if recordOne.ID == 0 {
		parts := strings.Split(table, "_")
		size := len(parts)
		if size == 3 {
			nTable := getBeforeTable(parts)

			err = record.CreateTable(table)
			if err != nil {
				fmt.Println("getVariableValue.Record.FindOneLast.Again: ", err)

				isEmpty = true

				return f32, isEmpty, isOk
			}

			recordOne, err = record.FindOneLast(nTable)
			if err != nil {
				fmt.Println("getVariableValue.Record.FindOneLast.Again: ", err)

				isEmpty = true

				return f32, isEmpty, isOk
			}

			table = nTable
		}
	}

	isOk = true

	if recordOne.ID > 0 {

		factor := vFactorDB.Model{
			UserDB: constants.DB.UserO,
			PwdDB:  constants.DB.PwdO,
			NameDB: constants.DB.NameO,
			Host:   constants.DB.HostO,
			Port:   constants.DB.PortO,
			Debug:  true,
		}

		where := map[string]interface{}{
			vFactorDB.KeyVariableID: lastRecordOne.VariableID,
			vFactorDB.KeyIsCustom:   false,
		}

		factorOne, err := factor.FindOne(where)
		if err != nil {
			fmt.Println("getVariableValue.Factor.FindOne: ", err)
		}

		rTS := recordOne.Timestamp
		lrTS := lastRecordOneSW.Timestamp

		if lrTS.Equal(rTS) {
			fmt.Println("LR ES IGUAL R")

			isEmpty = false

			value := lastRecordOne.Value
			if value == 0 {
				fmt.Println("GENERADO POR lastRecordOne.Value ", variableOne.Device, variableOne.Name)
				return f32, isEmpty, isOk
			}

			if factorOne.ID > 0 {
				f32, isOk = getValueRecordByFactor(table, lastRecordOne, isZero, record)
				fmt.Println("GENERADO POR  getValueRecordByFactor ", " IS OK:  ", isOk, variableOne.Device, variableOne.Name)

			} else {
				f32, isOk = getValueRecord(table, lastRecordOne, isZero, record)
				fmt.Println("GENERADO POR  getValueRecord ", " IS OK:  ", isOk, variableOne.Device, variableOne.Name)
			}

			return f32, isEmpty, isOk

		} else if lrTS.After(rTS) {
			isEmpty = true

			f32, isOk = getValueRandom(lastRecordOneSW, isZero)
			fmt.Println("GENERADO POR  getValueRandom isEmpty ", " IS OK: ", isOk, variableOne.Device, variableOne.Name)

			return f32, isEmpty, isOk

		} else {
			fmt.Println("R ES MAYOR LR", rTS, "  >  ", lrTS, "  ", variableOne.Device, variableOne.Name)

			isEmpty = false

			// SEPEC
			if variableOne.Device == "GUARICHO 202" {
				value := recordOne.Value
				if value == 0 {
					fmt.Println("GENERADO POR recordOne.Value ", variableOne.Device, variableOne.Name)
					return f32, isEmpty, isOk
				}

			} else {
				value := lastRecordOne.Value
				if value == 0 {
					fmt.Println("GENERADO POR lastRecordOne.Value ", variableOne.Device, variableOne.Name)
					return f32, isEmpty, isOk
				}
			}

			if factorOne.ID > 0 {
				f32, isOk = getValueRecordByFactor(table, lastRecordOne, isZero, record)
				fmt.Println("GENERADO POR  getValueRecordByFactor ", " IS OK:  ", isOk, variableOne.Device, variableOne.Name)

			} else {
				f32, isOk = getValueRecord(table, lastRecordOne, isZero, record)
				fmt.Println("GENERADO POR  getValueRecord ", " IS OK:  ", isOk, variableOne.Device, variableOne.Name)

			}

			return f32, isEmpty, isOk
		}

	}

	isEmpty = true

	f32, isOk = getValueRandom(lastRecordOneSW, isZero)
	fmt.Println("GENERADO POR  getValueRandom SIN RECORDS", " IS OK: ", isOk, variableOne.Device, variableOne.Name)

	return f32, isEmpty, isOk
}

func getValueRecord(table string, lastRecordOne lastRecordDB.LastRecord, isZero bool, record recordDB.Model) (f32 float32, isOk bool) {
	variableTimeout := variableTimeoutDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	isOk = true

	where := map[string]interface{}{variableTimeoutDB.KeyVariableID: lastRecordOne.VariableID}
	variableTimeoutOne, err := variableTimeout.FindOne(where)
	if err != nil {
		fmt.Println("getValueRecord.VariableTimeout.FindOne: ", err)

		isOk = false

		return f32, isOk
	}

	if variableTimeoutOne.ID == 0 {
		fmt.Println("getValueRecord.VariableTimeout.FindOne: Not Found ")

		isOk = false

		return f32, isOk
	}

	// Nueva validacion de timeout active
	timeoutActive := timeoutActiveDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	whereActive := map[string]interface{}{
		timeoutActiveDB.KeyVariableID: lastRecordOne.VariableID,
		timeoutActiveDB.KeyIsCustom:   false,
	}

	timeoutRow, err := timeoutActive.FindOne(whereActive)
	if err != nil {
		fmt.Println("getValueRecord.TimeoutActive.FindOne.Err: ", err)
	}

	if timeoutRow.ID == 0 || !timeoutRow.Active {
		isOk = false

		return f32, isOk
	}
	// Nueva validacion de timeout active

	values := []float64{}

	lastRecords, err := record.FindLastByTimestamp(table, 5, lastRecordOne.Timestamp.UTC())
	if err != nil {
		fmt.Println("getValueRecord.Record.FindLast: ", table, err)

		isOk = false

		return f32, isOk
	}

	for _, recordOne := range lastRecords {
		values = append(values, recordOne.Value)
	}

	sort.Float64s(values)
	rand.Seed(time.Now().UnixNano())

	size := len(values)
	if size == 0 || size == 1 {

		if variableTimeoutOne.IsBool {
			f32 = float32(lastRecordOne.Value)

			return f32, isOk

		}

		if variableTimeoutOne.IsInt {
			var valueMax int
			var valueMin int

			if isZero {
				valueMax = int(variableTimeoutOne.ValueZeroMax)
				valueMin = int(variableTimeoutOne.ValueZeroMin)

			} else {
				valueMax = int(variableTimeoutOne.ValueMax)
				valueMin = int(variableTimeoutOne.ValueMin)
			}

			if valueMax == valueMin {
				f32 = float32(lastRecordOne.Value)

				return f32, isOk
			}

			v := valueMax - valueMin
			if v <= 0 {
				f32 = float32(lastRecordOne.Value)

				return f32, isOk
			}

			valueInsert := rand.Intn(v) + valueMin
			f32 = float32(valueInsert)

			return f32, isOk

		}

		var valueMax float64
		var valueMin float64

		if isZero {
			valueMax = variableTimeoutOne.ValueMax
			valueMin = variableTimeoutOne.ValueMin
		} else {
			valueMax = variableTimeoutOne.ValueZeroMax
			valueMin = variableTimeoutOne.ValueZeroMin
		}

		valueInsert := valueMin + rand.Float64()*(valueMax-valueMin)
		f32 = float32(valueInsert)

		return f32, isOk

	} else if size >= 2 {
		valueMin := values[0]
		valueMax := values[size-1]

		if valueMin == 0 || valueMax == 0 {
			f32 = float32(lastRecordOne.Value)

			return f32, isOk
		}

		if variableTimeoutOne.IsInt {
			valueMaxInt := int(valueMax)
			valueMinInt := int(valueMin)

			if valueMax == valueMin {
				f32 = float32(lastRecordOne.Value)

				return f32, isOk
			}

			v := valueMaxInt - valueMinInt
			if v <= 0 {
				f32 = float32(lastRecordOne.Value)

				return f32, isOk
			}

			valueInsert := rand.Intn(v) + valueMinInt
			f32 = float32(valueInsert)

			return f32, isOk

		}

		valueInsert := valueMin + rand.Float64()*(valueMax-valueMin)
		f32 = float32(valueInsert)

		return f32, isOk

	}

	return f32, isOk
}

func getValueRandom(lastRecordOne lastRecordSWDB.LastRecord, isZero bool) (f32 float32, isOk bool) {
	variableTimeout := variableTimeoutDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	isOk = true

	where := map[string]interface{}{variableTimeoutDB.KeyVariableID: lastRecordOne.VariableID}
	variableTimeoutOne, err := variableTimeout.FindOne(where)
	if err != nil {
		fmt.Println("getValueRandom.VariableTimeout.FindOne: ", err)

		isOk = false

		return f32, isOk
	}

	if variableTimeoutOne.ID == 0 {
		fmt.Println("getValueRandom.VariableTimeout.FindOne: Not Found ")

		isOk = false

		return f32, isOk
	}

	// Nueva validacion de timeout active
	timeoutActive := timeoutActiveDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	whereActive := map[string]interface{}{
		timeoutActiveDB.KeyVariableID: lastRecordOne.VariableID,
		timeoutActiveDB.KeyIsCustom:   false,
	}

	timeoutRow, err := timeoutActive.FindOne(whereActive)
	if err != nil {
		fmt.Println("getValueRandom.TimeoutActive.FindOne.Err: ", err)
	}

	if timeoutRow.ID == 0 || !timeoutRow.Active {
		isOk = false

		return f32, isOk
	}
	// Nueva validacion de timeout active

	rand.Seed(time.Now().UnixNano())

	if variableTimeoutOne.IsBool {
		f32 = float32(lastRecordOne.Value)

		return f32, isOk
	}

	if variableTimeoutOne.IsInt {

		var valueMax int
		var valueMin int

		if isZero {
			valueMax = int(variableTimeoutOne.ValueZeroMax)
			valueMin = int(variableTimeoutOne.ValueZeroMin)

		} else {
			valueMax = int(variableTimeoutOne.ValueMax)
			valueMin = int(variableTimeoutOne.ValueMin)
		}

		if valueMax == valueMin {
			f32 = float32(lastRecordOne.Value)

			return f32, isOk
		}

		v := valueMax - valueMin
		if v <= 0 {
			f32 = float32(lastRecordOne.Value)

			return f32, isOk
		}

		valueInsert := rand.Intn(v) + valueMin
		f32 = float32(valueInsert)

		return f32, isOk
	}

	var valueMax float64
	var valueMin float64

	if isZero {
		valueMax = variableTimeoutOne.ValueZeroMax
		valueMin = variableTimeoutOne.ValueZeroMin

	} else {
		valueMax = variableTimeoutOne.ValueMax
		valueMin = variableTimeoutOne.ValueMin
	}

	valueInsert := valueMin + rand.Float64()*(valueMax-valueMin)
	f32 = float32(valueInsert)

	return f32, isOk
}

func getValueRecordByFactor(table string, lastRecordOne lastRecordDB.LastRecord, isZero bool, record recordDB.Model) (f32 float32, isOk bool) {
	variableTimeout := variableTimeoutDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	isOk = true

	where := map[string]interface{}{variableTimeoutDB.KeyVariableID: lastRecordOne.VariableID}
	variableTimeoutOne, err := variableTimeout.FindOne(where)
	if err != nil {
		fmt.Println("getValueRecordByFactor.VariableTimeout.FindOne: ", err)

		isOk = false

		return f32, isOk
	}

	if variableTimeoutOne.ID == 0 {
		fmt.Println("getValueRecordByFactor.VariableTimeout.FindOne: Not Found ")

		isOk = false

		return f32, isOk
	}

	// Nueva validacion de timeout active
	timeoutActive := timeoutActiveDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	whereActive := map[string]interface{}{
		timeoutActiveDB.KeyVariableID: lastRecordOne.VariableID,
		timeoutActiveDB.KeyIsCustom:   false,
	}

	timeoutRow, err := timeoutActive.FindOne(whereActive)
	if err != nil {
		fmt.Println("getValueRecordByFactor.TimeoutActive.FindOne.Err: ", err)
	}

	if timeoutRow.ID == 0 || !timeoutRow.Active {
		isOk = false

		return f32, isOk
	}
	// Nueva validacion de timeout active

	vFactor := vFactorDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	now := time.Now().UTC()
	lastRecords, err := record.FindLastByTimestamp(table, 3, now)
	if err != nil {
		fmt.Println("getValueRecordByFactor.Record.FindLastByTimestamp: ", table, err)

		isOk = false

		return f32, isOk
	}

	size := len(lastRecords)
	if size == 0 {
		isOk = false

		return f32, isOk
	}

	where = map[string]interface{}{
		vFactorDB.KeyVariableID: lastRecordOne.VariableID,
		vFactorDB.KeyIsCustom:   false,
	}

	vFactorOne, err := vFactor.FindOne(where)
	if err != nil || vFactorOne.ID == 0 {
		isOk = false

		return f32, isOk
	}

	if vFactorOne.IsIncremental {

		if isZero {
			f64 := lastRecords[0].Value
			f32 = float32(f64)

			return f32, isOk
		}

		incremental := incrementalDB.Model{
			UserDB: constants.DB.UserO,
			PwdDB:  constants.DB.PwdO,
			NameDB: constants.DB.NameO,
			Host:   constants.DB.HostO,
			Port:   constants.DB.PortO,
			Debug:  true,
		}

		// Variables Incrementales
		where := map[string]interface{}{incrementalDB.KeyVariableID: lastRecordOne.VariableID}
		incrementals, err := incremental.Find(where)
		if err != nil {
			fmt.Println("getValueRecordByFactor.Record.FindLastByTimestamp: ", err)
		}

		sizeInc := len(incrementals)
		if sizeInc == 2 {
			value := lastRecords[0].Value

			var valueAdd float64

			diff := incrementals[0].Value - incrementals[1].Value
			diffTime := incrementals[0].Timestamp.Sub(incrementals[1].Timestamp).Minutes()

			if diffTime >= 0 && diffTime < 4 {
				valueAdd = diff * 0.35

			} else if diffTime >= 4 && diffTime < 7 {
				valueAdd = diff * 0.25

			} else if diffTime >= 7 {
				valueAdd = diff * 0.12
			}

			if diff >= 0 {
				value = value + valueAdd

			} else {
				value = incrementals[0].Value
			}

			f32 := float32(value)

			//fmt.Println("JAMSMENDEZ ACUMULADO: ", lastRecords[0].Value, valueAdd, f32)

			return f32, isOk
		}
		//}

		value := lastRecords[0].Value

		if size >= 2 {
			diff := lastRecords[0].Value - lastRecords[1].Value

			fmt.Println(lastRecords[0].Value, " - ", lastRecords[1].Value)
			fmt.Println("DIFF: ", diff)

			if diff >= 0 {
				value = lastRecords[0].Value + (diff * 0.75)
				fmt.Println("VALUE: ", value)
			}
		}

		f32 = float32(value)

		// Validación si el valor es menos a 0
		if f32 < 0 && !hasInsertLittleZero {
			f64 := lastRecords[0].Value
			f32 = float32(f64)

			return f32, isOk
		}

		return f32, isOk
	}

	if vFactorOne.IsRandom {
		// Variables Incrementales VELOCIDAD MOTOR
		incremental := incrementalDB.Model{
			UserDB: constants.DB.UserO,
			PwdDB:  constants.DB.PwdO,
			NameDB: constants.DB.NameO,
			Host:   constants.DB.HostO,
			Port:   constants.DB.PortO,
			Debug:  true,
		}

		where := map[string]interface{}{incrementalDB.KeyVariableID: lastRecordOne.VariableID}
		incrementals, err := incremental.Find(where)
		if err != nil {
			fmt.Println("getValueRecordByFactor.Record.IsRandom.FindLastByTimestamp: ", err)
		}

		sizeInc := len(incrementals)
		if sizeInc == 2 {
			value := incrementals[0].Value
			if value == 0 {
				f32 := float32(value)

				//fmt.Println("JAMSMENDEZ VELOCIDAD IS ZERO: ", lastRecords[0].Value, f32)

				return f32, isOk
			}
		}
		// Variables Incrementales VELOCIDAD MOTOR

		if isZero {
			f64 := lastRecords[0].Value
			f32 = float32(f64)

			return f32, isOk
		}

		value := lastRecords[0].Value

		if size >= 2 {
			s := rand.NewSource(time.Now().Unix())
			r := rand.New(s)

			valueMax := lastRecords[0].Value
			valueMin := lastRecords[1].Value

			if valueMax == valueMin {
				f32 = float32(value)

				return f32, isOk
			}

			if valueMax < valueMin {
				valueMax = lastRecords[1].Value
				valueMin = lastRecords[0].Value
			}

			if variableTimeoutOne.IsInt {
				valueMaxInt := int(valueMax)
				valueMinInt := int(valueMin)

				if valueMax == valueMin {
					f32 = float32(lastRecordOne.Value)

					return f32, isOk
				}

				v := valueMaxInt - valueMinInt
				if v <= 0 {
					f32 = float32(lastRecordOne.Value)

					return f32, isOk
				}

				valueInsert := r.Intn(v) + valueMinInt
				f32 = float32(valueInsert)

				// Validación si el valor es menor a 0
				if f32 < 0 && !hasInsertLittleZero {
					f32 = float32(lastRecordOne.Value)

					return f32, isOk
				}

				return f32, isOk
			}

			valueInsert := valueMin + r.Float64()*(valueMax-valueMin)
			f32 = float32(valueInsert)

			// Validación si el valor es menor 0
			if f32 < 0 && !hasInsertLittleZero {
				f32 = float32(lastRecordOne.Value)
				return f32, isOk
			}

			return f32, isOk
		}

		f32 = float32(value)

		return f32, isOk
	}

	// variables_factors field value equals zero
	if vFactorOne.Value == 0 {
		f32 = float32(lastRecordOne.Value)

		updateGroupFactorNil(lastRecordOne.VariableID, lastRecordOne.IsCustom)

		// variable_incrementals
		incremental := incrementalDB.Model{
			UserDB: constants.DB.UserO,
			PwdDB:  constants.DB.PwdO,
			NameDB: constants.DB.NameO,
			Host:   constants.DB.HostO,
			Port:   constants.DB.PortO,
			Debug:  true,
		}

		// Variables Incrementales
		where := map[string]interface{}{incrementalDB.KeyVariableID: lastRecordOne.VariableID}
		incrementals, err := incremental.Find(where)
		if err != nil {
			fmt.Println("getValueRecordByFactor.VariableFactor.Value.IsZero.Record.FindLastByTimestamp: ", err)
		}

		sizeInc := len(incrementals)
		if sizeInc == 2 {
			value := incrementals[0].Value

			f32 := float32(value)

			//fmt.Println("JAMSMENDEZ DIA ANTERIOR: ", lastRecords[0].Value, f32)

			return f32, isOk
		}

		return f32, isOk
	}

	if isZero {
		f64 := lastRecords[0].Value
		f32 = float32(f64)

		updateGroupFactorNil(lastRecordOne.VariableID, lastRecordOne.IsCustom)

		return f32, isOk
	}

	values := strings.Split(vFactorOne.Probability, ",")
	length := len(values)
	if length == 0 {
		length = 1
	}

	s := rand.NewSource(time.Now().Unix())
	r := rand.New(s)
	index := r.Intn(length)

	if index >= length {
		f32 = float32(lastRecordOne.Value)

		updateGroupFactorNil(lastRecordOne.VariableID, lastRecordOne.IsCustom)

		return f32, isOk
	}

	v := values[index]
	v = strings.TrimSpace(v)

	//v2 := strings.TrimSpace(v)

	v = updateGroupFactor(lastRecordOne.VariableID, lastRecordOne.IsCustom, v)

	//fmt.Println("V ORGINAL: ", v2, "V NUEVO: ", v)

	recordOne := lastRecords[0]
	f64 := recordOne.Value

	if v == "1" {
		f64 = f64 + vFactorOne.Value

	} else if v == "-1" {
		f64 = f64 - vFactorOne.Value

	} else if v == "=" {
		f64 = getLittleVariation(record, lastRecordOne.VariableID, vFactorOne.Value)

		if f64 == 0 {
			f64 = recordOne.Value
		}
	}

	f32 = getFloatRandom(f64)

	// Validación si el valor es menor 0
	if f32 < 0 && !hasInsertLittleZero {
		f32 = float32(lastRecordOne.Value)
		return f32, isOk
	}

	return f32, isOk
}

func getLittleVariation(record recordDB.Model, variableID int64, factor float64) float64 {
	logM := logDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	var value float64

	where := map[string]interface{}{logDB.KeyVariableID: variableID}
	logOne, err := logM.FindOne(where)
	if err != nil {
		fmt.Println("Service.LittleVariation.Log.FindOne.Err: ", err)

		fmt.Println("JAMSMENDEZ 6")
		return value
	}

	if logOne.ID == 0 {
		fmt.Println("JAMSMENDEZ 5")
		return value
	}

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{variableDB.KeyID: variableID}
	variableOne, err := variable.FindOne(where)
	if err != nil {
		fmt.Println("Service.LittleVariation.Variable.FindOne.Err: ", err)

		return value
	}

	table := getTable(variableOne.Alias, logOne.Timestamp)
	records, err := record.FindOneByTimestamp(table, logOne.Timestamp.UTC())
	if err != nil {
		fmt.Println("Service.LittleVariation.Record.FindLastByTimestamp.Err: ", err)

		return value
	}

	size := len(records)
	if size > 0 {
		recordOne := records[0]
		if recordOne.ID > 0 {
			value := recordOne.Value

			nInsert := randFloats(0, factor)
			value = value + nInsert

			return value
		}
	}

	return value
}

func randFloats(min, max float64) float64 {
	s := rand.NewSource(time.Now().Unix())
	r := rand.New(s)
	res := min + r.Float64()*(max-min)

	return res
}

func getFloatRandom(f64 float64) float32 {
	i64 := int(f64)
	diff := f64 - float64(i64)

	if diff == 0 {
		return float32(f64)
	}

	s := rand.NewSource(time.Now().Unix())
	r := rand.New(s)
	valueInt := r.Intn(10)

	value := f64 + float64(valueInt)*0.001
	f32 := float32(value)

	return f32
}
