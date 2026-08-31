package variabletimeout

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (VariableTimeout, error) {
	variableTimeout := VariableTimeout{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableTimeout.FindOne.Open: ", err)
		}

		return variableTimeout, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableTimeout.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM variable_timeouts"

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
			fmt.Println("Model.VariableTimeout.FindOne.Query: ", err)
		}

		return variableTimeout, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableTimeout.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	variableTimeouts := []VariableTimeout{}

	for rows.Next() {
		variableTimeout := VariableTimeout{}

		fields := []interface{}{
			&variableTimeout.ID,
			&variableTimeout.VariableID,
			&variableTimeout.ValueMin,
			&variableTimeout.ValueMax,
			&variableTimeout.ValueZeroMin,
			&variableTimeout.ValueZeroMax,
			&variableTimeout.IsInt,
			&variableTimeout.IsBool,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableTimeout.FindOne.Scan: ", err)
			}

			return variableTimeout, err
		}

		if variableTimeout.ID != 0 {
			variableTimeouts = append(variableTimeouts, variableTimeout)

		}
	}

	if len(variableTimeouts) == 0 {
		return variableTimeout, err
	}

	variableTimeout = variableTimeouts[0]

	return variableTimeout, err
}
