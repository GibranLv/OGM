package service

import (
	"fmt"
	"strings"
	"time"

	logDB "github.com/JamsMendez/SION-orbcomm/models/log"
	orbcommDB "github.com/JamsMendez/SION-orbcomm/models/orbcomm"
	orbcommMailDB "github.com/JamsMendez/SION-orbcomm/models/orbcomm_mail"
	incrementalDB "github.com/JamsMendez/SION-orbcomm/models/variable_incremental"
	"github.com/JamsMendez/SION-sw/constants"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
)

// insertLog ...
func insertLog(logM logDB.Model, incremental incrementalDB.Model, variableOne variableDB.Variable, timestampUTC time.Time, value float32, tsTZ string) {

	// Log API Orbcomm
	where := map[string]interface{}{
		logDB.KeyVariableID: variableOne.ID,
	}

	logOne, err := logM.FindOne(where)
	if err == nil {
		if logOne.ID > 0 {
			values := map[string]interface{}{
				logDB.KeyID:        logOne.ID,
				logDB.KeyName:      fmt.Sprintf("%s.%s", variableOne.Device, variableOne.Name),
				logDB.KeyTS:        tsTZ,
				logDB.KeyTimestamp: timestampUTC,
				logDB.KeyIsTimeout: false,
			}

			_, err := logM.Update(values)
			if err != nil {
				fmt.Println("InsertLog.ORBCOMM.Log.Update: ", err)
			}

		} else {
			values := map[string]interface{}{
				logDB.KeyVariableID: variableOne.ID,
				logDB.KeyName:       fmt.Sprintf("%s.%s", variableOne.Device, variableOne.Name),
				logDB.KeyTS:         tsTZ,
				logDB.KeyTimestamp:  timestampUTC,
				logDB.KeyIsTimeout:  false,
			}

			_, err := logM.Create(values)
			if err != nil {
				fmt.Println("InsertLog.ORBCOMM.Log.Create: ", err)
			}
		}
	}

	// Variable Incrementals
	isAccumulated := strings.Contains(variableOne.Name, "FLUJO GAS ACUMULADO")
	isAccumulatedAll := strings.Contains(variableOne.Name, "ACUMULADO")
	isCombAccum := strings.Contains(variableOne.Name, "GAS COMB. ACUM")
	isMotorSpeed := strings.Contains(variableOne.Name, "VELOCIDAD MOTOR")
	isYesterday := strings.Contains(variableOne.Name, "DIA ANTERIOR")
	if isAccumulated || isAccumulatedAll || isCombAccum || isMotorSpeed || isYesterday {
		where = map[string]interface{}{incrementalDB.KeyVariableID: variableOne.ID}
		incrementals, err := incremental.Find(where)
		if err != nil {
			fmt.Println("InsertLog.ORBCOMM.VariableIncremental.Find: ", err)
		}

		size := len(incrementals)
		if size == 2 {
			// Actualizacion de los ultimos valores
			firstIncrementalRow := incrementals[0]
			secondIncrementalRow := incrementals[1]

			if timestampUTC.After(firstIncrementalRow.Timestamp) {
				values := map[string]interface{}{
					incrementalDB.KeyID:        firstIncrementalRow.ID,
					incrementalDB.KeyValue:     value,
					incrementalDB.KeyTimestamp: timestampUTC,
				}

				incrementalRow, err := incremental.Update(values)
				if err != nil {
					fmt.Println("InsertLog.ORBCOMM.VariableIncremental.After.Update.First: ", err)
				}

				if incrementalRow.ID == 0 {
					fmt.Println("InsertLog.ORBCOMM.VariableIncremental.After.Update.First: isi zero")
				}

				if incrementalRow.ID > 0 {
					values := map[string]interface{}{
						incrementalDB.KeyID:        secondIncrementalRow.ID,
						incrementalDB.KeyValue:     firstIncrementalRow.Value,
						incrementalDB.KeyTimestamp: firstIncrementalRow.Timestamp,
					}

					incrementalRow, err := incremental.Update(values)
					if err != nil {
						fmt.Println("InsertLog.ORBCOMM.VariableIncremental.After.Update.Second: ", err)
					}

					if incrementalRow.ID == 0 {
						fmt.Println("InsertLog.ORBCOMM.VariableIncremental.After.Update.Second: is zero")
					}
				}

			} else if timestampUTC.After(secondIncrementalRow.Timestamp) {
				values := map[string]interface{}{
					incrementalDB.KeyID:        secondIncrementalRow.ID,
					incrementalDB.KeyValue:     value,
					incrementalDB.KeyTimestamp: timestampUTC,
				}

				incrementalRow, err := incremental.Update(values)
				if err != nil {
					fmt.Println("InsertLog.ORBCOMM.VariableIncremental.After.Update.Second.2: ", err)
				}

				if incrementalRow.ID == 0 {
					fmt.Println("InsertLog.ORBCOMM.VariableIncremental.After.Update.Second.2: isi zero")
				}
			}

		} else if size < 2 {
			// Guardar los ultimos dos valores
			values := map[string]interface{}{
				incrementalDB.KeyVariableID: variableOne.ID,
				incrementalDB.KeyValue:      value,
				incrementalDB.KeyTimestamp:  timestampUTC,
			}

			incrementalRow, err := incremental.Create(values)
			if err != nil {
				fmt.Println("InsertLog.ORBCOMM.VariableIncremental.Create: ", err)
			}

			if incrementalRow.ID == 0 {
				fmt.Println("InsertLog.ORBCOMM.VariableIncremental.Create is zero")
			}

		} else if size > 2 {
			// Eliminar los valores extras
			for i := 2; i < size; i++ {
				incrementalRow := incrementals[i]
				where := map[string]interface{}{incrementalDB.KeyID: incrementalRow.ID}
				numAffected, err := incremental.Remove(where)
				if err != nil {
					fmt.Println("InsertLog.ORBCOMM.VariableIncremental.Remove: ", err)
				}

				if numAffected == 0 {
					fmt.Println("InsertLog.ORBCOMM.VariableIncremental.Remove.NumAffected is zero")
				}
			}
		}

	}
	// Log API Orbcomm
}

// insertOrbcommMail ...
func insertOrbcommMail(orbcommOne orbcommDB.Orbcomm, config constants.ConfigServer) {
	orbcommMail := orbcommMailDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	// Notification Mail Orbcomm
	where := map[string]interface{}{
		orbcommMailDB.KeyOrbcommID: orbcommOne.ID,
	}

	orbcommMailOne, err := orbcommMail.FindOne(where)
	if err == nil {
		now := time.Now().UTC()

		if orbcommMailOne.ID > 0 {

			if orbcommMailOne.Mail {
				values := map[string]interface{}{
					orbcommMailDB.KeyID:        orbcommMailOne.ID,
					orbcommMailDB.KeyOrbcommID: orbcommOne.ID,
					orbcommMailDB.KeyMail:      false,
					orbcommMailDB.KeyTimestamp: now,
				}

				_, err := orbcommMail.Update(values)
				if err != nil {
					fmt.Println("insertOrbcommMail.ORBCOMM.OrbcommMail.Update: ", err)
				}
				/*
					go func(nodePath, nodeExecPath, system string) {
						msg := fmt.Sprintf("ORBCOMM ID: %s: CONNECTION SUCCESS ", orbcommOne.MobileID)

						msgOut := sendMailOrbcomm(nodePath, nodeExecPath, msg, system)
						fmt.Println("InsertOrbcommMail.SendMailOrbcomm.Out: ", msgOut)
					}(config.NodePath, config.NodeExecPath, config.System)
				*/
			}

		} else {
			values := map[string]interface{}{
				orbcommMailDB.KeyOrbcommID: orbcommOne.ID,
				orbcommMailDB.KeyMail:      false,
				orbcommMailDB.KeyTimestamp: now,
			}

			_, err := orbcommMail.Create(values)
			if err != nil {
				fmt.Println("InsertOrbcommMail.ORBCOMM.OrbcommMail.Create: ", err)
			}
		}
	}
	// Notification Mail Orbcomm
}
