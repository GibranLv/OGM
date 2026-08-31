package vehicle

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	gpsRecordDB "github.com/JamsMendez/SION-sw/models/gps_record"
	userVehicleDB "github.com/JamsMendez/SION-sw/models/user/vehicle"
	vehicleDB "github.com/JamsMendez/SION-sw/models/vehicle"
	"github.com/JamsMendez/SION-sw/routers"
)

// SION ... !OK
func createServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	if !isRoot && !isSystemAdmin && isAdmin {
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	vJSON := vehicleDB.Vehicle{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("vehicle.createServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("vehicle.createServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &vJSON); err != nil {
		fmt.Println("vehicle.createServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if vJSON.Alias == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "alias")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vJSON.LicensePlates == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "placas")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vJSON.Description == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "descripción")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vJSON.Responsible == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "responsable")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vJSON.Note == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "nota")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vJSON.GPSDeviceID != 0 {
		values[vehicleDB.KeyGPSDeviceID] = vJSON.GPSDeviceID
	}

	now := time.Now()

	values[vehicleDB.KeyAlias] = vJSON.Alias
	values[vehicleDB.KeyLicensePlates] = vJSON.LicensePlates
	values[vehicleDB.KeyDescription] = vJSON.Description
	values[vehicleDB.KeyResponsible] = vJSON.Responsible
	values[vehicleDB.KeyNote] = vJSON.Note
	values[vehicleDB.KeyStatus] = vJSON.Status
	values[vehicleDB.KeyCreatedAt] = now
	values[vehicleDB.KeyUpdatedAt] = now

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

	// Se crea la Unidad
	vehicleOne, err := vehicle.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if vehicleOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del vehiculo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values = map[string]interface{}{
		userVehicleDB.KeyUserID:    userSession.ID,
		userVehicleDB.KeyVehicleID: vehicleOne.ID,
	}

	// Se relaciona la Unidad con el usuario
	_, err = userVehicle.Create(values)
	if err != nil {
		fmt.Println("vehicle.createServer.userVehicle.Create: ", err)

		// Si ocurrió un error al crear la relación de elimina la Unidad
		// que fue creada.
		where := map[string]interface{}{vehicleDB.KeyID: vehicleOne.ID}
		_, err := vehicle.Remove(where)
		if err != nil {
			fmt.Println("vehicle.createServer.vehicle.Remove: ", err)
		}

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	resJSON := constants.ResJSON{Doc: vehicleOne}
	return c.JSON(http.StatusCreated, resJSON)
}

// SION ... !OK
func getPointsServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	vJSON := reqPoints{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("vehicle.createServer.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("vehicle.createServer.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &vJSON); err != nil {
		fmt.Println("vehicle.createServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID := vJSON.VehicleID

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
			Acceso a cualquier Vehicle de un usuario con role de valor inferior
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

	gpsRecord := gpsRecordDB.Model{
		UserDB: constants.DB.UserGPSRecords,
		PwdDB:  constants.DB.PwdGPSRecords,
		NameDB: constants.DB.NameGPSRecords,
		Host:   constants.DB.HostGPSRecords,
		Port:   constants.DB.PortGPSRecords,
		Debug:  true,
	}

	table := fmt.Sprintf("D_%s", vehicleOne.GPSDevice)

	records, err := gpsRecord.Find(table, vJSON.StartDate, vJSON.FinalDate, vJSON.Mode)
	if err != nil {
		fmt.Println("gpsRecord.Find", table, vJSON, err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	res := constants.ResJSONs{
		Docs: records,
	}

	return c.JSON(http.StatusOK, res)
}
