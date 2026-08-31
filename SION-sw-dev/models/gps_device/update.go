package gpsdevice

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (GPSDevice, error) {
	gpsDevice := GPSDevice{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSDevice.Update.Open: ", err)
		}

		return gpsDevice, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.GPSDevice.Update.Values: ", err)
		}

		return gpsDevice, err
	}

	var stmt *sql.Stmt

	query := "UPDATE gps_devices SET {{fields}} WHERE id = ?"

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

	gpsDeviceID := values[KeyID]
	params = append(params, gpsDeviceID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSDevice.Update.Prepare: ", err)
		}

		return gpsDevice, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSDevice.Update.Exec: ", err)
		}

		return gpsDevice, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSDevice.Update.RowsAffected: ", err)	
		}

		return gpsDevice, err
	}

	query = "SELECT * FROM gps_devices WHERE id = ?"
	row := db.QueryRow(query, gpsDeviceID)

	fields := []interface{}{
		&gpsDevice.ID,
		&gpsDevice.IMEI,
		&gpsDevice.PhoneNumber,
		&gpsDevice.Latitude,
		&gpsDevice.Longitude,
		&gpsDevice.Speed,
		&gpsDevice.Status,
		&gpsDevice.createdAt,
		&gpsDevice.updatedAt,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSDevice.Update.Scan: ", err)	
		}

		return gpsDevice, err
	}

	// Filtro de CreatedAt
	if gpsDevice.createdAt.Valid {
		gpsDevice.CreatedAt = gpsDevice.createdAt.Time
	}

	// Filtro de UpdatedAt
	if gpsDevice.updatedAt.Valid {
		gpsDevice.UpdatedAt = gpsDevice.updatedAt.Time
	}

	return gpsDevice, err
}
