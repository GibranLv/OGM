package gpsrecord

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

// Create ...
func (m Model) Create(table string, values map[string]interface{}) (Record, error) {
	record := Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSRecord.Create.Open: ", err)
		}

		return record, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				if m.Debug {
					fmt.Println("Model.GPSRecord.Create.Close: ", err)
				}
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := fmt.Sprintf("INSERT INTO %s SET ", table)

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
				fmt.Println("Model.GPSRecord.Create.Prepare: ", err)
			}

			return record, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("stmt.Error: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSRecord.Create.Exec: ", err)
			}

			return record, err
		}

		var recordID int64
		recordID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSRecord.Create.LastInsertId: ", err)
			}

			return record, err
		}

		query = fmt.Sprintf("SELECT * FROM %s WHERE id = ?", table)
		row := db.QueryRow(query, recordID)

		fields := []interface{}{
			&record.ID,
			&record.Latitude,
			&record.Longitude,
			&record.Speed,
			&record.timestamp,
			&record.Value,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSRecord.Create.Scan: ", err)
			}

			return record, err
		}

		// filtro de Timestamp
		if record.timestamp.Valid {
			record.Timestamp = record.timestamp.Time

			location, err := time.LoadLocation(constants.TZ)
			if err != nil {
				location = time.Local
			}

			record.TimestampString = record.Timestamp.In(location).Format(constants.DateTimeFormat)
		}

		// filtro de Value
		if record.value.Valid {
			record.Value = record.value.Int64
		}
	}

	return record, err
}
