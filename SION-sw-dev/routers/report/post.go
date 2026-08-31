package report

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"math"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/xuri/excelize/v2"

	"github.com/JamsMendez/SION-sw/constants"
	accumulatedDB "github.com/JamsMendez/SION-sw/models/accumulated_flow"
	apVariableDB "github.com/JamsMendez/SION-sw/models/ap_variable"
	previousDayDB "github.com/JamsMendez/SION-sw/models/previous_day_flow"
	recordDB "github.com/JamsMendez/SION-sw/models/record"
	reportDB "github.com/JamsMendez/SION-sw/models/report"
	userReportDB "github.com/JamsMendez/SION-sw/models/user/report"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
)

type generateReport struct {
	ReportID int    `json:"report_id"`
	DateOf   string `json:"date_of"`
	DateTo   string `json:"date_to"`
	Type     string `json:"type"`
	Year     int    `json:"year"`
	Report   string `json:"report"`
}

func createServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	rJSON := reportDB.Report{}

	sJSON := c.FormValue(constants.KeyJSON)
	b := []byte(sJSON)

	if err := json.Unmarshal(b, &rJSON); err != nil {
		fmt.Println("report.createServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	if !isRoot && !isSystemAdmin && !isAdmin && !isOperator {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if rJSON.Name == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "name")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	hasStructureJSON := len(rJSON.StructureJSON) > 0
	if !hasStructureJSON {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "estructura")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	bs, err := json.Marshal(rJSON.StructureJSON)
	if err == nil {
		sJSON := string(bs)
		values[reportDB.KeyStructureJSON] = sJSON
	}

	now := time.Now()

	values[reportDB.KeyName] = rJSON.Name
	values[reportDB.KeyCreatedAt] = now
	values[reportDB.KeyUpdatedAt] = now

	report := reportDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userReport := userReportDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se crea el reporte
	reportOne, err := report.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values = map[string]interface{}{
		userReportDB.KeyUserID:    userSession.ID,
		userReportDB.KeyReportID:  reportOne.ID,
		userReportDB.KeyIsCreator: true,
	}

	// Actualizar el Template del Reporte
	var updateTemplate bool

	valuesU := map[string]interface{}{reportDB.KeyID: reportOne.ID}
	tmpl, err := c.FormFile(reportDB.KeyTemplate)
	if err == nil {
		src, err := tmpl.Open()
		if err == nil {

			defer func(r multipart.File) {
				err := r.Close()
				if err != nil {
					fmt.Println("src.Error: ", err)
				}
			}(src)

			ext := filepath.Ext(tmpl.Filename)
			reportID := int(reportOne.ID)
			name := fmt.Sprintf("report_%d%s", reportID, ext)
			filename := constants.TemplatesSRC + name
			dst, err := os.Create(filename)
			if err == nil {

				defer func(r *os.File) {
					err := r.Close()
					if err != nil {
						fmt.Println("report.createServer.src.Error: ", err)
					}
				}(dst)

				if _, err = io.Copy(dst, src); err == nil {
					updateTemplate = true
					valuesU[reportDB.KeyTemplate] = name
				}
			}
		}
	}

	if updateTemplate {
		reportOne, err = report.Update(valuesU)
		if err != nil {
			fmt.Println("report.createServer.group.Update: ", err)
		}
	}

	// Se relaciona el reporte con el usuario

	_, err = userReport.Create(values)
	if err != nil {
		fmt.Println("report.createServer.userReport.Create: ", err)

		// Si ocurrió un error al crear la relación de elimina el reporte
		// que fue creada.
		where := map[string]interface{}{reportDB.KeyID: reportOne.ID}
		_, err := report.Remove(where)
		if err != nil {
			fmt.Println("report.createServer.report.Remove: ", err)
		}

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeInsertReport
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se creó el report %s", reportOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: reportOne}
	return c.JSON(http.StatusCreated, resJSON)
}

func generateServer(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	gJSON := generateReport{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("report.generateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("report.generateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &gJSON); err != nil {
		fmt.Println("report.generateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	report := reportDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var reportOne reportDB.Report

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if isRoot || isSystemAdmin {
		// Acceso a los reportes
		where := map[string]interface{}{reportDB.KeyID: gJSON.ReportID}

		reportOne, err = report.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a los reportes de los usuarios con menor valor
			a la sesión del usuario
		*/
		i64 := int64(gJSON.ReportID)
		userID := userSession.ID
		value := userSession.Value

		reportOne, err = report.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		/*
			Acceso a los reportes de los usuarios con menor valor
			a la sesión del usuario
		*/
		i64 := int64(gJSON.ReportID)
		userID := userSession.ID

		reportOne, err = report.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if reportOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del reporte")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	structureJSON := reportOne.StructureJSON

	reportOne.Structure = []reportDB.Struct{}

	for _, sJSON := range structureJSON {
		structOne := getStruct(sJSON)
		if structOne.ID != 0 {
			reportOne.Structure = append(reportOne.Structure, structOne)
		}
	}

	var nFileName string

	if gJSON.Report == constants.Daily {
		// REPORT DIALY
		src := fmt.Sprintf("./files/template/%s", reportOne.Template)
		fileXLS, err := excelize.OpenFile(src)
		if err != nil {
			fmt.Println("Excelize.OpenFile: ", err)

			msg := fmt.Sprintf("No se encontró el template del reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		sheetNames := map[int]string{0: fileXLS.GetSheetName(0)}

		i64 := int64(gJSON.ReportID)
		variables, hasErr := getDaily(i64, gJSON.DateOf, gJSON.Type, config)
		if hasErr {
			msg := fmt.Sprintf("ocurrío un error al generar el reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		groups := getGroups(reportOne.Structure)
		size := len(groups)
		if size > 0 {
			for i := 0; i < size; i++ {
				groupOne := groups[i]
				if groupOne.Cell != "" {
					_, isOk := sheetNames[groupOne.Page]
					if !isOk {
						sheetNames[groupOne.Page] = fileXLS.GetSheetName(groupOne.Page)
					}

					fmt.Println(sheetNames[groupOne.Page], groupOne.Cell, groupOne.Name)
					fileXLS.SetCellValue(sheetNames[groupOne.Page], groupOne.Cell, groupOne.Name)
				}

				dateCell := "G12"
				dateValue := getDateToReport(gJSON.DateOf)
				fileXLS.SetCellValue(sheetNames[groupOne.Page], dateCell, dateValue)
			}
		}

		size = len(variables)
		if size > 0 {

			apv := apVariableDB.Model{
				UserDB: constants.DB.UserSW,
				PwdDB:  constants.DB.PwdSW,
				NameDB: constants.DB.NameSW,
				Host:   constants.DB.HostSW,
				Port:   constants.DB.PortSW,
				Debug:  true,
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
				fmt.Println("Report.Variables.getDiary.Accumulated.Find: ", err)
			}

			previousDayVars, err := previousDay.Find(whereAll)
			if err != nil {
				fmt.Println("Report.Variables.getDialy.PreviousDay.Find: ", err)
			}

			apVariables, err := apv.Find(whereAll)
			if err != nil {
				fmt.Println("Report.Variables.getDialy.APVariable.Find: ", err)
			}

			for i := 0; i < size; i++ {
				variableOne := variables[i]

				//fmt.Println(variableOne.Name, variableOne.Hrs)
				//fmt.Println("=====")

				// Acumulated and PreviousDay
				var isPreviousDay bool
				var isAccumulated bool

				for _, previousDayVarOne := range previousDayVars {
					if previousDayVarOne.VariableID == variableOne.VariableID {
						if previousDayVarOne.IsCustom == variableOne.IsCustom {
							isPreviousDay = true
							break
						}
					}
				}

				if !isPreviousDay {
					for _, accumulatedVarOne := range accumulatedVars {
						if accumulatedVarOne.VariableID == variableOne.VariableID {
							if accumulatedVarOne.IsCustom == variableOne.IsCustom {
								isAccumulated = true
								break
							}
						}
					}
				}

				if variableOne.Cell != "" {
					letter, num := getCellAndNumber(variableOne.Cell)

					cell := fmt.Sprintf("%s%d", letter, num)
					fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, variableOne.Name)

					cell = fmt.Sprintf("%s%d", letter, num+1)
					fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, variableOne.Unit)

					last := len(variableOne.Hrs) - 1
					for index, hrOne := range variableOne.Hrs {

						if isPreviousDay {
							// PreviousDay
							if index == last {
								row := num + 2 + index
								cell := fmt.Sprintf("%s%d", letter, row)
								fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, hrOne.Value)
							}

							// Accumulated
						} else if isAccumulated {

							if index == last {
								// Last row
								for _, apVariableOne := range apVariables {
									if apVariableOne.AccumuID == variableOne.VariableID {
										if apVariableOne.AccumuIsCustom == variableOne.IsCustom {

											for _, vOne := range variables {
												if vOne.VariableID == apVariableOne.PreviousID {
													if vOne.IsCustom == apVariableOne.PreviousIsCustom {

														vSize := len(vOne.Hrs)
														vValue := vOne.Hrs[vSize-1].Value

														row := num + 2 + index
														cell := fmt.Sprintf("%s%d", letter, row)
														fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, vValue)

													}
												}
											}

											break
										}
									}
								}

							} else {
								row := num + 2 + index
								cell := fmt.Sprintf("%s%d", letter, row)
								fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, hrOne.Value)
							}

						} else {
							// All variables
							row := num + 2 + index
							cell := fmt.Sprintf("%s%d", letter, row)
							fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, hrOne.Value)
						}
					}
				}
			}

			// RESET
			//variables = []resultJSON{}
		}

		// RESET
		//groups = []reportDB.Struct{}

		now := time.Now().UnixNano()
		nDateOf := strings.ReplaceAll(gJSON.DateOf, ":", "-")
		nFileName = fmt.Sprintf("%s-%s-%d.xlsx", reportOne.Name, nDateOf, now)
		nFile := fmt.Sprintf("./files/report/%s", nFileName)
		err = fileXLS.SaveAs(nFile)
		if err != nil {
			fmt.Println("FileXLS.SaveAs: ", err)

			msg := fmt.Sprintf("Ocurrió un error al guardar reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if gJSON.Report == constants.Monthly {
		// REPORT MONTHLY
		src := fmt.Sprintf("./files/template/%s", reportOne.Template)
		fileXLS, err := excelize.OpenFile(src)
		if err != nil {
			fmt.Println("Excelize.OpenFile: ", err)

			msg := fmt.Sprintf("No se encontró el template del reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		i64 := int64(gJSON.ReportID)
		variables, hasErr := getMonthly(i64, gJSON.DateOf, gJSON.DateTo, gJSON.Type, config)
		if hasErr {
			msg := fmt.Sprintf("ocurrío un error al generar el reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		sheetNames := map[int]string{0: fileXLS.GetSheetName(0)}

		groups := getGroups(reportOne.Structure)
		size := len(groups)
		if size > 0 {
			for i := 0; i < size; i++ {
				groupOne := groups[i]
				if groupOne.Cell != "" {
					_, isOk := sheetNames[groupOne.Page]
					if !isOk {
						sheetNames[groupOne.Page] = fileXLS.GetSheetName(groupOne.Page)
					}

					fmt.Println(sheetNames[groupOne.Page], groupOne.Cell, groupOne.Name)
					fileXLS.SetCellValue(sheetNames[groupOne.Page], groupOne.Cell, groupOne.Name)
				}

				dateCell := "G12"
				dateValue := getDateToReport(gJSON.DateOf)
				fileXLS.SetCellValue(sheetNames[groupOne.Page], dateCell, dateValue)

				dateCell = "C12"
				dateOfValue := getDateTimeToReport(gJSON.DateOf)
				dateToValue := getDateTimeToReport(gJSON.DateTo)
				dateValue = fmt.Sprintf("%s - %s", dateOfValue, dateToValue)
				fileXLS.SetCellValue(sheetNames[groupOne.Page], dateCell, dateValue)
			}
		}

		dayLetter := "A"
		dayNumber := 16

		location, err := time.LoadLocation(constants.TZ)
		if err != nil {
			location = time.Local
		}

		size = len(variables)
		if size > 0 {
			addDay := true
			for i := 0; i < size; i++ {
				variableOne := variables[i]

				if variableOne.Cell != "" {
					letter, num := getCellAndNumber(variableOne.Cell)

					cell := fmt.Sprintf("%s%d", letter, num)
					fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, variableOne.Name)

					cell = fmt.Sprintf("%s%d", letter, num+1)
					fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, variableOne.Unit)

					size := len(variableOne.Hrs)
					for index := 0; index < size; index++ {
						hrOne := variableOne.Hrs[index]
						row := num + 2 + index
						cell := fmt.Sprintf("%s%d", letter, row)

						if gJSON.Type == constants.Daily {
							hrOne.Value = math.Floor(hrOne.Value*1000) / 1000
						}

						fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, hrOne.Value)

						if addDay {
							row := dayNumber + index
							cell := fmt.Sprintf("%s%d", dayLetter, row)

							timestamp, err := time.ParseInLocation(constants.DateTimeFormat, hrOne.TimestampString, location)
							if err == nil {
								ts := timestamp.Format(constants.DateFormat)
								fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, ts)

							} else {
								fmt.Println("Report.Monthly.time.ParseInLocation: ", err)
							}
						}
					}

					if size > 0 {
						addDay = false
					}
				}
			}

			// RESET
			//variables = []resultJSON{}
		}

		// RESET
		//groups = []reportDB.Struct{}

		now := time.Now().UnixNano()
		nDateOf := strings.ReplaceAll(gJSON.DateOf, ":", "-")
		nFileName = fmt.Sprintf("%s-%s-%d.xlsx", reportOne.Name, nDateOf, now)
		nFile := fmt.Sprintf("./files/report/%s", nFileName)
		err = fileXLS.SaveAs(nFile)
		if err != nil {
			fmt.Println("FileXLS.SaveAs: ", err)

			msg := fmt.Sprintf("Ocurrió un error al guardar reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if gJSON.Report == constants.Annual {
		// REPORT ANNUAL
		src := fmt.Sprintf("./files/template/%s", reportOne.Template)
		fileXLS, err := excelize.OpenFile(src)
		if err != nil {
			fmt.Println("Excelize.OpenFile: ", err)

			msg := fmt.Sprintf("No se encontró el template del reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		i64 := int64(gJSON.ReportID)
		variables, hasErr := getAnnual(i64, gJSON.Year, config)
		if hasErr {
			msg := fmt.Sprintf("ocurrío un error al generar el reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		var sheetName = fileXLS.GetSheetName(0)

		groups := getGroups(reportOne.Structure)
		size := len(groups)
		if size > 0 {
			for i := 0; i < size; i++ {
				groupOne := groups[i]
				if groupOne.Cell != "" {
					fmt.Println(sheetName, groupOne.Cell, groupOne.Name)
					fileXLS.SetCellValue(sheetName, groupOne.Cell, groupOne.Name)
				}
			}
		}

		dateCell := "G12"
		fileXLS.SetCellValue(sheetName, dateCell, gJSON.Year)

		size = len(variables)
		if size > 0 {
			for i := 0; i < size; i++ {
				variableOne := variables[i]

				if variableOne.Cell != "" {
					letter, num := getCellAndNumber(variableOne.Cell)

					cell := fmt.Sprintf("%s%d", letter, num)
					fileXLS.SetCellValue(sheetName, cell, variableOne.Name)

					cell = fmt.Sprintf("%s%d", letter, num+1)
					fileXLS.SetCellValue(sheetName, cell, variableOne.Unit)

					for index, hrOne := range variableOne.Hrs {
						row := num + 2 + index
						cell := fmt.Sprintf("%s%d", letter, row)
						fileXLS.SetCellValue(sheetName, cell, hrOne.Value)
					}
				}
			}

			// RESET
			//variables = []resultJSON{}
		}

		// RESET
		//groups = []reportDB.Struct{}

		now := time.Now().UnixNano()
		nFileName = fmt.Sprintf("%s-%d-%d.xlsx", reportOne.Name, gJSON.Year, now)
		nFile := fmt.Sprintf("./files/report/%s", nFileName)
		err = fileXLS.SaveAs(nFile)
		if err != nil {
			fmt.Println("FileXLS.SaveAs: ", err)

			msg := fmt.Sprintf("Ocurrió un error al guardar reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if gJSON.Report == constants.Custom {
		// REPORT CUSTOM
		src := fmt.Sprintf("./files/template/%s", reportOne.Template)
		fileXLS, err := excelize.OpenFile(src)
		if err != nil {
			fmt.Println("Excelize.OpenFile: ", err)

			msg := fmt.Sprintf("No se encontró el template del reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		i64 := int64(gJSON.ReportID)
		variables, hasErr := getCustom(i64, gJSON.DateOf, gJSON.DateTo, gJSON.Type, config)
		if hasErr {
			msg := fmt.Sprintf("ocurrío un error al generar el reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		sheetNames := map[int]string{0: fileXLS.GetSheetName(0)}

		// fmt.Println("List: ", fileXLS.GetSheetList())
		// fmt.Println("Map: ", fileXLS.GetSheetMap())
		//
		// for _, name := range fileXLS.GetSheetList() {
		// 	fmt.Println("Name: ", name, " Index: ", fileXLS.GetSheetIndex(name))
		// }

		groups := getGroups(reportOne.Structure)
		size := len(groups)
		if size > 0 {
			for i := 0; i < size; i++ {
				groupOne := groups[i]
				if groupOne.Cell != "" {
					_, isOk := sheetNames[groupOne.Page]
					if !isOk {
						sheetNames[groupOne.Page] = fileXLS.GetSheetName(groupOne.Page)
					}

					fmt.Println("CUstom.Set Value: ", sheetNames[groupOne.Page], groupOne.Cell, groupOne.Name)
					fileXLS.SetCellValue(sheetNames[groupOne.Page], groupOne.Cell, groupOne.Name)
				}

				dateCell := "C12"
				dateOfValue := getDateTimeToReport(gJSON.DateOf)
				dateToValue := getDateTimeToReport(gJSON.DateTo)
				dateValue := fmt.Sprintf("%s - %s", dateOfValue, dateToValue)
				fileXLS.SetCellValue(sheetNames[groupOne.Page], dateCell, dateValue)
			}
		}

		location, err := time.LoadLocation(constants.TZ)
		if err != nil {
			location = time.Local
		}

		size = len(variables)
		if size > 0 {

			apv := apVariableDB.Model{
				UserDB: constants.DB.UserSW,
				PwdDB:  constants.DB.PwdSW,
				NameDB: constants.DB.NameSW,
				Host:   constants.DB.HostSW,
				Port:   constants.DB.PortSW,
				Debug:  true,
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
				fmt.Println("Report.Variables.getCustom.Accumulated.Find: ", err)
			}

			previousDayVars, err := previousDay.Find(whereAll)
			if err != nil {
				fmt.Println("Report.Variables.getCustom.PreviousDay.Find: ", err)
			}

			apVariables, err := apv.Find(whereAll)
			if err != nil {
				fmt.Println("Report.Variables.getCustom.APVariable.Find: ", err)
			}

			dateNumber := 16
			dateLetter := "A"

			if gJSON.Type == constants.NA {
				type cellXLS struct {
					Letter string
					Number int
					Hr     recordDB.AVG
					Page   int
				}

				cells := map[int64][]cellXLS{}
				keys := []int{}

				for _, variableOne := range variables {

					if variableOne.Cell != "" {
						letter, num := getCellAndNumber(variableOne.Cell)

						cell := fmt.Sprintf("%s%d", letter, num)
						fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, variableOne.Name)

						cell = fmt.Sprintf("%s%d", letter, num+1)
						fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, variableOne.Unit)

						for _, hrOne := range variableOne.Hrs {
							key := hrOne.Timestamp.Unix()
							values, isOk := cells[key]
							v := cellXLS{Letter: letter, Number: num, Hr: hrOne, Page: variableOne.Page}
							if isOk {
								values = append(values, v)
								cells[key] = values
							} else {
								k := int(key)
								keys = append(keys, k)
								cells[key] = []cellXLS{v}
							}
						}
					}
				}

				fmt.Println("Nombre y Unidades Ok")
				fmt.Println("Valores Ok")

				sort.Ints(keys)

				fmt.Printf("%d en orden Ok\n", len(keys))

				var indexTimestamp int
				// 2 = Nombre y Unidad
				indexValue := 2

				for _, k := range keys {
					key := int64(k)
					if values, isOk := cells[key]; isOk {
						for index, value := range values {
							if index == 0 {
								cell := fmt.Sprintf("%s%d", dateLetter, dateNumber+indexTimestamp)
								fileXLS.SetCellValue(sheetNames[value.Page], cell, value.Hr.TimestampString)
							}

							cell := fmt.Sprintf("%s%d", value.Letter, value.Number+indexValue)
							fileXLS.SetCellValue(sheetNames[value.Page], cell, value.Hr.Value)
						}
					}

					indexValue = indexValue + 1
					indexTimestamp = indexTimestamp + 1
				}

				fmt.Println("Insertando Valores Ok")

			} else {
				// Promedios con filas iguales
				addDate := true

				for i := 0; i < size; i++ {
					variableOne := variables[i]

					// Acumulated and PreviousDay
					var isPreviousDay bool
					var isAccumulated bool

					for _, previousDayVarOne := range previousDayVars {
						if previousDayVarOne.VariableID == variableOne.VariableID {
							if previousDayVarOne.IsCustom == variableOne.IsCustom {
								isPreviousDay = true
								break
							}
						}
					}

					if !isPreviousDay {
						for _, accumulatedVarOne := range accumulatedVars {
							if accumulatedVarOne.VariableID == variableOne.VariableID {
								if accumulatedVarOne.IsCustom == variableOne.IsCustom {
									isAccumulated = true
									break
								}
							}
						}
					}

					if variableOne.Cell != "" {
						letter, num := getCellAndNumber(variableOne.Cell)

						cell := fmt.Sprintf("%s%d", letter, num)
						fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, variableOne.Name)

						cell = fmt.Sprintf("%s%d", letter, num+1)
						fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, variableOne.Unit)

						size := len(variableOne.Hrs)
						last := size - 1

						for index := 0; index < size; index++ {
							hrOne := variableOne.Hrs[index]

							/*if isPreviousDay {

							} else */
							if isAccumulated {

								if index == last {
									// Last row
									for _, apVariableOne := range apVariables {
										if apVariableOne.AccumuID == variableOne.VariableID {
											if apVariableOne.AccumuIsCustom == variableOne.IsCustom {

												for _, vOne := range variables {
													if vOne.VariableID == apVariableOne.PreviousID {
														if vOne.IsCustom == apVariableOne.PreviousIsCustom {

															vSize := len(vOne.Hrs)
															vValue := vOne.Hrs[vSize-1].Value

															row := num + 2 + index
															cell := fmt.Sprintf("%s%d", letter, row)
															fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, vValue)

														}
													}
												}

												break
											}
										}
									}

								} else {
									row := num + 2 + index
									cell := fmt.Sprintf("%s%d", letter, row)
									fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, hrOne.Value)
								}

							} else {
								row := num + 2 + index
								cell := fmt.Sprintf("%s%d", letter, row)
								fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, hrOne.Value)
							}

							if addDate {
								row := dateNumber + index
								cell := fmt.Sprintf("%s%d", dateLetter, row)

								timestamp, err := time.ParseInLocation(constants.DateTimeFormat, hrOne.TimestampString, location)
								if err == nil {
									ts := timestamp.Format(constants.DateTimeFormat)
									fileXLS.SetCellValue(sheetNames[variableOne.Page], cell, ts)

								} else {
									fmt.Println("Report.Custom.time.ParseInLocation: ", err)
								}
							}

						}

						if size > 0 {
							addDate = false
						}
					}
				}
			}

			// RESERT
			//variables = []resultJSON{}
		}

		// RESET
		//groups = []reportDB.Struct{}

		now := time.Now().UnixNano()
		nDateOf := strings.ReplaceAll(gJSON.DateOf, ":", "-")
		nFileName = fmt.Sprintf("%s-%s-%d.xlsx", reportOne.Name, nDateOf, now)
		nFile := fmt.Sprintf("./files/report/%s", nFileName)
		err = fileXLS.SaveAs(nFile)
		if err != nil {
			fmt.Println("FileXLS.SaveAs: ", err)

			msg := fmt.Sprintf("Ocurrió un error al guardar reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	//Registro del Evento
	typeIn := constants.TypeGenerateReport
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se genero el report %s", reportOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: nFileName}
	return c.JSON(http.StatusCreated, resJSON)
}
