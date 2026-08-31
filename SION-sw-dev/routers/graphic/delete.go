package graphic

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	graphicDB "github.com/JamsMendez/SION-sw/models/graphic"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
)

func deleteServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(graphicDB.KeyID)
	if id == "" {
		return c.NoContent(http.StatusBadRequest)
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

	var numAffected int64

	if userSession.Role == constants.RootUser {
		// Super usuario
		// Acceso a las Gráficos

		// Se elimina el Gráfico
		where := map[string]interface{}{graphicDB.KeyID: iID}
		numAffected, err = graphic.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.AdminUser {
		// Administrador
		// Acceso a las Gráficos de los usuarios con role de valor inferior
		// y sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene el Gráfico para validar permisos de acceso
		graphicOne, err := graphic.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if graphicOne.ID == 0 {
			msg := "Permiso denegado"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina el Gráfico
		where := map[string]interface{}{graphicDB.KeyID: graphicOne.ID}
		numAffected, err = graphic.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.OperatorUser {
		// Operador
		// Acceso a las Gráficos de los usuarios con role de valor inferior
		// y sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene el Gráfico para validar permisos de acceso
		graphicOne, err := graphic.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if graphicOne.ID == 0 {
			msg := "Permiso denegado"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina el Gráfico
		where := map[string]interface{}{graphicDB.KeyID: graphicOne.ID}
		numAffected, err = graphic.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.GuestUser {
		// Invitado
		// Acceso a las Gráficos de la sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID

		// Se obtiene el Gráfico para validar permisos de acceso
		graphicOne, err := graphic.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if graphicOne.ID == 0 {
			msg := "Permiso denegado"
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se elimina el Gráfico
		where := map[string]interface{}{graphicDB.KeyID: graphicOne.ID}
		numAffected, err = graphic.Remove(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del gráfico dinámico")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeDeleteDynamicGraphic
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se eliminó un gráfico dinámico")
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}
