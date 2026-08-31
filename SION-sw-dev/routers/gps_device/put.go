package gpsDevice

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	gpsDeviceDB "github.com/JamsMendez/SION-sw/models/gps_device"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... !OK
func updateServer(c echo.Context) error {
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
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
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

	gJSON := gpsDeviceDB.GPSDevice{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("gpsDevice.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("gpsDevice.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &gJSON); err != nil {
		fmt.Println("gpsDevice.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if gJSON.IMEI != "" {
		values[gpsDeviceDB.KeyIMEI] = gJSON.IMEI
	}

	if gJSON.PhoneNumber != "" {
		values[gpsDeviceDB.KeyPhoneNumber] = gJSON.PhoneNumber
	}

	values[gpsDeviceDB.KeyID] = iID
	values[gpsDeviceDB.KeyIMEI] = gJSON.IMEI
	values[gpsDeviceDB.KeyPhoneNumber] = gJSON.PhoneNumber
	values[gpsDeviceDB.KeyUpdatedAt] = time.Now()

	gpsDeviceOne, err := gpsDevice.Update(values)
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
