package matrix

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	matrixDB "github.com/JamsMendez/SION-sw/models/matrix"
	userMatrixDB "github.com/JamsMendez/SION-sw/models/user/matrix"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
)

// SION ... OK!
func createServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	mJSON := matrixDB.Matrix{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("matrix.createServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("matrix.createServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &mJSON); err != nil {
		fmt.Println("matrix.createServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if mJSON.Name == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "nombre")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	hasStructureJSON := len(mJSON.StructureJSON) > 0
	if !hasStructureJSON {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "estructura")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	bs, err := json.Marshal(mJSON.StructureJSON)
	if err == nil {
		sJSON := string(bs)
		values[matrixDB.KeyStructureJSON] = sJSON
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	if !isRoot && !isSystemAdmin && !isAdmin && !isOperator {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	now := time.Now().UTC()

	values[matrixDB.KeyName] = mJSON.Name
	values[matrixDB.KeyCreatedAt] = now
	values[matrixDB.KeyUpdatedAt] = now

	matrix := matrixDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userMatrix := userMatrixDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se crea la matriz
	matrixOne, err := matrix.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values = map[string]interface{}{
		userMatrixDB.KeyUserID:    userSession.ID,
		userMatrixDB.KeyMatrixID:  matrixOne.ID,
		userMatrixDB.KeyIsCreator: true,
	}

	// Se relaciona la matriz con el usuario
	_, err = userMatrix.Create(values)
	if err != nil {
		fmt.Println("matrix.createServer.UserMatrix.Create: ", err)

		/*
			Si ocurrió un error al crear la relación de elimina
		*/
		where := map[string]interface{}{matrixDB.KeyID: matrixOne.ID}
		_, err := matrix.Remove(where)
		if err != nil {
			fmt.Println("matrix.createServer.Matrix.Remove: ", err)
		}

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeInsertMatrix
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se creó la matriz %s", matrixOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: matrixOne}
	return c.JSON(http.StatusCreated, resJSON)
}
