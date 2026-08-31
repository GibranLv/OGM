package report

import (
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	reportDB "github.com/JamsMendez/SION-sw/models/report"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(reportDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
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

	if isRoot || isSystemAdmin {
		// Acceso a los reportes
		where := map[string]interface{}{reportDB.KeyID: iID}

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
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		reportOne, err = report.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator {
		/*
			Acceso a los reportes de los usuarios con menor valor
			a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID

		reportOne, err = report.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if reportOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "del reporte")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		isCreator := userID == reportOne.UserID && reportOne.IsCreator
		if !isCreator {
			msg := fmt.Sprintf("No tienes permisos sobre del reporte %s", reportOne.Name)
			msgJSON := constants.MsgError{Message: msg}
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

	rJSON := reportDB.Report{}

	sJSON := c.FormValue(constants.KeyJSON)
	b := []byte(sJSON)

	if err := json.Unmarshal(b, &rJSON); err != nil {
		fmt.Println("report.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if rJSON.Name == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "nombre")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	now := time.Now()

	values[reportDB.KeyID] = iID
	values[reportDB.KeyName] = rJSON.Name
	values[reportDB.KeyUpdatedAt] = now

	hasStructureJSON := len(rJSON.StructureJSON) > 0
	if hasStructureJSON {
		bs, err := json.Marshal(rJSON.StructureJSON)
		if err == nil {
			sJSON := string(bs)
			values[reportDB.KeyStructureJSON] = sJSON
		}
	}

	tmpl, err := c.FormFile(reportDB.KeyTemplate)
	if err == nil {
		src, err := tmpl.Open()
		if err == nil {

			defer func(r multipart.File) {
				err := r.Close()
				if err != nil {
					fmt.Println("report.updateServer.mp.src.Error: ", err)
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
						fmt.Println("report.updateServer.os.src.Error: ", err)
					}
				}(dst)

				if _, err = io.Copy(dst, src); err == nil {
					values[reportDB.KeyTemplate] = name
				}
			}
		}
	}

	reportOne, err = report.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeUpdateReport
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se actualizó el report %s", reportOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: reportOne}
	return c.JSON(http.StatusOK, resJSON)
}
