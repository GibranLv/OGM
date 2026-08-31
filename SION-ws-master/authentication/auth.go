package authentication

import (
	"fmt"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/encrypted"
)

// Session ... La sesión del cliente WS
type Session struct {
	UserID int64
	Client string
}

// LogIn ... Valida el JWT de autentificación de Client WS
func LogIn(r *http.Request, key string) (Session, bool) {
	var session Session
	var isAuth bool

	/*cAccessToken, err := r.Cookie(constants.KeyAccessTokenWS)
	if err != nil {
		fmt.Println("authentication.Cookie: ", err)

		return session, isAuth
	}

	accessToken := cAccessToken.Value
	if accessToken == "" {
		return session, isAuth
	}*/

	accessToken := r.URL.Query().Get(constants.KeyAccessTokenWS)
	values, err := encrypted.ParseAccessTokenWS(key, accessToken)
	if err != nil {
		fmt.Println("authentication.parseAccessToken: ", err)

		return session, isAuth
	}

	if _, isOk := values[encrypted.KeyUserID]; !isOk {
		fmt.Println("authentication: KeyUserID not found")
		return session, isAuth
	}

	if _, isOk := values[encrypted.KeyClient]; !isOk {
		fmt.Println("authentication: KeyClient not found")

		return session, isAuth
	}

	var userID int64
	var client string
	var isInt, isString bool

	if userID, isInt = values[encrypted.KeyUserID].(int64); !isInt {
		fmt.Println("authentication: KeyUserID isn't int")

		return session, isAuth
	}

	if client, isString = values[encrypted.KeyClient].(string); !isString {
		fmt.Println("authentication: KeyClient isn't String")

		return session, isAuth
	}

	session = Session{UserID: userID, Client: client}
	isAuth = true

	return session, isAuth
}

// LogInOfService ... Valida el JWT de autentificación de Client TCP
func LogInOfService(accessToken string, key string) (map[string]interface{}, bool) {
	var isAuth bool
	values, err := encrypted.ParseAccessTokenTCP(key, accessToken)
	if err != nil {
		fmt.Println("authentication.parseAccessToken: ", err)

		return values, isAuth
	}

	if _, isOk := values[encrypted.KeyClient]; !isOk {
		fmt.Println("authentication: KeyClient not found")

		return values, isAuth
	}

	var isString bool

	if _, isString = values[encrypted.KeyClient].(string); !isString {
		fmt.Println("authentication: KeyClient isn't String")

		return values, isAuth
	}

	isAuth = true

	return values, isAuth
}
