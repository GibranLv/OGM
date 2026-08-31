package extravariable

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (ExtraVariable, error) {
	extraVariable := ExtraVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ExtraVariable.FindOne.Open: ", err)
		}

		return extraVariable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ExtraVariable.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM extra_variables"

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
			fmt.Println("Model.ExtraVariable.FindOne.Query: ", err)
		}

		return extraVariable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ExtraVariable.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	extraVariables := []ExtraVariable{}

	for rows.Next() {
		extraVariable := ExtraVariable{}

		fields := []interface{}{
			&extraVariable.ID,
			&extraVariable.VariableID,
			&extraVariable.IsCustom,
			&extraVariable.OutVariableID,
			&extraVariable.OutIsCustom,
			&extraVariable.Status,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ExtraVariable.FindOne.Scan: ", err)
			}

			return extraVariable, err
		}

		if extraVariable.ID != 0 {
			extraVariables = append(extraVariables, extraVariable)
		}
	}

	if len(extraVariables) == 0 {
		return extraVariable, err
	}

	extraVariable = extraVariables[0]

	return extraVariable, err
}
