package vincremental

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (VariableIncremental, error) {
	vIncremental := VariableIncremental{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableIncremental.Create.Open: ", err)
		}

		return vIncremental, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableIncremental.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO variable_incrementals SET"

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
				fmt.Println("Model.VariableIncremental.Create.Prepare: ", err)
			}

			return vIncremental, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.VariableIncremental.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableIncremental.Create.Exec: ", err)
			}

			return vIncremental, err
		}

		var incrementalID int64
		incrementalID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableIncremental.Create.LastInsertId: ", err)
			}

			return vIncremental, err
		}

		query = "SELECT * FROM variable_incrementals WHERE id = ?"
		row := db.QueryRow(query, incrementalID)

		fields := []interface{}{
			&vIncremental.ID,
			&vIncremental.VariableID,
			&vIncremental.Value,
			&vIncremental.timestamp,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableIncremental.Create.Scan: ", err)
			}

			return vIncremental, err
		}

		// filtro de Timestamp
		if vIncremental.timestamp.Valid {
			vIncremental.Timestamp = vIncremental.timestamp.Time
		}
	}

	return vIncremental, err
}
