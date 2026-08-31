package service

import (
	"fmt"

	factorDB "github.com/JamsMendez/SION-orbcomm/models/factor"
	gFactorDB "github.com/JamsMendez/SION-orbcomm/models/group_factor"
	"github.com/JamsMendez/SION-sw/constants"
)

func updateGroupFactor(variableID int64, isCustom bool, value string) string {
	factor := factorDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	gFactor := gFactorDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	// Factos y GroupFactor
	factorOne, err := factor.FindOneByVariable(variableID, isCustom)
	if err == nil && factorOne.ID > 0 && factorOne.GroupFactorID > 0 {
		if factorOne.Probability == "" {
			where := map[string]interface{}{
				factorDB.KeyID:          factorOne.ID,
				factorDB.KeyProbability: value,
			}

			factorOneU, err := factor.Update(where)
			if err != nil {
				fmt.Println("updateGroupFactor.Factor.Update: ", where, err)
			}

			if factorOneU.ID > 0 {
				where = map[string]interface{}{
					gFactorDB.KeyID:     factorOne.GroupFactorID,
					gFactorDB.KeyStatus: true,
				}

				_, err = gFactor.Update(where)
				if err != nil {
					fmt.Println("updateGroupFactor.GroupFactor.Update: ", where, err)
				}
			}

		} else {
			where := map[string]interface{}{gFactorDB.KeyFactorID: factorOne.ID}
			gFactors, err := gFactor.Find(where)
			if err == nil {
				isUpdate := true

				for _, gFOne := range gFactors {
					if !gFOne.Status {
						isUpdate = false
						break
					}
				}

				if isUpdate {
					where := map[string]interface{}{
						factorDB.KeyID:          factorOne.ID,
						factorDB.KeyProbability: value,
					}

					factorOneU, err := factor.Update(where)
					if err != nil {
						fmt.Println("updateGroupFactor.Factor.Update.TRUE: ", where, err)
					}

					if factorOneU.ID > 0 {
						_, err = gFactor.UpdateByFactor(factorOne.ID, false)
						if err != nil {
							fmt.Println("updateGroupFactor.GroupFactor.All.Update.TRUE: ", where, err)
						}

						where := map[string]interface{}{
							gFactorDB.KeyID:     factorOne.GroupFactorID,
							gFactorDB.KeyStatus: true,
						}

						_, err = gFactor.Update(where)
						if err != nil {
							fmt.Println("updateGroupFactor.GroupFactor.Update.TRUE: ", where, err)
						}
					}

				} else {
					where := map[string]interface{}{
						gFactorDB.KeyID:     factorOne.GroupFactorID,
						gFactorDB.KeyStatus: true,
					}

					gFactorOne, err := gFactor.Update(where)
					if err != nil {
						fmt.Println("updateGroupFactor.GroupFactor.Update.FALSE: ", where, err)
					}

					if gFactorOne.ID > 0 {
						value = factorOne.Probability
					}
				}
			}
		}
	}

	return value
}

func updateGroupFactorNil(variableID int64, isCustom bool) {
	factor := factorDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	gFactor := gFactorDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	// Factos y GroupFactor
	factorOne, err := factor.FindOneByVariable(variableID, isCustom)
	if err == nil && factorOne.ID > 0 && factorOne.GroupFactorID > 0 {
		if factorOne.Probability == "" {
			where := map[string]interface{}{
				factorDB.KeyID:          factorOne.ID,
				factorDB.KeyProbability: "0",
			}

			factorOneU, err := factor.Update(where)
			if err != nil {
				fmt.Println("updateGroupFactorNil.Factor.Update: ", where, err)
			}

			if factorOneU.ID > 0 {
				where = map[string]interface{}{
					gFactorDB.KeyID:     factorOne.GroupFactorID,
					gFactorDB.KeyStatus: true,
				}

				_, err = gFactor.Update(where)
				if err != nil {
					fmt.Println("updateGroupFactorNil.GroupFactor.Update: ", where, err)
				}
			}

		} else {
			where := map[string]interface{}{
				gFactorDB.KeyID:     factorOne.GroupFactorID,
				gFactorDB.KeyStatus: true,
			}
			_, err := gFactor.Update(where)

			if err != nil {
				fmt.Println("updateGroupFactorNil.GroupFactor.Update.FALSE: ", where, err)
			}
		}
	}
}
