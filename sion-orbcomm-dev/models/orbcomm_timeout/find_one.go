package orbcommtimeout

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (OrbcommTimeout, error) {
	orbcommTimeout := OrbcommTimeout{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.OrbcommTimeout.FindOne.Open: ", err)
		}

		return orbcommTimeout, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommTimeout.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM orbcomm_timeouts"

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
			fmt.Println("Model.OrbcommTimeout.FindOne.Query: ", err)
		}

		return orbcommTimeout, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommTimeout.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	orbcommTimeouts := []OrbcommTimeout{}

	for rows.Next() {
		orbcommTimeout := OrbcommTimeout{}

		fields := []interface{}{
			&orbcommTimeout.ID,
			&orbcommTimeout.OrbcommID,
			&orbcommTimeout.IsTimeout,
			&orbcommTimeout.VariableID,
			&orbcommTimeout.IsZero,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommTimeout.FindOne.Scan: ", err)
			}

			return orbcommTimeout, err
		}

		if orbcommTimeout.ID != 0 {
			orbcommTimeouts = append(orbcommTimeouts, orbcommTimeout)

		}
	}

	if len(orbcommTimeouts) == 0 {
		return orbcommTimeout, err
	}

	orbcommTimeout = orbcommTimeouts[0]

	return orbcommTimeout, err
}
