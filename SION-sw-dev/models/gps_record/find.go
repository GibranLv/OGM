package gpsrecord

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

// Find ...
func (m *Model) Find(table, start, final string, mode uint8) ([]Record, error) {
	records := []Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSRecord.Find.Open: ", err)
		}

		return records, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				if m.Debug {
					fmt.Println("Model.GPSRecord.Find.Close: ", err)
				}

			}
		}
	}(db)

	var rows *sql.Rows

	query := "SELECT * FROM %s WHERE timestamp >= ? AND timestamp < ?"

	if mode == ModeSpeedGtZero {
		query = query + " AND speed > 0;"
	}

	query = fmt.Sprintf(query, table)

	rows, err = db.Query(query, start, final)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSRecord.Find.Query: ", err)
		}

		return records, err
	}

	for rows.Next() {
		record := Record{}

		fields := []interface{}{
			&record.ID,
			&record.Latitude,
			&record.Longitude,
			&record.Speed,
			&record.timestamp,
			&record.value,
		}

		err = rows.Scan(fields...)
		if err == nil {
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

			records = append(records, record)

		} else {
			if m.Debug {
				fmt.Println("Model.GPSRecord.Find.Scan: ", err)
			}
		}
	}

	return records, err
}
