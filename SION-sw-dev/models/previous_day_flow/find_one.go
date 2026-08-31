package previousdayflow

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (PreviousDayFlow, error) {
	variable := PreviousDayFlow{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.PreviousDayFlow.FindOne.Open: ", err)
		}

		return variable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.PreviousDayFlow.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM previous_day_flows"

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
			fmt.Println("Model.PreviousDayFlow.FindOne.Query: ", err)
		}

		return variable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.PreviousDayFlow.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	variables := []PreviousDayFlow{}

	for rows.Next() {
		variable := PreviousDayFlow{}

		fields := []interface{}{
			&variable.ID,
			&variable.VariableID,
			&variable.IsCustom,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.PreviousDayFlow.FindOne.Scan: ", err)
			}

			return variable, err
		}

		if variable.ID != 0 {
			variables = append(variables, variable)
		}
	}

	if len(variables) == 0 {
		return variable, err
	}

	variable = variables[0]

	return variable, err
}
