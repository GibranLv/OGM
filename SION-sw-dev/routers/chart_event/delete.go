package chartevent

import (
	"fmt"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	chartEventDB "github.com/JamsMendez/SION-sw/models/chart_event"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

func deleteServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(chartEventDB.KeyID)
	if id == "" {
		return c.NoContent(http.StatusBadRequest)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	chartEvent := chartEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var numAffected int64

	if userSession.Role == constants.RootUser {
		// Super usuario
		// Acceso a los Eventos
		// Se eliminan las relaciones con el Evento
		where := map[string]interface{}{chartEventDB.KeyID: iID}
		numAffected, err = chartEvent.Remove(where)
		if err != nil {
			fmt.Println("chartEvent.deleteServer.Remove: ", err)
		}

	} else if userSession.Role == constants.AdminUser {
		// Administrador
		// Acceso a los Eventos de los usuarios con role de valor inferior
		// y sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene el Evento para validar permisos de acceso
		chartEventOne, err := chartEvent.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if chartEventOne.ID == 0 {
			return c.NoContent(http.StatusNonAuthoritativeInfo)
		}

		// Se elimina el Evento
		where := map[string]interface{}{chartEventDB.KeyID: chartEventOne.ID}
		numAffected, err = chartEvent.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.OperatorUser {
		// Operador
		// Acceso a los Eventos de los usuarios con role de valor inferior
		// y sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene el Evento para validar permisos de acceso
		chartEventOne, err := chartEvent.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if chartEventOne.ID == 0 {
			return c.NoContent(http.StatusNonAuthoritativeInfo)
		}

		// Se elimina el Evento
		where := map[string]interface{}{chartEventDB.KeyID: chartEventOne.ID}
		numAffected, err = chartEvent.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.GuestUser {
		// Invitado
		// Acceso a los Eventos de la sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID

		// Se obtiene el Evento para validar permisos de acceso
		chartEventOne, err := chartEvent.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if chartEventOne.ID == 0 {
			return c.NoContent(http.StatusNonAuthoritativeInfo)
		}

		// Se elimina el Evento
		where := map[string]interface{}{chartEventDB.KeyID: chartEventOne.ID}
		numAffected, err = chartEvent.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del evento")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	return c.NoContent(http.StatusOK)
}
