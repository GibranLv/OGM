package variable

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os/exec"
	"strings"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	alarmDB "github.com/JamsMendez/SION-sw/models/alarm"
	chartDB "github.com/JamsMendez/SION-sw/models/chart"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
	unitDB "github.com/JamsMendez/SION-sw/models/unit"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	"github.com/JamsMendez/SION-sw/routers"
)

type variableOneRecord struct {
	VariableID int64                 `json:"variable_id"`
	Alias      string                `json:"variable_alias"`
	Name       string                `json:"variable_name"`
	Device     string                `json:"variable_device"`
	Color      string                `json:"variable_color,omitempty"`
	Display    string                `json:"variable_display,omitempty"`
	Expression string                `json:"variable_expression,omitempty"`
	Alarms     []alarmJSON           `json:"variable_alarms,omitempty"`
	Records    []recordDB.LiteRecord `json:"records"`
}

type alarmJSON struct {
	ID    int64   `json:"id"`
	Name  string  `json:"name"`
	Color string  `json:"color"`
	Unit  string  `json:"unit"`
	Value float64 `json:"value"`
}

type whereJSON struct {
	Gte string `json:"gte"`
	Lt  string `json:"lt"`
}

type tableJSON struct {
	Table string `json:"table"`
	Key   int    `json:"key"`
}

type queryJSON struct {
	Key    string      `json:"key"`
	Avg    int         `json:"avg"`
	Where  whereJSON   `json:"where"`
	Tables []tableJSON `json:"tables"`
}

type variableRecord struct {
	Variable string                `json:"variable"`
	Records  []recordDB.LiteRecord `json:"records"`
}

type variableCoriolis struct {
	VariableID int64   `json:"variable_id"`
	IsCustom   bool    `json:"is_custom"`
	Value      float64 `json:"value"`
	Timestamp  string  `json:"timestamp"`
}

// SION ... OK!
func getRecords(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	rJSON := recordReq{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("variable.getRecords.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("variable.getRecords.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &rJSON); err != nil {
		fmt.Println("variable.getRecords.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		// Windows OS
		location = time.Local

		//fmt.Println("variable.getRecords.LoadLocation: ", err)

		//msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		//return c.JSON(http.StatusAccepted, msgJSON)
	}

	startDate, err := time.ParseInLocation(constants.DateTimeFormat, rJSON.StartDate, location)
	if err != nil {
		fmt.Println("variable.getRecords.ParseInLocation: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	finalDate, err := time.ParseInLocation(constants.DateTimeFormat, rJSON.FinalDate, location)
	if err != nil {
		fmt.Println("variable.getRecords.ParseInLocation: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	fmt.Println(rJSON.StartDate, rJSON.FinalDate)
	fmt.Println(startDate, finalDate)

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	size := len(rJSON.Variables)
	if size > 0 {
		var variableOne variableDB.Variable
		variablesIn := []variableDB.Variable{}

		for i := 0; i < size; i++ {
			variableID := rJSON.Variables[i]

			if isRoot || isSystemAdmin {
				// Acceso a todas las variables
				where := map[string]interface{}{variableDB.KeyID: variableID}
				variableOne, err = variable.FindOne(where)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else if isAdmin {
				/*
					Acceso a todas las variables de los usuarios con menos valor
					a la sesión del usuario
				*/
				i64 := variableID
				userID := userSession.ID
				value := userSession.Value

				variableOne, err = variable.FindOneByUserOrLowerValue(i64, userID, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else if isOperator || isGuest {
				// Acceso a todas las variables relacionadas con la sesión
				// del usuario
				userID := userSession.ID
				variableOne, err = variable.FindOneByUser(variableID, userID)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// El role de usuario es indefinido.
				msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			if variableOne.ID > 0 {
				variablesIn = append(variablesIn, variableOne)
			}
		}

		alarm := alarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		chart := chartDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		sDate := startDate.UTC()
		fDate := finalDate.UTC()

		duration := fDate.Sub(sDate)
		hours := duration.Hours()

		//avg := ""
		valueAvg := 0

		if hours >= constants.D15InHours && hours < constants.D31InHours {
			//avg = "3m"
			valueAvg = 1000 * 60 * 3

		} else if hours >= constants.D31InHours && hours < constants.D61InHours {
			//avg = "5m"
			valueAvg = 1000 * 60 * 5

		} else if hours >= constants.D61InHours && hours < constants.D181InHours {
			//avg = "10m"
			valueAvg = 1000 * 60 * 10

		} else if hours >= constants.D181InHours && hours < constants.D366InHours {
			//avg = "15m"
			valueAvg = 1000 * 60 * 15

		} else if hours >= constants.D366InHours && hours < constants.D730InHours {
			//avg = "30m"
			valueAvg = 1000 * 60 * 30

		} else if hours >= constants.D730InHours {
			//avg = "1h"
			valueAvg = 1000 * 60 * 60
		}

		queriesJSON := []queryJSON{}
		variablesRecord := []variableOneRecord{}

		for _, variableOne := range variablesIn {
			alias := variableOne.Alias
			tables := getTablesForDates(alias, sDate, fDate)

			tablesJSON := []tableJSON{}

			size := len(tables)
			for i := 0; i < size; i++ {
				tJSON := tableJSON{
					Key:   i,
					Table: tables[i],
				}

				tablesJSON = append(tablesJSON, tJSON)
			}

			gte := sDate.Format(constants.DateTimeFormat)
			lt := fDate.Format(constants.DateTimeFormat)

			q := queryJSON{
				Key: fmt.Sprintf("v_%d", variableOne.ID),
				Where: whereJSON{
					Gte: gte,
					Lt:  lt,
				},
				Tables: tablesJSON,
				Avg:    valueAvg,
			}

			queriesJSON = append(queriesJSON, q)

			fmt.Println(queriesJSON)

			var name, color, display, expression string

			where := map[string]interface{}{
				chartDB.KeyUserID:     userSession.ID,
				chartDB.KeyVariableID: variableOne.ID,
				chartDB.KeyIsCustom:   false,
			}

			chartOne, err := chart.FindOne(where)
			if err != nil {
				fmt.Println("chart.FindOne: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			if chartOne.ID != 0 {
				if chartOne.UnitID != 0 {
					unit := unitDB.Model{
						UserDB: constants.DB.UserSW,
						PwdDB:  constants.DB.PwdSW,
						NameDB: constants.DB.NameSW,
						Host:   constants.DB.HostSW,
						Port:   constants.DB.PortSW,
						Debug:  true,
					}

					where := map[string]interface{}{chartDB.KeyID: chartOne.UnitID}
					unitOne, err := unit.FindOne(where)
					if err != nil {
						fmt.Println("unit.FindOne: ", err)

						msgJSON := constants.MsgError{Message: constants.MsgErr}
						return c.JSON(http.StatusAccepted, msgJSON)
					}

					display = unitOne.Display
					expression = unitOne.Expression
				}

				name = chartOne.Name
				color = chartOne.Color
			}

			if name == "" {
				name = variableOne.Name
			}

			if display == "" {
				display = variableOne.ReadingUnit
			}

			alarmsJSON := []alarmJSON{}

			userID := userSession.ID
			alarms, err := alarm.FindByUserAndVariable(userID, variableOne.ID, false)
			if err == nil {
				for _, alarmOne := range alarms {
					aJSON := alarmJSON{
						ID:    alarmOne.ID,
						Name:  alarmOne.Alias,
						Value: alarmOne.Setpoint,
						Color: alarmOne.Color,
					}

					if alarmOne.UnitID != 0 {
						aJSON.Unit = alarmOne.UnitDisplay
					} else {
						aJSON.Unit = "Unidades"
					}

					alarmsJSON = append(alarmsJSON, aJSON)
				}
			}

			variableRecord := variableOneRecord{
				VariableID: variableOne.ID,
				Alias:      variableOne.Alias,
				Device:     variableOne.Device,
				Name:       name,
				Color:      color,
				Display:    display,
				Expression: expression,
				Alarms:     alarmsJSON,
				Records:    []recordDB.LiteRecord{},
			}

			variablesRecord = append(variablesRecord, variableRecord)
		}

		b, err = json.Marshal(queriesJSON)
		if err != nil {
			fmt.Println(err)

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		sJSON := string(b)

		fmt.Println(sJSON)

		cmd := exec.Command(config.NodePath, "record-manual", sJSON)
		cmd.Dir = config.NodeExecPath
		var out bytes.Buffer
		var stderr bytes.Buffer
		cmd.Stdout = &out
		cmd.Stderr = &stderr
		err = cmd.Run()
		if err != nil {
			fmt.Println(fmt.Sprint(err) + ": " + stderr.String())

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		fmt.Println("Finish...")

		variablesRecordOut := []variableRecord{}

		err = json.Unmarshal(out.Bytes(), &variablesRecordOut)
		if err != nil {
			fmt.Println(err)

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		size := len(variablesRecord)
		for _, variableOneOut := range variablesRecordOut {
			for i := 0; i < size; i++ {
				variableOne := variablesRecord[i]

				key := fmt.Sprintf("v_%d", variableOne.VariableID)
				if key == variableOneOut.Variable {
					variablesRecord[i].Records = variableOneOut.Records
					break
				}
			}
		}

		res := constants.ResJSONs{
			Docs: variablesRecord,
		}

		return c.JSON(http.StatusOK, res)
	}

	msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
	return c.JSON(http.StatusAccepted, msgJSON)
}

func addCoriolis(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	if userSession.Username != "ISIPP_SUNUAPA" && userSession.Username != "ROOT" {
		msgJSON := constants.MsgError{Message: "Usuario Invalido"}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	insertsJSON := []variableCoriolis{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("variable.addCoriolis.ReadAll: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("variable.addCoriolis.c.Request().Body.Close(): ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if err := json.Unmarshal(b, &insertsJSON); err != nil {
		fmt.Println("variable.addCoriolis.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	updates := []constants.UpdateJSON{}

	size := len(insertsJSON)

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	for i := 0; i < size; i++ {
		v := insertsJSON[i]

		if !v.IsCustom {
			where := map[string]interface{}{variableDB.KeyID: v.VariableID}
			variableOne, err := variable.FindOne(where)
			if err == nil {
				update := constants.UpdateJSON{
					Alias:     variableOne.Alias,
					Value:     float32(v.Value),
					Timestamp: v.Timestamp,
				}

				updates = append(updates, update)
			}
		}
	}

	r := constants.UpdateJSONReq{
		AccessToken: "",
		Variables:   updates,
	}

	updateVariables(r, "http://127.0.0.1:3003")

	return c.NoContent(http.StatusOK)
}

func updateVariables(req constants.UpdateJSONReq, sURL string) {
	fmt.Println("UpdateVariables.REQ: ", req)

	buffer, err := json.Marshal(req)
	if err != nil {
		fmt.Println("UpdateVariables.Marshal: ", err)

		return
	}

	s := string(buffer)

	fmt.Println(s)

	body := strings.NewReader(s)
	u := fmt.Sprintf("%s/api/update", sURL)
	u = strings.TrimSpace(u)
	rURL, err := url.Parse(u)
	if err != nil {
		fmt.Println("UpdateVariables.URL.Parse: ", err)

		return
	}

	res, err := http.Post(rURL.String(), "application/json", body)
	if err != nil {
		fmt.Println("UpdateVariables.HTTP.POST: ", err)

		return
	}

	defer res.Body.Close()
	buffer, err = ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("UpdateVariables.ReadAll: ", err)
	}

	fmt.Println("Update.RES.JSON: ", string(buffer))

	var update constants.UpdateRes
	err = json.Unmarshal(buffer, &update)
	if err != nil {
		fmt.Println("UpdateVariables.Unmarshal: ", err)
		return
	}

	if !update.Status {
		fmt.Println("UpdateVariables.Status: false")
		return
	}

	now := time.Now()
	ts := now.Format(constants.DateTimeFormat)
	fmt.Printf("%d Actualizaciones ...%s\n", update.Updated, ts)
}
