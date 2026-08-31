package customvariable

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os/exec"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	alarmDB "github.com/JamsMendez/SION-sw/models/alarm"
	chartDB "github.com/JamsMendez/SION-sw/models/chart"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
	unitDB "github.com/JamsMendez/SION-sw/models/unit"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
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

// SION ... !OK
func createServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	isOperator := userSession.Role == constants.OperatorUser
	if isGuest || isOperator {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser

	isAdmins := isRoot || isSystemAdmin || isAdmin
	if !isAdmins {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	vJSON := customVariableDB.CustomVariable{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("customVariable.createServer.ReadAll.Request: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("customVariable.createServer.Request.Body: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if err := json.Unmarshal(b, &vJSON); err != nil {
		fmt.Println("customVariable.createServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if vJSON.Name == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "nombre")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vJSON.Device == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "dispositivo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if len(vJSON.VariablesJSON) == 0 {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "variables")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vJSON.Expression == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "expresión aritmetica")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vJSON.Unit == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "unidad")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	now := time.Now().UTC()

	buffer, err := json.Marshal(vJSON.VariablesJSON)
	if err != nil {
		fmt.Println("customVariable.createServer.Marshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	variablesJSON := string(buffer)

	values[customVariableDB.KeyName] = vJSON.Name
	values[customVariableDB.KeyDevice] = vJSON.Device
	values[customVariableDB.KeyVariablesJSON] = variablesJSON
	values[customVariableDB.KeyExpression] = vJSON.Expression
	values[customVariableDB.KeyUnit] = vJSON.Unit
	values[customVariableDB.KeyStatus] = vJSON.Status
	values[customVariableDB.KeyCreatedAt] = now
	values[customVariableDB.KeyUpdatedAt] = now

	customVariable := customVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	customVariableOne, err := customVariable.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeInsertCustomVariable
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se creó la variable personalizada %s", customVariableOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: customVariableOne}
	return c.JSON(http.StatusCreated, resJSON)
}

// SION ... !OK
func getRecords(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	rJSON := recordReq{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("customVariable.getRecords.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("customVariable.getRecords.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &rJSON); err != nil {
		fmt.Println("customVariable.getRecords.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		// Windows OS
		location = time.Local

		//fmt.Println("customVariable.getRecords.LoadLocation: ", err)

		//msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		//return c.JSON(http.StatusAccepted, msgJSON)
	}

	startDate, err := time.ParseInLocation(constants.DateTimeFormat, rJSON.StartDate, location)
	if err != nil {
		fmt.Println("customVariable.getRecords.ParseInLocation: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	finalDate, err := time.ParseInLocation(constants.DateTimeFormat, rJSON.FinalDate, location)
	if err != nil {
		fmt.Println("customVariable.getRecords.ParseInLocation: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	customVariable := customVariableDB.Model{
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
		var customVariableOne customVariableDB.CustomVariable
		variablesIn := []customVariableDB.CustomVariable{}

		for i := 0; i < size; i++ {
			variableID := rJSON.Variables[i]

			if isRoot || isSystemAdmin {
				// Acceso a todas las variables personalizadas
				where := map[string]interface{}{variableDB.KeyID: variableID}
				customVariableOne, err = customVariable.FindOne(where)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else if isAdmin {
				/*
					Acceso a cualquier Variable personalizada de los usuarios con menos valor
					a la sesión del usuario
				*/
				i64 := variableID
				userID := userSession.ID
				value := userSession.Value

				customVariableOne, err = customVariable.FindOneByUserOrLowerValue(i64, userID, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else if isOperator || isGuest {
				userID := userSession.ID

				customVariableOne, err = customVariable.FindOneByUser(variableID, userID)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			if customVariableOne.ID > 0 {
				variablesIn = append(variablesIn, customVariableOne)
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
			alias := fmt.Sprintf("cv_%d", variableOne.ID)
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
				Key: fmt.Sprintf("cv_%d", variableOne.ID),
				Where: whereJSON{
					Gte: gte,
					Lt:  lt,
				},
				Tables: tablesJSON,
				Avg:    valueAvg,
			}

			queriesJSON = append(queriesJSON, q)

			var name, color, display, expression string

			where := map[string]interface{}{
				chartDB.KeyUserID:     userSession.ID,
				chartDB.KeyVariableID: variableOne.ID,
				chartDB.KeyIsCustom:   true,
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
				display = variableOne.Unit
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
				Name:       variableOne.Name,
				Alias:      alias,
				Device:     variableOne.Device,
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

				key := fmt.Sprintf("cv_%d", variableOne.VariableID)
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

	return c.NoContent(http.StatusBadRequest)
}
