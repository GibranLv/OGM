package routers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	userDB "github.com/JamsMendez/SION-sw/models/user"
)

// IsServerAuth ...
func IsServerAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {

		//fmt.Println("IsServerAuth ...")

		uSession, err := session.Get(constants.KeySystemUserSession, c)
		if err != nil {

			return c.Redirect(http.StatusFound, "/login")
		}

		if value, isOk := uSession.Values[constants.KeyUserID]; isOk {

			userID, isInt := value.(int64)
			if !isInt {
				delete(uSession.Values, constants.KeyUserID)
				uSession.Save(c.Request(), c.Response())

				return c.Redirect(http.StatusFound, "/login")
			}

			if userID == 0 {
				delete(uSession.Values, constants.KeyUserID)
				uSession.Save(c.Request(), c.Response())

				return c.Redirect(http.StatusFound, "/login")
			}

			user := userDB.Model{
				UserDB: constants.DB.UserSW,
				PwdDB:  constants.DB.PwdSW,
				NameDB: constants.DB.NameSW,
				Host:   constants.DB.HostSW,
				Port:   constants.DB.PortSW,
				Debug:  true,
			}

			where := map[string]interface{}{userDB.KeyID: userID}
			userRow, err := user.FindOne(where)
			if err != nil {
				fmt.Println("IsServerAuth.Error: ", err)

				uSession, err := session.Get(constants.KeySystemUserSession, c)
				if err == nil {
					delete(uSession.Values, constants.KeyUserID)
					uSession.Save(c.Request(), c.Response())
				}

				return c.Redirect(http.StatusFound, "/login")
			}

			if userRow.ID == 0 {
				delete(uSession.Values, constants.KeyUserID)
				uSession.Save(c.Request(), c.Response())

				return c.Redirect(http.StatusFound, "/login")
			}

			c.Set(constants.KeySystemUserSession, userRow)
			return next(c)
		}

		return c.Redirect(http.StatusFound, "/login")
	}
}

// IsntServerAuth ...
func IsntServerAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {

		//fmt.Println("IsntServerAuth ...")

		uSession, err := session.Get(constants.KeySystemUserSession, c)
		if err != nil {
			return next(c)
		}

		var value interface{}
		var isOk bool

		if value, isOk = uSession.Values[constants.KeyUserID]; !isOk {
			return next(c)
		}

		userID, isInt := value.(int64)
		if !isInt {
			return next(c)
		}

		if userID == 0 {
			return next(c)
		}

		return c.Redirect(http.StatusFound, "/")
	}
}

// HasUserSession ...
func HasUserSession(c echo.Context) (userDB.User, bool) {
	var userSession userDB.User

	value := c.Get(constants.KeySystemUserSession)
	if value == nil {
		uSession, err := session.Get(constants.KeySystemUserSession, c)
		if err == nil {
			delete(uSession.Values, constants.KeyUserID)
			uSession.Save(c.Request(), c.Response())
		}

		return userSession, false
	}

	userSession, isOk := value.(userDB.User)
	if !isOk {
		uSession, err := session.Get(constants.KeySystemUserSession, c)
		if err == nil {
			delete(uSession.Values, constants.KeyUserID)
			uSession.Save(c.Request(), c.Response())
		}

		return userSession, false
	}

	if userSession.ID == 0 {
		uSession, err := session.Get(constants.KeySystemUserSession, c)
		if err == nil {
			delete(uSession.Values, constants.KeyUserID)
			uSession.Save(c.Request(), c.Response())
		}

		return userSession, false
	}

	return userSession, true
}
