package util

import (
	"fmt"

	"github.com/JamsMendez/SION-sw/constants"
	customVariableCommentDB "github.com/JamsMendez/SION-sw/models/custom_variable/comment"
	groupCommentDB "github.com/JamsMendez/SION-sw/models/group/comment"
	matrixDB "github.com/JamsMendez/SION-sw/models/matrix"
	userCustomVariableDB "github.com/JamsMendez/SION-sw/models/user/custom_variable"
	userCustomVariableAlarmDB "github.com/JamsMendez/SION-sw/models/user/custom_variable_alarm"
	userGroupDB "github.com/JamsMendez/SION-sw/models/user/group"
	userVariableDB "github.com/JamsMendez/SION-sw/models/user/variable"
	userVariableAlarmDB "github.com/JamsMendez/SION-sw/models/user/variable_alarm"
	variableCommentDB "github.com/JamsMendez/SION-sw/models/variable/comment"
)

// UpdateUserVariablesInMatrices ... SION !OK
func UpdateUserVariablesInMatrices(userID int64, variables []matrixDB.VariableJSON) {
	// Relacionar las Variables de las Matrices con el Usuario
	userVariable := userVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userVariableAlarm := userVariableAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	variableComment := variableCommentDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{userVariableDB.KeyUserID: userID}
	userVariables, err := userVariable.Find(where)
	if err != nil {
		fmt.Println("User.updateUserVariablesInMatrices.userVariable.Find: ", err)

		return
	}

	size := len(variables)
	sizeUV := len(userVariables)

	// Se crean las relaciones del usuario y variable obsoletas
	for i := 0; i < size; i++ {
		insert := true
		variableOne := variables[i]
		ID := variableOne.ID

		for j := 0; j < sizeUV; j++ {
			userVariableOne := userVariables[j]
			variableID := userVariableOne.VariableID
			if variableID == ID {
				insert = false
				break
			}
		}

		if insert {
			// Se crea las relaciones del usuario y variable
			values := map[string]interface{}{
				userVariableDB.KeyUserID:     userID,
				userVariableDB.KeyVariableID: ID,
			}

			_, err := userVariable.Create(values)
			if err != nil {
				fmt.Println("User.updateUserVariablesInMatrices.userVariable.Create: ", err)
			}
		}
	}

	// Se eliminan las relaciones del usuario y variable obsoletas
	for i := 0; i < sizeUV; i++ {
		remove := true

		userVariableOne := userVariables[i]
		variableID := userVariableOne.VariableID

		for j := 0; j < size; j++ {
			variableOne := variables[j]
			ID := variableOne.ID
			if variableID == ID {
				remove = false
				break
			}
		}

		if remove {
			// Se eliminan las relaciones del usuario-variable y alarma
			where := map[string]interface{}{
				userVariableAlarmDB.KeyUserVariableID: userVariableOne.ID,
			}

			_, err := userVariableAlarm.Remove(where)
			if err != nil {
				fmt.Println("User.updateUserVariablesInMatrices.userVariableAlarm.Remove: ", err)
			}

			// Se eliminan las relaciones del usuario-variable y comentario
			where = map[string]interface{}{
				variableCommentDB.KeyUserVariableID: userVariableOne.ID,
			}

			_, err = variableComment.Remove(where)
			if err != nil {
				fmt.Println("User.updateUserVariablesInMatrices.variableComment.Remove: ", err)
			}

			// Se eliminan las relaciones del usuario y variable
			where = map[string]interface{}{
				userVariableDB.KeyID: userVariableOne.ID,
			}

			_, err = userVariable.Remove(where)
			if err != nil {
				fmt.Println("User.updateUserVariablesInMatrices.userVariable.Remove: ", err)
			}
		}
	}
}

// UpdateUserCustomVariablesInMatrices ... SION Ok!
func UpdateUserCustomVariablesInMatrices(userID int64, customVariables []matrixDB.VariableJSON) {
	// Relacionar las Variables personalizadas de las Matrices con el Usuario
	userCustomVariable := userCustomVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userCustomVariableAlarm := userCustomVariableAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	customVariableComment := customVariableCommentDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{userCustomVariableDB.KeyUserID: userID}
	userCustomVariables, err := userCustomVariable.Find(where)
	if err != nil {
		fmt.Println("User.updateUserCustomVariablesInMatrices.userCustomVariable.Find: ", err)

		return
	}

	size := len(customVariables)
	sizeUCV := len(userCustomVariables)

	// Se eliminan las relaciones del usuario y la variable personalizada
	for i := 0; i < sizeUCV; i++ {
		remove := true

		userCustomVariableOne := userCustomVariables[i]
		customVariableID := userCustomVariableOne.CustomVariableID

		for j := 0; j < size; j++ {
			customVariableOne := customVariables[j]
			ID := customVariableOne.ID
			if customVariableID == ID {
				remove = false
				break
			}
		}

		if remove {
			// Se eliminan las relaciones del usuario - variable personalizada y alarma
			where := map[string]interface{}{
				userCustomVariableAlarmDB.KeyUserCustomVariableID: userCustomVariableOne.ID,
			}

			_, err := userCustomVariableAlarm.Remove(where)
			if err != nil {
				fmt.Println("User.updateUserCustomVariablesInMatrices.userCustomVariableAlarm.Remove: ", err)
			}

			// Se elimina las relaciones del usuario - variable personalizada y comentarios
			where = map[string]interface{}{
				customVariableCommentDB.KeyUserCustomVariableID: userCustomVariableOne.ID,
			}

			_, err = customVariableComment.Remove(where)
			if err != nil {
				fmt.Println("User.updateUserCustomVariablesInMatrices.customVariableComment.Remove: ", err)
			}

			// Se eliminar las relaciones usuario - variable personalizada
			where = map[string]interface{}{
				userCustomVariableDB.KeyID: userCustomVariableOne.ID,
			}

			_, err = userCustomVariable.Remove(where)
			if err != nil {
				fmt.Println("User.updateUserCustomVariablesInMatrices.userCustomVariable.Remove: ", err)
			}
		}
	}

	// Se crean las relaciones del usuario y la variable personalizada
	for i := 0; i < size; i++ {
		insert := true
		customVariableOne := customVariables[i]
		ID := customVariableOne.ID

		for j := 0; j < sizeUCV; j++ {
			userCustomVariableOne := userCustomVariables[j]
			customVariableID := userCustomVariableOne.CustomVariableID
			if customVariableID == ID {
				insert = false
				break
			}
		}

		if insert {
			values := map[string]interface{}{
				userCustomVariableDB.KeyUserID:           userID,
				userCustomVariableDB.KeyCustomVariableID: ID,
				userCustomVariableDB.KeyIsCreator:        false,
			}

			_, err := userCustomVariable.Create(values)
			if err != nil {
				fmt.Println("User.updateUserCustomVariablesInMatrices.userCustomVariable.Create: ", err)
			}
		}
	}

}

// UpdateUserGroupsInMatrices ... SION Ok!
func UpdateUserGroupsInMatrices(userID int64, groups []int64) {
	// Relacionar los Grupos de las Matrices con el Usuario
	userGroup := userGroupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	groupComment := groupCommentDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{userGroupDB.KeyUserID: userID}
	userGroups, err := userGroup.Find(where)
	if err != nil {
		fmt.Println("User.updateUserGroupsInMatrices.userGroup.Find: ", err)

		return
	}

	size := len(groups)
	sizeUG := len(userGroups)

	// Se eliminan las relaciones usuario y grupo obsoleto
	for i := 0; i < sizeUG; i++ {
		remove := true

		userGroupOne := userGroups[i]
		groupID := userGroupOne.GroupID

		for j := 0; j < size; j++ {
			ID := groups[j]
			if groupID == ID {
				remove = false
				break
			}
		}

		if remove {
			// Se elimina las relaciones grupo y comentario
			where := map[string]interface{}{groupCommentDB.KeyUserGroupID: userGroupOne.ID}
			_, err := groupComment.Remove(where)
			if err != nil {
				fmt.Println("User.updateUserGroupsInMatrices.groupComment.Remove: ", err)
			}

			// Se elimina las relaciones de usuario y grupo
			where = map[string]interface{}{userGroupDB.KeyID: userGroupOne.ID}
			_, err = userGroup.Remove(where)
			if err != nil {
				fmt.Println("User.updateUserGroupsInMatrices.userGroup.Remove: ", err)
			}
		}
	}

	// Se crean las relaciones del usuario y grupo
	for i := 0; i < size; i++ {
		insert := true
		ID := groups[i]

		for j := 0; j < sizeUG; j++ {
			userGroupOne := userGroups[j]
			groupID := userGroupOne.GroupID
			if groupID == ID {
				insert = false
				break
			}
		}

		if insert {
			values := map[string]interface{}{
				userGroupDB.KeyUserID:  userID,
				userGroupDB.KeyGroupID: ID,
			}

			_, err := userGroup.Create(values)
			if err != nil {
				fmt.Println("User.updateUserGroupsInMatrices.userGroup.Create: ", err)
			}
		}
	}
}

// GetVariablesInMatrix ... SION Ok!
func GetVariablesInMatrix(s []matrixDB.StructJSON) []matrixDB.VariableJSON {
	variables := []matrixDB.VariableJSON{}

	size := len(s)
	for i := 0; i < size; i++ {
		g := s[i]

		vars := []matrixDB.VariableJSON{}

		sizeSons := len(g.Sons)
		if sizeSons > 0 {
			vars = GetVariablesInMatrix(g.Sons)
		}

		sizeVars := len(g.Variables)
		if sizeVars > 0 {
			for j := 0; j < sizeVars; j++ {
				v := g.Variables[j]
				variables = append(variables, v)
			}
		}

		sizeVars = len(vars)
		for j := 0; j < sizeVars; j++ {
			v := vars[j]
			variables = append(variables, v)
		}
	}

	return variables
}

// GetGroupsInMatrix ... SION Ok!
func GetGroupsInMatrix(s []matrixDB.StructJSON) []matrixDB.StructJSON {
	groups := []matrixDB.StructJSON{}

	size := len(s)
	for i := 0; i < size; i++ {
		g := s[i]

		gs := []matrixDB.StructJSON{}

		sizeSons := len(g.Sons)
		if sizeSons > 0 {
			gs = GetGroupsInMatrix(g.Sons)
		}

		o := matrixDB.StructJSON{GroupID: g.GroupID}

		groups = append(groups, o)

		sizeGs := len(gs)
		for j := 0; j < sizeGs; j++ {
			g := gs[j]
			groups = append(groups, g)
		}
	}

	return groups
}
