package gpsdevice

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]GPSDevice, error) {
	gpsDevices := []GPSDevice{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSDevice.Find.Open: ", err)
		}

		return gpsDevices, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM gps_devices"

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
			query = query + " " + k + " = ?"

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
			query = query + " AND id > ?"
		} else {
			query = query + " WHERE id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY id " + orderByValue
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSDevice.Find.Query: ", err)
		}

		return gpsDevices, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.Find.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		gpsDevice := GPSDevice{}

		fields = []interface{}{
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
				fmt.Println("Model.GPSDevice.Find.Scan: ", err)
			}

		} else {
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

	return gpsDevices, err
}

// Find ...
func (m Model) FindUsers(where map[string]interface{}) ([]GPSDevice, error) {
	gpsDevices := []GPSDevice{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSDevice.Find.Open: ", err)
		}

		return gpsDevices, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM gps_devices"

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
			query = query + " " + k + " = ?"

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
			query = query + " AND id > ?"
		} else {
			query = query + " WHERE id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY id " + orderByValue
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSDevice.Find.Query: ", err)
		}

		return gpsDevices, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSDevice.Find.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		gpsDevice := GPSDevice{}

		fields = []interface{}{
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
				fmt.Println("Model.GPSDevice.Find.Scan: ", err)
			}

		} else {
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

	return gpsDevices, err
}
