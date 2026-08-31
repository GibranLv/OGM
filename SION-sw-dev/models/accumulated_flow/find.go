package previousdayflow

import (
	"database/sql"
	"fmt"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]AccumulatedFlow, error) {
	variables := []AccumulatedFlow{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.AccumulatedFlow.FindOne.Open: ", err)
		}

		return variables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.AccumulatedFlow.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM accumulated_flows"

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
			fmt.Println("Model.AccumulatedFlow.FindOne.Query: ", err)
		}

		return variables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.AccumulatedFlow.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		variable := AccumulatedFlow{}

		fields := []interface{}{
			&variable.ID,
			&variable.VariableID,
			&variable.IsCustom,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.AccumulatedFlow.FindOne.Scan: ", err)
			}

			return variables, err
		}

		if variable.ID != 0 {
			variables = append(variables, variable)
		}
	}

	return variables, err
}
