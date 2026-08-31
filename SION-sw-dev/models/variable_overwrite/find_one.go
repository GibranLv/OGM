package variableoverwrite

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (VariableOverwrite, error) {
	overwrite := VariableOverwrite{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableOverwrite.FindOne.Open: ", err)
		}

		return overwrite, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableOverwrite.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM variable_overwrites"

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
			fmt.Println("Model.VariableOverwrite.FindOne.Query: ", err)
		}

		return overwrite, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableOverwrite.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	overwrites := []VariableOverwrite{}

	for rows.Next() {
		overwrite := VariableOverwrite{}

		fields := []interface{}{
			&overwrite.ID,
			&overwrite.VariableID,
			&overwrite.ValueI,
			&overwrite.ValueF,
			&overwrite.Operator,
			&overwrite.Status,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableOverwrite.FindOne.Scan: ", err)
			}

			return overwrite, err
		}

		if overwrite.ID != 0 {
			overwrites = append(overwrites, overwrite)

		}
	}

	if len(overwrites) == 0 {
		return overwrite, err
	}

	overwrite = overwrites[0]

	return overwrite, err
}
