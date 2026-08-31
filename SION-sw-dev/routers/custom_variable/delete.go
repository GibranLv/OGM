package customvariable

import (
	"fmt"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	customVariableDB "github.com/JamsMendez/SION-sw/models/custom_variable"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
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

	customVariable := customVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var customVariableOne customVariableDB.CustomVariable

	isROOT := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser

	if isROOT || isSystemAdmin {
		// Acceso a los variables personalizadas
		where := map[string]interface{}{customVariableDB.KeyID: iID}
		customVariableOne, err = customVariable.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		// Acceso a las variables personalizadas de los usuarios con valor inferior y
		// sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		customVariableOne, err = customVariable.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if customVariableOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable personalizada")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	where := map[string]interface{}{customVariableDB.KeyID: iID}
	numAffected, err := customVariable.Remove(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la variable personalizada")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeDeleteCustomVariable
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se eliminó la variable personalizada %s", customVariableOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}
