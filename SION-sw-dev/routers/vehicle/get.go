package vehicle

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	vehicleDB "github.com/JamsMendez/SION-sw/models/vehicle"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... !OK
func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(vehicleDB.KeyID)

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if id == constants.ListParam {

		vehicle := vehicleDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var vehicles []vehicleDB.Vehicle
		var err error

		if isRoot || isSystemAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)

			if userIDValue != "" {
				// Acceso a todas las vehiculos de todos los usuarios
				var userID int64

				if userIDValue == constants.SelfValue {
					userID = userSession.ID

				} else {
					vInt, err := routers.ParseInt(userIDValue)
					if err != nil {
						msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
						return c.JSON(http.StatusAccepted, msgJSON)
					}

					userID = int64(vInt)
				}

				vehicles, err = vehicle.FindByUser(userID)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Acceso a todos los vehiculos
				where := map[string]interface{}{}
				vehicles, err = vehicle.Find(where)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isAdmin {
			userIDValue := c.QueryParam(constants.UserIDQuery)

			if userIDValue != "" {
				/*
					Acceso a todas las vehiculos del usuario
					que tenga menor valor a la sesión del usuario
				*/
				var userID int64

				if userIDValue == constants.SelfValue {
					userID = userSession.ID

				} else {
					vInt, err := routers.ParseInt(userIDValue)
					if err != nil {
						msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
						return c.JSON(http.StatusAccepted, msgJSON)
					}

					userID = int64(vInt)
				}

				value := userSession.Value

				vehicles, err = vehicle.FindByUserAndLowerValue(userID, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				/*
					Acceso a todas las vehiculos de los usuarios
					con menor valor a la sesión del usuario
				*/
				userID := userSession.ID
				value := userSession.Value

				vehicles, err = vehicle.FindByUserOrLowerValue(userID, value)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if isOperator || isGuest {
			// Acceso a todas las vehiculos de la sesión del usuario
			vehicles, err = vehicle.FindByUser(userSession.ID)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		resJSON := constants.ResJSONs{Docs: vehicles}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	vehicle := vehicleDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var vehicleOne vehicleDB.Vehicle

	if isRoot || isSystemAdmin {
		// Acceso a cualquier vehicle
		where := map[string]interface{}{vehicleDB.KeyID: iID}
		vehicleOne, err = vehicle.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a cualquier vehicle de un usuario con menor valor
			a la sesión del usuario
		*/
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)

		vehicleOne, err = vehicle.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		/*
			Acceso a cualquier vehicle de un usuario con menor valor
			a la sesión del usuario
		*/
		userID := userSession.ID
		i64 := int64(iID)

		vehicleOne, err = vehicle.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vehicleOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del vehiculo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	resJSON := constants.ResJSON{Doc: vehicleOne}
	return c.JSON(http.StatusOK, resJSON)
}
