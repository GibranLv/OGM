package unit

import (
	"fmt"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	alarmDB "github.com/JamsMendez/SION-sw/models/alarm"
	chartDB "github.com/JamsMendez/SION-sw/models/chart"
	matrixDB "github.com/JamsMendez/SION-sw/models/matrix"
	reportDB "github.com/JamsMendez/SION-sw/models/report"
	unitDB "github.com/JamsMendez/SION-sw/models/unit"
	userUnitDB "github.com/JamsMendez/SION-sw/models/user/unit"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

func deleteServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(unitDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	unit := unitDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	i64 := int64(iID)

	if name := isInMatrix(i64); name != "" {
		msg := fmt.Sprintf("La unidad esta siendo utilizada en la matriz %s", name)
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if name := isInReport(i64); name != "" {
		msg := fmt.Sprintf("La unidad esta siendo utilizada en el reporte %s", name)
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if isOk := isInChart(i64); isOk {
		msg := "La unidad esta siendo utilizada en alguna configuración de la gráfica"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if isOk := isInAlarm(i64); isOk {
		msg := "La unidad esta siendo utilizada en alguna alarma"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	var unitOne unitDB.Unit
	var numAffected int64

	if isRoot || isSystemAdmin {
		// Acceso a las unidades
		where := map[string]interface{}{unitDB.KeyID: iID}
		unitOne, err = unit.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a las unidades de los usuarios con menor valor
			a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene la Unidad para validar permisos de acceso
		unitOne, err = unit.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator {
		/*
			Acceso a las unidades de los usuarios con menor valor
			a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID

		// Se obtiene la Unidad para validar permisos de acceso
		unitOne, err = unit.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if unitOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "de la unidad")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		isCreator := userID == unitOne.UserID && unitOne.IsCreator
		if !isCreator {
			msg := fmt.Sprintf("No tienes los permisos de la unidad %s", unitOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if unitOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la unidad")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	err = removeRelationsOfUnit(unitOne.ID)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Se elimina el reporte
	where := map[string]interface{}{unitDB.KeyID: unitOne.ID}
	numAffected, err = unit.Remove(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la unidad")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeDeleteUnit
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se eliminó el reporte %s", unitOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}

func removeRelationsOfUnit(unitID int64) error {
	userUnit := userUnitDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se eliminan las relaciones con la unidad
	where := map[string]interface{}{userUnitDB.KeyUnitID: unitID}
	_, err := userUnit.Remove(where)
	if err != nil {
		fmt.Println("unit.deleteServer.userUnit.Remove")
	}

	return err
}

func isInMatrix(unitID int64) string {
	matrix := matrixDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var name string

	where := map[string]interface{}{}
	matrices, err := matrix.Find(where)
	if err != nil {
		fmt.Println("unit.isInMatrix.matrix.Find: ", err)

		return name
	}

	size := len(matrices)
	for i := 0; i < size; i++ {
		matrixOne := matrices[i]
		s := matrixOne.StructureJSON
		if isOk := isInUnitsInMatrix(unitID, s); isOk {
			name = matrixOne.Name
			break
		}
	}

	return name
}

func isInReport(unitID int64) string {
	report := reportDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var name string

	where := map[string]interface{}{}
	reports, err := report.Find(where)
	if err != nil {
		fmt.Println("unit.isInReport.report.Find: ", err)

		return name
	}

	size := len(reports)
	for i := 0; i < size; i++ {
		reportOne := reports[i]
		s := reportOne.StructureJSON
		if isOk := isInUnitsInReport(unitID, s); isOk {
			name = reportOne.Name
			break
		}
	}

	return name
}

func isInChart(unitID int64) bool {
	chart := chartDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var isOk bool

	where := map[string]interface{}{chartDB.KeyUnitID: unitID}
	chartOne, err := chart.FindOne(where)
	if err != nil {
		fmt.Println("unit.isInChart.chart.FindOne: ", err)

		return isOk
	}

	if chartOne.ID != 0 {
		isOk = true
	}

	return isOk
}

func isInAlarm(unitID int64) bool {
	alarm := alarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var isOk bool

	where := map[string]interface{}{alarmDB.KeyUnitID: unitID}
	alarmOne, err := alarm.FindOne(where)
	if err != nil {
		fmt.Println("unit.isInAlarm.alarm.FindOne: ", err)

		return isOk
	}

	if alarmOne.ID != 0 {
		isOk = true
	}

	return isOk
}

func isInUnitsInMatrix(unitID int64, s []matrixDB.StructJSON) bool {
	size := len(s)
	for i := 0; i < size; i++ {
		g := s[i]

		size = len(g.Variables)
		if size > 0 {
			for j := 0; j < size; j++ {
				variableOne := g.Variables[j]
				if variableOne.UnitID == unitID {
					return true
				}
			}
		}

		size = len(g.Sons)
		if size > 0 {
			return isInUnitsInMatrix(unitID, g.Sons)
		}
	}

	return false
}

func isInUnitsInReport(unitID int64, s []reportDB.StructJSON) bool {
	size := len(s)
	for i := 0; i < size; i++ {
		g := s[i]

		size = len(g.Variables)
		if size > 0 {
			for j := 0; j < size; j++ {
				variableOne := g.Variables[j]
				if variableOne.UnitID == unitID {
					return true
				}
			}
		}

		size = len(g.Sons)
		if size > 0 {
			return isInUnitsInReport(unitID, g.Sons)
		}
	}

	return false
}
