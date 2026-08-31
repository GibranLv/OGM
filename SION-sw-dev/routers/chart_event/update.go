package chartevent

import (
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	chartEventDB "github.com/JamsMendez/SION-sw/models/chart_event"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(chartEventDB.KeyID)
	iID, err := routers.ParseInt(id)
	if err != nil {
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

	var chartEventOne chartEventDB.ChartEvent

	if userSession.Role == constants.RootUser {
		// Super usuario
		// Acceso a cualquier Grupo
		where := map[string]interface{}{chartEventDB.KeyID: iID}
		chartEventOne, err = chartEvent.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.AdminUser {
		// Administrador
		// Acceso a cualquier Grupo de un usuario con role de valor inferior
		// o la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)
		chartEventOne, err = chartEvent.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.OperatorUser {
		// Operador
		// Acceso a cualquier Grupo de un usuario con role de valor inferior
		// o la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)
		chartEventOne, err = chartEvent.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.GuestUser {
		// Invitado
		// Acceso a la Grupo relacionada a la sesión del usuario
		userID := userSession.ID
		i64 := int64(iID)
		chartEventOne, err = chartEvent.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		return c.NoContent(http.StatusNonAuthoritativeInfo)
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
		fmt.Println("chartEvent.updateServer.Unmarshal: ", err)
		return c.NoContent(http.StatusBadRequest)
	}

	values := map[string]interface{}{}

	if eJSON.VariableID != chartEventOne.VariableID {
		values[chartEventDB.KeyVariableID] = eJSON.VariableID
	}

	if eJSON.IsCustom != chartEventOne.IsCustom {
		values[chartEventDB.KeyIsCustom] = eJSON.IsCustom
	}

	if eJSON.Name != chartEventOne.Name {
		values[chartEventDB.KeyName] = eJSON.Name
	}

	if eJSON.Description != chartEventOne.Description {
		values[chartEventDB.KeyDescription] = eJSON.Description
	}

	now := time.Now().UTC()
	if len(values) > 0 {
		values[chartEventDB.KeyID] = iID
		values[chartEventDB.KeyUpdatedAt] = now

		// Se crea el Grupo
		chartEventOne, err = chartEvent.Update(values)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	// Actualizar los archivos del Evento
	var updateFiles bool
	values = map[string]interface{}{chartEventDB.KeyID: chartEventOne.ID}

	filesIn := []chartEventDB.File{}

	for i := 0; i < vSize; i++ {
		key := fmt.Sprintf("%s_%d", constants.KeyFile, i+1)
		fileOne, err := c.FormFile(key)
		if err == nil {
			src, err := fileOne.Open()
			if err == nil {
				defer func(r multipart.File) {
					err := r.Close()
					if err != nil {
						fmt.Println("chartEvent.updateServer.File.src.Error: ", key, err)
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
							fmt.Println("chartEvent.updateServer.File.src.Error: ", err)
						}
					}(dst)
					if _, err = io.Copy(dst, src); err == nil {
						fileIn := chartEventDB.File{
							Alias: fileOne.Filename,
							Name:  name,
						}

						filesIn = append(filesIn, fileIn)
						updateFiles = true
					}
				}
			}
		}
	}

	sizeIn := len(eJSON.Files)
	if len(chartEventOne.Files) != sizeIn {
		updateFiles = true
	}

	for _, fileIn := range filesIn {
		insert := true
		for i := 0; i < sizeIn; i++ {
			file := eJSON.Files[i]
			if file.Alias == fileIn.Alias {
				eJSON.Files[i] = fileIn
				insert = false
				updateFiles = true
			}
		}

		if insert {
			eJSON.Files = append(eJSON.Files, fileIn)
			updateFiles = true
		}
	}

	buffer, err := json.Marshal(eJSON.Files)
	if err != nil {
		fmt.Println("chartEvent.updateServer.json.Marshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	filesJSON := string(buffer)

	values[chartEventDB.KeyFiles] = filesJSON
	if updateFiles {
		values[chartEventDB.KeyUpdatedAt] = now
	}

	chartEventOne, err = chartEvent.Update(values)
	if err != nil {
		fmt.Println("chartEvent.updateServer.chartEvent.Update: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	chartEventOne, err = chartEvent.FindOneTotable(chartEventOne.ID, chartEventOne.IsCustom)
	if err != nil {
		fmt.Println("chartEvent.updateServer.chartEvent.FindOneTotable: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	resJSON := constants.ResJSON{Doc: chartEventOne}
	return c.JSON(http.StatusOK, resJSON)
}
