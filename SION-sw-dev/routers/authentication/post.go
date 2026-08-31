package authentication

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	userDB "github.com/JamsMendez/SION-sw/models/user"
	"github.com/JamsMendez/SION-sw/routers/util"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
)

func logIn(c echo.Context) error {
	b, err := io.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("authentication.logIn.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("authentication.logIn.c.Request().Body.Close(): ", err)
	}

	logInJSON := logInReq{}

	if err := json.Unmarshal(b, &logInJSON); err != nil {
		fmt.Println("authentication.logIn.Unmarshal: ", err)
		return c.NoContent(http.StatusBadRequest)
	}

	user := userDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userOne, err := user.LogIn(logInJSON.Username, logInJSON.Password)
	if err != nil {
		fmt.Println(err)

		msg := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msg)
	}

	if userOne.ID == 0 {
		fmt.Println("authentication.userOne: ID is zero after LogIn")

		msg := "Usuario y/o contraseña incorrecta"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	uSession, err := session.Get(constants.KeySystemUserSession, c)
	if err != nil {
		delete(uSession.Values, constants.KeyUserID)
		uSession.Save(c.Request(), c.Response())

		msg := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msg)
	}

	uSession.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
	}

	uSession.Values[constants.KeyUserID] = userOne.ID
	uSession.Save(c.Request(), c.Response())

	// Registro del Evento
	typeIn := constants.TypeLogIn
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("El usuario %s, %s, %s inicio sesión", userOne.Username, userOne.Email, userOne.Name)
	util.InsertLogEvent(userOne.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}
