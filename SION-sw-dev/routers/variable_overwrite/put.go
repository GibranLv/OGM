package voverwrite

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
	vOverwriteDB "github.com/JamsMendez/SION-sw/models/variable_overwrite"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isRoot := userSession.Role == constants.RootUser
	if !isRoot {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(vOverwriteDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	vOverwrite := vOverwriteDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	var vOverwriteOne vOverwriteDB.VariableOverwrite

	where := map[string]interface{}{vOverwriteDB.KeyID: iID}
	vOverwriteOne, err = vOverwrite.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vOverwriteOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	vJSON := vOverwriteDB.VariableOverwrite{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("VariableOverwrite.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("VariableOverwrite.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &vJSON); err != nil {
		fmt.Println("VariableOverwrite.updateServer.Unmarshal: ", err)
		return c.NoContent(http.StatusBadRequest)
	}

	values := map[string]interface{}{}

	if vJSON.VariableID != 0 {
		values[vOverwriteDB.KeyVariableID] = vJSON.VariableID
	}

	if vJSON.ValueI >= 0 {
		values[vOverwriteDB.KeyValueI] = vJSON.ValueI
	}

	if vJSON.ValueF >= 0 {
		values[vOverwriteDB.KeyValueF] = vJSON.ValueF
	}

	if vJSON.Operator != "" {
		values[vOverwriteDB.KeyOperator] = vJSON.Operator
	}

	values[vOverwriteDB.KeyStatus] = vJSON.Status

	if len(values) == 0 {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[vOverwriteDB.KeyID] = iID

	vOverwriteOne, err = vOverwrite.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vOverwriteOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable")
		msgJSON := constants.MsgError{Message: msg}
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

	where = map[string]interface{}{variableDB.KeyID: vOverwriteOne.VariableID}
	variableOne, err := variable.FindOne(where)
	if err == nil && variableOne.ID > 0 {
		vOverwriteOne.VariableDevice = variableOne.Device
		vOverwriteOne.VariableName = variableOne.Name
	}

	resJSON := constants.ResJSON{Doc: vOverwriteOne}
	return c.JSON(http.StatusOK, resJSON)
}
