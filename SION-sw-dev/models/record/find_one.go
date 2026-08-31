package record

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

// FindOneLast ...
func (m *Model) FindOneLast(table string) (Record, error) {
	recordOne := Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.Find.Open: ", err)
		}

		return recordOne, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.Find.Close: ", err)
			}
		}
	}(db)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.Find.Open: ", err)
		}

		return recordOne, err
	}

	var rows *sql.Rows

	query := fmt.Sprintf("SELECT * FROM %s ORDER BY timestamp DESC LIMIT 1;", table)

	rows, err = db.Query(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.Find.Query: ", err)
		}

		return recordOne, err
	}

	for rows.Next() {
		fields := []interface{}{
			&recordOne.ID,
			&recordOne.value,
			&recordOne.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {

			// filtro de Value
			if recordOne.value.Valid {
				recordOne.Value = recordOne.value.Float64
			}

			// filtro de Timestamp
			if recordOne.timestamp.Valid {
				recordOne.Timestamp = recordOne.timestamp.Time

				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					recordOne.TimestampString = recordOne.Timestamp.In(location).Format(constants.DateTimeFormat)
				}
			}

		} else {
			if m.Debug {
				fmt.Println("Model.Record.Find.Scan: ", err)
			}
		}
	}

	return recordOne, err
}

