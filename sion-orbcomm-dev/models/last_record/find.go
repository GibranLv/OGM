package lastrecord

import (
	"database/sql"
	"fmt"
)

// Find ...
func (m Model) Find() ([]LastRecord, error) {
	lastRecords := []LastRecord{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.Find.Open: ", err)
		}

		return lastRecords, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.Find.Close: ", err)
			}
		}
	}(db)

	var rows *sql.Rows

	query := "SELECT * FROM last_records"

	rows, err = db.Query(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.Find.Query: ", err)
		}

		return lastRecords, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		lastRecord := LastRecord{}

		fields := []interface{}{
			&lastRecord.ID,
			&lastRecord.VariableID,
			&lastRecord.IsCustom,
			&lastRecord.Value,
			&lastRecord.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			// filtro de Timestamp
			if lastRecord.timestamp.Valid {
				lastRecord.Timestamp = lastRecord.timestamp.Time
			}

			lastRecords = append(lastRecords, lastRecord)

		} else {
			if m.Debug {
				fmt.Println("Model.LastRecord.Find.Scan: ", err)
			}
		}
	}

	return lastRecords, err
}
