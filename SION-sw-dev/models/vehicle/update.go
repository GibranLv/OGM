package vehicle

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Vehicle, error) {
	vehicle := Vehicle{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.Update.Open: ", err)
		}

		return vehicle, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.Vehicle.Update.Values: ", err)
		}

		return vehicle, err
	}

	var stmt *sql.Stmt

	query := "UPDATE vehicles SET {{fields}} WHERE id = ?"

	i := 0
	for k, v := range values {
		isID := k == KeyID
		if !isID {
			params = append(params, v)

			if i == 0 {
				fieldsIn = fieldsIn + " " + k + " = ?"
				i = i + 1
			} else {
				fieldsIn = fieldsIn + ", " + k + " = ?"
			}
		}
	}

	query = strings.Replace(query, "{{fields}}", fieldsIn, 1)

	vehicleID := values[KeyID]
	params = append(params, vehicleID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.Update.Prepare: ", err)
		}

		return vehicle, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Vehicle.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.Update.Exec: ", err)
		}

		return vehicle, err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.Update.RowsAffected: ", err)
		}

		return vehicle, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.Vehicle.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = `SELECT
							v.id, v.gps_device_id, v.alias, v.license_plates,
							v.description, v.responsible, v.note, v.status,
							v.created_at, v.updated_at, gd.imei AS gps_device
						FROM vehicles AS v
						LEFT JOIN gps_devices AS gd ON gd.id = v.gps_device_id
						WHERE v.id = ?`

	row := db.QueryRow(query, vehicleID)

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
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Vehicle.Update.Scan: ", err)
		}

		return vehicle, err
	}

	// Filtro de GPSDeviceID
	if vehicle.gpsDeviceID.Valid {
		vehicle.GPSDeviceID = vehicle.gpsDeviceID.Int64
	}

	// Filtro de GPSDevice
	if vehicle.gpsDevice.Valid {
		vehicle.GPSDevice = vehicle.gpsDevice.String
	}

	// Filtro de CreatedAt
	if vehicle.createdAt.Valid {
		vehicle.CreatedAt = vehicle.createdAt.Time
	}

	// Filtro de UpdatedAt
	if vehicle.updatedAt.Valid {
		vehicle.UpdatedAt = vehicle.updatedAt.Time
	}

	return vehicle, err
}
