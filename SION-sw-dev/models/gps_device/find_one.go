package gpsdevice

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (GPSDevice, error) {
	gpsDevice := GPSDevice{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSDevice.FindOne.Open: ", err)
		}

		return gpsDevice, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM gps_devices"

	lenWhere := len(where)
	if lenWhere > 0 {
		query = query + " WHERE"

		i := 1
		for k, v := range where {
			query = query + " " + k + " = ?"

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
			fmt.Println("Model.GPSDevice.FindOne.Query: ", err)
		}

		return gpsDevice, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	gpsDevices := []GPSDevice{}

	for rows.Next() {
		gpsDevice := GPSDevice{}

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

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.FindOne.Scan: ", err)
			}

			return gpsDevice, err
		}

		if gpsDevice.ID != 0 {
			// Filtro de CreatedAt
			if gpsDevice.createdAt.Valid {
				gpsDevice.CreatedAt = gpsDevice.createdAt.Time
			}

			// Filtro de UpdatedAt
			if gpsDevice.updatedAt.Valid {
				gpsDevice.UpdatedAt = gpsDevice.updatedAt.Time
			}

			gpsDevices = append(gpsDevices, gpsDevice)
		}
	}

	if len(gpsDevices) == 0 {
		return gpsDevice, err
	}

	gpsDevice = gpsDevices[0]

	return gpsDevice, err
}
