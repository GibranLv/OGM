package variable

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	userVariableDB "github.com/JamsMendez/SION-sw/models/user/variable"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	commentDB "github.com/JamsMendez/SION-sw/models/variable/comment"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
)

// SION ... !Ok
func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser

	if !isRoot && !isSystemAdmin {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(variableDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	vJSON := variableDB.Variable{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("variable.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("variable.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &vJSON); err != nil {
		fmt.Println("variable.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	where := map[string]interface{}{variableDB.KeyID: iID}
	variableOne, err := variable.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if vJSON.Name != "" {
		values[variableDB.KeyName] = vJSON.Name
	}

	if vJSON.Device != "" {
		values[variableDB.KeyDevice] = vJSON.Device
	}

	if vJSON.Alias != "" {
		values[variableDB.KeyAlias] = vJSON.Alias
	}

	if vJSON.ReadingUnit != "" {
		values[variableDB.KeyReadingUnit] = vJSON.ReadingUnit
	}

	values[variableDB.KeyExpressionInsert] = vJSON.ExpressionInsert

	if variableOne.Status != vJSON.Status {
		values[variableDB.KeyStatus] = vJSON.Status
	}

	if len(values) == 0 {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[variableDB.KeyID] = iID
	values[variableDB.KeyUpdatedAt] = time.Now().UTC()

	variableOne, err = variable.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	resJSON := constants.ResJSON{Doc: variableOne}
	return c.JSON(http.StatusOK, resJSON)
}

// SION ... !Ok
func updateComment(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(variableDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	/*
		Se obtiene la información de la variable
		a la cual se le agregara un comentario
	*/
	variable := variableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{variableDB.KeyID: iID}
	variableOne, err := variable.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if variableOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	userVariable := userVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var userVariableOne userVariableDB.UserVariable

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if isRoot && isSystemAdmin && isAdmin {
		// Acceso a cualquier variables
		where := map[string]interface{}{
			userVariableDB.KeyVariableID: iID,
			userVariableDB.KeyUserID:     userSession.ID,
		}

		userVariables, err := userVariable.Find(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if len(userVariables) == 0 {
			// Si no existe la relación usuario y variable se crea
			values := map[string]interface{}{
				userVariableDB.KeyUserID:     userSession.ID,
				userVariableDB.KeyVariableID: iID,
			}

			userVariableOne, err := userVariable.Create(values)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			if userVariableOne.ID == 0 {
				msg := fmt.Sprintf(constants.MsgNotFoundData, "en relación con la variable")
				msgJSON := constants.MsgError{Message: msg}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			userVariables = append(userVariables, userVariableOne)
		}

		userVariableOne = userVariables[0]

	} else if isOperator || isGuest {
		/*
			Acceso a cualquier variable relacionado con la
			sesión del usuario
		*/
		where := map[string]interface{}{
			userVariableDB.KeyVariableID: iID,
			userVariableDB.KeyUserID:     userSession.ID,
		}

		userVariables, err := userVariable.Find(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if len(userVariables) == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		userVariableOne = userVariables[0]

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if userVariableOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	req := constants.CommentJSON{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("variable.updateComment.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("variable.updateComment.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &req); err != nil {
		fmt.Println("variable.updateComment.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	comment := commentDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{
		commentDB.KeyUserVariableID: userVariableOne.ID,
	}

	commentOne, err := comment.FindOne(where)
	if err != nil {
		fmt.Println("variable.updateComment.comment.FindOne: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	now := time.Now().UTC()

	values := map[string]interface{}{
		commentDB.KeyComment:   req.Comment,
		commentDB.KeyCreatedAt: now,
	}

	if commentOne.ID == 0 {
		values[commentDB.KeyUserVariableID] = userVariableOne.ID
		values[commentDB.KeyCreatedAt] = now

		commentOne, err = comment.Create(values)
		if err != nil || commentOne.ID == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		values[commentDB.KeyID] = commentOne.ID

		commentOne, err = comment.Update(values)
		if err != nil || commentOne.ID == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	// Registro del Evento
	typeIn := constants.TypeComment
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se agregó un nuevo comentario a la variable %s", variableOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}
