package variable

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
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

	var variableOne variableDB.Variable

	isROOT := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser

	if isROOT || isSystemAdmin {
		// Acceso a todas las variables del sistema
		where := map[string]interface{}{variableDB.KeyID: iID}
		variableOne, err = variable.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		// Acceso a las variables del usuario y de valor inferior
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		variableOne, err = variable.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if variableOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Se elimina todas las relaciones e información de la variable
	removeRelationsOfVariable(variableOne.ID)

	where := map[string]interface{}{variableDB.KeyID: iID}
	numAffected, err := variable.Remove(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeDeleteVariable
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se eliminó la variable %s", variableOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}
