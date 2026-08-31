package vehicle

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	userVehicleDB "github.com/JamsMendez/SION-sw/models/user/vehicle"
	vehicleDB "github.com/JamsMendez/SION-sw/models/vehicle"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... !OK
func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemUser := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	if !isRoot && !isSystemUser && !isAdmin {
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

	where := map[string]interface{}{vehicleDB.KeyID: iID}
	vehicleOne, err := vehicle.FindOne(where)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vehicleOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del vehiculo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	vJSON := vehicleDB.Vehicle{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("vehicle.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("vehicle.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &vJSON); err != nil {
		fmt.Println("vehicle.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if vJSON.Alias != "" {
		values[vehicleDB.KeyAlias] = vJSON.Alias
	}

	if vJSON.LicensePlates != "" {
		values[vehicleDB.KeyLicensePlates] = vJSON.LicensePlates
	}

	if vJSON.Description != "" {
		values[vehicleDB.KeyDescription] = vJSON.Description
	}

	if vJSON.Responsible == "" {
		values[vehicleDB.KeyResponsible] = vJSON.Responsible
	}

	if vJSON.Note == "" {
		values[vehicleDB.KeyNote] = vJSON.Note
	}

	if vJSON.GPSDeviceID != 0 {
		if vJSON.GPSDeviceID == -1 {
			values[vehicleDB.KeyGPSDeviceID] = sql.NullInt64{}
		} else {
			values[vehicleDB.KeyGPSDeviceID] = vJSON.GPSDeviceID
		}
	}

	values[vehicleDB.KeyID] = iID
	values[vehicleDB.KeyUpdatedAt] = time.Now()

	vehicleOne, err = vehicle.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	resJSON := constants.ResJSON{Doc: vehicleOne}
	return c.JSON(http.StatusOK, resJSON)
}

// SION ... !OK
func updateVisibilityServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
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

	var vehicleOne vehicleDB.Vehicle

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.SystemAdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if isRoot || isSystemAdmin {
		where := map[string]interface{}{}
		vehicleOne, err = vehicle.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		vehicleOne, err = vehicle.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator || isGuest {
		i64 := int64(iID)
		userID := userSession.ID

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

	vJSON := vehicleDB.Vehicle{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("vehicle.updateServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("vehicle.updateServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &vJSON); err != nil {
		fmt.Println("vehicle.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	userVehicle := userVehicleDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{
		userVehicleDB.KeyUserID:    userSession.ID,
		userVehicleDB.KeyVehicleID: vehicleOne.ID,
	}

	userVehicles, err := userVehicle.Find(where)
	if err != nil {
		fmt.Println("vehicle.updateVisibilityServer.Find: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	var userVehicleOne userVehicleDB.UserVehicle

	size := len(userVehicles)
	if size == 0 {
		fmt.Println("vehicle.updateVisibilityServer.Find: results is 0")

		values := map[string]interface{}{}
		values[userVehicleDB.KeyUserID] = userSession.ID
		values[userVehicleDB.KeyVehicleID] = vehicleOne.ID
		values[userVehicleDB.KeyVisible] = vJSON.Visible

		userVehicleOne, err = userVehicle.Create(values)
		if err != nil {
			fmt.Println("vehicle.updateVisibilityServer.Create: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		userVehicleOne = userVehicles[0]

		fmt.Println(vJSON.Visible)

		values := map[string]interface{}{
			userVehicleDB.KeyID:      userVehicleOne.ID,
			userVehicleDB.KeyVisible: vJSON.Visible,
		}

		userVehicleOne, err = userVehicle.Update(values)
		if err != nil {
			fmt.Println("vehicle.updateVisibilityServer.Update: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	resJSON := constants.ResJSON{Doc: userVehicleOne}
	return c.JSON(http.StatusOK, resJSON)
}
