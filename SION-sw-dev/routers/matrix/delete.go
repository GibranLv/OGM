package matrix

import (
	"fmt"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	graphicDB "github.com/JamsMendez/SION-sw/models/graphic"
	matrixDB "github.com/JamsMendez/SION-sw/models/matrix"
	operationDB "github.com/JamsMendez/SION-sw/models/operation"
	userMatrixDB "github.com/JamsMendez/SION-sw/models/user/matrix"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

// SION ... !OK
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

	id := c.Param(matrixDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	i64 := int64(iID)

	if isOk := isInOperation(i64); isOk {
		msg := "La matriz esta siendo utilizado en alguna operación"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if isOk := isInGraphic(i64); isOk {
		msg := "La matriz esta siendo utilizado en algun gráfico dinámico"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	var usersMatrix []userMatrixDB.UserMatrix
	var matrixOne matrixDB.Matrix
	var numAffected int64

	matrix := matrixDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	if isRoot || isSystemAdmin {
		// Acceso a todas las matrices
		where := map[string]interface{}{matrixDB.KeyID: iID}
		matrixOne, err = matrix.FindOne(where)
		if err != nil {
			fmt.Println("matrix.deleteServer.Matrix.FindOne")

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if matrixOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "de la matriz")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		usersMatrix, err = removeRelationsOfMatrix(matrixOne.ID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		where = map[string]interface{}{matrixDB.KeyID: iID}
		numAffected, err = matrix.Remove(where)
		if err != nil {
			fmt.Println("matrix.deleteServer.UserMatrix.Remove")

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a las matrices de los usuarios con menos valor
			y sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		matrixOne, err = matrix.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			fmt.Println("matrix.deleteServer.Matrix.FindOne")

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if matrixOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "de la matriz")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		usersMatrix, err = removeRelationsOfMatrix(matrixOne.ID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		where := map[string]interface{}{matrixDB.KeyID: iID}
		numAffected, err = matrix.Remove(where)
		if err != nil {
			fmt.Println("matrix.deleteServer.UserMatrix.Remove")

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator {
		/*
			Acceso a las matrices de los usuarios con menos
			valor a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene la matriz para validar permisos de acceso
		matrixOne, err = matrix.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if matrixOne.ID == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		isCreator := userID == matrixOne.UserID && matrixOne.IsCreator
		if !isCreator {
			msg := fmt.Sprintf("No tienes permisos sobre la matriz %s", matrixOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		usersMatrix, err = removeRelationsOfMatrix(matrixOne.ID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina la matriz
		where := map[string]interface{}{matrixDB.KeyID: matrixOne.ID}
		numAffected, err = matrix.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la matriz")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Se actualizar la variables y grupos de los usuarios
	users := []int64{}
	for _, userMatrixOne := range usersMatrix {
		users = append(users, userMatrixOne.UserID)
	}

	updateVariablesAndGroupsInMatrices(users)

	// Registro del Evento
	typeIn := constants.TypeDeleteMatrix
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se eliminó la matriz %s", matrixOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}

func removeRelationsOfMatrix(matrixID int64) ([]userMatrixDB.UserMatrix, error) {
	userMatrix := userMatrixDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se obtiene las relaciones usuario y matriz
	where := map[string]interface{}{userMatrixDB.KeyMatrixID: matrixID}
	usersMatrix, err := userMatrix.Find(where)
	if err != nil {
		fmt.Println("matrix.deleteServer.UserMatrix.Find")

		return nil, err
	}

	_, err = userMatrix.Remove(where)
	if err != nil {
		fmt.Println("matrix.deleteServer.UserMatrix.Remove")

		return nil, err
	}

	return usersMatrix, err
}

func updateVariablesAndGroupsInMatrices(users []int64) {
	matrix := matrixDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	for _, userID := range users {
		matrices, err := matrix.FindByUser(userID)
		if err != nil {
			fmt.Println("Matrix.updateVariablesAndGroupsInMatrices.FindByUser: ", err)

			return
		}

		variables := []matrixDB.VariableJSON{}
		customVariables := []matrixDB.VariableJSON{}
		groups := []int64{}

		size := len(matrices)
		for i := 0; i < size; i++ {
			matrixOne := matrices[i]
			s := matrixOne.StructureJSON

			// Insert Variables
			variablesOut := util.GetVariablesInMatrix(s)

			sizeVO := len(variablesOut)
			for j := 0; j < sizeVO; j++ {
				vo := variablesOut[j]

				insert := true
				sizeV := len(variables)
				for k := 0; k < sizeV; k++ {
					v := variables[k]
					isEqualID := v.ID == vo.ID
					isEqualCustom := v.IsCustom == vo.IsCustom
					if isEqualID && isEqualCustom {
						insert = false
						break
					}
				}

				if insert {
					if vo.IsCustom {
						customVariables = append(customVariables, vo)
					} else {
						variables = append(variables, vo)
					}
				}
			}

			// Insert Group
			GroupsOut := util.GetGroupsInMatrix(s)

			sizeGO := len(GroupsOut)
			for j := 0; j < sizeGO; j++ {
				groupO := GroupsOut[j]

				insert := true
				sizeG := len(groups)
				for k := 0; k < sizeG; k++ {
					ID := groups[k]
					isEqualID := ID == groupO.GroupID
					if isEqualID {
						insert = false
						break
					}
				}

				if insert {
					groups = append(groups, groupO.GroupID)
				}
			}
		}

		util.UpdateUserVariablesInMatrices(userID, variables)

		util.UpdateUserCustomVariablesInMatrices(userID, customVariables)

		util.UpdateUserGroupsInMatrices(userID, groups)
	}
}

func isInGraphic(matrixID int64) bool {
	graphic := graphicDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var isOk bool

	where := map[string]interface{}{
		graphicDB.KeyMatrixID: matrixID,
	}

	graphicOne, err := graphic.FindOne(where)
	if err != nil {
		fmt.Println("matrix.isInGraphic.graphic.FindOne: ", err)

		return isOk
	}

	if graphicOne.ID != 0 {
		isOk = true
	}

	return isOk
}

func isInOperation(matrixID int64) bool {
	operation := operationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var isOk bool

	where := map[string]interface{}{
		operationDB.KeyMatrixID: matrixID,
	}

	operationOne, err := operation.FindOne(where)
	if err != nil {
		fmt.Println("matrix.isInOperation.operation.FindOne: ", err)

		return isOk
	}

	if operationOne.ID != 0 {
		isOk = true
	}

	return isOk
}
