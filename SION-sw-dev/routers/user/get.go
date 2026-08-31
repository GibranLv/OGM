package user

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	configurationDB "github.com/JamsMendez/SION-sw/models/configuration"
	userDB "github.com/JamsMendez/SION-sw/models/user"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... OK!
func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(userDB.KeyID)
	// Se obtiene una lista de usuarios
	if id == constants.ListParam {
		user := userDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var users []userDB.User
		var err error

		isROOT := userSession.Role == constants.RootUser
		isSystemAdmin := userSession.Role == constants.SystemAdminUser
		isAdmin := userSession.Role == constants.AdminUser

		if isROOT || isSystemAdmin || isAdmin {
			// Usuario ROOT o Administrador del Sistema, Administrador
			// Acceso a todos las usuarios con un valor mayor al mismo
			users, err = user.FindIgnoringUserAndLowerValue(userSession.ID, userSession.Value)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			// Permiso denegado para usuarios Operador, e Invitado
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		size := len(users)
		// Se actualiza role del usuario para su visualización
		for i := 0; i < size; i++ {
			if users[i].Role == constants.RootUser {
				users[i].Role = constants.RootUserLabel
			} else if users[i].Role == constants.SystemAdminUser {
				users[i].Role = constants.SystemAdminUserLabel
			} else if users[i].Role == constants.AdminUser {
				users[i].Role = constants.AdminUserLabel
			} else if users[i].Role == constants.OperatorUser {
				users[i].Role = constants.OperatorUserLabel
			} else if users[i].Role == constants.GuestUser {
				users[i].Role = constants.GuestUserLabel
			}
		}

		resJSON := constants.ResJSONs{Docs: users}
		return c.JSON(http.StatusOK, resJSON)
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

	i64 := int64(iID)

	// Si el ID es el mismo que el de la sesión de usuario
	// mostrar su información de perfil
	if userSession.ID == i64 {
		userOne, err := user.FindOneWithProfile(i64)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		resJSON := constants.ResJSON{Doc: userOne}
		return c.JSON(http.StatusOK, resJSON)
	}

	userOne, err := user.FindOneByUserAndLowerValue(i64, userSession.Value)
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

// SION ... OK!
func getProfileServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
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

// SION ... OK!
func getConfigurationServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
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

// SION ... OK!
func getMatrixSoundsServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
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

// SION ... OK!
func getGraphicSoundsServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
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
		fmt.Println("configuration.getGraphicSoundsServer.FindOne: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if configOne.JSONGraphicSounds == nil {
		configOne.JSONGraphicSounds = []configurationDB.Graphic{}
	}

	resJSON := constants.ResJSONs{Docs: configOne.JSONGraphicSounds}
	return c.JSON(http.StatusOK, resJSON)
}

// SION ... OK!
func getTokens(c echo.Context, config constants.ConfigServer) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	var accessTokenWS, accessTokenWSA, accessTokenWSE string

	value := c.QueryParam(constants.KeyAccessTokenWS)
	if value == constants.TrueValue {
		accessTokenWS = routers.GetAccessToken(userSession.ID, config.SecretAccessTokenWS)
	}

	value = c.QueryParam(constants.KeyAccessTokenWSA)
	if value == constants.TrueValue {
		accessTokenWSA = routers.GetAccessToken(userSession.ID, config.SecretAccessTokenWSA)
	}

	value = c.QueryParam(constants.KeyAccessTokenWSE)
	if value == constants.TrueValue {
		accessTokenWSE = routers.GetAccessToken(userSession.ID, config.SecretAccessTokenWSE)
	}

	res := constants.ResJSON{
		Doc: tokenRes{
			AccessTokenWS:  accessTokenWS,
			AccessTokenWSA: accessTokenWSA,
			AccessTokenWSE: accessTokenWSE,
		},
	}

	return c.JSON(http.StatusOK, res)
}
