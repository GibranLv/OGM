package middlewares

import (
	"fmt"
	"io"
	"net/http"
	"strconv"

	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/encrypted"
	apiDB "github.com/JamsMendez/SION-sw/models/api"
	userDB "github.com/JamsMendez/SION-sw/models/user"
	userSessionDB "github.com/JamsMendez/SION-sw/models/user_session"
)

// IsEncrypt validate request for API using tokens
func IsEncrypt(next echo.HandlerFunc) echo.HandlerFunc {
	fmt.Println("IsEncrypt")

	return func(c echo.Context) error {
		hashIn := c.Request().Header.Get(constants.KeyAPI)
		hasHash := hashIn != ""
		if hasHash {
			method := c.Request().Method

			if isURL := method == http.MethodGet || method == http.MethodDelete; isURL {
				url := "http://" + c.Request().Host + c.Request().RequestURI
				eURL := encrypted.GetEncodeURL(url)
				hash := encrypted.GetEncoding(eURL)
				if hash == hashIn {
					return next(c)
				}

				fmt.Println("Differents in hash request")
				fmt.Println(hash, hashIn)

				msg := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msg)
			}

			if isBody := method == http.MethodPost || method == http.MethodPut; isBody {

				bsJSON, err := io.ReadAll(c.Request().Body)
				if err != nil {
					fmt.Println("IsEncrypt.ReadAll: ", err)
				}

				body := string(bsJSON)
				err = c.Request().Body.Close()
				if err != nil {
					fmt.Println("c.Request().Body.Close(): ", err)
				}

				hash := encrypted.GetEncoding(body)

				if hash == hashIn {
					c.Set(constants.KeyBody, body)
					return next(c)
				}

				fmt.Println("Differents in hash request")
				fmt.Println(hash, hashIn)

				msg := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msg)
			}
		}

		return c.NoContent(http.StatusBadRequest)
	}
}

// IsAPIAuth ...
func IsAPIAuth(next echo.HandlerFunc) echo.HandlerFunc {
	fmt.Println("IsAPIAuth")

	return func(c echo.Context) error {
		accessToken := c.Request().Header.Get(constants.KeyAccessTokenHeader)

		if accessToken == "" {
			fmt.Println("Access Token Empty")

			return c.NoContent(http.StatusUnauthorized)
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
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		if apiOne.ID == 0 {
			fmt.Println("API ID is zero")

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		content, err := encrypted.ParseAccessTokenAPI(apiOne.AccessTokenKey, accessToken)
		if err != nil {
			fmt.Println("AccessToken.Error: ", err)

			return c.NoContent(http.StatusUnauthorized)
		}

		var isExpired bool
		var valueSession int32

		if value, hasKey := content[encrypted.KeyExpired]; hasKey {
			var ok bool
			isExpired, ok = value.(bool)
			if !ok {
				message := "Ups! algo salio mal"
				msg := constants.MsgError{Message: message}
				return c.JSON(http.StatusAccepted, msg)
			}

		} else {
			message := "Ups! algo salio mal"
			msg := constants.MsgError{Message: message}
			return c.JSON(http.StatusAccepted, msg)
		}

		if isExpired {
			fmt.Println("AccessToken isExpired Status RESET")
			return c.NoContent(http.StatusResetContent)
		}

		if value, hasValue := content[constants.KeyUserSession]; hasValue {
			var ok bool
			valueSession, ok = value.(int32)
			if !ok {
				message := "Ups! algo salio mal"
				msg := constants.MsgError{Message: message}
				return c.JSON(http.StatusAccepted, msg)
			}

		} else {
			message := "Ups! algo salio mal"
			msg := constants.MsgError{Message: message}
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
		var userOneSession userSessionDB.UserSession

		if valueSession == userSessionDB.SessionUsername {
			where = map[string]interface{}{
				userSessionDB.KeyUserID:          content[encrypted.KeyUserID],
				userSessionDB.KeyAccessTokenHash: content[constants.KeyHash],
			}

			userOneSession, err = userSession.FindOne(where)
			if err != nil {
				fmt.Println(err)

				msg := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msg)
			}

		} else {
			return c.NoContent(http.StatusUnauthorized)
		}

		if userOneSession.ID == 0 {
			return c.NoContent(http.StatusUnauthorized)
		}

		where = map[string]interface{}{
			userDB.KeyID: userOneSession.UserID,
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
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		if userOne.ID == 0 {
			return c.NoContent(http.StatusUnauthorized)
		}

		c.Set(constants.KeyUserSession, userOne)
		return next(c)
	}
}

// IsAPIAuthv2 ...
func IsAPIAuthv2(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authorization := c.Request().Header.Get(constants.KeyAuthorization)

		if authorization == "" {
			fmt.Println("Authorization Empty")

			return c.NoContent(http.StatusUnauthorized)
		}

		where := map[string]interface{}{apiDB.KeyID: 2}

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
			fmt.Println("API 2 ID is zero")

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		// fmt.Println(apiOne.AccessTokenKey)
		// fmt.Println(authorization)
		/*
			content, err := encrypted.ParseAccessTokenAPIv2(apiOne.AccessTokenKey, authorization)
			if err != nil {
			   	fmt.Println("Authorization.Error: ", err)

			   	return c.NoContent(http.StatusUnauthorized)
			}
		*/

		// var isExpired bool
		var userID int64 = 51

		/*
			if value, hasKey := content[encrypted.KeyExpired]; hasKey {
			   	var ok bool
			   	isExpired, ok = value.(bool)
			   	if !ok {
			   		message := "Ups! algo salio mal"
			   		msg := constants.MsgError{Message: message}
			   		return c.JSON(http.StatusAccepted, msg)
			   	}

			} else {
			   	message := "Ups! algo salio mal"
			   	msg := constants.MsgError{Message: message}
			   	return c.JSON(http.StatusAccepted, msg)
			}

			if isExpired {
			   	fmt.Println("Authorization isExpired Status RESET")
			   	return c.NoContent(http.StatusResetContent)
			}

			if value, hasValue := content[constants.KeyUserID]; hasValue {
			   	inputUserID, ok := value.(string)
			   	if !ok {
			   		fmt.Println("Authorization UserID isn't string")
			   		message := "Ups! algo salio mal"
			   		msg := constants.MsgError{Message: message}
			   		return c.JSON(http.StatusAccepted, msg)
			   	}

			   	vInt, err := strconv.Atoi(inputUserID)
			   	if err != nil {
			   		fmt.Println("Authorization inputUserID string to int error", err)
			   		message := "Ups! algo salio mal"
			   		msg := constants.MsgError{Message: message}
			   		return c.JSON(http.StatusAccepted, msg)
			   	}

			   	userID = int64(vInt)

			} else {
			   	message := "Ups! algo salio mal"
			   	msg := constants.MsgError{Message: message}
			   	return c.JSON(http.StatusAccepted, msg)
			}
		*/

		user := userDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		where = map[string]interface{}{userDB.KeyID: userID}
		userOne, err := user.FindOne(where)
		if err != nil {
			fmt.Println(err)

			msg := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msg)
		}

		if userOne.ID == 0 {
			return c.NoContent(http.StatusUnauthorized)
		}

		c.Set(constants.KeyUserSession, userOne)
		return next(c)
	}
}

// HasUserSession ...
func HasUserSession(c echo.Context) (userDB.User, bool) {
	// fmt.Println("HasUserSession")
	var userSession userDB.User

	value := c.Get(constants.KeyUserSession)
	if value == nil {
		uSession, err := session.Get(constants.KeyUserSession, c)
		if err == nil {
			delete(uSession.Values, constants.KeyUserID)
			uSession.Save(c.Request(), c.Response())
		}

		return userSession, false
	}

	userSession, isOk := value.(userDB.User)
	if !isOk {
		uSession, err := session.Get(constants.KeyUserSession, c)
		if err == nil {
			delete(uSession.Values, constants.KeyUserID)
			uSession.Save(c.Request(), c.Response())
		}

		return userSession, false
	}

	if userSession.ID == 0 {
		uSession, err := session.Get(constants.KeyUserSession, c)
		if err == nil {
			delete(uSession.Values, constants.KeyUserID)
			uSession.Save(c.Request(), c.Response())
		}

		return userSession, false
	}

	return userSession, true
}

// ParseInt ... Parse string to int
func ParseInt(value string) (int, error) {
	var err error
	var i int

	if value != "" {
		i, err = strconv.Atoi(value)
		if err != nil {
			fmt.Println("strconv.Atoi.ParseInt: ", err)

			return i, err
		}
	}

	return i, err
}
