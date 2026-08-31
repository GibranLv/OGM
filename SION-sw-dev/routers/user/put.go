package user

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	configurationDB "github.com/JamsMendez/SION-sw/models/configuration"
	matrixDB "github.com/JamsMendez/SION-sw/models/matrix"
	profileDB "github.com/JamsMendez/SION-sw/models/profile"
	userDB "github.com/JamsMendez/SION-sw/models/user"
	userAlarmDB "github.com/JamsMendez/SION-sw/models/user/alarm"
	userAlarmEmailDB "github.com/JamsMendez/SION-sw/models/user/alarm_email"
	userCustomVariableDB "github.com/JamsMendez/SION-sw/models/user/custom_variable"
	customVariableAlarmDB "github.com/JamsMendez/SION-sw/models/user/custom_variable_alarm"
	userMatrixDB "github.com/JamsMendez/SION-sw/models/user/matrix"
	userReportDB "github.com/JamsMendez/SION-sw/models/user/report"
	userVariableDB "github.com/JamsMendez/SION-sw/models/user/variable"
	variableAlarmDB "github.com/JamsMendez/SION-sw/models/user/variable_alarm"
	userVehicleDB "github.com/JamsMendez/SION-sw/models/user/vehicle"
	"github.com/JamsMendez/SION-sw/routers"
	util "github.com/JamsMendez/SION-sw/routers/util"
	"github.com/labstack/echo/v4"
)

// SION ... Ok!
func updateServer(c echo.Context) error {
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

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("user.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("user.updateServer.c.Request().Body.Close(): ", err)
	}

	user := userDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	isROOT := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser

	if !isROOT && !isSystemAdmin && !isAdmin {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	var userOne userDB.User

	if isROOT || isSystemAdmin || isAdmin {
		// Usuario ROOT o Administrador del Sistema, Administrador
		// Acceso a todos las usuarios con un valor mayor al mismo
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

	// Actualización de las variables, variables personalizadas,
	// matrices, reportes, alarmas
	updateRelations := c.QueryParam(updateRelationsQuery)
	if updateRelations == constants.TrueValue {
		rJSON := relationsReq{}

		if err := json.Unmarshal(b, &rJSON); err != nil {
			fmt.Println("user.updateServer.updateRelations.Unmarshal: ", err)
			return c.NoContent(http.StatusBadRequest)
		}

		err := updateUserVariables(iID, rJSON.Variables)
		if err != nil {
			msg := "Ocurrió un error al actualizar las variables del usuario"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err = updateUserCustomVariables(iID, rJSON.CustomVariables)
		if err != nil {
			msg := "Ocurrió un error al actualizar las variables personalizadas del usuario"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err = updateUserMatrices(iID, rJSON.Matrices)
		if err != nil {
			msg := "Ocurrió un error al actualizar las matrices del usuario"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err = updateUserReports(iID, rJSON.Reports)
		if err != nil {
			msg := "Ocurrió un error al actualizar los reportes del usuario"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err = updateUserAlarms(iID, rJSON.Alarms)
		if err != nil {
			msg := "Ocurrió un error al actualizar las alarmas del usuario"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		err = updateUserVehicles(iID, rJSON.Vehicles)
		if err != nil {
			msg := "Ocurrió un error al actualizar los vehiculos del usuario"
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

	uJSON := userDB.User{}

	if err := json.Unmarshal(b, &uJSON); err != nil {
		fmt.Println("user.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if uJSON.Username != "" {
		values[userDB.KeyUsername] = uJSON.Username
	}

	if uJSON.Email != "" {
		values[userDB.KeyEmail] = uJSON.Email
	}

	if uJSON.Name != "" {
		values[userDB.KeyName] = uJSON.Name
	}

	if uJSON.Role != "" {
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

		// Se actualiza role del usuario para ser editado
		if uJSON.Role != "" {

			if uJSON.Role == constants.RootUserLabel {
				uJSON.Role = constants.RootUser

				if userOne.Role != uJSON.Role {
					var value int
					if isROOT {
						value = int(userSession.Value) + 1
						if value >= constants.SystemAdminValue {
							value = int(userSession.Value)
						}

					} else {
						value = constants.RootValue + 1
					}

					values[userDB.KeyValue] = value
				}

			} else if uJSON.Role == constants.SystemAdminUserLabel {
				uJSON.Role = constants.SystemAdminUser

				if userOne.Role != uJSON.Role {
					var value int
					if isSystemAdmin {
						value = int(userSession.Value) + 1
						if value >= constants.AdminValue {
							value = int(userSession.Value)
						}

					} else {
						value = constants.SystemAdminValue
					}

					values[userDB.KeyValue] = value
				}

			} else if uJSON.Role == constants.AdminUserLabel {
				uJSON.Role = constants.AdminUser

				if userOne.Role != uJSON.Role {
					var value int
					if isAdmin {
						value = int(userSession.Value) + 1
						if value >= constants.OperatorValue {
							value = int(userSession.Value)
						}

					} else {
						value = constants.AdminValue
					}

					values[userDB.KeyValue] = value
				}

			} else if uJSON.Role == constants.OperatorUserLabel {
				uJSON.Role = constants.OperatorUser

				if userOne.Role != uJSON.Role {
					value := constants.OperatorValue
					values[userDB.KeyValue] = value
				}

			} else if uJSON.Role == constants.GuestUserLabel {
				uJSON.Role = constants.GuestUser

				if userOne.Role != uJSON.Role {
					value := constants.GuestValue
					values[userDB.KeyValue] = value
				}

			} else {
				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			values[userDB.KeyRole] = uJSON.Role
		}
	}

	if len(values) == 0 {
		msg := "No se encontraron cambios a realizar en la información del usuario"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[userDB.KeyID] = iID

	now := time.Now()
	values[userDB.KeyUpdatedAt] = now

	userOne, err = user.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
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

	// Registro del Evento
	typeIn := constants.TypeUpdateUser
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se actualizó el usuario %s %s %s", userOne.Username, userOne.Email, userOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: userOne}
	return c.JSON(http.StatusOK, resJSON)
}

// SION ... Ok!
func updateProfileServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	profile := profileDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	user := userDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	pJSON := profileReq{}
	profileOne := profileReq{}

	sJSON := c.FormValue(constants.KeyJSON)
	b := []byte(sJSON)
	size := len(b)

	if size > 0 {
		if err := json.Unmarshal(b, &pJSON); err != nil {
			fmt.Println("configuration.updateProfileServer.Unmarshal: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	var hasChanged bool
	values := map[string]interface{}{}

	if pJSON.Email != "" {
		values[userDB.KeyEmail] = pJSON.Email
	}

	if pJSON.Name != "" {
		values[userDB.KeyName] = pJSON.Name
	}

	if len(values) > 0 {
		now := time.Now().UTC()

		values[userDB.KeyID] = userSession.ID
		values[userDB.KeyUpdatedAt] = now

		userOne, err := user.Update(values)
		if err != nil {
			fmt.Println("configuration.updateProfileServer.User.Update: ", err)

			msg := "Ocurrió un error al actualizar la información de tu usuario"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		profileOne.Email = userOne.Email
		profileOne.Name = userOne.Name

		hasChanged = true
	}

	values = map[string]interface{}{}

	if pJSON.Company != "" {
		values[profileDB.KeyCompany] = pJSON.Company
	}

	if pJSON.Job != "" {
		values[profileDB.KeyJob] = pJSON.Job
	}

	if pJSON.Phone != "" {
		values[profileDB.KeyPhone] = pJSON.Phone
	}

	image, err := c.FormFile(profileDB.KeyAvatar)
	if err == nil {
		src, err := image.Open()
		if err == nil {

			defer func(r multipart.File) {
				err := r.Close()
				if err != nil {
					fmt.Println("configuration.updateProfileServer.FormFile.Close: ", err)
				}
			}(src)

			ext := constants.KeyPNG
			img := image.Header.Get(constants.KeyContentType)
			if img == constants.KeyContentTypePNG {
				ext = constants.KeyPNG
			}

			userID := int(userSession.ID)
			name := fmt.Sprintf("avatar_%d%s", userID, ext)
			filename := constants.ImageAvatarSRC + name
			dst, err := os.Create(filename)
			if err == nil {

				defer func(r *os.File) {
					err := r.Close()
					if err != nil {
						fmt.Println("configuration.updateProfileServer.File.Close: ", err)
					}
				}(dst)

				if _, err = io.Copy(dst, src); err == nil {
					values[profileDB.KeyAvatar] = name
				}
			}
		}
	}

	if len(values) > 0 {
		where := map[string]interface{}{profileDB.KeyUserID: userSession.ID}
		pOne, err := profile.FindOne(where)
		if err != nil {
			fmt.Println("configuration.updateProfileServer.Profile.FindOne: ", err)

			msg := "Ocurrió un error al actualizar la información de tu perfil"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if pOne.ID == 0 {
			values[profileDB.KeyUserID] = userSession.ID

			if _, isOk := values[profileDB.KeyAvatar]; !isOk {
				values[profileDB.KeyAvatar] = constants.AvatarDefault
			}

			if _, isOk := values[profileDB.KeyCompany]; !isOk {
				values[profileDB.KeyCompany] = constants.NA
			}

			if _, isOk := values[profileDB.KeyJob]; !isOk {
				values[profileDB.KeyJob] = constants.NA
			}

			if _, isOk := values[profileDB.KeyPhone]; !isOk {
				values[profileDB.KeyPhone] = constants.NA
			}

			pOne, err = profile.Create(values)
			if err != nil {
				fmt.Println("configuration.updateProfileServer.Profile.Create: ", err)

				msg := "Ocurrió un error al actualizar la información de tu perfil"
				msgJSON := constants.MsgError{Message: msg}
				return c.JSON(http.StatusAccepted, msgJSON)
			}
		}

		values[profileDB.KeyID] = pOne.ID
		pOne, err = profile.Update(values)
		if err != nil {
			fmt.Println("configuration.updateProfileServer.profile.Update: ", err)

			msg := "Ocurrió un error al actualizar la información de tu perfil"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		profileOne.Avatar = pOne.Avatar
		profileOne.Company = pOne.Company
		profileOne.Job = pOne.Job
		profileOne.Phone = pOne.Phone

		hasChanged = true
	}

	if hasChanged {
		resJSON := constants.ResJSON{Doc: profileOne}
		return c.JSON(http.StatusOK, resJSON)
	}

	msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
	return c.JSON(http.StatusAccepted, msgJSON)
}

// SION ... Ok!
func updateConfigServer(c echo.Context) error {
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

	cJSON := configurationDB.Configuration{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("configuration.updateConfigServer.Request.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("configuration.updateConfigServer.Request.Body.Close: ", err)
	}

	if err := json.Unmarshal(b, &cJSON); err != nil {
		fmt.Println("configuration.updateConfigServer.Request.Body.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if cJSON.MainModule != 0 {
		if cJSON.MainModule < 0 {
			values[configurationDB.KeyMainModule] = 0
		} else {
			values[configurationDB.KeyMainModule] = cJSON.MainModule
		}

		if cJSON.MainMatrix < 0 {
			values[configurationDB.KeyMainMatrix] = 0
		} else {
			values[configurationDB.KeyMainMatrix] = cJSON.MainMatrix
		}
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err != nil {
		fmt.Println("configuration.updateConfigServer.Configuration.FindOne: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if configOne.ID == 0 {
		if cJSON.JSONMatrixSoundsIn != "" {
			values[configurationDB.KeyJSONMatrixSounds] = fmt.Sprintf("[%s]", cJSON.JSONMatrixSoundsIn)
		}

		if cJSON.JSONGraphicSoundsIn != "" {
			values[configurationDB.KeyJSONGraphicSounds] = fmt.Sprintf("[%s]", cJSON.JSONGraphicSoundsIn)
		}

		if cJSON.RT > 0 {
			values[configurationDB.KeyRT] = cJSON.RT
		}

		values[configurationDB.KeyCommentColumn] = cJSON.CommentColumn

		now := time.Now().UTC()

		values[configurationDB.KeyUserID] = userSession.ID
		values[configurationDB.KeyCreatedAt] = now
		values[configurationDB.KeyUpdatedAt] = now

		if _, isOk := values[configurationDB.KeyMainModule]; !isOk {
			values[configurationDB.KeyMainModule] = 0
		}

		if _, isOk := values[configurationDB.KeyJSONMatrixSounds]; !isOk {
			values[configurationDB.KeyJSONMatrixSounds] = "[]"
		}

		if _, isOk := values[configurationDB.KeyJSONGraphicSounds]; !isOk {
			values[configurationDB.KeyJSONGraphicSounds] = "[]"
		}

		configOne, err = configuration.Create(values)
		if err != nil {
			fmt.Println("configuration.updateConfigServer.Configuration.Create: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		if cJSON.JSONMatrixSoundsIn != "" {
			buffer := []byte(cJSON.JSONMatrixSoundsIn)

			matrixIn := configurationDB.Matrix{}
			err := json.Unmarshal(buffer, &matrixIn)
			if err != nil {
				fmt.Println("configuration.updateConfigServer.Matrix.Unmarshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			insert := true
			matrices := configOne.JSONMatrixSounds
			size := len(matrices)

			for i := 0; i < size; i++ {
				matrix := matrices[i]
				if matrix.MatrixID == matrixIn.MatrixID {
					matrices[i] = matrixIn
					insert = false
					break
				}
			}

			if insert {
				matrices = append(matrices, matrixIn)
			}

			buffer, err = json.Marshal(matrices)
			if err != nil {
				fmt.Println("configuration.updateConfigServer.Matrix.Marshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			values[configurationDB.KeyJSONMatrixSounds] = string(buffer)
		}

		if cJSON.JSONGraphicSoundsIn != "" {
			buffer := []byte(cJSON.JSONGraphicSoundsIn)

			graphicIn := configurationDB.Graphic{}
			err := json.Unmarshal(buffer, &graphicIn)
			if err != nil {
				fmt.Println("configuration.updateConfigServer.Graphic.Unmarshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			insert := true
			graphics := configOne.JSONGraphicSounds
			size := len(graphics)

			for i := 0; i < size; i++ {
				graphic := graphics[i]
				if graphic.GraphicID == graphicIn.GraphicID {
					graphics[i] = graphicIn
					insert = false
					break
				}
			}

			if insert {
				graphics = append(graphics, graphicIn)
			}

			buffer, err = json.Marshal(graphics)
			if err != nil {
				fmt.Println("configuration.updateConfigServer.Graphic.Marshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			values[configurationDB.KeyJSONGraphicSounds] = string(buffer)
		}

		if cJSON.RT > 0 {
			values[configurationDB.KeyRT] = cJSON.RT
		}

		values[configurationDB.KeyCommentColumn] = cJSON.CommentColumn

		size := len(values)
		if size == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		now := time.Now().UTC()

		values[configurationDB.KeyID] = configOne.ID
		values[configurationDB.KeyUpdatedAt] = now

		configOne, err = configuration.Update(values)
		if err != nil {
			fmt.Println("configuration.updateConfigServer.Configuration.Update: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	resJSON := constants.ResJSON{Doc: configOne}
	return c.JSON(http.StatusOK, resJSON)
}

// SION ... Ok!
func updateSoundsServer(c echo.Context) error {
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

	cJSON := configurationDB.Configuration{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("configuration.updateSoundsServer.Request.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("configuration.updateSoundsServer.Request.Body.Close: ", err)
	}

	if err := json.Unmarshal(b, &cJSON); err != nil {
		fmt.Println("configuration.updateSoundsServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if cJSON.MainModule != 0 {
		values[configurationDB.KeyMainModule] = cJSON.MainModule
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err != nil {
		fmt.Println("configuration.updateSoundsServer.Configuration.FindOne: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if configOne.ID == 0 {
		if cJSON.JSONMatrixSoundsIn != "" {
			values[configurationDB.KeyJSONMatrixSounds] = fmt.Sprintf("[%s]", cJSON.JSONMatrixSoundsIn)
		}

		if cJSON.JSONGraphicSoundsIn != "" {
			values[configurationDB.KeyJSONGraphicSounds] = fmt.Sprintf("[%s]", cJSON.JSONGraphicSoundsIn)
		}

		now := time.Now().UTC()

		values[configurationDB.KeyUserID] = userSession.ID
		values[configurationDB.KeyCreatedAt] = now
		values[configurationDB.KeyUpdatedAt] = now

		if _, isOk := values[configurationDB.KeyMainModule]; !isOk {
			values[configurationDB.KeyMainModule] = 0
		}

		if _, isOk := values[configurationDB.KeyJSONMatrixSounds]; !isOk {
			values[configurationDB.KeyJSONMatrixSounds] = "[]"
		}

		if _, isOk := values[configurationDB.KeyJSONGraphicSounds]; !isOk {
			values[configurationDB.KeyJSONGraphicSounds] = "[]"
		}

		configOne, err = configuration.Create(values)
		if err != nil {
			fmt.Println("configuration.updateSoundsServer.Configuration.Create: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		if cJSON.JSONMatrixSoundsIn != "" {
			buffer := []byte(cJSON.JSONMatrixSoundsIn)

			matrixIn := configurationDB.Matrix{}
			err := json.Unmarshal(buffer, &matrixIn)
			if err != nil {
				fmt.Println("configuration.updateSoundsServer.Matrix.Unmarshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			insert := true
			matrices := configOne.JSONMatrixSounds
			size := len(matrices)

			for i := 0; i < size; i++ {
				matrix := matrices[i]
				if matrix.MatrixID == matrixIn.MatrixID {
					matrices[i] = matrixIn
					insert = false
					break
				}
			}

			if insert {
				matrices = append(matrices, matrixIn)
			}

			buffer, err = json.Marshal(matrices)
			if err != nil {
				fmt.Println("configuration.updateSoundsServer.Matrix.Marshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			values[configurationDB.KeyJSONMatrixSounds] = string(buffer)
		}

		if cJSON.JSONGraphicSoundsIn != "" {
			buffer := []byte(cJSON.JSONGraphicSoundsIn)

			graphicIn := configurationDB.Graphic{}
			err := json.Unmarshal(buffer, &graphicIn)
			if err != nil {
				fmt.Println("configuration.updateSoundsServer.Graphic.Unmarshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			insert := true
			graphics := configOne.JSONGraphicSounds
			size := len(graphics)

			for i := 0; i < size; i++ {
				graphic := graphics[i]
				if graphic.GraphicID == graphicIn.GraphicID {
					graphics[i] = graphicIn
					insert = false
					break
				}
			}

			if insert {
				graphics = append(graphics, graphicIn)
			}

			buffer, err = json.Marshal(graphics)
			if err != nil {
				fmt.Println("configuration.updateSoundsServer.Graphic.Marshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			values[configurationDB.KeyJSONGraphicSounds] = string(buffer)
		}

		size := len(values)
		if size == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		now := time.Now().UTC()

		values[configurationDB.KeyID] = configOne.ID
		values[configurationDB.KeyUpdatedAt] = now

		configOne, err = configuration.Update(values)
		if err != nil {
			fmt.Println("configuration.updateSoundsServer.Configuration.Update: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	resJSON := constants.ResJSON{Doc: configOne}
	return c.JSON(http.StatusOK, resJSON)
}

// SION ... OK!
func updateUserVariables(userID int, variablesIn []int64) error {
	var err error

	sizeIn := len(variablesIn)
	if sizeIn > 0 {
		i64 := int64(userID)

		userVariable := userVariableDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		variableAlarm := variableAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		// Se buscas las relaciones usuario y variable existentes
		where := map[string]interface{}{userVariableDB.KeyUserID: i64}
		userVariables, err := userVariable.Find(where)
		if err != nil {
			return err
		}

		removed := make([]int64, 0)
		added := make([]int64, 0)

		if sizeIn == 1 {
			value := variablesIn[0]
			if value == -1 {
				// Eliminar las variables relacionas con el usuario
				for _, userVariable := range userVariables {
					removed = append(removed, userVariable.ID)
				}

				for _, ID := range removed {
					// Eliminar las relaciones usuarios - variables y alarmas
					where := map[string]interface{}{variableAlarmDB.KeyUserVariableID: ID}
					_, err := variableAlarm.Remove(where)
					if err == nil {
						// Eliminar las relaciones usuarios y variables
						where = map[string]interface{}{userVariableDB.KeyID: ID}
						_, err := userVariable.Remove(where)
						if err != nil {
							fmt.Println("user.updateUserVariables.UserVariable.Remove: ", err)
						}
					}
				}

				return err
			}
		}

		for _, userVariable := range userVariables {
			hasVariable := false

			for i := 0; i < sizeIn; i++ {
				vID := userVariable.VariableID
				variableID := variablesIn[i]
				if vID == variableID {
					hasVariable = true
					break
				}
			}

			if !hasVariable {
				removed = append(removed, userVariable.ID)
			}
		}

		size := len(userVariables)
		for _, variableID := range variablesIn {
			isNew := true

			for i := 0; i < size; i++ {
				userVariable := userVariables[i]
				vID := userVariable.VariableID
				if variableID == vID {
					isNew = false
					break
				}
			}

			if isNew {
				added = append(added, variableID)
			}
		}

		for _, ID := range removed {
			// Eliminar las relaciones usuarios - variables y alarmas
			where := map[string]interface{}{variableAlarmDB.KeyUserVariableID: ID}
			_, err := variableAlarm.Remove(where)
			if err == nil {
				// Eliminar las relaciones usuarios y variables
				where = map[string]interface{}{userVariableDB.KeyID: ID}
				_, err := userVariable.Remove(where)
				if err != nil {
					fmt.Println("user.updateUserVariables.UserVariable.Remove: ", err)
				}
			}
		}

		for _, variableID := range added {
			// Se crean las relaciones usuario y variable
			values := map[string]interface{}{
				userVariableDB.KeyUserID:     i64,
				userVariableDB.KeyVariableID: variableID,
			}

			_, err := userVariable.Create(values)
			if err != nil {
				fmt.Println("user.updateUserVariables.UserVariable.Create: ", err)
			}
		}
	}

	return err
}

// SION ... OK!
func updateUserCustomVariables(userID int, variablesIn []int64) error {
	var err error

	sizeIn := len(variablesIn)
	if sizeIn > 0 {
		i64 := int64(userID)

		userCustomVariable := userCustomVariableDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		customVariableAlarm := customVariableAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		where := map[string]interface{}{userCustomVariableDB.KeyUserID: i64}
		userCustomVariables, err := userCustomVariable.Find(where)
		if err != nil {
			return err
		}

		removed := make([]int64, 0)
		added := make([]int64, 0)

		if sizeIn == 1 {
			value := variablesIn[0]
			if value == -1 {
				// Eliminar las variables relacionas con el usuario
				for _, userCustomVariable := range userCustomVariables {
					removed = append(removed, userCustomVariable.ID)
				}

				for _, ID := range removed {
					// Eliminar las relaciones usuarios - variables personalizadas y alarmas
					where := map[string]interface{}{customVariableAlarmDB.KeyUserCustomVariableID: ID}
					_, err := customVariableAlarm.Remove(where)
					if err == nil {
						// Eliminar las relaciones usuarios y variables personalizadas
						where = map[string]interface{}{userCustomVariableDB.KeyID: ID}
						_, err := userCustomVariable.Remove(where)
						if err != nil {
							fmt.Println("user.updateUserCustomVariables.UserCustomVariable.Remove: ", err)
						}
					}
				}

				return err
			}
		}

		for _, userCustomVariable := range userCustomVariables {
			hasVariable := false

			for i := 0; i < sizeIn; i++ {
				vID := userCustomVariable.CustomVariableID
				variableID := variablesIn[i]
				if vID == variableID {
					hasVariable = true
					break
				}
			}

			if !hasVariable {
				removed = append(removed, userCustomVariable.ID)
			}
		}

		size := len(userCustomVariables)
		for _, variableID := range variablesIn {
			isNew := true

			for i := 0; i < size; i++ {
				userCustomVariable := userCustomVariables[i]
				vID := userCustomVariable.CustomVariableID
				if variableID == vID {
					isNew = false
					break
				}
			}

			if isNew {
				added = append(added, variableID)
			}
		}

		for _, ID := range removed {
			// Eliminar las relaciones usuarios - variables personalizadas y alarmas
			where := map[string]interface{}{customVariableAlarmDB.KeyUserCustomVariableID: ID}
			_, err := customVariableAlarm.Remove(where)
			if err == nil {
				// Eliminar las relaciones usuarios y variables personalizadas
				where = map[string]interface{}{userCustomVariableDB.KeyID: ID}
				_, err := userCustomVariable.Remove(where)
				if err != nil {
					fmt.Println("user.updateUserCustomVariables.UserCustomVariable.Remove: ", err)
				}
			}
		}

		for _, variableID := range added {
			// Se crean las relaciones usuario y variable personalizadas
			values := map[string]interface{}{
				userCustomVariableDB.KeyUserID:           i64,
				userCustomVariableDB.KeyCustomVariableID: variableID,
				userCustomVariableDB.KeyIsCreator:        false,
			}

			_, err := userCustomVariable.Create(values)
			if err != nil {
				fmt.Println("user.updateUserCustomVariables.Create: ", err)
			}
		}
	}

	return err
}

// SION ... OK!
func updateUserMatrices(userID int, matricesIn []int64) error {
	var err error

	sizeIn := len(matricesIn)
	if sizeIn > 0 {
		i64 := int64(userID)

		userMatrix := userMatrixDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		where := map[string]interface{}{userMatrixDB.KeyUserID: i64}
		userMatrices, err := userMatrix.Find(where)
		if err != nil {
			fmt.Println("user.updateUserMatrices.UserMatrix.Find: ", err)

			return err
		}

		removed := make([]int64, 0)
		added := make([]int64, 0)

		if sizeIn == 1 {
			value := matricesIn[0]
			if value == -1 {
				// Eliminar las relacionas usuario y matrices
				for _, userMatrix := range userMatrices {
					removed = append(removed, userMatrix.ID)
				}

				for _, ID := range removed {
					where := map[string]interface{}{userMatrixDB.KeyID: ID}
					_, err := userMatrix.Remove(where)
					if err != nil {
						fmt.Println("user.updateUserMatrices.UserMatrix.Remove: ", err)
					}
				}

				return err
			}
		}

		for _, userMatrix := range userMatrices {
			hasMatrix := false

			for i := 0; i < sizeIn; i++ {
				mID := userMatrix.MatrixID
				matrixID := matricesIn[i]
				if mID == matrixID {
					hasMatrix = true
					break
				}
			}

			if !hasMatrix {
				removed = append(removed, userMatrix.ID)
			}
		}

		size := len(userMatrices)
		for _, matrixID := range matricesIn {
			isNew := true

			for i := 0; i < size; i++ {
				userMatrix := userMatrices[i]
				mID := userMatrix.MatrixID
				if matrixID == mID {
					isNew = false
					break
				}
			}

			if isNew {
				added = append(added, matrixID)
			}
		}

		for _, ID := range removed {
			// Eliminar las relacionas usuario y matrices
			where := map[string]interface{}{userMatrixDB.KeyID: ID}
			_, err := userMatrix.Remove(where)
			if err != nil {
				fmt.Println("user.updateUserMatrices.UserMatrix.Remove: ", err)
			}
		}

		for _, matrixID := range added {
			// Se crean las relaciones usuarios y matrices
			values := map[string]interface{}{
				userMatrixDB.KeyUserID:    i64,
				userMatrixDB.KeyMatrixID:  matrixID,
				userMatrixDB.KeyIsCreator: false,
			}

			_, err := userMatrix.Create(values)
			if err != nil {
				fmt.Println("user.updateUserMatrices.UserMatrix.Create: ", err)
			}
		}

		i64 = int64(userID)
		updateVariablesAndGroupsInMatrices(i64)
	}

	return err
}

// SION ... OK!
func updateVariablesAndGroupsInMatrices(userID int64) {
	matrix := matrixDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	matrices, err := matrix.FindByUser(userID)
	if err != nil {
		return
	}

	variables := []matrixDB.VariableJSON{}
	customVariables := []matrixDB.VariableJSON{}
	groups := []int64{}

	size := len(matrices)
	for i := 0; i < size; i++ {
		matrixOne := matrices[i]
		s := matrixOne.StructureJSON

		// Insert Variables
		variablesOut := util.GetVariablesInMatrix(s)

		sizeVO := len(variablesOut)
		for j := 0; j < sizeVO; j++ {
			vo := variablesOut[j]

			insert := true
			sizeV := len(variables)
			for k := 0; k < sizeV; k++ {
				v := variables[k]
				isEqualID := v.ID == vo.ID
				isEqualCustom := v.IsCustom == vo.IsCustom
				if isEqualID && isEqualCustom {
					insert = false
					break
				}
			}

			if insert {
				if vo.IsCustom {
					customVariables = append(customVariables, vo)
				} else {
					variables = append(variables, vo)
				}
			}
		}

		// Insert Group
		GroupsOut := util.GetGroupsInMatrix(s)

		sizeGO := len(GroupsOut)
		for j := 0; j < sizeGO; j++ {
			groupO := GroupsOut[j]

			insert := true
			sizeG := len(groups)
			for k := 0; k < sizeG; k++ {
				ID := groups[k]
				isEqualID := ID == groupO.GroupID
				if isEqualID {
					insert = false
					break
				}
			}

			if insert {
				groups = append(groups, groupO.GroupID)
			}
		}
	}

	util.UpdateUserVariablesInMatrices(userID, variables)

	util.UpdateUserCustomVariablesInMatrices(userID, customVariables)

	util.UpdateUserGroupsInMatrices(userID, groups)
}

// SION ... OK!
func updateUserReports(userID int, reportsIn []int64) error {
	var err error

	sizeIn := len(reportsIn)
	if sizeIn > 0 {
		i64 := int64(userID)

		userReport := userReportDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		where := map[string]interface{}{userReportDB.KeyUserID: i64}
		userReports, err := userReport.Find(where)
		if err != nil {
			fmt.Println("user.updateUserReports.UserReport.Find: ", err)

			return err
		}

		removed := make([]int64, 0)
		added := make([]int64, 0)

		if sizeIn == 1 {
			value := reportsIn[0]
			if value == -1 {
				// Eliminar las relaciones usuario y reportes
				for _, userReport := range userReports {
					removed = append(removed, userReport.ID)
				}

				for _, ID := range removed {
					where := map[string]interface{}{userReportDB.KeyID: ID}
					_, err := userReport.Remove(where)
					if err != nil {
						fmt.Println("user.updateUserReports.UserReport.Remove: ", err)
					}
				}

				return err
			}
		}

		for _, userReport := range userReports {
			hasReport := false

			for i := 0; i < sizeIn; i++ {
				rID := userReport.ReportID
				reportID := reportsIn[i]
				if rID == reportID {
					hasReport = true
					break
				}
			}

			if !hasReport {
				removed = append(removed, userReport.ID)
			}
		}

		size := len(userReports)
		for _, reportID := range reportsIn {
			isNew := true

			for i := 0; i < size; i++ {
				userReport := userReports[i]
				rID := userReport.ReportID
				if reportID == rID {
					isNew = false
					break
				}
			}

			if isNew {
				added = append(added, reportID)
			}
		}

		for _, ID := range removed {
			// Eliminar las relaciones usuario y reportes
			where := map[string]interface{}{userReportDB.KeyID: ID}
			_, err := userReport.Remove(where)
			if err != nil {
				fmt.Println("user.updateUserReports.UserReport.Remove: ", err)
			}
		}

		for _, reportID := range added {
			values := map[string]interface{}{
				userReportDB.KeyUserID:    i64,
				userReportDB.KeyReportID:  reportID,
				userReportDB.KeyIsCreator: false,
			}

			_, err := userReport.Create(values)
			if err != nil {
				fmt.Println("user.updateUserReports.UserReport.Create: ", err)
			}
		}
	}

	return err
}

// SION ... OK!
func updateUserAlarms(userID int, alarmsIn []int64) error {
	var err error

	sizeIn := len(alarmsIn)
	if sizeIn > 0 {
		i64 := int64(userID)

		userAlarm := userAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		userVariableAlarm := variableAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		userAlarmEmail := userAlarmEmailDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		where := map[string]interface{}{userAlarmDB.KeyUserID: i64}
		userAlarms, err := userAlarm.Find(where)
		if err != nil {
			fmt.Println("user.updateUserAlarms.UserAlarm.Find: ", err)

			return err
		}

		removed := make([]int64, 0)
		added := make([]int64, 0)

		if sizeIn == 1 {
			value := alarmsIn[0]
			if value == -1 {
				// Eliminar las relaciones usuario y alarma
				for _, userAlarm := range userAlarms {
					removed = append(removed, userAlarm.ID)
				}

				for _, ID := range removed {
					where := map[string]interface{}{userAlarmEmailDB.KeyUserAlarmID: ID}
					_, err = userAlarmEmail.Remove(where)
					if err != nil {
						fmt.Println("user.updateUserAlarms.UserAlarmEmail.Remove: ", err)
					}

					where = map[string]interface{}{variableAlarmDB.KeyUserAlarmID: ID}
					_, err = userVariableAlarm.Remove(where)
					if err != nil {
						fmt.Println("user.updateUserAlarms.UserVariableAlarm.Remove: ", err)
					}

					where = map[string]interface{}{userAlarmDB.KeyID: ID}
					_, err := userAlarm.Remove(where)
					if err != nil {
						fmt.Println("user.updateUserAlarms.UserAlarm.Remove: ", err)
					}
				}

				return err
			}
		}

		for _, userAlarm := range userAlarms {
			hasAlarm := false

			for i := 0; i < sizeIn; i++ {
				aID := userAlarm.AlarmID
				alarmID := alarmsIn[i]
				if aID == alarmID {
					hasAlarm = true
					break
				}
			}

			if !hasAlarm {
				removed = append(removed, userAlarm.ID)
			}
		}

		size := len(userAlarms)
		for _, alarmID := range alarmsIn {
			isNew := true

			for i := 0; i < size; i++ {
				userAlarm := userAlarms[i]
				aID := userAlarm.AlarmID
				if alarmID == aID {
					isNew = false
					break
				}
			}

			if isNew {
				added = append(added, alarmID)
			}
		}

		for _, ID := range removed {
			where := map[string]interface{}{userAlarmEmailDB.KeyUserAlarmID: ID}
			_, err = userAlarmEmail.Remove(where)
			if err != nil {
				fmt.Println("user.updateUserAlarms.UserAlarmEmail.Remove: ", err)
			}

			where = map[string]interface{}{variableAlarmDB.KeyUserAlarmID: ID}
			_, err = userVariableAlarm.Remove(where)
			if err != nil {
				fmt.Println("user.updateUserAlarms.UserVariableAlarm.Remove: ", err)
			}

			// Eliminar las relaciones usuario y alarma
			where = map[string]interface{}{userAlarmDB.KeyID: ID}
			_, err := userAlarm.Remove(where)
			if err != nil {
				fmt.Println("user.updateUserAlarms.UserAlarm.Remove: ", err)
			}
		}

		for _, alarmID := range added {
			values := map[string]interface{}{
				userAlarmDB.KeyUserID:    i64,
				userAlarmDB.KeyAlarmID:   alarmID,
				userAlarmDB.KeyIsCreator: false,
			}

			userAlarmOne, err := userAlarm.Create(values)
			if err != nil {
				fmt.Println("user.updateUserAlarms.UserAlarm.Create: ", err)
			}

			if userAlarmOne.ID > 0 {
				values := map[string]interface{}{
					userAlarmEmailDB.KeyUserAlarmID: userAlarmOne.ID,
					userAlarmEmailDB.KeySendEmail:   false,
				}

				userAlarmEmailOne, err := userAlarmEmail.Create(values)
				if err != nil {
					fmt.Println("user.updateUserAlarms.UserAlarmEmail.Create: ", err)
				}

				if userAlarmEmailOne.ID == 0 {
					fmt.Println("user.updateUserAlarms.UserAlarm.Create: ID UserAlarmEmail is Zero")
				}
			}
		}
	}

	return err
}

// SION ... OK!
func updateUserVehicles(userID int, vehiclesIn []int64) error {
	var err error

	sizeIn := len(vehiclesIn)
	if sizeIn > 0 {
		i64 := int64(userID)

		userVehicle := userVehicleDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		where := map[string]interface{}{userVehicleDB.KeyUserID: i64}
		userVehicles, err := userVehicle.Find(where)
		if err != nil {
			fmt.Println("user.updateUserVehicles.UserVehicle.Find: ", err)

			return err
		}

		removed := make([]int64, 0)
		added := make([]int64, 0)

		if sizeIn == 1 {
			value := vehiclesIn[0]
			if value == -1 {
				// Eliminar las relacionas usuario y vehiculo
				for _, userVehicle := range userVehicles {
					removed = append(removed, userVehicle.ID)
				}

				for _, ID := range removed {
					where := map[string]interface{}{userVehicleDB.KeyID: ID}
					_, err := userVehicle.Remove(where)
					if err != nil {
						fmt.Println("user.updateUserVehicles.UserVehicle.Remove: ", err)
					}
				}

				return err
			}
		}

		for _, userVehicle := range userVehicles {
			hasVehicle := false

			for i := 0; i < sizeIn; i++ {
				vID := userVehicle.VehicleID
				vehicleID := vehiclesIn[i]
				if vID == vehicleID {
					hasVehicle = true
					break
				}
			}

			if !hasVehicle {
				removed = append(removed, userVehicle.ID)
			}
		}

		size := len(userVehicles)
		for _, vehicleID := range vehiclesIn {
			isNew := true

			for i := 0; i < size; i++ {
				userVehicle := userVehicles[i]
				vID := userVehicle.VehicleID
				if vehicleID == vID {
					isNew = false
					break
				}
			}

			if isNew {
				added = append(added, vehicleID)
			}
		}

		for _, ID := range removed {
			// Eliminar las relacionas usuario y vehiculo
			where := map[string]interface{}{userVehicleDB.KeyID: ID}
			_, err := userVehicle.Remove(where)
			if err != nil {
				fmt.Println("user.updateUserVehicles.UserVehicle.Remove: ", err)
			}
		}

		for _, vehicleID := range added {
			values := map[string]interface{}{
				userVehicleDB.KeyUserID:    i64,
				userVehicleDB.KeyVehicleID: vehicleID,
			}

			_, err := userVehicle.Create(values)
			if err != nil {
				fmt.Println("user.updateUserVehicles.UserVehicle.Create: ", err)
			}
		}
	}

	return err
}
