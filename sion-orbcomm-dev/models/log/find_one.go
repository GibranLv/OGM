package log

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Log, error) {
	logOut := Log{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Log.FindOne.Open: ", err)
		}

		return logOut, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Log.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM logs"

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

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Log.FindOne.Query: ", err)
		}

		return logOut, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Log.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	logOuts := []Log{}

	for rows.Next() {
		logOut := Log{}

		fields := []interface{}{
			&logOut.ID,
			&logOut.VariableID,
			&logOut.Name,
			&logOut.TS,
			&logOut.timestamp,
			&logOut.IsTimeout,
		}

		err = rows.Scan(fields...)
		if err == nil {
			// filtro de Timestamp
			if logOut.timestamp.Valid {
				logOut.Timestamp = logOut.timestamp.Time
			}

			logOuts = append(logOuts, logOut)

		} else {
			if m.Debug {
				fmt.Println("Model.Log.FindOne.Scan: ", err)
			}
		}
	}

	if len(logOuts) > 0 {
		logOut = logOuts[0]
	}

	return logOut, err
}
