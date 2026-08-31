package group

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	graphicDB "github.com/JamsMendez/SION-sw/models/graphic"
	groupDB "github.com/JamsMendez/SION-sw/models/group"
	groupCommentDB "github.com/JamsMendez/SION-sw/models/group/comment"
	matrixDB "github.com/JamsMendez/SION-sw/models/matrix"
	operationDB "github.com/JamsMendez/SION-sw/models/operation"
	reportDB "github.com/JamsMendez/SION-sw/models/report"
	userGroupDB "github.com/JamsMendez/SION-sw/models/user/group"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
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

	id := c.Param(groupDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	group := groupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	i64 := int64(iID)

	if name := isInMatrix(i64); name != "" {
		msg := fmt.Sprintf("El grupo esta siendo utilizado en la matriz %s", name)
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if name := isInReport(i64); name != "" {
		msg := fmt.Sprintf("El grupo esta siendo utilizado en el reporte %s", name)
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if isOk := isInOperation(i64); isOk {
		msg := "El grupo esta siendo utilizado en alguna operación"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if isOk := isInGraphic(i64); isOk {
		msg := "El grupo esta siendo utilizado en algun gráfico dinámico"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	var groupOne groupDB.Group
	var numAffected int64

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	if isRoot || isSystemAdmin {
		// Acceso a todos los grupos
		where := map[string]interface{}{groupDB.KeyID: iID}
		groupOne, err = group.FindOne(where)
		if err != nil {
			fmt.Println("group.deleteServer.group.FindOne")

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina la información relacionada con el grupo
		err = removeRelationsOfGroup(groupOne.ID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina el grupo
		where = map[string]interface{}{groupDB.KeyID: iID}
		numAffected, err = group.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a los grupos de los usuarios con menos valor a la
			sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene el Grupo para validar permisos de acceso
		groupOne, err = group.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if groupOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "del grupo")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		isCreator := userID == groupOne.UserID && groupOne.IsCreator
		if !isCreator {
			msg := fmt.Sprintf("No tienes permisos sobre el grupo %s", groupOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err = removeRelationsOfGroup(groupOne.ID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina el grupo
		where := map[string]interface{}{groupDB.KeyID: groupOne.ID}
		numAffected, err = group.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator {
		// Acceso a los grupos de la sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID

		groupOne, err = group.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if groupOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "del grupo")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		isCreator := userID == groupOne.UserID && groupOne.IsCreator
		if !isCreator {
			msg := fmt.Sprintf("No tienes permisos sobre el grupo %s", groupOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err = removeRelationsOfGroup(groupOne.ID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina el grupo
		where := map[string]interface{}{groupDB.KeyID: groupOne.ID}
		numAffected, err = group.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del grupo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeDeleteGroup
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se eliminó el grupo %s", groupOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}

func removeRelationsOfGroup(groupID int64) error {
	// Se obtiene las relaciones de usuario y grupos
	userGroup := userGroupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{userGroupDB.KeyGroupID: groupID}
	usersGroup, err := userGroup.Find(where)
	if err != nil {
		fmt.Println("group.deleteServer.removeRelationsOfGroup.userGroup.Remove")

		return err
	}

	if len(usersGroup) > 0 {
		// Se elimina las relaciones de usuario-gropo y comentario
		groupComment := groupCommentDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		for _, userGroupOne := range usersGroup {
			ID := userGroupOne.ID

			where := map[string]interface{}{groupCommentDB.KeyUserGroupID: ID}
			_, err = groupComment.Remove(where)
			if err != nil {
				fmt.Println("group.deleteServer.removeRelationsOfGroup.userGroup.Remove")
			}
		}
	}

	// Se elimina los graficos dinamicos relacionados con el grupo
	graphic := graphicDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{graphicDB.KeyGroupID: groupID}
	_, err = graphic.Remove(where)
	if err != nil {
		fmt.Println("group.deleteServer.removeRelationsOfGroup.Graphic.Remove")

		return err
	}

	// Se elimina las operaciones relacionados con el grupo
	operation := operationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{operationDB.KeyGroupID: groupID}
	_, err = operation.Remove(where)
	if err != nil {
		fmt.Println("group.deleteServer.removeRelationsOfGroup.Operation.Remove")

		return err
	}

	// Se elimina las relaciones de usuario y grupos
	where = map[string]interface{}{userGroupDB.KeyGroupID: groupID}
	_, err = userGroup.Remove(where)
	if err != nil {
		fmt.Println("group.deleteServer.userGroup.removeRelationsOfGroup.Remove")

		return err
	}

	return nil
}

func isInMatrix(groupID int64) string {
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
		fmt.Println("group.isInMatrix.matrix.Find: ", err)

		return name
	}

	size := len(matrices)
	for i := 0; i < size; i++ {
		matrixOne := matrices[i]
		s := matrixOne.StructureJSON
		if isOk := isInGroupsInMatrix(groupID, s); isOk {
			name = matrixOne.Name
			break
		}
	}

	return name
}

func isInReport(groupID int64) string {
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
		fmt.Println("group.isInReport.report.Find: ", err)

		return name
	}

	size := len(reports)
	for i := 0; i < size; i++ {
		reportOne := reports[i]
		s := reportOne.StructureJSON
		if isOk := isInGroupsInReport(groupID, s); isOk {
			name = reportOne.Name
			break
		}
	}

	return name
}

func isInGraphic(groupID int64) bool {
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
		graphicDB.KeyGroupID: groupID,
	}

	graphicOne, err := graphic.FindOne(where)
	if err != nil {
		fmt.Println("group.isInGraphic.graphic.FindOne: ", err)

		return isOk
	}

	if graphicOne.ID != 0 {
		isOk = true
	}

	return isOk
}

func isInOperation(groupID int64) bool {
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
		operationDB.KeyGroupID: groupID,
	}

	operationOne, err := operation.FindOne(where)
	if err != nil {
		fmt.Println("group.isInOperation.operation.FindOne: ", err)

		return isOk
	}

	if operationOne.ID != 0 {
		isOk = true
	}

	return isOk
}

func isInGroupsInMatrix(groupID int64, s []matrixDB.StructJSON) bool {
	size := len(s)
	for i := 0; i < size; i++ {
		g := s[i]

		if g.GroupID == groupID {
			return true
		}

		sizeSons := len(g.Sons)
		if sizeSons > 0 {
			return isInGroupsInMatrix(groupID, g.Sons)
		}
	}

	return false
}

func isInGroupsInReport(groupID int64, s []reportDB.StructJSON) bool {
	size := len(s)
	for i := 0; i < size; i++ {
		g := s[i]

		if g.GroupID == groupID {
			return true
		}

		sizeSons := len(g.Sons)
		if sizeSons > 0 {
			return isInGroupsInReport(groupID, g.Sons)
		}
	}

	return false
}
