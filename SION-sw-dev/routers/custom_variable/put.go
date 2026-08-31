package customvariable

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	commentDB "github.com/JamsMendez/SION-sw/models/custom_variable/comment"
	userCustomVariableDB "github.com/JamsMendez/SION-sw/models/user/custom_variable"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

// SION ... !OK
func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.SystemAdminUser

	if !isRoot && !isSystemAdmin && !isAdmin {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(customVariableDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	vJSON := customVariableDB.CustomVariable{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("customVariable.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("customVariable.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &vJSON); err != nil {
		fmt.Println("customVariable.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	customVariable := customVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}
	where := map[string]interface{}{customVariableDB.KeyID: iID}
	customVariableOne, err := customVariable.FindOne(where)
	if err != nil {
		fmt.Println("custom_variable.FindOne: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if customVariableOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable personalizada")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if vJSON.Name != "" {
		values[customVariableDB.KeyName] = vJSON.Name
	}

	if vJSON.Device != "" {
		values[customVariableDB.KeyDevice] = vJSON.Device
	}

	if len(vJSON.VariablesJSON) > 0 {
		buffer, err := json.Marshal(vJSON.VariablesJSON)
		if err != nil {
			fmt.Println("customVariable.updateServer.json.Marshal: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		variablesJSON := string(buffer)

		values[customVariableDB.KeyVariablesJSON] = variablesJSON
	}

	if vJSON.Expression != "" {
		values[customVariableDB.KeyExpression] = vJSON.Expression
	}

	if vJSON.Unit != "" {
		values[customVariableDB.KeyUnit] = vJSON.Unit
	}

	if customVariableOne.Status != vJSON.Status {
		values[customVariableDB.KeyStatus] = vJSON.Status
	}

	if len(values) == 0 {
		msg := "No se dectectaron cambios a realizar en la variable personalizada"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[customVariableDB.KeyID] = iID
	values[customVariableDB.KeyUpdatedAt] = time.Now().UTC()

	customVariableOne, err = customVariable.Update(values)
	if err != nil {
		fmt.Println("custom_variable.Update: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeUpdateCustomVariable
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se actualizó la variable personalizada %s", customVariableOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: customVariableOne}
	return c.JSON(http.StatusOK, resJSON)
}

// SION ... !OK
func updateComment(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(customVariableDB.KeyID)
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
	customVariable := customVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{customVariableDB.KeyID: iID}
	customVariableOne, err := customVariable.FindOne(where)
	if err == nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if customVariableOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable personalizada")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	userCustomVariable := userCustomVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var userCustomVariableOne userCustomVariableDB.UserCustomVariable

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	if isRoot && isSystemAdmin && isAdmin {
		// Acceso a cualquier variable personalizada
		where := map[string]interface{}{
			userCustomVariableDB.KeyCustomVariableID: iID,
			userCustomVariableDB.KeyUserID:           userSession.ID,
		}

		userCustomVariables, err := userCustomVariable.Find(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if len(userCustomVariables) == 0 {
			// Si no existe la relación usuario y variable se crea
			values := map[string]interface{}{
				userCustomVariableDB.KeyUserID:           userSession.ID,
				userCustomVariableDB.KeyCustomVariableID: iID,
			}

			userCustomVariableOne, err := userCustomVariable.Create(values)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			if userCustomVariableOne.ID == 0 {
				msg := fmt.Sprintf(constants.MsgNotFoundData, "en relación con la variable")
				msgJSON := constants.MsgError{Message: msg}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			userCustomVariables = append(userCustomVariables, userCustomVariableOne)
		}

		userCustomVariableOne = userCustomVariables[0]

	} else if isOperator {
		/*
			Acceso a cualquier variable personalizada de un usuario con menor valor
			a la sesión del usuario
		*/
		where := map[string]interface{}{
			userCustomVariableDB.KeyCustomVariableID: iID,
			userCustomVariableDB.KeyUserID:           userSession.ID,
		}

		userCustomVariables, err := userCustomVariable.Find(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if len(userCustomVariables) == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		userCustomVariableOne = userCustomVariables[0]

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if userCustomVariableOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable personalizada")
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

	customVariable = customVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{
		commentDB.KeyUserCustomVariableID: userCustomVariableOne.ID,
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
		values[commentDB.KeyUserCustomVariableID] = userCustomVariableOne.ID
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
	message := fmt.Sprintf("Se agregó un nuevo comentario a la variable personalizada %s", customVariableOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}
