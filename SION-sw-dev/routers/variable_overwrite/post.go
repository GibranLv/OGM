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

func createServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isROOT := userSession.Role == constants.RootUser
	if !isROOT {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	vJSON := vOverwriteDB.VariableOverwrite{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("VariableOverwrite.createServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("VariableOverwrite.createServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &vJSON); err != nil {
		fmt.Println("VariableOverwrite.createServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vJSON.VariableID == 0 {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "variable")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vJSON.ValueI < 0 || vJSON.ValueF < 0 {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "valor")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vJSON.Operator == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "operador")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}
	values[vOverwriteDB.KeyVariableID] = vJSON.VariableID
	values[vOverwriteDB.KeyValueI] = vJSON.ValueI
	values[vOverwriteDB.KeyValueF] = vJSON.ValueF
	values[vOverwriteDB.KeyOperator] = vJSON.Operator
	values[vOverwriteDB.KeyStatus] = vJSON.Status

	vOverwrite := vOverwriteDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	vOverwriteOne, err := vOverwrite.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vOverwriteOne.ID == 0 {
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

	where := map[string]interface{}{variableDB.KeyID: vOverwriteOne.VariableID}
	variableOne, err := variable.FindOne(where)
	if err == nil && variableOne.ID > 0 {
		vOverwriteOne.VariableDevice = variableOne.Device
		vOverwriteOne.VariableName = variableOne.Name
	}

	resJSON := constants.ResJSON{Doc: vOverwriteOne}
	return c.JSON(http.StatusCreated, resJSON)
}
