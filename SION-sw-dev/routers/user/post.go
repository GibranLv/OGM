package user

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/encrypted"
	configurationDB "github.com/JamsMendez/SION-sw/models/configuration"
	profileDB "github.com/JamsMendez/SION-sw/models/profile"
	userDB "github.com/JamsMendez/SION-sw/models/user"
	userHeaderDB "github.com/JamsMendez/SION-sw/models/user/header"
	"github.com/JamsMendez/SION-sw/routers"
	util "github.com/JamsMendez/SION-sw/routers/util"
)

// SION ... Ok!
func createServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isROOT := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser

	if !isROOT && !isSystemAdmin && !isAdmin {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	uJSON := userDB.User{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("user.createServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("user.createServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &uJSON); err != nil {
		fmt.Println("user.createServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if uJSON.Username == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "usuario")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if uJSON.Email == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "email")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if uJSON.Password == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "contraseña")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if uJSON.Pwd == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "contraseña (confirmación)")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if uJSON.Role == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "tipo de usuario")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if uJSON.Password != uJSON.Pwd {
		msg := "Las contraseñas no coinciden y/o no son validas"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Validación para crear un usuario Administrador General.
	isRootIn := uJSON.Role == constants.RootUserLabel
	if isRootIn && !isROOT {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Validación para crear un usuario Administrador de Sistema.
	isSystemAdminIn := uJSON.Role == constants.SystemAdminUserLabel
	isntROOT := isSystemAdminIn && !isROOT
	isntSystemAdmin := isSystemAdminIn && !isSystemAdmin
	if isntROOT && isntSystemAdmin {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Validación para crear un usuario Administrador.
	isAdminIn := uJSON.Role == constants.AdminUserLabel
	isntROOT = isAdminIn && !isROOT
	isntSystemAdmin = isAdminIn && !isSystemAdmin
	isntAdmin := isAdminIn && !isAdmin

	if isntROOT && isntSystemAdmin && isntAdmin {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Validación para crear un usuario Operador o Administrador.
	isOperator := uJSON.Role == constants.OperatorUser
	isGuest := uJSON.Role == constants.GuestUser
	isOGIn := isOperator || isGuest
	isntROOT = isOGIn && !isROOT
	isntSystemAdmin = isOGIn && !isSystemAdmin
	isntAdmin = isOGIn && !isAdmin

	if isntROOT && isntSystemAdmin && isntAdmin {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Se actualiza role del usuario para su creación
	var value int

	if uJSON.Role == constants.RootUserLabel {
		uJSON.Role = constants.RootUser

		if isROOT {
			value = int(userSession.Value) + 1
			if value >= constants.SystemAdminValue {
				value = int(userSession.Value)
			}

		} else {
			value = constants.RootValue + 1
		}

	} else if uJSON.Role == constants.SystemAdminUserLabel {
		uJSON.Role = constants.SystemAdminUser

		if isSystemAdmin {
			value = int(userSession.Value) + 1
			if value >= constants.AdminValue {
				value = int(userSession.Value)
			}
		} else {
			value = constants.SystemAdminValue
		}

	} else if uJSON.Role == constants.AdminUserLabel {
		uJSON.Role = constants.AdminUser

		if isAdmin {
			value = int(userSession.Value) + 1
			if value >= constants.OperatorValue {
				value = int(userSession.Value)
			}
		} else {
			value = constants.AdminValue
		}

	} else if uJSON.Role == constants.OperatorUserLabel {
		uJSON.Role = constants.OperatorUser
		value = constants.OperatorValue

	} else if uJSON.Role == constants.GuestUserLabel {
		uJSON.Role = constants.GuestUser
		value = constants.GuestValue

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	hash, err := encrypted.HashPassword(uJSON.Password)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.PasswordIsntValid}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	now := time.Now().UTC()
	values := map[string]interface{}{}
	values[userDB.KeyUsername] = uJSON.Username
	values[userDB.KeyPassword] = hash
	values[userDB.KeyEmail] = uJSON.Email
	values[userDB.KeyName] = uJSON.Name
	values[userDB.KeyRole] = uJSON.Role
	values[userDB.KeyValue] = value
	values[userDB.KeyCreatedAt] = now
	values[userDB.KeyUpdatedAt] = now

	user := userDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userOne, err := user.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if userOne.ID > 0 {
		// Configuración de usuario
		configuration := configurationDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		now := time.Now().UTC()

		valuesIn := map[string]interface{}{
			configurationDB.KeyUserID:            userOne.ID,
			configurationDB.KeyMainModule:        constants.MatricesModule,
			configurationDB.KeyJSONMatrixSounds:  "[]",
			configurationDB.KeyJSONGraphicSounds: "[]",
			configurationDB.KeyRT:                constants.WS,
			configurationDB.KeyCreatedAt:         now,
			configurationDB.KeyUpdatedAt:         now,
		}

		_, err = configuration.Create(valuesIn)
		if err != nil {
			fmt.Println("User.createServer.Configuration.Create: ", err)
		}

		// Perfil de usuario
		profile := profileDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		valuesIn = map[string]interface{}{
			profileDB.KeyUserID:  userOne.ID,
			profileDB.KeyCompany: constants.NA,
			profileDB.KeyJob:     constants.NA,
			profileDB.KeyPhone:   constants.NA,
		}

		_, err = profile.Create(valuesIn)
		if err != nil {
			fmt.Println("User.createServer.Profile.Create: ", err)
		}

		// Header de usuario
		userHeader := userHeaderDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		valuesIn = map[string]interface{}{
			userHeaderDB.KeyUserID:   userOne.ID,
			userHeaderDB.KeyHeaderID: 1,
		}

		_, err = userHeader.Create(valuesIn)
		if err != nil {
			fmt.Println("User.createServer.UserHeader.Create: ", err)
		}
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

	// Registro del Evento
	typeIn := constants.TypeInsertUser
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se creó el usuario %s, %s, %s", userOne.Username, userOne.Email, userOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: userOne}
	return c.JSON(http.StatusCreated, resJSON)
}
