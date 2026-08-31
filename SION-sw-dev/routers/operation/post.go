package operation

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	operationDB "github.com/JamsMendez/SION-sw/models/operation"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
)

func createServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	oJSON := operationDB.Operation{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("operation.createServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("operation.createServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &oJSON); err != nil {
		fmt.Println("operation.createServer.Unmarshal: ", err)
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

	if oJSON.Title == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "titulo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if oJSON.Description == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "descripción")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if oJSON.CreatedAtIn == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "fecha")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	createdAt, err := time.ParseInLocation(constants.DateTimeFormat, oJSON.CreatedAtIn, location)
	if err != nil {
		fmt.Println("operation.createServer.ParseInLocation: ", err)

		return c.NoContent(http.StatusBadRequest)
	}

	values[operationDB.KeyUserID] = userSession.ID
	values[operationDB.KeyMatrixID] = oJSON.MatrixID
	values[operationDB.KeyGroupID] = oJSON.GroupID
	values[operationDB.KeyTitle] = oJSON.Title
	values[operationDB.KeyDescription] = oJSON.Description
	values[operationDB.KeyCreatedAt] = createdAt.UTC()
	values[operationDB.KeyUpdatedAt] = time.Now()

	operation := operationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se crea la Operación
	operationOne, err := operation.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	operationOne.CreatedAtOut = operationOne.CreatedAt.In(location).Format(constants.DateTimeFormat)

	// Registro del Evento
	typeIn := constants.TypeInsertOperation
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se creó la operación %s", operationOne.Title)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: operationOne}
	return c.JSON(http.StatusCreated, resJSON)
}
