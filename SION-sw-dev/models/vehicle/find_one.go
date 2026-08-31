package vehicle

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Vehicle, error) {
	vehicle := Vehicle{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindOne.Open: ", err)
		}

		return vehicle, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT
							v.id, v.gps_device_id, v.alias, v.license_plates,
							v.description, v.responsible, v.note, v.status,
							v.created_at, v.updated_at,
							gd.imei AS gps_device,
							gd.latitude, gd.longitude, gd.speed,
							gd.updated_at AS timestamp
						FROM vehicles AS v
						LEFT JOIN gps_devices AS gd ON gd.id = v.gps_device_id`

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

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindOne.Query: ", err)
		}

		return vehicle, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	vehicles := []Vehicle{}

	for rows.Next() {
		vehicle := Vehicle{}

		fields := []interface{}{
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
				fmt.Println("Model.Vehicle.FindOne.Scan: ", err)
			}

			return vehicle, err
		}

		if vehicle.ID != 0 {
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

	if len(vehicles) == 0 {
		return vehicle, err
	}

	vehicle = vehicles[0]

	return vehicle, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (Vehicle, error) {
	vehicle := Vehicle{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindOneByUser.Open: ", err)
		}

		return vehicle, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
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
						WHERE v.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindOneByUser.Query: ", err)
		}

		return vehicle, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	vehicles := []Vehicle{}

	for rows.Next() {
		vehicle := Vehicle{}

		fields := []interface{}{
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
				fmt.Println("Model.Vehicle.FindOneByUser.Scan: ", err)
			}

			return vehicle, err
		}

		if vehicle.ID != 0 {
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

	if len(vehicles) == 0 {
		return vehicle, err
	}

	vehicle = vehicles[0]

	return vehicle, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (Vehicle, error) {
	vehicle := Vehicle{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindOneByUserOrLowerValue.Open: ", err)
		}

		return vehicle, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindOneByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT v.id, v.gps_device_id, v.alias, v.license_plates,
							v.description, v.responsible, v.note, v.status,
							v.created_at, v.updated_at,
							gd.imei AS gps_device,
							gd.latitude, gd.longitude, gd.speed,
							gd.updated_at AS timestamp
						FROM vehicles AS v
						LEFT JOIN gps_devices AS gd ON gd.id = v.gps_device_id
						LEFT JOIN users_vehicles AS uv ON v.id = uv.vehicle_id
						LEFT JOIN users AS u ON u.id = uv.user_id
						WHERE v.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.FindOneByUserOrLowerValue.Query: ", err)
		}

		return vehicle, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.FindOneByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	vehicles := []Vehicle{}

	for rows.Next() {
		vehicle := Vehicle{}

		fields := []interface{}{
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
				fmt.Println("Model.Vehicle.FindOneByUserOrLowerValue.Scan: ", err)
			}

			return vehicle, err
		}

		if vehicle.ID != 0 {
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

	if len(vehicles) == 0 {
		return vehicle, err
	}

	vehicle = vehicles[0]

	return vehicle, err
}
