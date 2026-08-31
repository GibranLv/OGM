package vincremental

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (VariableIncremental, error) {
	incremental := VariableIncremental{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableIncremental.FindOne.Open: ", err)
		}

		return incremental, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableIncremental.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM variable_incrementals"

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
			fmt.Println("Model.VariableIncremental.FindOne.Query: ", err)
		}

		return incremental, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableIncremental.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	incrementals := []VariableIncremental{}

	for rows.Next() {
		incremental := VariableIncremental{}

		fields := []interface{}{
			&incremental.ID,
			&incremental.VariableID,
			&incremental.Value,
			&incremental.timestamp,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableIncremental.FindOne.Scan: ", err)
			}

			return incremental, err
		}

		if incremental.ID != 0 {
			// filtro de Timestamp
			if incremental.timestamp.Valid {
				incremental.Timestamp = incremental.timestamp.Time
			}

			incrementals = append(incrementals, incremental)

		}
	}

	if len(incrementals) == 0 {
		return incremental, err
	}

	incremental = incrementals[0]

	return incremental, err
}
