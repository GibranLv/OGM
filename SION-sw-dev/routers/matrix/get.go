package matrix

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	alarmDB "github.com/JamsMendez/SION-sw/models/alarm"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	ccommentDB "github.com/JamsMendez/SION-sw/models/custom_variable/comment"
	groupDB "github.com/JamsMendez/SION-sw/models/group"
	gcommentDB "github.com/JamsMendez/SION-sw/models/group/comment"
	matrixDB "github.com/JamsMendez/SION-sw/models/matrix"
	naDB "github.com/JamsMendez/SION-sw/models/na_variable"
	unitDB "github.com/JamsMendez/SION-sw/models/unit"
	userCustomVariableDB "github.com/JamsMendez/SION-sw/models/user/custom_variable"
	userGroupDB "github.com/JamsMendez/SION-sw/models/user/group"
	userVariableDB "github.com/JamsMendez/SION-sw/models/user/variable"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	commentDB "github.com/JamsMendez/SION-sw/models/variable/comment"
	"github.com/JamsMendez/SION-sw/routers"
)

// Data ...
type Data struct {
	groups          []groupDB.Group
	variables       []variableDB.Variable
	customVariables []customVariableDB.CustomVariable
	units           []unitDB.Unit
	nas             []naDB.NAVariable
}

// SION ... !OK
func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(matrixDB.KeyID)

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if id == constants.ListParam {
		matrix := matrixDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var matrices []matrixDB.Matrix
		var err error

		if isRoot || isSystemAdmin {

			userIDValue := c.QueryParam(constants.UserIDQuery)
			if userIDValue != "" {
				// Acceso a todas las matrices de todos los usuarios
				var userID int64

				if userIDValue == constants.SelfValue {
					userID = userSession.ID

				} else {
					vInt, err := routers.ParseInt(userIDValue)
					if err != nil {
						msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
						return c.JSON(http.StatusAccepted, msgJSON)
					}

					userID = int64(vInt)
				}

				matrices, err = matrix.FindByUser(userID)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Acceso a todas las matrices
				where := map[string]interface{}{}
				matrices, err = matrix.Find(where)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isAdmin {

			userIDValue := c.QueryParam(constants.UserIDQuery)
			if userIDValue != "" {
				/*
					Acceso a todas las matrices de todos los usuarios
					con menos valor a la sesión del usuario
				*/
				var userID int64

				if userIDValue == constants.SelfValue {
					userID = userSession.ID

				} else {
					vInt, err := routers.ParseInt(userIDValue)
					if err != nil {
						msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
						return c.JSON(http.StatusAccepted, msgJSON)
					}

					userID = int64(vInt)
				}

				value := userSession.Value

				matrices, err = matrix.FindByUserAndLowerValue(userID, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				/*
					Acceso a todas las matrices de todos los usuarios
					con menos valor a la sesión del usuario
				*/
				userID := userSession.ID
				value := userSession.Value

				matrices, err = matrix.FindByUserOrLowerValue(userID, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isOperator || isGuest {
			// Acceso a todas las matrices de la sesión del usuario
			userID := userSession.ID

			matrices, err = matrix.FindByUser(userID)
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
			size := len(matrices)
			if size > 0 {
				data := getData()

				for i := 0; i < size; i++ {
					structureJSON := matrices[i].StructureJSON

					matrices[i].Structure = []matrixDB.Struct{}

					for _, sJSON := range structureJSON {
						//structOne := getStruct(sJSON, userSession.ID)
						structOne := getStruct2(sJSON, userSession.ID, &data)
						if structOne.ID != 0 {
							matrices[i].Structure = append(matrices[i].Structure, structOne)
						}
					}
				}

				data.groups = []groupDB.Group{}
				data.variables = []variableDB.Variable{}
				data.customVariables = []customVariableDB.CustomVariable{}
				data.units = []unitDB.Unit{}
				data.nas = []naDB.NAVariable{}
			}
		}

		withStructureJSON := c.QueryParam(withStructureJSONQuery)
		if withStructureJSON == constants.FalseValue {
			size := len(matrices)
			for i := 0; i < size; i++ {
				matrices[i].StructureJSON = nil
			}
		}

		resJSON := constants.ResJSONs{Docs: matrices}
		return c.JSON(http.StatusOK, resJSON)
	}

	matrix := matrixDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	var matrixOne matrixDB.Matrix

	if isRoot || isSystemAdmin {
		// Acceso a cualquier matriz
		where := map[string]interface{}{matrixDB.KeyID: iID}
		matrixOne, err = matrix.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {

		/*
			Acceso a cualquier matriz de los usuarios con menos valor y
			relacionada a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		matrixOne, err = matrix.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		// Acceso a la matriz relacionada a la sesión del usuario
		userID := userSession.ID
		i64 := int64(iID)
		matrixOne, err = matrix.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if matrixOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la matriz")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	withStructure := c.QueryParam(withStructureQuery)

	if withStructure == constants.TrueValue {
		structureJSON := matrixOne.StructureJSON

		data := getData()
		matrixOne.Structure = []matrixDB.Struct{}

		for _, sJSON := range structureJSON {
			//structOne := getStruct(sJSON, userSession.ID)
			structOne := getStruct2(sJSON, userSession.ID, &data)
			if structOne.ID != 0 {
				matrixOne.Structure = append(matrixOne.Structure, structOne)
			}
		}

		data.groups = []groupDB.Group{}
		data.variables = []variableDB.Variable{}
		data.customVariables = []customVariableDB.CustomVariable{}
		data.units = []unitDB.Unit{}
		data.nas = []naDB.NAVariable{}
	}

	withStructureJSON := c.QueryParam(withStructureJSONQuery)
	if withStructureJSON == constants.FalseValue {
		matrixOne.StructureJSON = nil
	}

	resJSON := constants.ResJSON{Doc: matrixOne}
	return c.JSON(http.StatusOK, resJSON)
}

func getStruct(sJSON matrixDB.StructJSON, userID int64) matrixDB.Struct {
	group := groupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	alarm := alarmDB.Model{
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

	na := naDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	comment := commentDB.Model{
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

	ccomment := ccommentDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	gcomment := gcommentDB.Model{
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

	userCustomVariable := userCustomVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userGroup := userGroupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userVariable := userVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	structure := matrixDB.Struct{}

	groupID := sJSON.GroupID
	where := map[string]interface{}{groupDB.KeyID: groupID}
	groupOne, err := group.FindOne(where)
	if err != nil {
		return structure
	}

	if groupOne.ID != 0 {
		structure.ID = groupOne.ID
		structure.Name = groupOne.Name
		structure.Type = groupOne.Type
		structure.Latitude = groupOne.Latitude
		structure.Longitude = groupOne.Longitude
		structure.MarkerIcon = groupOne.MarkerIcon

		where = map[string]interface{}{
			userGroupDB.KeyGroupID: groupID,
			userGroupDB.KeyUserID:  userID,
		}

		userGroups, err := userGroup.Find(where)
		if err == nil {
			if len(userGroups) > 0 {
				userGroupOne := userGroups[0]

				where := map[string]interface{}{gcommentDB.KeyUserGroupID: userGroupOne.ID}
				commentOne, err := gcomment.FindOne(where)
				if commentOne.ID != 0 && err == nil {
					structure.Comment = commentOne.Comment
				} else {
					structure.Comment = constants.NA
				}
			}
		}

		vars := sJSON.Variables

		if len(vars) > 0 {
			// Se obtienen las unidades y variables nulas
			where := map[string]interface{}{}
			units, err := unit.Find(where)
			if err != nil {
				fmt.Println("Router.Matrix.getStruct.Unit.Find: ", err)
			}

			where = map[string]interface{}{}
			nas, err := na.Find(where)
			if err != nil {
				fmt.Println("Router.Matrix.getStruct.NA.Find: ", err)
			}
			// Se obtienen las unidades y variables nulas

			structure.Variables = []matrixDB.Variable{}

			for _, variableJSON := range vars {
				variableID := variableJSON.ID

				if !variableJSON.IsCustom {
					// === Variable ===

					where := map[string]interface{}{variableDB.KeyID: variableID}
					variableOne, err := variable.FindOne(where)
					if err == nil && variableOne.ID != 0 {
						vOne := matrixDB.Variable{
							ID:     variableOne.ID,
							Name:   variableOne.Name,
							Alias:  variableOne.Alias,
							Device: variableOne.Device,
						}

						for _, naOne := range nas {
							if naOne.VariableID == variableOne.ID && naOne.IsCustom == false {
								vOne.IsNA = true
								break
							}
						}

						if variableJSON.Name != "" {
							vOne.Rename = variableJSON.Name
						}

						// Se obtiene la unidad de la variable
						unitID := variableJSON.UnitID
						if unitID != 0 {
							for _, unitOne := range units {
								if unitID == unitOne.ID {
									vOne.UnitID = unitOne.ID
									vOne.Expression = unitOne.Expression
									vOne.Display = unitOne.Display
									break
								}
							}

						} else {
							vOne.Unit = variableOne.ReadingUnit
						}

						// Se obtiene la relacion usuario y grupo
						where = map[string]interface{}{}

						// Se obtiene el comentario de la variable
						where = map[string]interface{}{
							userVariableDB.KeyUserID:     userID,
							userVariableDB.KeyVariableID: variableOne.ID,
						}

						userVariables, err := userVariable.Find(where)
						if err == nil {
							if len(userVariables) > 0 {
								userVariableOne := userVariables[0]

								where := map[string]interface{}{
									commentDB.KeyUserVariableID: userVariableOne.ID,
								}

								commentOne, err := comment.FindOne(where)
								if commentOne.ID != 0 && err == nil {
									vOne.Comment = commentOne.Comment
								}
							}
						}

						alarms, err := alarm.FindByUserAndVariable(userID, variableID, false)
						if err == nil {
							vOne.Alarms = []matrixDB.Alarm{}

							for _, alarmOne := range alarms {
								aOne := matrixDB.Alarm{
									ID:       alarmOne.ID,
									Name:     alarmOne.Name,
									Alias:    alarmOne.Alias,
									Color:    alarmOne.Color,
									Setpoint: alarmOne.Setpoint,
									Status:   alarmOne.Status,
								}

								vOne.Alarms = append(vOne.Alarms, aOne)
							}
						}

						structure.Variables = append(structure.Variables, vOne)
					}

				} else {
					// === Variable Personalizada ===

					where := map[string]interface{}{customVariableDB.KeyID: variableID}
					variableOne, err := customVariable.FindOne(where)
					if err == nil && variableOne.ID != 0 {
						vOne := matrixDB.Variable{
							ID:       variableOne.ID,
							Name:     variableOne.Name,
							Device:   variableOne.Device,
							IsCustom: true,
						}

						for _, naOne := range nas {
							if naOne.VariableID == variableOne.ID && naOne.IsCustom == true {
								vOne.IsNA = true
								break
							}
						}

						if variableJSON.Name != "" {
							vOne.Rename = variableJSON.Name
						}

						// Se obtiene la unidad de la variable, si la tiene
						unitID := variableJSON.UnitID
						if unitID != 0 {
							for _, unitOne := range units {
								if unitID == unitOne.ID {
									vOne.UnitID = unitOne.ID
									vOne.Expression = unitOne.Expression
									vOne.Display = unitOne.Display
									break
								}
							}

						} else {
							vOne.Unit = variableOne.Unit
						}

						// Se obtiene el comentario de la variable
						where = map[string]interface{}{
							userCustomVariableDB.KeyUserID:           userID,
							userCustomVariableDB.KeyCustomVariableID: variableOne.ID,
						}

						userCustomVariables, err := userCustomVariable.Find(where)
						if err == nil {
							if len(userCustomVariables) > 0 {
								userCustomVariableOne := userCustomVariables[0]

								where := map[string]interface{}{
									ccommentDB.KeyUserCustomVariableID: userCustomVariableOne.ID,
								}

								commentOne, err := ccomment.FindOne(where)
								if commentOne.ID != 0 && err == nil {
									vOne.Comment = commentOne.Comment
								}
							}
						}

						alarms, err := alarm.FindByUserCustomVariable(userID, variableID, false)
						if err == nil {
							vOne.Alarms = []matrixDB.Alarm{}

							for _, alarmOne := range alarms {
								aOne := matrixDB.Alarm{
									ID:       alarmOne.ID,
									Name:     alarmOne.Name,
									Alias:    alarmOne.Alias,
									Color:    alarmOne.Color,
									Setpoint: alarmOne.Setpoint,
									Status:   alarmOne.Status,
								}

								vOne.Alarms = append(vOne.Alarms, aOne)
							}
						}

						structure.Variables = append(structure.Variables, vOne)
					}
				}
			}
		}

		sons := sJSON.Sons
		if len(sons) > 0 {
			structure.Sons = []matrixDB.Struct{}

			for _, sJSON := range sons {
				structOne := getStruct(sJSON, userID)
				if structOne.ID != 0 {
					structure.Sons = append(structure.Sons, structOne)
				}
			}
		}
	}

	return structure
}

func getStruct2(sJSON matrixDB.StructJSON, userID int64, data *Data) matrixDB.Struct {
	alarm := alarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	comment := commentDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	ccomment := ccommentDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	gcomment := gcommentDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userCustomVariable := userCustomVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userGroup := userGroupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userVariable := userVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	gSize := len(data.groups)
	vSize := len(data.variables)
	cvSize := len(data.customVariables)

	structure := matrixDB.Struct{}

	groupID := sJSON.GroupID
	var groupOne groupDB.Group

	for i := 0; i < gSize; i++ {
		gOne := data.groups[i]
		if groupID == gOne.ID {
			groupOne = data.groups[i]
			break
		}
	}

	if groupOne.ID != 0 {
		structure.ID = groupOne.ID
		structure.Name = groupOne.Name
		structure.Type = groupOne.Type
		structure.Latitude = groupOne.Latitude
		structure.Longitude = groupOne.Longitude
		structure.MarkerIcon = groupOne.MarkerIcon

		where := map[string]interface{}{
			userGroupDB.KeyGroupID: groupID,
			userGroupDB.KeyUserID:  userID,
		}

		userGroups, err := userGroup.Find(where)
		if err == nil {
			if len(userGroups) > 0 {
				userGroupOne := userGroups[0]

				where := map[string]interface{}{gcommentDB.KeyUserGroupID: userGroupOne.ID}
				commentOne, err := gcomment.FindOne(where)
				if commentOne.ID != 0 && err == nil {
					structure.Comment = commentOne.Comment
				} else {
					structure.Comment = constants.NA
				}
			}
		}

		vars := sJSON.Variables

		if len(vars) > 0 {
			// Se obtienen las unidades y variables nulas
			structure.Variables = []matrixDB.Variable{}

			for _, variableJSON := range vars {
				variableID := variableJSON.ID

				if !variableJSON.IsCustom {
					// === Variable ===

					var variableOne variableDB.Variable

					for i := 0; i < vSize; i++ {
						vOne := data.variables[i]
						if variableID == vOne.ID {
							variableOne = data.variables[i]
							break
						}
					}

					if variableOne.ID != 0 {
						vOne := matrixDB.Variable{
							ID:     variableOne.ID,
							Name:   variableOne.Name,
							Alias:  variableOne.Alias,
							Device: variableOne.Device,
						}

						for _, naOne := range data.nas {
							if naOne.VariableID == variableOne.ID && naOne.IsCustom == false {
								vOne.IsNA = true
								break
							}
						}

						if variableJSON.Name != "" {
							vOne.Rename = variableJSON.Name
						}

						// Se obtiene la unidad de la variable
						unitID := variableJSON.UnitID
						if unitID != 0 {
							for _, unitOne := range data.units {
								if unitID == unitOne.ID {
									vOne.UnitID = unitOne.ID
									vOne.Expression = unitOne.Expression
									vOne.Display = unitOne.Display
									break
								}
							}

						} else {
							vOne.Unit = variableOne.ReadingUnit
						}

						// Se obtiene la relacion usuario y grupo
						where = map[string]interface{}{}

						// Se obtiene el comentario de la variable
						where = map[string]interface{}{
							userVariableDB.KeyUserID:     userID,
							userVariableDB.KeyVariableID: variableOne.ID,
						}

						userVariables, err := userVariable.Find(where)
						if err == nil {
							if len(userVariables) > 0 {
								userVariableOne := userVariables[0]

								where := map[string]interface{}{
									commentDB.KeyUserVariableID: userVariableOne.ID,
								}

								commentOne, err := comment.FindOne(where)
								if commentOne.ID != 0 && err == nil {
									vOne.Comment = commentOne.Comment
								}
							}
						}

						alarms, err := alarm.FindByUserAndVariable(userID, variableID, false)
						if err == nil {
							vOne.Alarms = []matrixDB.Alarm{}

							for _, alarmOne := range alarms {
								aOne := matrixDB.Alarm{
									ID:       alarmOne.ID,
									Name:     alarmOne.Name,
									Alias:    alarmOne.Alias,
									Color:    alarmOne.Color,
									Setpoint: alarmOne.Setpoint,
									Status:   alarmOne.Status,
								}

								vOne.Alarms = append(vOne.Alarms, aOne)
							}

							alarms = []alarmDB.Alarm{}
						}

						structure.Variables = append(structure.Variables, vOne)
					}

				} else {

					// === Variable Personalizada ===
					var variableOne customVariableDB.CustomVariable

					for i := 0; i < cvSize; i++ {
						vOne := data.customVariables[i]
						if variableID == vOne.ID {
							variableOne = data.customVariables[i]
							break
						}
					}

					if variableOne.ID != 0 {
						vOne := matrixDB.Variable{
							ID:       variableOne.ID,
							Name:     variableOne.Name,
							Device:   variableOne.Device,
							IsCustom: true,
						}

						for _, naOne := range data.nas {
							if naOne.VariableID == variableOne.ID && naOne.IsCustom == true {
								vOne.IsNA = true
								break
							}
						}

						if variableJSON.Name != "" {
							vOne.Rename = variableJSON.Name
						}

						// Se obtiene la unidad de la variable, si la tiene
						unitID := variableJSON.UnitID
						if unitID != 0 {
							for _, unitOne := range data.units {
								if unitID == unitOne.ID {
									vOne.UnitID = unitOne.ID
									vOne.Expression = unitOne.Expression
									vOne.Display = unitOne.Display
									break
								}
							}

						} else {
							vOne.Unit = variableOne.Unit
						}

						// Se obtiene el comentario de la variable
						where = map[string]interface{}{
							userCustomVariableDB.KeyUserID:           userID,
							userCustomVariableDB.KeyCustomVariableID: variableOne.ID,
						}

						userCustomVariables, err := userCustomVariable.Find(where)
						if err == nil {
							if len(userCustomVariables) > 0 {
								userCustomVariableOne := userCustomVariables[0]

								where := map[string]interface{}{
									ccommentDB.KeyUserCustomVariableID: userCustomVariableOne.ID,
								}

								commentOne, err := ccomment.FindOne(where)
								if commentOne.ID != 0 && err == nil {
									vOne.Comment = commentOne.Comment
								}
							}
						}

						alarms, err := alarm.FindByUserCustomVariable(userID, variableID, false)
						if err == nil {
							vOne.Alarms = []matrixDB.Alarm{}

							for _, alarmOne := range alarms {
								aOne := matrixDB.Alarm{
									ID:       alarmOne.ID,
									Name:     alarmOne.Name,
									Alias:    alarmOne.Alias,
									Color:    alarmOne.Color,
									Setpoint: alarmOne.Setpoint,
									Status:   alarmOne.Status,
								}

								vOne.Alarms = append(vOne.Alarms, aOne)
							}

							alarms = []alarmDB.Alarm{}
						}

						structure.Variables = append(structure.Variables, vOne)
					}
				}
			}
		}

		sons := sJSON.Sons
		if len(sons) > 0 {
			structure.Sons = []matrixDB.Struct{}

			for _, sJSON := range sons {
				structOne := getStruct2(sJSON, userID, data)
				if structOne.ID != 0 {
					structure.Sons = append(structure.Sons, structOne)
				}
			}
		}
	}

	return structure
}

func getData() Data {
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

	na := naDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var err error
	where := map[string]interface{}{}
	data := Data{}

	data.groups, err = group.Find(where)
	if err != nil {
		fmt.Println("Matrix.getData.Group.Find: ", err)
	}

	data.variables, err = variable.Find(where)
	if err != nil {
		fmt.Println("Matrix.getData.Variable.Find: ", err)
	}

	data.customVariables, err = customVariable.Find(where)
	if err != nil {
		fmt.Println("Matrix.getData.CustomVariable.Find: ", err)
	}

	data.units, err = unit.Find(where)
	if err != nil {
		fmt.Println("Matrix.getData.Unit.Find: ", err)
	}

	data.nas, err = na.Find(where)
	if err != nil {
		fmt.Println("Matrix.getData.NAVariable.Find: ", err)
	}

	return data
}
