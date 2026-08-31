package report

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	groupDB "github.com/JamsMendez/SION-sw/models/group"
	reportDB "github.com/JamsMendez/SION-sw/models/report"
	unitDB "github.com/JamsMendez/SION-sw/models/unit"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	"github.com/JamsMendez/SION-sw/routers"
)

func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(reportDB.KeyID)

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if id == constants.ListParam {
		report := reportDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var reports []reportDB.Report
		var err error

		if isRoot || isSystemAdmin {

			userIDValue := c.QueryParam(constants.UserIDQuery)
			if userIDValue != "" {
				// Acceso a todas los reportes de todos los usuarios
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(userID)
				reports, err = report.FindByUser(i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Acceso a todas los reportes
				where := map[string]interface{}{}
				reports, err = report.Find(where)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isAdmin {

			userIDValue := c.QueryParam(constants.UserIDQuery)
			if userIDValue != "" {
				/*
					Acceso a todas las reportes de todos los usuarios
					con menos valor a la sesión del usuario
				*/
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(userID)
				value := userSession.Value

				reports, err = report.FindByUserAndLowerValue(i64, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				/*
					Acceso a todas las reportes de todos los usuarios
					con menos valor a la sesión del usuario
				*/
				userID := userSession.ID
				value := userSession.Value

				reports, err = report.FindByUserOrLowerValue(userID, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isOperator || isGuest {
			// Acceso a todas los reportes de la sesión del usuario
			userID := userSession.ID

			reports, err = report.FindByUser(userID)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			// El role de usuario es indefinido.
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		withStructure := c.QueryParam(withStructureQuery)
		if withStructure == constants.TrueValue {
			size := len(reports)
			for i := 0; i < size; i++ {
				structureJSON := reports[i].StructureJSON

				reports[i].Structure = []reportDB.Struct{}

				for _, sJSON := range structureJSON {
					structOne := getStruct(sJSON)
					if structOne.ID != 0 {
						reports[i].Structure = append(reports[i].Structure, structOne)
					}
				}
			}
		}

		withStructureJSON := c.QueryParam(withStructureJSONQuery)
		if withStructureJSON == constants.FalseValue {
			size := len(reports)
			for i := 0; i < size; i++ {
				reports[i].StructureJSON = nil
			}
		}

		resJSON := constants.ResJSONs{Docs: reports}
		return c.JSON(http.StatusOK, resJSON)
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

	if isRoot || isSystemAdmin {
		// Acceso a cualquier reporte
		where := map[string]interface{}{reportDB.KeyID: iID}
		reportOne, err = report.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a cualquier reporte de un usuario con menor valor
			a la sesión del usuario
		*/
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)

		reportOne, err = report.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		/*
			Acceso a cualquier reporte de un usuario con menor valor
			a la sesión del usuario
		*/
		i64 := int64(iID)
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

	withStructure := c.QueryParam(withStructureQuery)
	if withStructure == constants.TrueValue {
		structureJSON := reportOne.StructureJSON

		reportOne.Structure = []reportDB.Struct{}

		for _, sJSON := range structureJSON {
			structOne := getStruct(sJSON)
			if structOne.ID != 0 {
				reportOne.Structure = append(reportOne.Structure, structOne)
			}
		}
	}

	withStructureJSON := c.QueryParam(withStructureJSONQuery)
	if withStructureJSON == constants.FalseValue {
		reportOne.StructureJSON = nil
	}

	resJSON := constants.ResJSON{Doc: reportOne}
	return c.JSON(http.StatusOK, resJSON)
}

func getStruct(sJSON reportDB.StructJSON) reportDB.Struct {
	group := groupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
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

	unit := unitDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	structure := reportDB.Struct{}

	groupID := sJSON.GroupID
	where := map[string]interface{}{groupDB.KeyID: groupID}
	groupOne, err := group.FindOne(where)
	if err != nil {
		return structure
	}

	if groupOne.ID == 0 {
		return structure
	}

	structure.ID = groupOne.ID
	structure.Name = groupOne.Name
	structure.Type = groupOne.Type
	structure.Cell = sJSON.Cell
	structure.Page = sJSON.Page

	vars := sJSON.Variables
	if len(vars) > 0 {
		structure.Variables = []reportDB.Variable{}

		for _, variableJSON := range vars {
			variableID := variableJSON.ID
			if !variableJSON.IsCustom {
				where := map[string]interface{}{variableDB.KeyID: variableID}
				variableOne, err := variable.FindOne(where)
				if err == nil && variableOne.ID != 0 {
					vOne := reportDB.Variable{
						ID:     variableOne.ID,
						Name:   variableOne.Name,
						Alias:  variableOne.Alias,
						Device: variableOne.Device,
					}

					if variableJSON.Name != "" {
						vOne.Rename = variableJSON.Name
					}

					unitID := variableJSON.UnitID
					if unitID != 0 {
						where := map[string]interface{}{unitDB.KeyID: unitID}
						unitOne, err := unit.FindOne(where)
						if err == nil && unitOne.ID != 0 {
							vOne.UnitID = unitOne.ID
							vOne.Expression = unitOne.Expression
							vOne.Display = unitOne.Display
						}

					} else {
						vOne.Unit = variableOne.ReadingUnit
					}

					vOne.Cell = variableJSON.Cell

					structure.Variables = append(structure.Variables, vOne)
				}

			} else {
				where := map[string]interface{}{customVariableDB.KeyID: variableID}
				variableOne, err := customVariable.FindOne(where)
				if err == nil && variableOne.ID != 0 {
					vOne := reportDB.Variable{
						ID:       variableOne.ID,
						Name:     variableOne.Name,
						Device:   variableOne.Device,
						IsCustom: true,
					}

					if variableJSON.Name != "" {
						vOne.Rename = variableJSON.Name
					}

					unitID := variableJSON.UnitID
					if unitID != 0 {
						where := map[string]interface{}{unitDB.KeyID: unitID}
						unitOne, err := unit.FindOne(where)
						if err == nil && unitOne.ID != 0 {
							vOne.UnitID = unitOne.ID
							vOne.Expression = unitOne.Expression
							vOne.Display = unitOne.Display
						}

					} else {
						vOne.Unit = variableOne.Unit
					}

					vOne.Cell = variableJSON.Cell

					structure.Variables = append(structure.Variables, vOne)
				}
			}
		}
	}

	//vars = []reportDB.VariableJSON{}

	sons := sJSON.Sons
	if len(sons) > 0 {
		structure.Sons = []reportDB.Struct{}

		for _, sJSON := range sons {
			structOne := getStruct(sJSON)
			if structOne.ID != 0 {
				structure.Sons = append(structure.Sons, structOne)
			}
		}
	}

	return structure
}
