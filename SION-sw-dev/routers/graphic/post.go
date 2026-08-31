package graphic

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	graphicDB "github.com/JamsMendez/SION-sw/models/graphic"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
)

func createServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	oJSON := graphicDB.Graphic{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("graphic.createServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("graphic.createServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &oJSON); err != nil {
		fmt.Println("graphic.createServer.Unmarshal: ", err)
		return c.NoContent(http.StatusBadRequest)
	}

	values := map[string]interface{}{}

	if oJSON.MatrixID == 0 {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "matriz")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if oJSON.GroupID == 0 {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "grupo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if len(oJSON.Variables) == 0 {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "estructura")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if oJSON.Background == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "instalación")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	now := time.Now().UTC()

	var sJSON string
	buffer, err := json.Marshal(oJSON.Variables)
	if err == nil {
		sJSON = string(buffer)
	}

	values[graphicDB.KeyUserID] = userSession.ID
	values[graphicDB.KeyMatrixID] = oJSON.MatrixID
	values[graphicDB.KeyGroupID] = oJSON.GroupID
	values[graphicDB.KeyJSON] = sJSON
	values[graphicDB.KeyCreatedAt] = now
	values[graphicDB.KeyUpdatedAt] = now

	graphic := graphicDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{
		graphicDB.KeyUserID:   userSession.ID,
		graphicDB.KeyMatrixID: oJSON.MatrixID,
		graphicDB.KeyGroupID:  oJSON.GroupID,
	}

	graphicOne, err := graphic.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if graphicOne.ID != 0 {
		msg := "El Gráfico ya se encuentra registrado"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Se crea la Gráfico
	graphicOne, err = graphic.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeInsertDynamicGraphic
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se creó un gráfico dinámico")
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: graphicOne}
	return c.JSON(http.StatusCreated, resJSON)
}

func getServerForMatrixGroup(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	oJSON := graphicDB.Graphic{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("graphic.getServerForMatrixGroup.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("graphic.getServerForMatrixGroup.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &oJSON); err != nil {
		fmt.Println("graphic.getServerForMatrixGroup.Unmarshal: ", err)
		return c.NoContent(http.StatusBadRequest)
	}

	if oJSON.MatrixID == 0 || oJSON.GroupID == 0 {
		return c.NoContent(http.StatusBadRequest)
	}

	graphic := graphicDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{
		graphicDB.KeyUserID:   userSession.ID,
		graphicDB.KeyMatrixID: oJSON.MatrixID,
		graphicDB.KeyGroupID:  oJSON.GroupID,
	}

	// Se crea la Gráfico
	graphicOne, err := graphic.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if graphicOne.ID == 0 {
		return c.NoContent(http.StatusOK)
	}

	// Registro del Evento
	typeIn := constants.TypeInsertDynamicGraphic
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se creó un gráfico dinámico")
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: graphicOne}
	return c.JSON(http.StatusOK, resJSON)
}
