package customlastrecord

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (CustomLastRecord, error) {
	customLastRecord := CustomLastRecord{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomLastRecord.Create.Open: ", err)
		}

		return customLastRecord, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				if m.Debug {
					fmt.Println("Model.CustomLastRecord.Create.Close: ", err)
				}
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO custom_last_records SET"

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
				fmt.Println("Model.CustomLastRecord.Create.Prepare: ", err)
			}

			return customLastRecord, err
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
				fmt.Println("Model.CustomLastRecord.Create.Exec: ", err)
			}

			return customLastRecord, err
		}

		var customLastRecordID int64
		customLastRecordID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomLastRecord.Create.LastInsertId: ", err)
			}

			return customLastRecord, err
		}

		query = "SELECT * FROM custom_last_records WHERE id = ?"
		row := db.QueryRow(query, customLastRecordID)

		fields := []interface{}{
			&customLastRecord.ID,
			&customLastRecord.VariableID,
			&customLastRecord.Value,
			&customLastRecord.timestamp,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomLastRecord.Create.Scan: ", err)
			}

			return customLastRecord, err
		}

		// filtro de Timestamp
		if customLastRecord.timestamp.Valid {
			customLastRecord.Timestamp = customLastRecord.timestamp.Time
		}
	}

	return customLastRecord, err
}
