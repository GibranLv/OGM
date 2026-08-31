package timeout

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Timeout, error) {
	timeout := Timeout{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Timeout.FindOne.Open: ", err)
		}

		return timeout, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Timeout.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM timeouts"

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
			fmt.Println("Model.Timeout.FindOne.Query: ", err)
		}

		return timeout, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Timeout.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	timeouts := []Timeout{}

	for rows.Next() {
		timeout := Timeout{}

		fields := []interface{}{
			&timeout.ID,
			&timeout.OrbcommID,
			&timeout.Timeout,
			&timeout.Delay,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Timeout.FindOne.Scan: ", err)
			}

			return timeout, err
		}

		if timeout.ID != 0 {
			timeouts = append(timeouts, timeout)

		}
	}

	if len(timeouts) == 0 {
		return timeout, err
	}

	timeout = timeouts[0]

	return timeout, err
}
