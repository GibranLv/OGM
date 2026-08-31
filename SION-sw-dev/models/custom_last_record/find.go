package customlastrecord

import (
	"database/sql"
	"fmt"
)

// Find ...
func (m Model) Find() ([]CustomLastRecord, error) {
	customLastRecords := []CustomLastRecord{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomLastRecord.Find.Open: ", err)
		}

		return customLastRecords, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomLastRecord.Find.Close: ", err)
			}
		}
	}(db)

	var rows *sql.Rows

	query := "SELECT * FROM custom_last_records"

	rows, err = db.Query(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomLastRecord.Find.Query: ", err)
		}

		return customLastRecords, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomLastRecord.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		customLastRecord := CustomLastRecord{}

		fields := []interface{}{
			&customLastRecord.ID,
			&customLastRecord.VariableID,
			&customLastRecord.Value,
			&customLastRecord.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			// filtro de Timestamp
			if customLastRecord.timestamp.Valid {
				customLastRecord.Timestamp = customLastRecord.timestamp.Time
			}

			customLastRecords = append(customLastRecords, customLastRecord)

		} else {
			if m.Debug {
				fmt.Println("Model.CustomLastRecord.Find.Scan: ", err)
			}
		}
	}

	return customLastRecords, err
}
