package vehicle

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	userVehicleDB "github.com/JamsMendez/SION-sw/models/user/vehicle"
	vehicleDB "github.com/JamsMendez/SION-sw/models/vehicle"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... !OK
func deleteServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.SystemAdminUser

	isntAdmins := !isRoot && !isSystemAdmin && !isAdmin

	if isntAdmins {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(vehicleDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
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

	userVehicle := userVehicleDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var vehicleOne vehicleDB.Vehicle

	if isRoot || isSystemAdmin {
		/*
			Acceso a cualquier vehiculo
		*/
		where := map[string]interface{}{vehicleDB.KeyID: iID}
		vehicleOne, err = vehicle.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if vehicleOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "del vehiculo")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		// Se eliminan las relaciones usuario y vehiculo
		where = map[string]interface{}{userVehicleDB.KeyVehicleID: iID}
		_, err = userVehicle.Remove(where)
		if err != nil {
			fmt.Println("vehicle.deleteServer.userVehicle.Remove: ", err)
		}

	} else if isAdmin {
		/*
			Acceso a los vehiculos de los usuarios con menor valor
			a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		// Se obtiene el vehiculo para validar permisos de acceso
		vehicleOne, err := vehicle.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if vehicleOne.ID == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		where := map[string]interface{}{userVehicleDB.KeyVehicleID: vehicleOne.ID}
		_, err = userVehicle.Remove(where)
		if err != nil {
			fmt.Println("vehicle.deleteServer.userVehicle.Remove: ", err)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	where := map[string]interface{}{vehicleDB.KeyID: iID}
	numAffected, err := vehicle.Remove(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del vehiculo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	/*
		// Registro del Evento
		typeIn := constants.TypeDeleteVehicle
		ui8 := uint8(typeIn)
		message := fmt.Sprintf("Se elimino el vehiculo %s", vehicleOne.Alias)
		util.InsertLogEvent(userSession.ID, ui8, message)
	*/

	return c.NoContent(http.StatusOK)
}
