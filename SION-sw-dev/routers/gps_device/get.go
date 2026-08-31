package gpsDevice

import (
	"fmt"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	gpsDeviceDB "github.com/JamsMendez/SION-sw/models/gps_device"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

// SION ... !OK
func getOrListServer(c echo.Context) error {
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

	if id == constants.ListParam {
		gpsDevice := gpsDeviceDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		where := map[string]interface{}{}
		gpsDevices, err := gpsDevice.Find(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		resJSON := constants.ResJSONs{Docs: gpsDevices}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	gpsDevice := gpsDeviceDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var gpsDeviceOne gpsDeviceDB.GPSDevice

	where := map[string]interface{}{gpsDeviceDB.KeyID: iID}
	gpsDeviceOne, err = gpsDevice.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if gpsDeviceOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del dispositivo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	resJSON := constants.ResJSON{Doc: gpsDeviceOne}
	return c.JSON(http.StatusOK, resJSON)
}
