package graphic

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	graphicDB "github.com/JamsMendez/SION-sw/models/graphic"
	"github.com/JamsMendez/SION-sw/routers"
)

func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(graphicDB.KeyID)

	if id == constants.ListParam {
		graphic := graphicDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var graphics []graphicDB.Graphic
		var err error

		if userSession.Role == constants.RootUser {
			userIDValue := c.QueryParam(constants.UserIDQuery)

			if userIDValue != "" {
				// Usuario usuario
				// Acceso a todas los Gráficos de todos los usuarios
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					return c.NoContent(http.StatusBadRequest)
				}

				i64 := int64(userID)
				graphics, err = graphic.FindByUser(i64)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Usuario usuario
				// Acceso a todas los Gráficos
				where := map[string]interface{}{}
				graphics, err = graphic.Find(where)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if userSession.Role == constants.AdminUser {
			allValue := c.QueryParam(constants.AllQuery)
			userIDValue := c.QueryParam(constants.UserIDQuery)

			if allValue == constants.TrueValue {
				// Administrador
				// Acceso a todas los Gráficos de usuarios con roles de valor inferior
				// y de la sesión del usuario
				graphics, err = graphic.FindByUserOrLowerValue(userSession.ID, userSession.Value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else if userIDValue == constants.TrueValue {
				// Administrador
				// Acceso a todas los Gráficos con el ID del usuario siempre
				// que no tenga un role con valor superior
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					return c.NoContent(http.StatusBadRequest)
				}

				i64 := int64(userID)
				graphics, err = graphic.FindByUserAndLowerValue(i64, userSession.Value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Administrador
				// Acceso a todas los Gráficos de la sesión del usuario
				graphics, err = graphic.FindByUser(userSession.ID)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if userSession.Role == constants.OperatorUser {
			// Operador
			// Acceso a todas los Gráficos de la sesión del usuario
			graphics, err = graphic.FindByUser(userSession.ID)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else if userSession.Role == constants.GuestUser {
			// Invitado
			// Acceso a todas los Gráficos de la sesión del usuario
			graphics, err = graphic.FindByUser(userSession.ID)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			// El role de usuario es indefinido.
			return c.NoContent(http.StatusNonAuthoritativeInfo)
		}

		resJSON := constants.ResJSONs{Docs: graphics}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	graphic := graphicDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var graphicOne graphicDB.Graphic

	if userSession.Role == constants.RootUser {
		// Super usuario
		// Acceso a cualquier Operación
		where := map[string]interface{}{graphicDB.KeyID: iID}
		graphicOne, err = graphic.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.AdminUser {
		// Administrador
		// Acceso a cualquier Operación de un usuario con role de valor inferior
		// o la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)
		graphicOne, err = graphic.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.OperatorUser {
		// Operador
		// Acceso a cualquier Operación de un usuario con role de valor inferior
		// o la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)
		graphicOne, err = graphic.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.GuestUser {
		// Invitado
		// Acceso a el Gráfico relacionada a la sesión del usuario
		userID := userSession.ID
		i64 := int64(iID)
		graphicOne, err = graphic.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	if graphicOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del Gráfico")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	resJSON := constants.ResJSON{Doc: graphicOne}
	return c.JSON(http.StatusOK, resJSON)
}
