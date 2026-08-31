package report

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os/exec"
	"strconv"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	accumulatedDB "github.com/JamsMendez/SION-sw/models/accumulated_flow"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	previousDayDB "github.com/JamsMendez/SION-sw/models/previous_day_flow"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
	recordsRequestDB "github.com/JamsMendez/SION-sw/models/records_request"
	reportDB "github.com/JamsMendez/SION-sw/models/report"
	unitDB "github.com/JamsMendez/SION-sw/models/unit"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	"github.com/JamsMendez/SION-sw/node"
)

// variableItem
/*type variableItem struct {
	ID       int64
	Alias    string
	Name     string
	Unit     string
	IsCustom bool
	UnitID   int64
}*/

// resultJSON ...
type resultJSON struct {
	VariableID int64          `json:"variable_id"`
	IsCustom   bool           `json:"is_custom"`
	Name       string         `json:"name"`
	Cell       string         `json:"cell"`
	Unit       string         `json:"unit"`
	Hrs        []recordDB.AVG `json:"hrs"`
	Page       int            `json:"page"`
}

type whereJSON struct {
	Gte    string   `json:"gte"`
	Lt     string   `json:"lt"`
	Tables []string `json:"tables"`
}

type queryJSON struct {
	Key     string      `json:"key"`
	Wheres  []whereJSON `json:"wheres"`
	IsAvg   bool        `json:"is_avg"`
	IsOlder bool        `json:"is_older"`

	Where  whereJSON `json:"where"`
	Tables []string  `json:"tables"`
}

type variableOneRecord struct {
	VariableID int64                 `json:"variable_id"`
	IsCustom   bool                  `json:"is_custom"`
	Alias      string                `json:"variable_alias"`
	Name       string                `json:"variable_name"`
	Device     string                `json:"variable_device"`
	Display    string                `json:"variable_display,omitempty"`
	Expression string                `json:"variable_expression,omitempty"`
	Records    []recordDB.LiteRecord `json:"records"`
}

type variableRecord struct {
	Variable string                `json:"variable"`
	Records  []recordDB.LiteRecord `json:"records"`
}

// getDaily ...
func getDaily(reportID int64, first, interval string, configServer constants.ConfigServer) ([]resultJSON, bool) {
	results := []resultJSON{}
	var hasErr bool

	report := reportDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{reportDB.KeyID: reportID}
	reportOne, err := report.FindOne(where)
	hasErr = err != nil
	if hasErr {
		return results, hasErr
	}

	if reportOne.ID == 0 {
		message := "No se encontro la información del reporte"
		fmt.Println("report.variable.getDiary: ", message)

		return results, hasErr
	}

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	customVariable := customVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	firstDate, err := time.ParseInLocation(constants.DateFormat, first, location)
	hasErr = err != nil
	if hasErr {
		message := "Reporte Diario: El formato de la fecha de inicio es invalido"
		fmt.Println("report.variable.getDiary: ", message)

		return results, hasErr
	}

	var lastDate time.Time
	now := time.Now().UTC()

	//lastDate = firstDate.UTC().Add(time.Hour * 5)
	//firstDate = lastDate.Add(time.Hour * -24)

	lastDate = time.Date(firstDate.Year(), firstDate.Month(), firstDate.Day(), 5, 0, 0, 0, location).UTC()
	firstDate = lastDate.Add(time.Hour * -24)

	wheres := getWheresForHour(firstDate, lastDate)
	sizeWheres := len(wheres)

	//fmt.Println(wheres)

	structureJSON := reportOne.StructureJSON
	variablesIn := getVariables(structureJSON)

	queriesJSON := []queryJSON{}
	variablesRecord := []variableOneRecord{}

	sizeIn := len(variablesIn)
	if sizeIn == 0 {
		return results, hasErr
	}

	accumulated := accumulatedDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	previousDay := previousDayDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	whereAll := map[string]interface{}{}
	accumulatedVars, err := accumulated.Find(whereAll)
	if err != nil {
		fmt.Println("Report.Variable.getDiary.Accumulated.Find: ", err)
	}

	previousDayVars, err := previousDay.Find(whereAll)
	if err != nil {
		fmt.Println("Report.Variable.getDialy.PreviousDay.Find: ", err)
	}

	for _, variableIn := range variablesIn {
		where := map[string]interface{}{}

		wheresJSON := []whereJSON{}

		if variableIn.IsCustom {
			where[customVariableDB.KeyID] = variableIn.ID
			customVariableOne, err := customVariable.FindOne(where)
			if err == nil {

				alias := fmt.Sprintf("cv_%d", customVariableOne.ID)

				for i := 0; i < sizeWheres; i++ {
					w := wheres[i]

					tables := getTablesForDates(alias, w.Gte, w.Lt)

					var start, final string

					var isPreviousDay bool
					var isAccumulated bool

					for _, previousDayVarOne := range previousDayVars {
						if previousDayVarOne.VariableID == customVariableOne.ID {
							if previousDayVarOne.IsCustom == variableIn.IsCustom {
								isPreviousDay = true
								break
							}
						}
					}

					if !isPreviousDay {
						for _, accumulatedVarOne := range accumulatedVars {
							if accumulatedVarOne.VariableID == customVariableOne.ID {
								if accumulatedVarOne.IsCustom == variableIn.IsCustom {
									isAccumulated = true
									break
								}
							}
						}
					}

					if isPreviousDay {
						start = w.Gte.UTC().Add(time.Minute*15).Format(constants.DateTimeFormat) + "YESTERDAY"
						final = w.Lt.UTC().Add(time.Minute * 15).Format(constants.DateTimeFormat)

					} else if isAccumulated {
						//start = w.Gte.UTC().Add(time.Hour*24).Add(time.Hour*6).Format(constants.DateTimeFormat) + "ACCUMULATED"
						start = w.Gte.UTC().Add(time.Minute*10).Format(constants.DateTimeFormat) + "ACCUMULATED"
						final = w.Lt.UTC().Add(time.Minute * 10).Format(constants.DateTimeFormat)

					} else {
						start = w.Gte.UTC().Format(constants.DateTimeFormat)
						final = w.Lt.UTC().Format(constants.DateTimeFormat)
					}

					wheresJSON = append(wheresJSON, whereJSON{
						Gte:    start,
						Lt:     final,
						Tables: tables,
					})

					/*start := w.Gte.Format(constants.DateTimeFormat)
					final := w.Lt.Format(constants.DateTimeFormat)

					wheresJSON = append(wheresJSON, whereJSON{
						Gte:    start,
						Lt:     final,
						Tables: tables,
					})*/
				}

				qJSON := queryJSON{
					Key:    fmt.Sprintf("cv_%d", customVariableOne.ID),
					Wheres: wheresJSON,
					IsAvg:  true,
				}

				qJSON.Tables = getTablesForDates(alias, firstDate.UTC(), lastDate.UTC())
				qJSON.Where = whereJSON{
					Gte: firstDate.UTC().Format(constants.DateTimeFormat),
					Lt:  lastDate.UTC().Add(time.Minute * 15).Format(constants.DateTimeFormat),
				}

				queriesJSON = append(queriesJSON, qJSON)

				vOne := variableOneRecord{
					VariableID: customVariableOne.ID,
					IsCustom:   true,
					Name:       customVariableOne.Name,
					Alias:      alias,
					Device:     customVariableOne.Device,
					Records:    []recordDB.LiteRecord{},
				}

				if variableIn.UnitID == 0 {
					vOne.Display = customVariableOne.Unit

				} else {
					unit := unitDB.Model{
						UserDB: constants.DB.UserSW,
						PwdDB:  constants.DB.PwdSW,
						NameDB: constants.DB.NameSW,
						Host:   constants.DB.HostSW,
						Port:   constants.DB.PortSW,
						Debug:  true,
					}

					where := map[string]interface{}{unitDB.KeyID: variableIn.UnitID}
					unitOne, err := unit.FindOne(where)
					if err == nil {
						vOne.Display = unitOne.Display
						vOne.Expression = unitOne.Expression
					}
				}

				variablesRecord = append(variablesRecord, vOne)

			} else {
				fmt.Println("report.variable.getDiary.custom_variable: ", err)
			}

		} else {
			where[variableDB.KeyID] = variableIn.ID
			variableOne, err := variable.FindOne(where)
			if err == nil {

				alias := variableOne.Alias

				for i := 0; i < sizeWheres; i++ {
					w := wheres[i]

					tables := getTablesForDates(alias, w.Gte, w.Lt)

					var start, final string

					var isPreviousDay bool
					var isAccumulated bool

					for _, previousDayVarOne := range previousDayVars {
						if previousDayVarOne.VariableID == variableOne.ID {
							if previousDayVarOne.IsCustom == variableIn.IsCustom {
								isPreviousDay = true
								break
							}
						}
					}

					if !isPreviousDay {
						for _, accumulatedVarOne := range accumulatedVars {
							if accumulatedVarOne.VariableID == variableOne.ID {
								if accumulatedVarOne.IsCustom == variableIn.IsCustom {
									isAccumulated = true
									break
								}
							}
						}
					}

					if isPreviousDay {
						start = w.Gte.UTC().Add(time.Minute*15).Format(constants.DateTimeFormat) + "YESTERDAY"
						final = w.Lt.UTC().Add(time.Minute * 15).Format(constants.DateTimeFormat)

					} else if isAccumulated {
						//start = w.Gte.UTC().Add(time.Hour*24).Add(time.Hour*6).Format(constants.DateTimeFormat) + "ACCUMULATED"
						start = w.Gte.UTC().Add(time.Minute*10).Format(constants.DateTimeFormat) + "ACCUMULATED"
						final = w.Lt.UTC().Add(time.Minute * 10).Format(constants.DateTimeFormat)

					} else {
						start = w.Gte.UTC().Format(constants.DateTimeFormat)
						final = w.Lt.UTC().Format(constants.DateTimeFormat)
					}

					wheresJSON = append(wheresJSON, whereJSON{
						Gte:    start,
						Lt:     final,
						Tables: tables,
					})
				}

				qJSON := queryJSON{
					Key:    fmt.Sprintf("v_%d", variableOne.ID),
					Wheres: wheresJSON,
					IsAvg:  true,
				}

				qJSON.Tables = getTablesForDates(alias, firstDate.UTC(), lastDate.UTC())
				qJSON.Where = whereJSON{
					Gte: firstDate.UTC().Format(constants.DateTimeFormat),
					Lt:  lastDate.UTC().Add(time.Minute * 15).Format(constants.DateTimeFormat),
				}

				queriesJSON = append(queriesJSON, qJSON)

				vOne := variableOneRecord{
					VariableID: variableOne.ID,
					Name:       variableOne.Name,
					Alias:      variableOne.Alias,
					Device:     variableOne.Device,
					Records:    []recordDB.LiteRecord{},
				}

				if variableIn.UnitID == 0 {
					vOne.Display = variableOne.ReadingUnit

				} else {
					unit := unitDB.Model{
						UserDB: constants.DB.UserSW,
						PwdDB:  constants.DB.PwdSW,
						NameDB: constants.DB.NameSW,
						Host:   constants.DB.HostSW,
						Port:   constants.DB.PortSW,
						Debug:  true,
					}

					where := map[string]interface{}{unitDB.KeyID: variableIn.UnitID}
					unitOne, err := unit.FindOne(where)
					if err == nil {
						vOne.Display = unitOne.Display
						vOne.Expression = unitOne.Expression
					}
				}

				variablesRecord = append(variablesRecord, vOne)

			} else {
				fmt.Println("report.variable.getDiary.variable: ", err)
			}
		}
	}

	b, err := json.Marshal(queriesJSON)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getDiary.Marshal(queriesJSON): ", err)

		return results, hasErr
	}

	recordsRequest := recordsRequestDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	sJSON := string(b)

	values := map[string]interface{}{
		recordsRequestDB.KeyJSON:      sJSON,
		recordsRequestDB.KeyCreatedAt: now,
	}

	requestOne, err := recordsRequest.Create(values)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getDiary.recordsRequest.Create: ", err)

		return results, hasErr
	}

	binaryFile := "record-one"

	sID := fmt.Sprintf("%d", requestOne.ID)
	cmd := exec.Command(configServer.NodePath, binaryFile, sID)
	cmd.Dir = configServer.NodeExecPath
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err = cmd.Run()
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getDiary.Command: ", err)

		return results, hasErr
	}

	fmt.Println("Finish...")

	time.Sleep(time.Millisecond * 1000)

	where = map[string]interface{}{recordsRequestDB.KeyID: requestOne.ID}
	_, err = recordsRequest.Remove(where)
	if err != nil {
		fmt.Println("report.variable.getDiary.recordsRequest.Remove: ", err)
	}

	variablesRecordOut := []variableRecord{}

	err = json.Unmarshal(out.Bytes(), &variablesRecordOut)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getDiary.Unmarshal: ", err)

		return results, hasErr
	}

	sizeOut := len(variablesRecordOut)
	for i := 0; i < sizeOut; i++ {
		variableOneRecordOut := variablesRecordOut[i]

		var ID int64
		var isCustom bool

		key := variableOneRecordOut.Variable

		values := strings.Split(key, "_")
		if len(values) == 2 {
			t := values[0]
			if t == "cv" {
				isCustom = true
			} else {
				isCustom = false
			}

			s := values[1]
			v, err := strconv.Atoi(s)
			if err == nil {
				ID = int64(v)
			}
		}

		for _, variableOneRecord := range variablesRecord {
			if ID == variableOneRecord.VariableID {
				if isCustom == variableOneRecord.IsCustom {
					avgs := []recordDB.AVG{}

					records := variableOneRecordOut.Records
					sizeRecord := len(records)

					for j := 0; j < sizeRecord; j++ {
						record := records[j]
						timestamp := record.Timestamp.In(location).Format(constants.DateTimeFormat)

						avg := recordDB.AVG{
							Value:           record.Value,
							TimestampString: timestamp,
						}

						expression := variableOneRecord.Expression

						// Expression de conversión
						if expression != "" {
							nValue, isOk := node.EvalueExpressionUnit(expression, avg.Value)
							if isOk {
								avg.Value = nValue
							}
						}

						avgs = append(avgs, avg)
					}

					result := resultJSON{
						VariableID: ID,
						IsCustom:   isCustom,
						Name:       variableOneRecord.Name,
						Unit:       variableOneRecord.Display,
						Hrs:        avgs,
					}

					for _, variableIn := range variablesIn {
						if variableIn.ID == ID {
							if variableIn.IsCustom == isCustom {
								result.Cell = variableIn.Cell
								result.Page = variableIn.Page

								if variableIn.Name != "" {
									result.Name = variableIn.Name
								}

								break
							}
						}
					}

					results = append(results, result)
					break
				}
			}
		}
	}

	// RESET
	//queriesJSON = []queryJSON{}
	//variablesIn = []reportDB.VariableJSON{}
	//variablesRecord = []variableOneRecord{}
	variablesRecordOut = []variableRecord{}

	return results, hasErr
}

// getAnnual ...
func getAnnual(reportID int64, year int, configServer constants.ConfigServer) ([]resultJSON, bool) {
	results := []resultJSON{}
	var hasErr bool

	report := reportDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{reportDB.KeyID: reportID}
	reportOne, err := report.FindOne(where)
	hasErr = err != nil
	if hasErr {
		return results, hasErr
	}

	if reportOne.ID == 0 {
		message := "No se encontro la información del reporte"
		fmt.Println("report.variable.getAnnual: ", message)

		return results, hasErr
	}

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	customVariable := customVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	first := fmt.Sprintf("%d-01-01 00:00:00", year)
	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	firstDate, err := time.ParseInLocation(constants.DateTimeFormat, first, location)
	hasErr = err != nil
	if hasErr {
		message := "Reporte Anual: El formato de la fecha de inicio es invalido"
		fmt.Println("report.variable.getAnnual: ", message)

		return results, hasErr
	}

	wheres := getWheresForMonth(firstDate)
	sizeWheres := len(wheres)

	structureJSON := reportOne.StructureJSON
	variablesIn := getVariables(structureJSON)

	queriesJSON := []queryJSON{}
	variablesRecord := []variableOneRecord{}

	for _, variableIn := range variablesIn {
		where := map[string]interface{}{}

		wheresJSON := []whereJSON{}

		if variableIn.IsCustom {
			where[customVariableDB.KeyID] = variableIn.ID
			customVariableOne, err := customVariable.FindOne(where)
			if err == nil {

				alias := fmt.Sprintf("cv_%d", customVariableOne.ID)

				for i := 0; i < sizeWheres; i++ {
					w := wheres[i]

					tables := getTablesForDates(alias, w.Gte.UTC(), w.Lt.UTC())

					start := w.Gte.UTC().Format(constants.DateTimeFormat)
					final := w.Lt.UTC().Format(constants.DateTimeFormat)

					wheresJSON = append(wheresJSON, whereJSON{
						Gte:    start,
						Lt:     final,
						Tables: tables,
					})
				}

				qJSON := queryJSON{
					Key:    fmt.Sprintf("cv_%d", customVariableOne.ID),
					Wheres: wheresJSON,
					IsAvg:  true,
				}

				lastDate := firstDate.AddDate(1, 0, 0)
				qJSON.Tables = getTablesForDates(alias, firstDate.UTC(), lastDate.UTC())
				qJSON.Where = whereJSON{
					Gte: firstDate.UTC().Format(constants.DateTimeFormat),
					Lt:  lastDate.UTC().Format(constants.DateTimeFormat),
				}

				queriesJSON = append(queriesJSON, qJSON)

				vOne := variableOneRecord{
					VariableID: customVariableOne.ID,
					IsCustom:   true,
					Name:       customVariableOne.Name,
					Alias:      alias,
					Device:     customVariableOne.Device,
					Records:    []recordDB.LiteRecord{},
				}

				if variableIn.UnitID == 0 {
					vOne.Display = customVariableOne.Unit

				} else {
					unit := unitDB.Model{
						UserDB: constants.DB.UserSW,
						PwdDB:  constants.DB.PwdSW,
						NameDB: constants.DB.NameSW,
						Host:   constants.DB.HostSW,
						Port:   constants.DB.PortSW,
						Debug:  true,
					}

					where := map[string]interface{}{unitDB.KeyID: variableIn.UnitID}
					unitOne, err := unit.FindOne(where)
					if err == nil {
						vOne.Display = unitOne.Display
						vOne.Expression = unitOne.Expression
					}
				}

				variablesRecord = append(variablesRecord, vOne)

			} else {
				fmt.Println("report.variable.getAnnual.custom_variable: ", err)
			}

		} else {
			where[variableDB.KeyID] = variableIn.ID
			variableOne, err := variable.FindOne(where)
			if err == nil {

				alias := variableOne.Alias

				for i := 0; i < sizeWheres; i++ {
					w := wheres[i]

					tables := getTablesForDates(alias, w.Gte.UTC(), w.Lt.UTC())

					start := w.Gte.UTC().Format(constants.DateTimeFormat)
					final := w.Lt.UTC().Format(constants.DateTimeFormat)

					wheresJSON = append(wheresJSON, whereJSON{
						Gte:    start,
						Lt:     final,
						Tables: tables,
					})
				}

				qJSON := queryJSON{
					Key:    fmt.Sprintf("v_%d", variableOne.ID),
					Wheres: wheresJSON,
					IsAvg:  true,
				}

				lastDate := firstDate.AddDate(1, 0, 0)
				qJSON.Tables = getTablesForDates(alias, firstDate.UTC(), lastDate.UTC())
				qJSON.Where = whereJSON{
					Gte: firstDate.UTC().Format(constants.DateTimeFormat),
					Lt:  lastDate.UTC().Format(constants.DateTimeFormat),
				}

				queriesJSON = append(queriesJSON, qJSON)

				vOne := variableOneRecord{
					VariableID: variableOne.ID,
					Name:       variableOne.Name,
					Alias:      variableOne.Alias,
					Device:     variableOne.Device,
					Records:    []recordDB.LiteRecord{},
				}

				if variableIn.UnitID == 0 {
					vOne.Display = variableOne.ReadingUnit

				} else {
					unit := unitDB.Model{
						UserDB: constants.DB.UserSW,
						PwdDB:  constants.DB.PwdSW,
						NameDB: constants.DB.NameSW,
						Host:   constants.DB.HostSW,
						Port:   constants.DB.PortSW,
						Debug:  true,
					}

					where := map[string]interface{}{unitDB.KeyID: variableIn.UnitID}
					unitOne, err := unit.FindOne(where)
					if err == nil {
						vOne.Display = unitOne.Display
						vOne.Expression = unitOne.Expression
					}
				}

				variablesRecord = append(variablesRecord, vOne)

			} else {
				fmt.Println("report.variable.getAnnual.variable: ", err)
			}
		}
	}

	b, err := json.Marshal(queriesJSON)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getAnnual.Marshal(queriesJSON): ", err)

		return results, hasErr
	}

	recordsRequest := recordsRequestDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	sJSON := string(b)
	now := time.Now().UTC()

	values := map[string]interface{}{
		recordsRequestDB.KeyJSON:      sJSON,
		recordsRequestDB.KeyCreatedAt: now,
	}

	requestOne, err := recordsRequest.Create(values)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getAnnual.recordsRequest.Create: ", err)

		return results, hasErr
	}

	sID := fmt.Sprintf("%d", requestOne.ID)
	cmd := exec.Command(configServer.NodePath, "record", sID)
	cmd.Dir = configServer.NodeExecPath
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err = cmd.Run()
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getAnnual.Command: ", err)

		return results, hasErr
	}

	fmt.Println("Finish...")

	where = map[string]interface{}{recordsRequestDB.KeyID: requestOne.ID}
	_, err = recordsRequest.Remove(where)
	if err != nil {
		fmt.Println("report.variable.getAnnual.recordsRequest.Remove: ", err)
	}

	variablesRecordOut := []variableRecord{}

	err = json.Unmarshal(out.Bytes(), &variablesRecordOut)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getAnnual.Unmarshal: ", err)

		return results, hasErr
	}

	sizeOut := len(variablesRecordOut)
	for i := 0; i < sizeOut; i++ {
		variableOneRecordOut := variablesRecordOut[i]

		var ID int64
		var isCustom bool

		key := variableOneRecordOut.Variable

		values := strings.Split(key, "_")
		if len(values) == 2 {
			t := values[0]
			if t == "cv" {
				isCustom = true
			} else {
				isCustom = false
			}

			s := values[1]
			v, err := strconv.Atoi(s)
			if err == nil {
				ID = int64(v)
			}
		}

		for _, variableOneRecord := range variablesRecord {

			if ID == variableOneRecord.VariableID {
				if isCustom == variableOneRecord.IsCustom {
					avgs := []recordDB.AVG{}

					records := variableOneRecordOut.Records
					sizeRecord := len(records)

					for j := 0; j < sizeRecord; j++ {
						record := records[j]
						timestamp := record.Timestamp.In(location).Format(constants.DateTimeFormat)

						avg := recordDB.AVG{
							Value:           record.Value,
							TimestampString: timestamp,
						}

						expression := variableOneRecord.Expression

						// Expression de conversión
						if expression != "" {
							nValue, isOk := node.EvalueExpressionUnit(expression, avg.Value)
							if isOk {
								avg.Value = nValue
							}
						}

						avgs = append(avgs, avg)
					}

					result := resultJSON{
						VariableID: ID,
						IsCustom:   isCustom,
						Name:       variableOneRecord.Name,
						Unit:       variableOneRecord.Display,
						Hrs:        avgs,
					}

					for _, variableIn := range variablesIn {
						if variableIn.ID == ID {
							if variableIn.IsCustom == isCustom {
								result.Cell = variableIn.Cell
								result.Page = variableIn.Page

								if variableIn.Name != "" {
									result.Name = variableIn.Name
								}

								break
							}
						}
					}

					results = append(results, result)
					break
				}
			}
		}
	}

	// RESET
	//queriesJSON = []queryJSON{}
	//variablesIn = []reportDB.VariableJSON{}
	//variablesRecord = []variableOneRecord{}
	variablesRecordOut = []variableRecord{}

	return results, hasErr
}

// getCustom ...
func getCustom(reportID int64, first, last string, interval string, configServer constants.ConfigServer) ([]resultJSON, bool) {
	results := []resultJSON{}
	var hasErr bool

	report := reportDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{reportDB.KeyID: reportID}
	reportOne, err := report.FindOne(where)
	hasErr = err != nil
	if hasErr {
		return results, hasErr
	}

	if reportOne.ID == 0 {
		message := "No se encontro la información del reporte"
		fmt.Println("report.variable.getCustom: ", message)

		return results, hasErr
	}

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	customVariable := customVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	firstDate, err := time.ParseInLocation(constants.DateTimeFormat, first, location)
	hasErr = err != nil
	if hasErr {
		message := "Reporte Personalizado: El formato de la fecha de inicio es invalido"
		fmt.Println("report.variable.getCustom: ", message)

		return results, hasErr
	}

	lastDate, err := time.ParseInLocation(constants.DateTimeFormat, last, location)
	hasErr = err != nil
	if hasErr {
		message := "Reporte Personalizado: El formato de la fecha de final es invalido"
		fmt.Println("report.variable.getCustom: ", message)

		return results, hasErr
	}

	isAvg := interval != constants.NA

	// firstDate y lastDate usango constants.TZ
	wheres := getWheresForInterval(firstDate, lastDate, interval)
	sizeWheres := len(wheres)

	if !isAvg {
		wheres = []whereDate{}
		sizeWheres = 0
	}

	structureJSON := reportOne.StructureJSON
	variablesIn := getVariables(structureJSON)

	queriesJSON := []queryJSON{}
	variablesRecord := []variableOneRecord{}

	accumulated := accumulatedDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	previousDay := previousDayDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	whereAll := map[string]interface{}{}
	accumulatedVars, err := accumulated.Find(whereAll)
	if err != nil {
		fmt.Println("Report.Variable.getCustom.Accumulated.Find: ", err)
	}

	previousDayVars, err := previousDay.Find(whereAll)
	if err != nil {
		fmt.Println("Report.Variable.getCustom.PreviousDay.Find: ", err)
	}

	for _, variableIn := range variablesIn {
		where := map[string]interface{}{}

		wheresJSON := []whereJSON{}

		if variableIn.IsCustom {
			where[customVariableDB.KeyID] = variableIn.ID
			customVariableOne, err := customVariable.FindOne(where)
			if err == nil {

				alias := fmt.Sprintf("cv_%d", customVariableOne.ID)

				for i := 0; i < sizeWheres; i++ {
					w := wheres[i]

					tables := getTablesForDates(alias, w.Gte.UTC(), w.Lt.UTC())

					/*start := w.Gte.UTC().Format(constants.DateTimeFormat)
					final := w.Lt.UTC().Format(constants.DateTimeFormat)

					wheresJSON = append(wheresJSON, whereJSON{
						Gte:    start,
						Lt:     final,
						Tables: tables,
					})*/

					var start, final string

					var isPreviousDay bool
					var isAccumulated bool

					//if interval == constants.Hour {
					for _, previousDayVarOne := range previousDayVars {
						if previousDayVarOne.VariableID == customVariableOne.ID {
							if previousDayVarOne.IsCustom == variableIn.IsCustom {
								isPreviousDay = true
								break
							}
						}
					}

					if !isPreviousDay {
						for _, accumulatedVarOne := range accumulatedVars {
							if accumulatedVarOne.VariableID == customVariableOne.ID {
								if accumulatedVarOne.IsCustom == variableIn.IsCustom {
									isAccumulated = true
									break
								}
							}
						}
					}
					//}

					if isPreviousDay {
						if interval == constants.Hour {
							start = w.Gte.UTC().Add(time.Minute*15).Format(constants.DateTimeFormat) + "YESTERDAY"
							final = w.Lt.UTC().Add(time.Minute * 15).Format(constants.DateTimeFormat)

						} else {
							start = w.Gte.UTC().Format(constants.DateTimeFormat)
							final = w.Lt.UTC().Format(constants.DateTimeFormat)
						}

					} else if isAccumulated {
						//start = w.Gte.UTC().Add(time.Hour*24).Add(time.Hour*6).Format(constants.DateTimeFormat) + "ACCUMULATED"
						if interval == constants.Hour {
							start = w.Gte.UTC().Add(time.Minute*10).Format(constants.DateTimeFormat) + "ACCUMULATED"
							final = w.Lt.UTC().Add(time.Minute * 10).Format(constants.DateTimeFormat)

						} else {
							if isAvg {
								start = w.Gte.UTC().Format(constants.DateTimeFormat) + "ACCUMULATED"

							} else {
								start = w.Gte.UTC().Format(constants.DateTimeFormat)
							}

							if interval == constants.Minute {
								start = w.Gte.UTC().Format(constants.DateTimeFormat)
							}

							final = w.Lt.UTC().Format(constants.DateTimeFormat)
						}

					} else {
						start = w.Gte.UTC().Format(constants.DateTimeFormat)
						final = w.Lt.UTC().Format(constants.DateTimeFormat)
					}

					wheresJSON = append(wheresJSON, whereJSON{
						Gte:    start,
						Lt:     final,
						Tables: tables,
					})
				}

				qJSON := queryJSON{
					Key:    fmt.Sprintf("cv_%d", customVariableOne.ID),
					Wheres: wheresJSON,
					IsAvg:  isAvg,
				}

				qJSON.Tables = getTablesForDates(alias, firstDate.UTC(), lastDate.UTC())
				qJSON.Where = whereJSON{
					Gte: firstDate.UTC().Format(constants.DateTimeFormat),
					Lt:  lastDate.UTC().Format(constants.DateTimeFormat),
				}

				if interval == constants.Hour {
					qJSON.Where = whereJSON{
						Gte: firstDate.UTC().Format(constants.DateTimeFormat),
						Lt:  lastDate.UTC().Add(time.Minute * 15).Format(constants.DateTimeFormat),
					}
				}

				queriesJSON = append(queriesJSON, qJSON)

				vOne := variableOneRecord{
					VariableID: customVariableOne.ID,
					IsCustom:   true,
					Name:       customVariableOne.Name,
					Alias:      alias,
					Device:     customVariableOne.Device,
					Records:    []recordDB.LiteRecord{},
				}

				if variableIn.UnitID == 0 {
					vOne.Display = customVariableOne.Unit

				} else {
					unit := unitDB.Model{
						UserDB: constants.DB.UserSW,
						PwdDB:  constants.DB.PwdSW,
						NameDB: constants.DB.NameSW,
						Host:   constants.DB.HostSW,
						Port:   constants.DB.PortSW,
						Debug:  true,
					}

					where := map[string]interface{}{unitDB.KeyID: variableIn.UnitID}
					unitOne, err := unit.FindOne(where)
					if err == nil {
						vOne.Display = unitOne.Display
						vOne.Expression = unitOne.Expression
					}
				}

				variablesRecord = append(variablesRecord, vOne)

			} else {
				fmt.Println("report.variable.getCustom.custom_variable: ", err)
			}

		} else {
			where[variableDB.KeyID] = variableIn.ID
			variableOne, err := variable.FindOne(where)
			if err == nil {

				alias := variableOne.Alias

				for i := 0; i < sizeWheres; i++ {
					w := wheres[i]

					tables := getTablesForDates(alias, w.Gte.UTC(), w.Lt.UTC())

					/*start := w.Gte.UTC().Format(constants.DateTimeFormat)
					final := w.Lt.UTC().Format(constants.DateTimeFormat)

					wheresJSON = append(wheresJSON, whereJSON{
						Gte:    start,
						Lt:     final,
						Tables: tables,
					})*/

					var start, final string

					var isPreviousDay bool
					var isAccumulated bool

					//if interval == constants.Hour {
					for _, previousDayVarOne := range previousDayVars {
						if previousDayVarOne.VariableID == variableOne.ID {
							if previousDayVarOne.IsCustom == variableIn.IsCustom {
								isPreviousDay = true
								break
							}
						}
					}

					if !isPreviousDay {
						for _, accumulatedVarOne := range accumulatedVars {
							if accumulatedVarOne.VariableID == variableOne.ID {
								if accumulatedVarOne.IsCustom == variableIn.IsCustom {
									isAccumulated = true
									break
								}
							}
						}
					}
					//}

					if isPreviousDay {
						if interval == constants.Hour {
							start = w.Gte.UTC().Add(time.Minute*15).Format(constants.DateTimeFormat) + "YESTERDAY"
							final = w.Lt.UTC().Add(time.Minute * 15).Format(constants.DateTimeFormat)

						} else {
							start = w.Gte.UTC().Format(constants.DateTimeFormat)
							final = w.Lt.UTC().Format(constants.DateTimeFormat)

						}

					} else if isAccumulated {
						//start = w.Gte.UTC().Add(time.Hour*24).Add(time.Hour*6).Format(constants.DateTimeFormat) + "ACCUMULATED"
						if interval == constants.Hour {
							start = w.Gte.UTC().Add(time.Minute*10).Format(constants.DateTimeFormat) + "ACCUMULATED"
							final = w.Lt.UTC().Add(time.Minute * 10).Format(constants.DateTimeFormat)
						} else {

							if isAvg {
								start = w.Gte.UTC().Format(constants.DateTimeFormat) + "ACCUMULATED"

							} else {
								start = w.Gte.UTC().Format(constants.DateTimeFormat)
							}

							if interval == constants.Minute {
								start = w.Gte.UTC().Format(constants.DateTimeFormat)
							}

							final = w.Lt.UTC().Format(constants.DateTimeFormat)
						}

					} else {
						start = w.Gte.UTC().Format(constants.DateTimeFormat)
						final = w.Lt.UTC().Format(constants.DateTimeFormat)
					}

					wheresJSON = append(wheresJSON, whereJSON{
						Gte:    start,
						Lt:     final,
						Tables: tables,
					})
				}

				qJSON := queryJSON{
					Key:    fmt.Sprintf("v_%d", variableOne.ID),
					Wheres: wheresJSON,
					IsAvg:  isAvg,
				}

				qJSON.Tables = getTablesForDates(alias, firstDate.UTC(), lastDate.UTC())
				qJSON.Where = whereJSON{
					Gte: firstDate.UTC().Format(constants.DateTimeFormat),
					Lt:  lastDate.UTC().Format(constants.DateTimeFormat),
				}

				if interval == constants.Hour {
					qJSON.Where = whereJSON{
						Gte: firstDate.UTC().Format(constants.DateTimeFormat),
						Lt:  lastDate.UTC().Add(time.Minute * 15).Format(constants.DateTimeFormat),
					}
				}

				queriesJSON = append(queriesJSON, qJSON)

				vOne := variableOneRecord{
					VariableID: variableOne.ID,
					Name:       variableOne.Name,
					Alias:      variableOne.Alias,
					Device:     variableOne.Device,
					Records:    []recordDB.LiteRecord{},
				}

				if variableIn.UnitID == 0 {
					vOne.Display = variableOne.ReadingUnit

				} else {
					unit := unitDB.Model{
						UserDB: constants.DB.UserSW,
						PwdDB:  constants.DB.PwdSW,
						NameDB: constants.DB.NameSW,
						Host:   constants.DB.HostSW,
						Port:   constants.DB.PortSW,
						Debug:  true,
					}

					where := map[string]interface{}{unitDB.KeyID: variableIn.UnitID}
					unitOne, err := unit.FindOne(where)
					if err == nil {
						vOne.Display = unitOne.Display
						vOne.Expression = unitOne.Expression
					}
				}

				variablesRecord = append(variablesRecord, vOne)

			} else {
				fmt.Println("report.variable.getCustom.variable: ", err)
			}
		}
	}

	b, err := json.Marshal(queriesJSON)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getCustom.Marshal(queriesJSON): ", err)

		return results, hasErr
	}

	recordsRequest := recordsRequestDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	sJSON := string(b)
	now := time.Now().UTC()

	values := map[string]interface{}{
		recordsRequestDB.KeyJSON:      sJSON,
		recordsRequestDB.KeyCreatedAt: now,
	}

	requestOne, err := recordsRequest.Create(values)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getCustom.recordsRequest.Create: ", err)

		return results, hasErr
	}

	binaryFile := "record-one"
	/*if interval == constants.Minute {
		//binaryFile = "record-minute"
		binaryFile = "record-minute-one"
	}*/

	sID := fmt.Sprintf("%d", requestOne.ID)
	cmd := exec.Command(configServer.NodePath, binaryFile, sID)
	cmd.Dir = configServer.NodeExecPath
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err = cmd.Run()
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getCustom.Command: ", err)

		return results, hasErr
	}

	fmt.Println("Finish...")

	time.Sleep(time.Millisecond * 1000)

	where = map[string]interface{}{recordsRequestDB.KeyID: requestOne.ID}
	_, err = recordsRequest.Remove(where)
	if err != nil {
		fmt.Println("report.variable.getCustom.recordsRequest.Remove: ", err)
	}

	variablesRecordOut := []variableRecord{}

	err = json.Unmarshal(out.Bytes(), &variablesRecordOut)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getCustom.Unmarshal: ", err)

		return results, hasErr
	}

	sizeOut := len(variablesRecordOut)
	for i := 0; i < sizeOut; i++ {
		variableOneRecordOut := variablesRecordOut[i]

		var ID int64
		var isCustom bool

		key := variableOneRecordOut.Variable

		values := strings.Split(key, "_")
		if len(values) == 2 {
			t := values[0]
			if t == "cv" {
				isCustom = true
			} else {
				isCustom = false
			}

			s := values[1]
			v, err := strconv.Atoi(s)
			if err == nil {
				ID = int64(v)
			}
		}

		for _, variableOneRecord := range variablesRecord {
			if ID == variableOneRecord.VariableID {
				if isCustom == variableOneRecord.IsCustom {

					var isPreviousDay bool
					var isAccumulated bool

					//if interval == constants.Hour {
					for _, previousDayVarOne := range previousDayVars {
						if previousDayVarOne.VariableID == variableOneRecord.VariableID {
							if previousDayVarOne.IsCustom == variableOneRecord.IsCustom {
								isPreviousDay = true
								break
							}
						}
					}

					if !isPreviousDay {
						for _, accumulatedVarOne := range accumulatedVars {
							if accumulatedVarOne.VariableID == variableOneRecord.VariableID {
								if accumulatedVarOne.IsCustom == variableOneRecord.IsCustom {
									isAccumulated = true
									break
								}
							}
						}
					}
					//}

					avgs := []recordDB.AVG{}

					records := variableOneRecordOut.Records
					sizeRecord := len(records)

					for j := 0; j < sizeRecord; j++ {
						record := records[j]
						timestamp := record.Timestamp.In(location).Format(constants.DateTimeFormat)

						if isPreviousDay {
							if interval == constants.Hour {
								timestamp = record.Timestamp.Add(time.Minute * -15).In(location).Format(constants.DateTimeFormat)

							} else {
								timestamp = record.Timestamp.In(location).Format(constants.DateTimeFormat)
							}
						}

						if isAccumulated {
							if interval == constants.Hour {
								timestamp = record.Timestamp.Add(time.Minute * -10).In(location).Format(constants.DateTimeFormat)

							} else {
								timestamp = record.Timestamp.In(location).Format(constants.DateTimeFormat)
							}
						}

						avg := recordDB.AVG{
							Value:           record.Value,
							Timestamp:       record.Timestamp,
							TimestampString: timestamp,
						}

						expression := variableOneRecord.Expression

						// Expression de conversión
						if expression != "" {
							nValue, isOk := node.EvalueExpressionUnit(expression, avg.Value)
							if isOk {
								avg.Value = nValue
							}
						}

						avgs = append(avgs, avg)
					}

					result := resultJSON{
						VariableID: ID,
						IsCustom:   isCustom,
						Name:       variableOneRecord.Name,
						Unit:       variableOneRecord.Display,
						Hrs:        avgs,
					}

					for _, variableIn := range variablesIn {
						if variableIn.ID == ID {
							if variableIn.IsCustom == isCustom {
								result.Cell = variableIn.Cell
								result.Page = variableIn.Page

								if variableIn.Name != "" {
									result.Name = variableIn.Name
								}

								break
							}
						}
					}

					results = append(results, result)
					break
				}
			}
		}
	}

	// RESET
	//queriesJSON = []queryJSON{}
	//variablesIn = []reportDB.VariableJSON{}
	//variablesRecord = []variableOneRecord{}
	variablesRecordOut = []variableRecord{}

	return results, hasErr
}

func getVariables(structureJSON []reportDB.StructJSON) []reportDB.VariableJSON {
	variables := []reportDB.VariableJSON{}

	sSize := len(structureJSON)
	if sSize > 0 {
		for i := 0; i < sSize; i++ {
			structJSON := structureJSON[i]
			// Se obtiene las variables
			variablesIn := structJSON.Variables
			vSize := len(variablesIn)
			for j := 0; j < vSize; j++ {
				variablesIn[j].Page = structJSON.Page
				variables = append(variables, variablesIn[j])
			}

			sSize := len(structJSON.Sons)
			if sSize > 0 {
				variablesIn := getVariables(structJSON.Sons)
				vSize := len(variablesIn)
				for j := 0; j < vSize; j++ {
					variablesIn[j].Page = structJSON.Page
					variables = append(variables, variablesIn[j])
				}
			}
		}
	}

	return variables
}

func getGroups(structure []reportDB.Struct) []reportDB.Struct {
	groups := []reportDB.Struct{}

	sSize := len(structure)
	if sSize > 0 {
		for i := 0; i < sSize; i++ {
			structOne := structure[i]

			groupOne := reportDB.Struct{
				ID:   structOne.ID,
				Name: structOne.Name,
				Cell: structOne.Cell,
				Page: structOne.Page,
			}

			groups = append(groups, groupOne)

			sSize := len(structOne.Sons)
			if sSize > 0 {
				groupsIn := getGroups(structOne.Sons)
				gSize := len(groupsIn)
				if gSize > 0 {
					groups = append(groups, groupsIn...)
				}
			}
		}
	}

	return groups
}

// getMonthly ...
func getMonthly(reportID int64, first, last, interval string, configServer constants.ConfigServer) ([]resultJSON, bool) {
	results := []resultJSON{}
	var hasErr bool

	report := reportDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{reportDB.KeyID: reportID}
	reportOne, err := report.FindOne(where)
	hasErr = err != nil
	if hasErr {
		return results, hasErr
	}

	if reportOne.ID == 0 {
		message := "No se encontro la información del reporte"
		fmt.Println("report.variable.getMonthly: ", message)

		return results, hasErr
	}

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	customVariable := customVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	firstDate, err := time.ParseInLocation(constants.DateFormat, first, location)
	hasErr = err != nil
	if hasErr {
		message := "Reporte Mensual: El formato de la fecha de inicio es invalido"
		fmt.Println("report.variable.getMonthly: ", message)

		return results, hasErr
	}

	//fmt.Println(last)

	lastDate, err := time.ParseInLocation(constants.DateFormat, last, location)
	hasErr = err != nil
	if hasErr {
		message := "Reporte Mensual: El formato de la fecha de final es invalido"
		fmt.Println("report.variable.getMonthly: ", message)

		return results, hasErr
	}

	if interval == constants.Daily {
		yesterday := time.Date(firstDate.Year(), firstDate.Month(), firstDate.Day(), 5, 0, 0, 0, location)
		firstDate = yesterday.Add(time.Hour * -24)

		lastDate = time.Date(lastDate.Year(), lastDate.Month(), lastDate.Day(), 5, 0, 0, 0, location)
	}

	accumulated := accumulatedDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	previousDay := previousDayDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	whereAll := map[string]interface{}{}
	accumulatedVars, err := accumulated.Find(whereAll)
	if err != nil {
		fmt.Println("Report.Variable.getMonthly.Accumulated.Find: ", err)
	}

	previousDayVars, err := previousDay.Find(whereAll)
	if err != nil {
		fmt.Println("Report.Variable.getMonthly.PreviousDay.Find: ", err)
	}

	fmt.Println("Something ...: ", accumulatedVars)

	//var wheres []whereDate
	wheres := getWheresForDay(firstDate, lastDate)

	sizeWheres := len(wheres)

	structureJSON := reportOne.StructureJSON
	variablesIn := getVariables(structureJSON)

	//variables := []variableItem{}

	queriesJSON := []queryJSON{}
	variablesRecord := []variableOneRecord{}

	for _, variableIn := range variablesIn {
		where := map[string]interface{}{}

		wheresJSON := []whereJSON{}

		if variableIn.IsCustom {
			where[customVariableDB.KeyID] = variableIn.ID
			customVariableOne, err := customVariable.FindOne(where)
			if err == nil {

				alias := fmt.Sprintf("cv_%d", customVariableOne.ID)

				for i := 0; i < sizeWheres; i++ {
					w := wheres[i]

					tables := getTablesForDates(alias, w.Gte.UTC(), w.Lt.UTC())

					var start, final string

					if interval == constants.Daily {
						var isPreviousDay bool
						var isAccumulated bool

						for _, previousDayVarOne := range previousDayVars {
							if previousDayVarOne.VariableID == customVariableOne.ID {
								if previousDayVarOne.IsCustom == variableIn.IsCustom {
									isPreviousDay = true
									break
								}
							}
						}

						if !isPreviousDay {
							for _, accumulatedVarOne := range accumulatedVars {
								if accumulatedVarOne.VariableID == customVariableOne.ID {
									if accumulatedVarOne.IsCustom == variableIn.IsCustom {
										isAccumulated = true
										break
									}
								}
							}
						}

						if isPreviousDay && interval == constants.Daily {
							//start = w.Gte.UTC().Add(time.Hour * 24).Add(time.Hour * 5).Add(time.Hour * 2).Format(constants.DateTimeFormat)
							//final = w.Lt.UTC().Add(time.Hour * 24).Add(time.Hour * 5).Add(time.Hour * -2).Format(constants.DateTimeFormat)
							dayUTC := time.Date(w.Lt.Year(), w.Lt.Month(), w.Lt.Day(), 5, 0, 0, 0, location).UTC()

							final = dayUTC.Add(time.Minute * 15).Format(constants.DateTimeFormat)
							start = dayUTC.Add(time.Hour*-24).Add(time.Minute*15).Format(constants.DateTimeFormat) + "YESTERDAY"

						} else if isAccumulated && interval == constants.Daily {
							//start = w.Gte.UTC().Add(time.Hour * 24).Add(time.Hour * 6).Format(constants.DateTimeFormat)
							//final = w.Lt.UTC().Add(time.Hour * 24).Add(time.Hour * 6).Format(constants.DateTimeFormat)
							dayUTC := time.Date(w.Lt.Year(), w.Lt.Month(), w.Lt.Day(), 5, 0, 0, 0, location).UTC()

							final = dayUTC.Add(time.Minute * 10).Format(constants.DateTimeFormat)
							start = dayUTC.Add(time.Hour*-24).Add(time.Minute*10).Format(constants.DateTimeFormat) + "ACCUMULATED"

						} else {
							start = w.Gte.UTC().Format(constants.DateTimeFormat)
							final = w.Lt.UTC().Format(constants.DateTimeFormat)
						}

					} else {
						start = w.Gte.UTC().Format(constants.DateTimeFormat)
						final = w.Lt.UTC().Format(constants.DateTimeFormat)
					}

					wheresJSON = append(wheresJSON, whereJSON{
						Gte:    start,
						Lt:     final,
						Tables: tables,
					})
				}

				qJSON := queryJSON{
					Key:    fmt.Sprintf("cv_%d", customVariableOne.ID),
					Wheres: wheresJSON,
					IsAvg:  true,
				}

				qJSON.Tables = getTablesForDates(alias, firstDate.UTC(), lastDate.UTC())
				qJSON.Where = whereJSON{
					Gte: firstDate.UTC().Format(constants.DateTimeFormat),
					Lt:  lastDate.UTC().Format(constants.DateTimeFormat),
				}

				if interval == constants.Daily {
					qJSON.Where = whereJSON{
						Gte: firstDate.UTC().Format(constants.DateTimeFormat),
						Lt:  lastDate.UTC().Add(time.Minute * 15).Format(constants.DateTimeFormat),
					}
				}

				queriesJSON = append(queriesJSON, qJSON)

				vOne := variableOneRecord{
					VariableID: customVariableOne.ID,
					IsCustom:   true,
					Name:       customVariableOne.Name,
					Alias:      alias,
					Device:     customVariableOne.Device,
					Records:    []recordDB.LiteRecord{},
				}

				if variableIn.UnitID == 0 {
					vOne.Display = customVariableOne.Unit

				} else {
					unit := unitDB.Model{
						UserDB: constants.DB.UserSW,
						PwdDB:  constants.DB.PwdSW,
						NameDB: constants.DB.NameSW,
						Host:   constants.DB.HostSW,
						Port:   constants.DB.PortSW,
						Debug:  true,
					}

					where := map[string]interface{}{unitDB.KeyID: variableIn.UnitID}
					unitOne, err := unit.FindOne(where)
					if err == nil {
						vOne.Display = unitOne.Display
						vOne.Expression = unitOne.Expression
					}
				}

				variablesRecord = append(variablesRecord, vOne)

			} else {
				fmt.Println("report.variable.getMonthly.custom_variable: ", err)
			}

		} else {
			where[variableDB.KeyID] = variableIn.ID
			variableOne, err := variable.FindOne(where)
			if err == nil {

				alias := variableOne.Alias

				for i := 0; i < sizeWheres; i++ {
					w := wheres[i]

					tables := getTablesForDates(alias, w.Gte.UTC(), w.Lt.UTC())

					var start, final string

					if interval == constants.Daily {
						var isPreviousDay bool
						var isAccumulated bool

						for _, previousDayVarOne := range previousDayVars {
							if previousDayVarOne.VariableID == variableOne.ID {
								if previousDayVarOne.IsCustom == variableIn.IsCustom {
									isPreviousDay = true
									break
								}
							}
						}

						if !isPreviousDay {
							for _, accumulatedVarOne := range accumulatedVars {
								if accumulatedVarOne.VariableID == variableOne.ID {
									if accumulatedVarOne.IsCustom == variableIn.IsCustom {
										isAccumulated = true
										break
									}
								}
							}
						}

						if isPreviousDay && interval == constants.Daily {
							//start = w.Gte.UTC().Add(time.Hour * 24).Add(time.Hour * 5).Add(time.Hour * 2).Format(constants.DateTimeFormat)
							//final = w.Lt.UTC().Add(time.Hour * 24).Add(time.Hour * 5).Add(time.Hour * -2).Format(constants.DateTimeFormat)
							dayUTC := time.Date(w.Lt.Year(), w.Lt.Month(), w.Lt.Day(), 5, 0, 0, 0, location).UTC()

							final = dayUTC.Add(time.Minute * 15).Format(constants.DateTimeFormat)
							start = dayUTC.Add(time.Hour*-24).Add(time.Minute*15).Format(constants.DateTimeFormat) + "YESTERDAY"

						} else if isAccumulated && interval == constants.Daily {
							//start = w.Gte.UTC().Add(time.Hour * 24).Add(time.Hour * 6).Format(constants.DateTimeFormat)
							//final = w.Lt.UTC().Add(time.Hour * 24).Add(time.Hour * 6).Format(constants.DateTimeFormat)
							dayUTC := time.Date(w.Lt.Year(), w.Lt.Month(), w.Lt.Day(), 5, 0, 0, 0, location).UTC()

							final = dayUTC.Add(time.Minute * 10).Format(constants.DateTimeFormat)
							start = dayUTC.Add(time.Hour*-24).Add(time.Minute*10).Format(constants.DateTimeFormat) + "ACCUMULATED"

						} else {
							start = w.Gte.UTC().Format(constants.DateTimeFormat)
							final = w.Lt.UTC().Format(constants.DateTimeFormat)
						}

						/*if isPreviousDay {
							start = w.Gte.UTC().Add(time.Hour * 24).Add(time.Hour * 5).Add(time.Hour * 2).Format(constants.DateTimeFormat)
							final = w.Lt.UTC().Add(time.Hour * 24).Add(time.Hour * 5).Add(time.Hour * -2).Format(constants.DateTimeFormat)

						} else if isAccumulated {
							//start = w.Gte.UTC().Add(time.Hour*6).Format(constants.DateTimeFormat) + "ACCUMULATED"
							start = w.Gte.UTC().Add(time.Hour * 6).Format(constants.DateTimeFormat)
							final = w.Lt.UTC().Add(time.Hour * 6).Format(constants.DateTimeFormat)

						} else {
							start = w.Gte.UTC().Format(constants.DateTimeFormat)
							final = w.Lt.UTC().Format(constants.DateTimeFormat)
						}*/

					} else {
						start = w.Gte.UTC().Format(constants.DateTimeFormat)
						final = w.Lt.UTC().Format(constants.DateTimeFormat)
					}

					wheresJSON = append(wheresJSON, whereJSON{
						Gte:    start,
						Lt:     final,
						Tables: tables,
					})
				}

				qJSON := queryJSON{
					Key:    fmt.Sprintf("v_%d", variableOne.ID),
					Wheres: wheresJSON,
					IsAvg:  true,
				}

				qJSON.Tables = getTablesForDates(alias, firstDate.UTC(), lastDate.UTC())
				qJSON.Where = whereJSON{
					Gte: firstDate.UTC().Format(constants.DateTimeFormat),
					Lt:  lastDate.UTC().Format(constants.DateTimeFormat),
				}

				if interval == constants.Daily {
					qJSON.Where = whereJSON{
						Gte: firstDate.UTC().Format(constants.DateTimeFormat),
						Lt:  lastDate.UTC().Add(time.Minute * 15).Format(constants.DateTimeFormat),
					}
				}

				queriesJSON = append(queriesJSON, qJSON)

				vOne := variableOneRecord{
					VariableID: variableOne.ID,
					Name:       variableOne.Name,
					Alias:      variableOne.Alias,
					Device:     variableOne.Device,
					Records:    []recordDB.LiteRecord{},
				}

				if variableIn.UnitID == 0 {
					vOne.Display = variableOne.ReadingUnit

				} else {
					unit := unitDB.Model{
						UserDB: constants.DB.UserSW,
						PwdDB:  constants.DB.PwdSW,
						NameDB: constants.DB.NameSW,
						Host:   constants.DB.HostSW,
						Port:   constants.DB.PortSW,
						Debug:  true,
					}

					where := map[string]interface{}{unitDB.KeyID: variableIn.UnitID}
					unitOne, err := unit.FindOne(where)
					if err == nil {
						vOne.Display = unitOne.Display
						vOne.Expression = unitOne.Expression
					}
				}

				variablesRecord = append(variablesRecord, vOne)

			} else {
				fmt.Println("report.variable.getMonthly.variable: ", err)
			}
		}
	}

	b, err := json.Marshal(queriesJSON)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getMonthly.Marshal(queriesJSON): ", err)

		return results, hasErr
	}

	recordsRequest := recordsRequestDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	sJSON := string(b)
	now := time.Now().UTC()

	//fmt.Println(sJSON)

	values := map[string]interface{}{
		recordsRequestDB.KeyJSON:      sJSON,
		recordsRequestDB.KeyCreatedAt: now,
	}

	requestOne, err := recordsRequest.Create(values)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getMonthly.recordsRequest.Create: ", err)

		return results, hasErr
	}

	/*sID := fmt.Sprintf("%d", requestOne.ID)
	var cmd *exec.Cmd

	if interval == constants.Daily {
		cmd = exec.Command(configServer.NodePath, "record-dialy", sID)
	} else {
		cmd = exec.Command(configServer.NodePath, "record", sID)
	}*/

	binaryFile := "record-one"

	sID := fmt.Sprintf("%d", requestOne.ID)
	cmd := exec.Command(configServer.NodePath, binaryFile, sID)
	cmd.Dir = configServer.NodeExecPath
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	err = cmd.Run()
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getMonthly.Command: ", err)

		return results, hasErr
	}

	fmt.Println("Finish...")

	where = map[string]interface{}{recordsRequestDB.KeyID: requestOne.ID}
	_, err = recordsRequest.Remove(where)
	if err != nil {
		fmt.Println("report.variable.getMonthly.recordsRequest.Remove: ", err)
	}

	variablesRecordOut := []variableRecord{}

	err = json.Unmarshal(out.Bytes(), &variablesRecordOut)
	hasErr = err != nil
	if hasErr {
		fmt.Println("report.variable.getMonthly.Unmarshal: ", err)

		return results, hasErr
	}

	sizeOut := len(variablesRecordOut)
	for i := 0; i < sizeOut; i++ {
		variableOneRecordOut := variablesRecordOut[i]

		var ID int64
		var isCustom bool

		key := variableOneRecordOut.Variable

		values := strings.Split(key, "_")
		if len(values) == 2 {
			t := values[0]
			if t == "cv" {
				isCustom = true
			} else {
				isCustom = false
			}

			s := values[1]
			v, err := strconv.Atoi(s)
			if err == nil {
				ID = int64(v)
			}
		}

		for _, variableOneRecord := range variablesRecord {

			if ID == variableOneRecord.VariableID {
				if isCustom == variableOneRecord.IsCustom {

					var isPreviousDay bool
					var isAccumulated bool

					if interval == constants.Daily {
						for _, previousDayVarOne := range previousDayVars {
							if previousDayVarOne.VariableID == ID {
								if previousDayVarOne.IsCustom == isCustom {
									isPreviousDay = true
									break
								}
							}
						}
					}

					if !isPreviousDay {
						for _, accumulatedVarOne := range accumulatedVars {
							if accumulatedVarOne.VariableID == ID {
								if accumulatedVarOne.IsCustom == isCustom {
									isAccumulated = true
									break
								}
							}
						}
					}

					avgs := []recordDB.AVG{}

					records := variableOneRecordOut.Records
					sizeRecord := len(records)

					//expressions := []string{}

					for j := 0; j < sizeRecord; j++ {
						record := records[j]
						var timestamp string

						if isPreviousDay {
							//timestamp = record.Timestamp.Add(time.Hour * -24).In(location).Format(constants.DateTimeFormat)
							if interval == constants.Daily {
								timestamp = record.Timestamp.Add(time.Minute * -15).In(location).Format(constants.DateTimeFormat)

							} else {
								timestamp = record.Timestamp.In(location).Format(constants.DateTimeFormat)
							}

						} else if isAccumulated {
							//timestamp = record.Timestamp.Add(time.Hour * 24).In(location).Format(constants.DateTimeFormat)
							if interval == constants.Daily {
								timestamp = record.Timestamp.Add(time.Minute * -10).In(location).Format(constants.DateTimeFormat)

							} else {
								timestamp = record.Timestamp.In(location).Format(constants.DateTimeFormat)
							}

						} else {
							timestamp = record.Timestamp.In(location).Format(constants.DateTimeFormat)
						}

						avg := recordDB.AVG{
							Value:           record.Value,
							TimestampString: timestamp,
						}

						expression := variableOneRecord.Expression

						// Expression de conversión
						if expression != "" {
							nValue, isOk := node.EvalueExpressionUnit(expression, avg.Value)
							if isOk {
								avg.Value = nValue
							}
						}

						avgs = append(avgs, avg)
					}

					result := resultJSON{
						VariableID: ID,
						IsCustom:   isCustom,
						Name:       variableOneRecord.Name,
						Unit:       variableOneRecord.Display,
						Hrs:        avgs,
					}

					for _, variableIn := range variablesIn {
						if variableIn.ID == ID {
							if variableIn.IsCustom == isCustom {
								result.Cell = variableIn.Cell
								result.Page = variableIn.Page

								if variableIn.Name != "" {
									result.Name = variableIn.Name
								}

								break
							}
						}
					}

					results = append(results, result)
					break
				}
			}
		}
	}

	// RESET
	//queriesJSON = []queryJSON{}
	//variablesIn = []reportDB.VariableJSON{}
	//variablesRecord = []variableOneRecord{}
	variablesRecordOut = []variableRecord{}

	return results, hasErr
}
