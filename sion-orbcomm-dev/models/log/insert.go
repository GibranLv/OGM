package log

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Log, error) {
	logOut := Log{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Log.Create.Open: ", err)
		}

		return logOut, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Log.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO logs SET"

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
				fmt.Println("Model.Log.Create.Prepare: ", err)
			}

			return logOut, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Log.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Log.Create.Exec: ", err)
			}

			return logOut, err
		}

		var logOutID int64
		logOutID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Log.Create.LastInsertId: ", err)
			}

			return logOut, err
		}

		query = "SELECT * FROM logs WHERE id = ?"
		row := db.QueryRow(query, logOutID)

		fields := []interface{}{
			&logOut.ID,
			&logOut.VariableID,
			&logOut.Name,
			&logOut.TS,
			&logOut.timestamp,
			&logOut.IsTimeout,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.Log.Create.Scan: ", err)
			}

			return logOut, err
		}

		// filtro de Timestamp
		if logOut.timestamp.Valid {
			logOut.Timestamp = logOut.timestamp.Time
		}
	}

	return logOut, err
}
