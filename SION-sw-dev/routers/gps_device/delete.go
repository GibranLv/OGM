package gpsDevice

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	gpsDeviceDB "github.com/JamsMendez/SION-sw/models/gps_device"
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
	isAdmin := userSession.Role == constants.AdminUser
	if !isRoot && !isSystemAdmin && !isAdmin {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(gpsDeviceDB.KeyID)
	if id == "" {
		return c.NoContent(http.StatusBadRequest)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	gpsDevice := gpsDeviceDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	vehicle := vehicleDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se busca si un vehiculo tiene el dispositivo GPS
	where := map[string]interface{}{vehicleDB.KeyGPSDeviceID: iID}
	vehicleOne, err := vehicle.FindOne(where)
	if err != nil {
		fmt.Println("gps_device.deleteServer.vehicle.FindOne: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	hasVehicle := vehicleOne.ID != 0
	if hasVehicle {
		values := map[string]interface{}{
			vehicleDB.KeyID:          vehicleOne.ID,
			vehicleDB.KeyGPSDeviceID: sql.NullString{},
		}

		_, err = vehicle.Update(values)
		if err != nil {
			fmt.Println("gps_device.deleteServer.vehicle.Update.NULL: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	var numAffected int64

	// Se elimina el dispositivo GPS
	where = map[string]interface{}{gpsDeviceDB.KeyID: iID}
	numAffected, err = gpsDevice.Remove(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if numAffected == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del dispositivo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	return c.NoContent(http.StatusOK)
}
