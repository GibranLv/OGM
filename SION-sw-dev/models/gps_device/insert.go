package gpsdevice

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (GPSDevice, error) {
	gpsDevice := GPSDevice{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSDevice.Create.Open: ", err)
		}

		return gpsDevice, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO gps_devices SET"

		i := 0
		for k, v := range values {
			params = append(params, v)

			if i == 0 {
				query = query + " " + k + " = ?"
				i = i + 1
			} else {
				query = query + ", " + k + " = ?"
			}
		}

		stmt, err = db.Prepare(query)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.Create.Prepare: ", err)
			}

			return gpsDevice, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				fmt.Println("stmt.Error: ", err)
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.Create.Exec: ", err)
			}

			return gpsDevice, err
		}

		var gpsDeviceID int64
		gpsDeviceID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.Create.LastInsertId: ", err)
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
				fmt.Println("Model.GPSDevice.Create.Scan: ", err)
			}

			return gpsDevice, err
		}
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
