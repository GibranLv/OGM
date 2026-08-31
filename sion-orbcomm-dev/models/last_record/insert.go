package lastrecord

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (LastRecord, error) {
	lastRecord := LastRecord{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.Create.Open: ", err)
		}

		return lastRecord, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO last_records SET"

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
				fmt.Println("Model.LastRecord.Create.Prepare: ", err)
			}

			return lastRecord, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.LastRecord.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.Create.Exec: ", err)
			}

			return lastRecord, err
		}

		var lastRecordID int64
		lastRecordID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.Create.LastInsertId: ", err)
			}

			return lastRecord, err
		}

		query = "SELECT * FROM last_records WHERE id = ?"
		row := db.QueryRow(query, lastRecordID)

		fields := []interface{}{
			&lastRecord.ID,
			&lastRecord.VariableID,
			&lastRecord.IsCustom,
			&lastRecord.Value,
			&lastRecord.timestamp,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.Create.Scan: ", err)
			}

			return lastRecord, err
		}

		// filtro de Timestamp
		if lastRecord.timestamp.Valid {
			lastRecord.Timestamp = lastRecord.timestamp.Time
		}
	}

	return lastRecord, err
}
