package vehicle

import (
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]Vehicle, error) {
	vehicles := []Vehicle{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.Find.Open: ", err)
		}

		return vehicles, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT v.id, v.gps_device_id, v.alias, v.license_plates,
							v.description, v.responsible, v.note, v.status,
							v.created_at, v.updated_at,
							gd.imei AS gps_device,
							gd.latitude, gd.longitude, gd.speed,
							gd.updated_at AS timestamp
						FROM vehicles AS v
						LEFT JOIN gps_devices AS gd ON gd.id = v.gps_device_id`

	orderByValue := ""
	if v, ok := where[models.OrderBy]; ok {
		order, isString := v.(string)
		if isString {
			orderByValue = order
			delete(where, models.OrderBy)
		}
	}

	limitValue := 0
	if v, ok := where[models.Limit]; ok {
		limit, isInt := v.(int)
		if isInt {
			if limit > 0 {
				limitValue = limit
				delete(where, models.Limit)
			}
		}
	}

	iniValue := 0
	if v, ok := where[models.Ini]; ok {
		ini, isInt := v.(int)
		if isInt {
			if ini > 0 {
				iniValue = ini
				delete(where, models.Ini)
			}
		}
	}

	lenWhere := len(where)
	if lenWhere > 0 {
		query = query + " WHERE"

		i := 1
		for k, v := range where {
			query = query + " v." + k + " = ?"

			if i < lenWhere {
				query = query + " AND "
			}

			params = append(params, v)
			i = i + 1
		}
	}

	if iniValue > 0 {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND v.id > ?"
		} else {
			query = query + " WHERE v.id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY v.id " + orderByValue
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.Find.Query: ", err)
		}

		return vehicles, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		vehicle := Vehicle{}

		fields = []interface{}{
			&vehicle.ID,
			&vehicle.gpsDeviceID,
			&vehicle.Alias,
			&vehicle.LicensePlates,
			&vehicle.Description,
			&vehicle.Responsible,
			&vehicle.Note,
			&vehicle.Status,
			&vehicle.createdAt,
			&vehicle.updatedAt,
			&vehicle.gpsDevice,
			&vehicle.latitude,
			&vehicle.longitude,
			&vehicle.speed,
			&vehicle.timestamp,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.Find.Scan: ", err)
			}

		} else {
			// Filtro de GPSDeviceID
			if vehicle.gpsDeviceID.Valid {
				vehicle.GPSDeviceID = vehicle.gpsDeviceID.Int64
			}

			// Filtro de GPSDevice
			if vehicle.gpsDevice.Valid {
				vehicle.GPSDevice = vehicle.gpsDevice.String
			}

			// Filtro de Latitude
			if vehicle.latitude.Valid {
				vehicle.Latitude = vehicle.latitude.Float64
			}

			// Filtro de Longitude
			if vehicle.longitude.Valid {
				vehicle.Longitude = vehicle.longitude.Float64
			}

			// Filtro de Speed
			if vehicle.speed.Valid {
				vehicle.Speed = vehicle.speed.Float64
			}

			// Filtro de Timestamp
			if vehicle.timestamp.Valid {
				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					vehicle.Timestamp = vehicle.timestamp.Time.In(location).Format(constants.DateTimeFormat)
				}
			}

			// Filtro de CreatedAt
			if vehicle.createdAt.Valid {
				vehicle.CreatedAt = vehicle.createdAt.Time
			}

			// Filtro de UpdatedAt
			if vehicle.updatedAt.Valid {
				vehicle.UpdatedAt = vehicle.updatedAt.Time
			}

			vehicles = append(vehicles, vehicle)
		}
	}

	return vehicles, err
}

// FindByUser ...
func (m Model) FindByUser(userID int64) ([]Vehicle, error) {
	vehicles := []Vehicle{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindByUser.Open: ", err)
		}

		return vehicles, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindByUser.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT
							v.id, v.gps_device_id, v.alias, v.license_plates,
							v.description, v.responsible, v.note, v.status,
							v.created_at, v.updated_at,
							gd.imei AS gps_device,
							uv.visible,
							gd.latitude, gd.longitude, gd.speed,
							gd.updated_at AS timestamp
						FROM vehicles AS v
						LEFT JOIN gps_devices AS gd ON gd.id = v.gps_device_id
						LEFT JOIN users_vehicles AS uv ON v.id = uv.vehicle_id
						WHERE uv.user_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindByUser.Query: ", err)
		}

		return vehicles, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		vehicle := Vehicle{}

		fields = []interface{}{
			&vehicle.ID,
			&vehicle.gpsDeviceID,
			&vehicle.Alias,
			&vehicle.LicensePlates,
			&vehicle.Description,
			&vehicle.Responsible,
			&vehicle.Note,
			&vehicle.Status,
			&vehicle.createdAt,
			&vehicle.updatedAt,
			&vehicle.gpsDevice,
			&vehicle.visible,
			&vehicle.latitude,
			&vehicle.longitude,
			&vehicle.speed,
			&vehicle.timestamp,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindByUser.Scan: ", err)
			}

		} else {
			// Filtro de GPSDeviceID
			if vehicle.gpsDeviceID.Valid {
				vehicle.GPSDeviceID = vehicle.gpsDeviceID.Int64
			}

			// Filtro de GPSDevice
			if vehicle.gpsDevice.Valid {
				vehicle.GPSDevice = vehicle.gpsDevice.String
			}

			// Filtro de Visible
			if vehicle.visible.Valid {
				vehicle.Visible = vehicle.visible.Bool
			}

			// Filtro de Latitude
			if vehicle.latitude.Valid {
				vehicle.Latitude = vehicle.latitude.Float64
			}

			// Filtro de Longitude
			if vehicle.longitude.Valid {
				vehicle.Longitude = vehicle.longitude.Float64
			}

			// Filtro de Speed
			if vehicle.speed.Valid {
				vehicle.Speed = vehicle.speed.Float64
			}

			// Filtro de Timestamp
			if vehicle.timestamp.Valid {
				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					vehicle.Timestamp = vehicle.timestamp.Time.In(location).Format(constants.DateTimeFormat)
				}
			}

			// Filtro de CreatedAt
			if vehicle.createdAt.Valid {
				vehicle.CreatedAt = vehicle.createdAt.Time
			}

			// Filtro de UpdatedAt
			if vehicle.updatedAt.Valid {
				vehicle.UpdatedAt = vehicle.updatedAt.Time
			}

			vehicles = append(vehicles, vehicle)
		}
	}

	return vehicles, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(userID int64, value uint8) ([]Vehicle, error) {
	vehicles := []Vehicle{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindByUserOrLowerValue.Open: ", err)
		}

		return vehicles, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
							v.id, v.gps_device_id, v.alias, v.license_plates,
							v.description, v.responsible, v.note, v.status,
							v.created_at, v.updated_at,
							gd.imei AS gps_device,
							gd.latitude, gd.longitude, gd.speed,
							gd.updated_at AS timestamp
						FROM vehicles AS v
						LEFT JOIN gps_devices AS gd ON gd.id = v.gps_device_id
						LEFT JOIN users_vehicles AS uu ON v.id = uu.vehicle_id
						LEFT JOIN users AS u ON u.id = uu.user_id
						WHERE u.id = ? OR u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindByUserOrLowerValue.Query: ", err)
		}

		return vehicles, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		vehicle := Vehicle{}

		fields = []interface{}{
			&vehicle.ID,
			&vehicle.gpsDeviceID,
			&vehicle.Alias,
			&vehicle.LicensePlates,
			&vehicle.Description,
			&vehicle.Responsible,
			&vehicle.Note,
			&vehicle.Status,
			&vehicle.createdAt,
			&vehicle.updatedAt,
			&vehicle.gpsDevice,
			&vehicle.latitude,
			&vehicle.longitude,
			&vehicle.speed,
			&vehicle.timestamp,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindByUserOrLowerValue.Scan: ", err)
			}

		} else {
			// Filtro de GPSDeviceID
			if vehicle.gpsDeviceID.Valid {
				vehicle.GPSDeviceID = vehicle.gpsDeviceID.Int64
			}

			// Filtro de GPSDevice
			if vehicle.gpsDevice.Valid {
				vehicle.GPSDevice = vehicle.gpsDevice.String
			}

			// Filtro de Latitude
			if vehicle.latitude.Valid {
				vehicle.Latitude = vehicle.latitude.Float64
			}

			// Filtro de Longitude
			if vehicle.longitude.Valid {
				vehicle.Longitude = vehicle.longitude.Float64
			}

			// Filtro de Speed
			if vehicle.speed.Valid {
				vehicle.Speed = vehicle.speed.Float64
			}

			// Filtro de Timestamp
			if vehicle.timestamp.Valid {
				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					vehicle.Timestamp = vehicle.timestamp.Time.In(location).Format(constants.DateTimeFormat)
				}
			}

			// Filtro de CreatedAt
			if vehicle.createdAt.Valid {
				vehicle.CreatedAt = vehicle.createdAt.Time
			}

			// Filtro de UpdatedAt
			if vehicle.updatedAt.Valid {
				vehicle.UpdatedAt = vehicle.updatedAt.Time
			}

			vehicles = append(vehicles, vehicle)
		}
	}

	return vehicles, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(userID int64, value uint8) ([]Vehicle, error) {
	vehicles := []Vehicle{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindByUserAndLowerValue.Open: ", err)
		}

		return vehicles, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
							v.id, v.gps_device_id, v.alias, v.license_plates,
							v.description, v.responsible, v.note, v.status,
							v.created_at, v.updated_at,
							gd.imei AS gps_device,
							gd.latitude, gd.longitude, gd.speed,
							gd.updated_at AS timestamp
						FROM vehicles AS v
						LEFT JOIN gps_devices AS gd ON gd.id = v.gps_device_id
						LEFT JOIN users_vehicles AS uv ON v.id = uv.vehicle_id
						LEFT JOIN users AS u ON u.id = uv.user_id
						WHERE u.id = ? AND u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindByUserAndLowerValue.Query: ", err)
		}

		return vehicles, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		vehicle := Vehicle{}

		fields = []interface{}{
			&vehicle.ID,
			&vehicle.gpsDeviceID,
			&vehicle.Alias,
			&vehicle.LicensePlates,
			&vehicle.Description,
			&vehicle.Responsible,
			&vehicle.Note,
			&vehicle.Status,
			&vehicle.createdAt,
			&vehicle.updatedAt,
			&vehicle.GPSDevice,
			&vehicle.latitude,
			&vehicle.longitude,
			&vehicle.speed,
			&vehicle.timestamp,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {
			// Filtro de GPSDeviceID
			if vehicle.gpsDeviceID.Valid {
				vehicle.GPSDeviceID = vehicle.gpsDeviceID.Int64
			}

			// Filtro de CreatedAt
			if vehicle.createdAt.Valid {
				vehicle.CreatedAt = vehicle.createdAt.Time
			}

			// Filtro de Latitude
			if vehicle.latitude.Valid {
				vehicle.Latitude = vehicle.latitude.Float64
			}

			// Filtro de Longitude
			if vehicle.longitude.Valid {
				vehicle.Longitude = vehicle.longitude.Float64
			}

			// Filtro de Speed
			if vehicle.speed.Valid {
				vehicle.Speed = vehicle.speed.Float64
			}

			// Filtro de Timestamp
			if vehicle.timestamp.Valid {
				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					vehicle.Timestamp = vehicle.timestamp.Time.In(location).Format(constants.DateTimeFormat)
				}
			}

			// Filtro de UpdatedAt
			if vehicle.updatedAt.Valid {
				vehicle.UpdatedAt = vehicle.updatedAt.Time
			}

			vehicles = append(vehicles, vehicle)
		}
	}

	return vehicles, err
}
