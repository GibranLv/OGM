package user

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	configurationDB "github.com/JamsMendez/SION-sw/models/configuration"
	userDB "github.com/JamsMendez/SION-sw/models/user"
	"github.com/JamsMendez/SION-sw/routers/api/middlewares"
)

// GetProfileServer ...
func GetProfileServer(c echo.Context) error {
	userSession, isAuth := middlewares.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	user := userDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userOne, err := user.FindOneWithProfile(userSession.ID)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if userOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del usuario")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Se actualiza role del usuario para su visualización
	if userOne.Role == constants.RootUser {
		userOne.Role = constants.RootUserLabel
	} else if userOne.Role == constants.SystemAdminUser {
		userOne.Role = constants.SystemAdminUserLabel
	} else if userOne.Role == constants.AdminUser {
		userOne.Role = constants.AdminUserLabel
	} else if userOne.Role == constants.OperatorUser {
		userOne.Role = constants.OperatorUserLabel
	} else if userOne.Role == constants.GuestUser {
		userOne.Role = constants.GuestUserLabel
	}

	resJSON := constants.ResJSON{Doc: userOne}
	return c.JSON(http.StatusOK, resJSON)
}

// GetConfigurationServer ...
func GetConfigurationServer(c echo.Context) error {
	userSession, isAuth := middlewares.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if configOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de las configuraciones")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	resJSON := constants.ResJSON{Doc: configOne}
	return c.JSON(http.StatusOK, resJSON)
}

// GetMatrixSoundsServer ...
func GetMatrixSoundsServer(c echo.Context) error {
	userSession, isAuth := middlewares.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err != nil {
		fmt.Println("configuration.getMatrixSoundsServer.FindOne: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if configOne.JSONMatrixSounds == nil {
		configOne.JSONMatrixSounds = []configurationDB.Matrix{}
	}

	resJSON := constants.ResJSONs{Docs: configOne.JSONMatrixSounds}
	return c.JSON(http.StatusOK, resJSON)
}
