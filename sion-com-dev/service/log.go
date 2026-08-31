package service

import (
	"fmt"
	"time"

	logDB "github.com/JamsMendez/SION-orbcomm/models/log"
	orbcommDB "github.com/JamsMendez/SION-orbcomm/models/orbcomm"
	orbcommMailDB "github.com/JamsMendez/SION-orbcomm/models/orbcomm_mail"
	orbcommVariableDB "github.com/JamsMendez/SION-orbcomm/models/orbcomm_variable"
	timeoutDB "github.com/JamsMendez/SION-orbcomm/models/timeout"
	"github.com/JamsMendez/SION-sw/constants"
)

func validateTimeout(orbcommOne orbcommDB.Orbcomm, config constants.ConfigServer) {
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

	orbcommMail := orbcommMailDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	logM := logDB.Model{
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
		fmt.Println("ValidateTimeout.Timeout.FindOne: ", err, orbcommOne.ID)

		return
	}

	if timeoutOne.ID == 0 {
		fmt.Println("ValidateTimeout.TimeoutOne.ID: Is Zero", orbcommOne.ID)

		return
	}

	ovs, err := orbcommVariable.Find(where)
	if err != nil {
		fmt.Println("ValidateTimeout.OrbcommVariable.Find: ", err)
		return
	}

	now := time.Now()

	variables := []int64{}

	for _, ov := range ovs {
		where := map[string]interface{}{
			logDB.KeyVariableID: ov.VariableID,
		}

		logOne, err := logM.FindOne(where)
		if err == nil {
			if logOne.ID > 0 && !logOne.IsTimeout {
				timestamp := logOne.Timestamp
				diff := now.Sub(timestamp)
				if diff.Minutes() > 10 {
					variables = append(variables, logOne.VariableID)

					values := map[string]interface{}{
						logDB.KeyID:        logOne.ID,
						logDB.KeyIsTimeout: true,
					}

					_, err := logM.Update(values)
					if err != nil {
						fmt.Println("ValidateTimeout.ORBCOMM.Log.Update: ", err)
					}

					updateTimeoutActive(logOne.VariableID, false)
				}
			}
		}
	}

	size := len(variables)
	if size > 0 {
		insertOrbcommMail(orbcommMail, orbcommOne)
		/*
			go func(nodePath, nodeExecPath, system string) {
				msg := fmt.Sprintf("ORBCOMM ID: %s: %d variables timeout ", orbcommOne.MobileID, size)

				msgOut := sendMailOrbcomm(nodePath, nodeExecPath, msg, system)
				fmt.Println("ValidateTimeout.SendMailOrbcomm.Out: ", msgOut)
			}(config.NodePath, config.NodeExecPath, config.System)
		*/
	}
}

// insertOrbcommMail ...
func insertOrbcommMail(orbcommMail orbcommMailDB.Model, orbcommOne orbcommDB.Orbcomm) {

	// Notification Mail Orbcomm
	where := map[string]interface{}{
		orbcommMailDB.KeyOrbcommID: orbcommOne.ID,
	}

	orbcommMailOne, err := orbcommMail.FindOne(where)
	if err == nil {
		now := time.Now().UTC()

		if orbcommMailOne.ID > 0 {
			values := map[string]interface{}{
				orbcommMailDB.KeyID:        orbcommMailOne.ID,
				orbcommMailDB.KeyOrbcommID: orbcommOne.ID,
				orbcommMailDB.KeyMail:      true,
				orbcommMailDB.KeyTimestamp: now,
			}

			_, err := orbcommMail.Update(values)
			if err != nil {
				fmt.Println("insertOrbcommMail.ORBCOMM.OrbcommMail.Update: ", err)
			}

		} else {
			values := map[string]interface{}{
				orbcommMailDB.KeyOrbcommID: orbcommOne.ID,
				orbcommMailDB.KeyMail:      true,
				orbcommMailDB.KeyTimestamp: now,
			}

			_, err := orbcommMail.Create(values)
			if err != nil {
				fmt.Println("insertOrbcommMail.ORBCOMM.OrbcommMail.Create: ", err)
			}
		}
	}
	// Notification Mail Orbcomm
}
