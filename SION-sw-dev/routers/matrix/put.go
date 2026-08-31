package matrix

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	matrixDB "github.com/JamsMendez/SION-sw/models/matrix"
	userMatrixDB "github.com/JamsMendez/SION-sw/models/user/matrix"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

// SION ... Ok!
func updateServer(c echo.Context) error {
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

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	var matrixOne matrixDB.Matrix

	if isRoot || isSystemAdmin {
		where := map[string]interface{}{matrixDB.KeyID: iID}

		matrixOne, err = matrix.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a las matrices de los usuarios con menos valor
			a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		matrixOne, err = matrix.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator {
		// Acceso a las matrices de la sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID

		matrixOne, err = matrix.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		isCreator := userID == matrixOne.UserID && matrixOne.IsCreator
		if !isCreator {
			msg := fmt.Sprintf("No tienes permisos sobre la matriz %s", matrixOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if matrixOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la matriz")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	mJSON := matrixDB.Matrix{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("matrix.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("matrix.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &mJSON); err != nil {
		fmt.Println("matrix.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if mJSON.Name != "" {
		values[matrixDB.KeyName] = mJSON.Name
	}

	hasStructureJSON := len(mJSON.StructureJSON) > 0
	if hasStructureJSON {
		bs, err := json.Marshal(mJSON.StructureJSON)
		if err == nil {
			sJSON := string(bs)
			values[matrixDB.KeyStructureJSON] = sJSON
		}
	}

	if len(values) == 0 {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[matrixDB.KeyID] = iID
	values[matrixDB.KeyUpdatedAt] = time.Now().UTC()

	// Se actualiza la información de la matriz
	matrixOne, err = matrix.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	/*
		Se actualiza la variables y grupos a los usuarios relacionados
		con la matriz
	*/
	where := map[string]interface{}{userMatrixDB.KeyMatrixID: iID}
	usersMatrix, err := userMatrix.Find(where)
	if err == nil {
		users := []int64{}
		for _, userMatrixOne := range usersMatrix {
			users = append(users, userMatrixOne.UserID)
		}

		updateVariablesAndGroupsInMatrices(users)
	}

	// Registro del Evento
	typeIn := constants.TypeUpdateMatrix
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se actualizó la matriz %s", matrixOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: matrixOne}
	return c.JSON(http.StatusOK, resJSON)
}
