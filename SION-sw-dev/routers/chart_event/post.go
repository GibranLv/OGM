package chartevent

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"math/rand"
	"mime/multipart"
	"net/http"
	"os"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	chartEventDB "github.com/JamsMendez/SION-sw/models/chart_event"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

func createServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	eJSON := chartEventDB.ChartEvent{}

	sJSON := c.FormValue(constants.KeyJSON)
	b := []byte(sJSON)

	size := c.FormValue("size")
	vSize, err := routers.ParseInt(size)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	if err := json.Unmarshal(b, &eJSON); err != nil {
		fmt.Println("chartEvent.createServer.Unmarshal: ", err)
		return c.NoContent(http.StatusBadRequest)
	}

	values := map[string]interface{}{}

	if eJSON.RecordID == 0 {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "registro")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if eJSON.VariableID == 0 {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "variable")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if eJSON.Name == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "nombre")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if eJSON.Description == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "descripción")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if eJSON.CreatedAtIn == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "fecha de creación")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		fmt.Println("chartEvent.createServer.LoadLocation: ", err)

		location = time.Local
	}

	createdAt, err := time.ParseInLocation(constants.DateTimeFormat, eJSON.CreatedAtIn, location)
	if err != nil {
		fmt.Println("chartEvent.createServer.ParseInLocation.Start: ", err)

		return c.NoContent(http.StatusBadRequest)
	}

	if eJSON.Files == nil {
		eJSON.Files = []chartEventDB.File{}
	}

	filesBuffer, err := json.Marshal(eJSON.Files)
	if err != nil {
		fmt.Println("chartEvent.createServer.json.Marshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	filesJSON := string(filesBuffer)

	values[chartEventDB.KeyUserID] = userSession.ID
	values[chartEventDB.KeyRecordID] = eJSON.RecordID
	values[chartEventDB.KeyVariableID] = eJSON.VariableID
	values[chartEventDB.KeyIsCustom] = eJSON.IsCustom
	values[chartEventDB.KeyName] = eJSON.Name
	values[chartEventDB.KeyDescription] = eJSON.Description
	values[chartEventDB.KeyFiles] = filesJSON
	values[chartEventDB.KeyCreatedAt] = createdAt.UTC()
	values[chartEventDB.KeyUpdatedAt] = createdAt.UTC()

	chartEvent := chartEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se crea el Grupo
	chartEventOne, err := chartEvent.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Actualizar los archivos del Evento
	var updateFiles bool
	values = map[string]interface{}{chartEventDB.KeyID: chartEventOne.ID}

	for i := 0; i < vSize; i++ {
		key := fmt.Sprintf("%s_%d", constants.KeyFile, i+1)
		fileOne, err := c.FormFile(key)
		if err == nil {
			src, err := fileOne.Open()
			if err == nil {
				defer func(r multipart.File) {
					err := r.Close()
					if err != nil {
						fmt.Println("File.src.Error: ", key, err)
					}
				}(src)

				extension := routers.GetExtension(fileOne.Filename)
				hash := getHash(4)
				name := fmt.Sprintf("file_ce_%d_%s%s", chartEventOne.ID, hash, extension)
				filename := fmt.Sprintf("%s%s", constants.ChartEventsSRC, name)
				dst, err := os.Create(filename)
				if err == nil {
					defer func(r *os.File) {
						err := r.Close()
						if err != nil {
							fmt.Println("File.src.Error: ", err)
						}
					}(dst)
					if _, err = io.Copy(dst, src); err == nil {
						fileIn := chartEventDB.File{
							Alias: fileOne.Filename,
							Name:  name,
						}

						chartEventOne.Files = append(chartEventOne.Files, fileIn)
						updateFiles = true
					}
				}
			}
		}
	}

	if updateFiles {
		buffer, err := json.Marshal(chartEventOne.Files)
		if err != nil {
			fmt.Println("chartEvent.createServer.json.Marshal: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		filesJSON := string(buffer)

		values[chartEventDB.KeyFiles] = filesJSON

		chartEventOne, err = chartEvent.Update(values)
		if err != nil {
			fmt.Println("chartEvent.createServer.chartEvent.Update: ", err)
		}
	}

	resJSON := constants.ResJSON{Doc: chartEventOne}
	return c.JSON(http.StatusCreated, resJSON)
}

func getListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(chartEventDB.KeyID)

	if id != constants.ListParam {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	chartEvent := chartEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	oJSON := getEventReq{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("chartEvents.getListServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("chartEvents.getListServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &oJSON); err != nil {
		fmt.Println("chartEvents.getListServer.Unmarshal: ", err)
		return c.NoContent(http.StatusBadRequest)
	}

	startDateString := oJSON.StartDate
	finalDateString := oJSON.FinalDate
	startString := oJSON.Start
	limitString := oJSON.Limit
	variables := oJSON.Variables

	var start, limit int
	var startDate, finalDate string

	variablesOut := []variableRes{}

	if startString != "" {
		start, err = routers.ParseInt(startString)
		if err != nil {
			fmt.Println("chartEvents.getListServer.routers.ParseInt.startString: ", err)

			return c.NoContent(http.StatusBadRequest)
		}

		if start <= 0 {
			fmt.Println("chartEvents.getListServer.routers.ParseInt.startString: start is <= 0")

			return c.NoContent(http.StatusBadRequest)
		}
	}

	if limitString != "" {
		if limitString == "all" {
			limit = 0
		} else {
			limit, err = routers.ParseInt(limitString)
			if err != nil {
				fmt.Println("chartEvents.getListServer.routers.ParseInt.limitString: ", err)

				return c.NoContent(http.StatusBadRequest)
			}

			if limit <= 0 {
				fmt.Println("chartEvents.getListServer.routers.ParseInt.limitString: limit is <= 0")

				return c.NoContent(http.StatusBadRequest)
			}
		}
	} else {
		limit = 100
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		fmt.Println("chartEvents.getListServer.LoadLocation: ", err)

		location = time.Local
	}

	startTime, err := time.ParseInLocation(constants.DateTimeFormat, startDateString, location)
	if err != nil {
		fmt.Println("chartEvents.getListServer.ParseInLocation.Start: ", err)

		return c.NoContent(http.StatusBadRequest)
	}

	startDate = startTime.UTC().Format(constants.DateTimeFormat)

	finalTime, err := time.ParseInLocation(constants.DateTimeFormat, finalDateString, location)
	if err != nil {
		fmt.Println("chartEvents.getListServer.ParseInLocation.Final: ", err)

		return c.NoContent(http.StatusBadRequest)
	}

	finalDate = finalTime.UTC().Format(constants.DateTimeFormat)

	if userSession.Role == constants.RootUser {
		userIDValue := c.QueryParam(constants.UserIDQuery)
		if userIDValue != "" {
			// Usuario usuario
			// Acceso a todas los Eventos de todos los usuarios
			userID, err := routers.ParseInt(userIDValue)
			if err != nil {
				return c.NoContent(http.StatusBadRequest)
			}

			i64 := int64(userID)

			for _, variableOne := range variables {
				variableID := variableOne.ID
				isCustom := variableOne.IsCustom

				var chartEvents []chartEventDB.ChartEvent
				var err error

				if oJSON.IsTable {
					chartEvents, err = chartEvent.FindSegmentByUserToTable(i64, start, limit, variableID, isCustom, startDate, finalDate)
				} else {
					chartEvents, err = chartEvent.FindSegmentByUser(i64, start, limit, variableID, isCustom, startDate, finalDate)
				}

				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				variableOut := variableRes{
					VariableID: variableOne.ID,
					IsCustom:   variableOne.IsCustom,
					Events:     chartEvents,
				}

				variablesOut = append(variablesOut, variableOut)
			}

		} else {
			// Usuario usuario
			// Acceso a todas los Eventos
			for _, variableOne := range variables {
				variableID := variableOne.ID
				isCustom := variableOne.IsCustom

				var chartEvents []chartEventDB.ChartEvent
				var err error

				if oJSON.IsTable {
					chartEvents, err = chartEvent.FindSegmentToTable(start, limit, variableID, isCustom, startDate, finalDate)
				} else {
					chartEvents, err = chartEvent.FindSegment(start, limit, variableID, isCustom, startDate, finalDate)
				}

				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				variableOut := variableRes{
					VariableID: variableOne.ID,
					IsCustom:   variableOne.IsCustom,
					Events:     chartEvents,
				}

				variablesOut = append(variablesOut, variableOut)
			}
		}

	} else if userSession.Role == constants.AdminUser {
		allValue := c.QueryParam(constants.AllQuery)
		userIDValue := c.QueryParam(constants.UserIDQuery)

		if allValue == constants.TrueValue {
			// Administrador
			// Acceso a todas los Eventos de usuarios con roles de valor inferior
			// y de la sesión del usuario
			for _, variableOne := range variables {
				variableID := variableOne.ID
				isCustom := variableOne.IsCustom

				var chartEvents []chartEventDB.ChartEvent
				var err error

				if oJSON.IsTable {
					chartEvents, err = chartEvent.FindSegmentByUserOrLowerValueToTable(userSession.ID, userSession.Value, start, limit, variableID, isCustom, startDate, finalDate)
				} else {
					chartEvents, err = chartEvent.FindSegmentByUserOrLowerValue(userSession.ID, userSession.Value, start, limit, variableID, isCustom, startDate, finalDate)
				}

				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				variableOut := variableRes{
					VariableID: variableOne.ID,
					IsCustom:   variableOne.IsCustom,
					Events:     chartEvents,
				}

				variablesOut = append(variablesOut, variableOut)
			}

		} else if userIDValue == constants.TrueValue {
			// Administrador
			// Acceso a todas los Eventos con el ID del usuario siempre
			// que no tenga un role con valor superior
			userID, err := routers.ParseInt(userIDValue)
			if err != nil {
				return c.NoContent(http.StatusBadRequest)
			}

			i64 := int64(userID)
			for _, variableOne := range variables {
				variableID := variableOne.ID
				isCustom := variableOne.IsCustom

				var chartEvents []chartEventDB.ChartEvent
				var err error

				if oJSON.IsTable {
					chartEvents, err = chartEvent.FindSegmentByUserAndLowerValueToTable(i64, userSession.Value, start, limit, variableID, isCustom, startDate, finalDate)
				} else {
					chartEvents, err = chartEvent.FindSegmentByUserAndLowerValue(i64, userSession.Value, start, limit, variableID, isCustom, startDate, finalDate)
				}

				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				variableOut := variableRes{
					VariableID: variableOne.ID,
					IsCustom:   variableOne.IsCustom,
					Events:     chartEvents,
				}

				variablesOut = append(variablesOut, variableOut)
			}

		} else {
			// Administrador
			// Acceso a todas los Eventos de la sesión del usuario
			for _, variableOne := range variables {
				variableID := variableOne.ID
				isCustom := variableOne.IsCustom

				var chartEvents []chartEventDB.ChartEvent
				var err error

				if oJSON.IsTable {
					chartEvents, err = chartEvent.FindSegmentByUserToTable(userSession.ID, start, limit, variableID, isCustom, startDate, finalDate)
				} else {
					chartEvents, err = chartEvent.FindSegmentByUser(userSession.ID, start, limit, variableID, isCustom, startDate, finalDate)
				}

				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				variableOut := variableRes{
					VariableID: variableOne.ID,
					IsCustom:   variableOne.IsCustom,
					Events:     chartEvents,
				}

				variablesOut = append(variablesOut, variableOut)
			}
		}

	} else if userSession.Role == constants.OperatorUser {
		// Operador
		// Acceso a todas los Eventos de la sesión del usuario
		for _, variableOne := range variables {
			variableID := variableOne.ID
			isCustom := variableOne.IsCustom

			var chartEvents []chartEventDB.ChartEvent
			var err error

			if oJSON.IsTable {
				chartEvents, err = chartEvent.FindSegmentByUserToTable(userSession.ID, start, limit, variableID, isCustom, startDate, finalDate)
			} else {
				chartEvents, err = chartEvent.FindSegmentByUser(userSession.ID, start, limit, variableID, isCustom, startDate, finalDate)
			}

			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			variableOut := variableRes{
				VariableID: variableOne.ID,
				IsCustom:   variableOne.IsCustom,
				Events:     chartEvents,
			}

			variablesOut = append(variablesOut, variableOut)
		}

	} else if userSession.Role == constants.GuestUser {
		// Invitado
		// Acceso a todas los Eventos de la sesión del usuario
		for _, variableOne := range variables {
			variableID := variableOne.ID
			isCustom := variableOne.IsCustom

			var chartEvents []chartEventDB.ChartEvent
			var err error

			if oJSON.IsTable {
				chartEvents, err = chartEvent.FindSegmentByUserToTable(userSession.ID, start, limit, variableID, isCustom, startDate, finalDate)
			} else {
				chartEvents, err = chartEvent.FindSegmentByUser(userSession.ID, start, limit, variableID, isCustom, startDate, finalDate)
			}

			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			variableOut := variableRes{
				VariableID: variableOne.ID,
				IsCustom:   variableOne.IsCustom,
				Events:     chartEvents,
			}

			variablesOut = append(variablesOut, variableOut)
		}

	} else {
		// El role de usuario es indefinido.
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	resJSON := constants.ResJSONs{Docs: variablesOut}
	return c.JSON(http.StatusOK, resJSON)
}

func getHash(n int) string {
	var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}

	return string(b)
}
