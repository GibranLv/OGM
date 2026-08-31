package unit

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	unitDB "github.com/JamsMendez/SION-sw/models/unit"
	"github.com/JamsMendez/SION-sw/routers"
)

func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(unitDB.KeyID)

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if id == constants.ListParam {
		unit := unitDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var units []unitDB.Unit
		var err error

		if isRoot || isSystemAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)
			if userIDValue != "" {
				// Acceso a todas las unidades de todos los usuarios
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

				i64 := int64(userID)
				units, err = unit.FindByUser(i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Acceso a todas las unidades
				where := map[string]interface{}{}
				units, err = unit.Find(where)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isAdmin {
			/*
				Acceso a todas las unidades de usuarios con menor valor
				a la sesión del usuario
			*/
			userID := userSession.ID
			value := userSession.Value

			units, err = unit.FindByUserOrLowerValue(userID, value)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else if isOperator || isGuest {
			// Acceso a todas las unidades de la sesión del usuario
			units, err = unit.FindByUser(userSession.ID)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			// El role de usuario es indefinido.
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		resJSON := constants.ResJSONs{Docs: units}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	unit := unitDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var unitOne unitDB.Unit

	if isRoot || isSystemAdmin {
		// Acceso a cualquier unidad
		where := map[string]interface{}{unitDB.KeyID: iID}
		unitOne, err = unit.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a cualquier unidad de un usuario con menor valor
			a la sesión del usuario
		*/
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)

		unitOne, err = unit.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		// Acceso a cualquier unidad de la sesión del usuario
		userID := userSession.ID
		i64 := int64(iID)

		unitOne, err = unit.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if unitOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la unidad")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	resJSON := constants.ResJSON{Doc: unitOne}
	return c.JSON(http.StatusOK, resJSON)
}
