package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	encrypted "github.com/JamsMendez/SION-sw/encrypted"
	apiDB "github.com/JamsMendez/SION-sw/models/api"
	userDB "github.com/JamsMendez/SION-sw/models/user"
	userSessionDB "github.com/JamsMendez/SION-sw/models/user_session"
)

type logInJSON struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type logOutJSON struct {
	Username    string `json:"username"`
	AccessToken string `json:"access_token"`
}

type userSessionJSON struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

// LogInAPI ...
func LogInAPI(c echo.Context) error {
	logIn := map[string]string{}

	body, isString := c.Get(constants.KeyBody).(string)
	if !isString {
		fmt.Println("Body is not string")

		msg := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusBadRequest, msg)
	}

	b := []byte(body)

	if err := json.Unmarshal(b, &logIn); err != nil {
		fmt.Println(err)

		msg := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusBadRequest, msg)
	}

	// keys to logInJSON
	_, hasUsername := logIn[userDB.KeyUsername]
	_, hasPassword := logIn[userDB.KeyPassword]

	if hasUsername && hasPassword {
		loginJSON := logInJSON{}

		if err := json.Unmarshal(b, &loginJSON); err != nil {
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusBadRequest, msg)
		}

		user := userDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		where := map[string]interface{}{userDB.KeyUsername: loginJSON.Username}
		userOne, err := user.FindOne(where)
		if err != nil {
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		if userOne.ID == 0 {
			fmt.Println("User ID is zero")

			msg := constants.MsgError{Message: constants.UsernameIsntValid}
			return c.JSON(http.StatusAccepted, msg)
		}

		userOne, err = user.LogIn(loginJSON.Username, loginJSON.Password)
		if err != nil {
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		if userOne.ID == 0 {
			fmt.Println("User ID is zero after of LogIn")

			msg := constants.MsgError{Message: constants.UsernameIsntValid}
			return c.JSON(http.StatusAccepted, msg)
		}

		where = map[string]interface{}{apiDB.KeyID: 1}
		api := apiDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}
		apiOne, err := api.FindOne(where)
		if err != nil {
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		if apiOne.ID == 0 {
			fmt.Println("Configuration ID is zero")

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		accessTokenHash := encrypted.GetHash(constants.LenAccessToken)
		refreshTokenHash := encrypted.GetHash(constants.LenRefreshToken)

		uSession := int32(userSessionDB.SessionUsername)

		values := map[string]interface{}{
			constants.KeyUserSession: uSession,
			constants.KeyHash:        accessTokenHash,
			encrypted.KeyUserID:      userOne.ID,
		}

		accessToken, err := encrypted.GetTokenAPI(apiOne.AccessTokenKey, values, constants.IssuerAPI)
		if err != nil {
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		values[constants.KeyHash] = refreshTokenHash
		refreshToken, err := encrypted.GetRefreshTokenAPI(apiOne.RefreshTokenKey, values, constants.IssuerAPI)
		if err != nil {
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		userSession := userSessionDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}
		where = map[string]interface{}{userSessionDB.KeyUserID: userOne.ID}
		userSessionOne, err := userSession.FindOne(where)
		if err != nil {
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		now := time.Now()

		values = map[string]interface{}{
			userSessionDB.KeyAccessTokenHash:  accessTokenHash,
			userSessionDB.KeyRefreshTokenHash: refreshTokenHash,
			userSessionDB.KeyValue:            userSessionDB.SessionUsername,
			userSessionDB.KeyUserID:           userOne.ID,
			userSessionDB.KeyUpdatedAt:        now,
		}

		if userSessionOne.ID > 0 {
			values[userSessionDB.KeyID] = userSessionOne.ID

			userSessionOne, err = userSession.Update(values)
			if err != nil {
				fmt.Println(err)

				msg := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msg)
			}

		} else {
			values[userSessionDB.KeyCreatedAt] = now

			userSessionOne, err = userSession.Create(values)
			if err != nil {
				fmt.Println(err)

				msg := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msg)
			}

			if userSessionOne.ID == 0 {
				fmt.Println("uSession ID is zero after of Create")

				msg := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msg)
			}

		}

		uSessionJSON := userSessionJSON{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		}

		res := constants.ResJSON{Doc: uSessionJSON}

		return c.JSON(http.StatusOK, res)
	}

	return c.NoContent(http.StatusBadRequest)
}

// LogOutAPI ...
func LogOutAPI(c echo.Context) error {
	logOutJSON := logOutJSON{}

	body := c.Get(constants.KeyBody).(string)
	b := []byte(body)

	if err := json.Unmarshal(b, &logOutJSON); err != nil {
		fmt.Println(err)

		msg := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusBadRequest, msg)
	}

	user := userDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}
	where := map[string]interface{}{userDB.KeyUsername: logOutJSON.Username}
	userOne, err := user.FindOne(where)
	if err != nil {
		fmt.Println("LogOut.User.FindOne.ERROR: ", err)

		msg := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msg)
	}

	if userOne.ID == 0 {
		fmt.Println("User ID is zero: ", logOutJSON.Username)

		msg := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msg)
	}

	api := apiDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}
	where = map[string]interface{}{apiDB.KeyID: 1}
	apiOne, err := api.FindOne(where)
	if err != nil {
		fmt.Println(err)

		msg := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msg)
	}

	if apiOne.ID == 0 {
		fmt.Println("API ID is zero")

		msg := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msg)
	}

	content, err := encrypted.ParseAccessTokenAPI(apiOne.AccessTokenKey, logOutJSON.AccessToken)
	if err != nil {
		fmt.Println(err)

		msg := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msg)
	}

	where = map[string]interface{}{
		userSessionDB.KeyUserID:          userOne.ID,
		userSessionDB.KeyAccessTokenHash: content[constants.KeyHash],
	}

	userSession := userSessionDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}
	userSessionOne, err := userSession.FindOne(where)
	if err != nil {
		fmt.Println(err)

		msg := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msg)
	}

	if userSessionOne.ID == 0 {
		fmt.Println("uSession ID is zero")

		msg := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msg)
	}

	where = map[string]interface{}{userSessionDB.KeyID: userSessionOne.ID}
	_, err = userSession.Remove(where)
	if err != nil {
		fmt.Println(err)

		msg := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msg)
	}

	return c.JSON(http.StatusOK, nil)
}

// RefreshAPI ...
func RefreshAPI(c echo.Context) error {
	refreshJSON := logInJSON{}

	body, isString := c.Get(constants.KeyBody).(string)
	if !isString {
		fmt.Println("RefreshAPI.Body is not string")

		msg := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusBadRequest, msg)
	}

	b := []byte(body)

	if err := json.Unmarshal(b, &refreshJSON); err != nil {
		fmt.Println("RefreshAPI: ", err)

		msg := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusBadRequest, msg)
	}

	// key to email
	hasUsername := refreshJSON.Username != ""
	if hasUsername {
		accessToken := c.Request().Header.Get(constants.KeyAccessTokenHeader)
		refreshToken := c.Request().Header.Get(constants.KeyRefreshTokenHeader)

		hasAccessToken := accessToken != ""
		hasRefreshToken := refreshToken != ""

		if !hasAccessToken || !hasRefreshToken {
			fmt.Println("RefreshAPI.HAS: ", hasAccessToken, hasRefreshToken)

			msg := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msg)
		}

		where := map[string]interface{}{apiDB.KeyID: 1}

		api := apiDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}
		apiOne, err := api.FindOne(where)
		if err != nil {
			fmt.Println("RefreshAPI.API.FindOne: ", err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		if apiOne.ID == 0 {
			fmt.Println("RefreshAPIAPI ID is zero")

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		contentAT, err := encrypted.ParseAccessTokenAPI(apiOne.AccessTokenKey, accessToken)
		if err != nil {
			fmt.Println("RefreshAPI.ParseAccessTokenAPI: ", err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		isExpired := contentAT[encrypted.KeyExpired].(bool)
		if !isExpired {
			message := "Upss!, algo salio mal :3"
			msg := constants.MsgError{Message: message}
			return c.JSON(http.StatusAccepted, msg)
		}

		contentRT, err := encrypted.ParseRefreshTokenAPI(apiOne.RefreshTokenKey, refreshToken)
		if err != nil {
			fmt.Println("RefreshAPI.ParseRefreshTokenAPI: ", err)

			message := "Upss!, algo salio mal :D"
			msg := constants.MsgError{Message: message}
			return c.JSON(http.StatusUnauthorized, msg)
		}

		// get information of user
		where = map[string]interface{}{
			userDB.KeyID:       contentRT[encrypted.KeyUserID],
			userDB.KeyUsername: refreshJSON.Username,
		}

		user := userDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}
		userOne, err := user.FindOne(where)
		if err != nil {
			fmt.Println("RefreshAPI.User.FindOne: ", err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		if userOne.ID == 0 {
			fmt.Println("RefreshAPI.User ID is zero")

			msg := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msg)
		}

		// get information of the session user
		where = map[string]interface{}{
			userSessionDB.KeyAccessTokenHash:  contentAT[constants.KeyHash],
			userSessionDB.KeyRefreshTokenHash: contentRT[constants.KeyHash],
			userSessionDB.KeyValue:            userSessionDB.SessionUsername,
			userSessionDB.KeyUserID:           userOne.ID,
		}

		userSession := userSessionDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}
		userSessionOne, err := userSession.FindOne(where)
		if err != nil {
			fmt.Println("RefreshAPI.UserSession.FindOne: ", err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		if userSessionOne.ID == 0 {
			return c.NoContent(http.StatusUnauthorized)
		}

		// get news hash and tokens for user session
		accessTokenHash := encrypted.GetHash(constants.LenAccessToken)
		refreshTokenHash := encrypted.GetHash(constants.LenRefreshToken)

		uSession := int32(userSessionDB.SessionUsername)

		valuesInAcessToken := map[string]interface{}{
			constants.KeyUserSession: uSession,
			constants.KeyHash:        accessTokenHash,
			encrypted.KeyUserID:      userOne.ID,
		}

		valuesInRefreshToken := map[string]interface{}{
			constants.KeyUserSession: uSession,
			constants.KeyHash:        refreshTokenHash,
			encrypted.KeyUserID:      userOne.ID,
		}

		accessToken, err = encrypted.GetTokenAPI(apiOne.AccessTokenKey, valuesInAcessToken, constants.IssuerAPI)
		if err != nil {
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		refreshToken, err = encrypted.GetRefreshTokenAPI(apiOne.RefreshTokenKey, valuesInRefreshToken, constants.IssuerAPI)
		if err != nil {
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		// update hash of user session
		values := map[string]interface{}{
			userSessionDB.KeyID:               userSessionOne.ID,
			userSessionDB.KeyAccessTokenHash:  accessTokenHash,
			userSessionDB.KeyRefreshTokenHash: refreshTokenHash,
			userSessionDB.KeyUserID:           userOne.ID,
			userSessionDB.KeyUpdatedAt:        time.Now(),
		}

		userSessionOne, err = userSession.Update(values)
		if err != nil {
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		uSessionJSON := userSessionJSON{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		}

		doc := constants.ResJSON{Doc: uSessionJSON}

		return c.JSON(http.StatusOK, doc)
	}

	return c.NoContent(http.StatusBadRequest)
}
