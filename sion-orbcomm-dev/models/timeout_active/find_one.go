package timeoutactive

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (TimeoutActive, error) {
	timeout := TimeoutActive{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.TimeoutActive.FindOne.Open: ", err)
		}

		return timeout, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
        fmt.Println("Model.TimeoutActive.FindOne.Close: ", err)
			}
    }
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM timeout_actives"

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
			fmt.Println("Model.TimeoutActive.FindOne.Query: ", err)
		}

		return timeout, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.TimeoutActive.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	timeouts := []TimeoutActive{}

	for rows.Next() {
		timeout := TimeoutActive{}

		fields := []interface{}{
			&timeout.ID,
			&timeout.VariableID,
			&timeout.IsCustom,
			&timeout.Active,
			&timeout.timestamp,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.TimeoutActive.FindOne.Scan: ", err)
			}

			return timeout, err
		}

		if timeout.ID != 0 {
      if timeout.timestamp.Valid {
        timeout.Timestamp = timeout.timestamp.Time
      }

			timeouts = append(timeouts, timeout)
		}
	}

	if len(timeouts) == 0 {
		return timeout, err
	}

	timeout = timeouts[0]

	return timeout, err
}
