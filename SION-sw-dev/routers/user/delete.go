package user

import (
	"fmt"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	configurationDB "github.com/JamsMendez/SION-sw/models/configuration"
	profileDB "github.com/JamsMendez/SION-sw/models/profile"
	userDB "github.com/JamsMendez/SION-sw/models/user"
	userEventDB "github.com/JamsMendez/SION-sw/models/user/event"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

func deleteServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(userDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	user := userDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var userOne userDB.User

	isROOT := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser

	isAdmins := isROOT || isSystemAdmin || isAdmin

	if isAdmins {
		// Usuario ROOT o Administrador del Sistema, Administrador
		// Acceso a eliminar a todos las usuarios con un valor mayor al mismo
		i64 := int64(iID)
		value := userSession.Value

		userOne, err = user.FindOneByUserAndLowerValue(i64, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if userOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "del usuario")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	// === ELIMINAR LAS RELACIONES DEL USUARIO ===

	// Configuración del usuario
	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{
		configurationDB.KeyUserID: userOne.ID,
	}

	_, err = configuration.Remove(where)
	if err != nil {
		fmt.Println("User.deleteServer.Configuration.Remove: ", err)
	}

	// Perfil del usuario
	profile := profileDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{
		profileDB.KeyUserID: userOne.ID,
	}

	_, err = profile.Remove(where)
	if err != nil {
		fmt.Println("User.deleteServer.Profile.Remove: ", err)
	}

	// Eventos del usuario
	userEvent := userEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{
		userEventDB.KeyUserID: userOne.ID,
	}

	_, err = userEvent.Remove(where)
	if err != nil {
		fmt.Println("User.deleteServer.UserEvent.Remove: ", err)
	}

	// === ELIMINAR LAS RELACIONES DEL USUARIO ===

	where = map[string]interface{}{userDB.KeyID: iID}
	numAffected, err := user.Remove(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del usuario")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeDeleteUser
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se eliminó el usuario %s, %s, %s", userOne.Username, userOne.Email, userOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}
