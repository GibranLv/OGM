package authentication

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo-contrib/session"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
)

func logOut(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	uSession, err := session.Get(constants.KeySystemUserSession, c)
	if err != nil {
		fmt.Println("logOut.session.Get: ", err)

		msg := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msg)
	}

	delete(uSession.Values, constants.KeyUserID)
	uSession.Save(c.Request(), c.Response())

	// Registro del Evento
	typeIn := constants.TypeLogOut
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("El usuario %s, %s, %s cerro sesión", userSession.Username, userSession.Email, userSession.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.Redirect(http.StatusFound, "/login")
}
