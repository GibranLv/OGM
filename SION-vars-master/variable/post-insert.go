package variable

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
)

func createVariables(c echo.Context, configServer constants.ConfigServer) error {
	rJSON := constants.InsertJSONReq{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("createVariables.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("createVariables.c.Request().Body.Close(): ", err)
	}

	fmt.Println("Insert.REQ.JSON: ", string(b))

	if err := json.Unmarshal(b, &rJSON); err != nil {
		fmt.Println("createVariables.Unmarshal: ", err)

		msg := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusBadRequest, msg)
	}

	var rInsert constants.InsertRes
	var status bool
	var accessToken string
	inserted := []constants.InsertJSONRes{}

	iJSON := rJSON.Variables

	sizeInserts := len(iJSON)
	if sizeInserts == 0 {
		// El JSON para crear variables esta vacio
		rInsert = constants.InsertRes{
			Status:      status,
			AccessToken: accessToken,
			Variables:   inserted,
		}

		return c.JSON(http.StatusOK, rInsert)
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

	for i := 0; i < sizeInserts; i++ {
		oJSON := iJSON[i]

		where := map[string]interface{}{
			variableDB.KeyName:   oJSON.Name,
			variableDB.KeyDevice: oJSON.Device,
		}

		variableOne, err := variable.FindOne(where)
		if variableOne.ID == 0 && err == nil {
			variableOne, _ := variable.FindOneLast()

			lastAlias := ""
			if variableOne.Alias != "" {
				lastAlias = variableOne.Alias
			}

			var alias string
			now := time.Now().UTC()

			alias = isAliasAvailable(variable, lastAlias)
			if alias != "" {
				var expressionInsert string
				if oJSON.ExpressionInsert == "" {
					expressionInsert = constants.NA
				}

				values := map[string]interface{}{
					variableDB.KeyName:             oJSON.Name,
					variableDB.KeyAlias:            alias,
					variableDB.KeyDevice:           oJSON.Device,
					variableDB.KeyReadingUnit:      oJSON.ReadingUnit,
					variableDB.KeyExpressionInsert: expressionInsert,
					variableDB.KeyStatus:           oJSON.Status,
					variableDB.KeyCreatedAt:        now,
					variableDB.KeyUpdatedAt:        now,
				}

				variableOne, err := variable.Create(values)
				if variableOne.ID != 0 && err == nil {
					insertOne := constants.InsertJSONRes{
						ID:     variableOne.ID,
						Name:   variableOne.Name,
						Alias:  variableOne.Alias,
						Device: variableOne.Device,
					}

					inserted = append(inserted, insertOne)

					name := GetTable(variableOne.Alias, now)
					err := record.CreateTable(name)
					if err != nil {
						fmt.Println("CreateTable.ERROR: ", err)
					}

				} else {
					fmt.Println("variable.Create.ERROR: ", err, values)
				}
			}
		} else {
			insertOne := constants.InsertJSONRes{
				ID:     variableOne.ID,
				Name:   variableOne.Name,
				Alias:  variableOne.Alias,
				Device: variableOne.Device,
			}

			inserted = append(inserted, insertOne)
		}
	}

	nInserted := len(inserted)
	status = nInserted > 0

	rInsert = constants.InsertRes{
		Status:      status,
		AccessToken: accessToken,
		Variables:   inserted,
	}

	return c.JSON(http.StatusOK, rInsert)
}
