package footervariable

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (FooterVariable, error) {
	footerVariable := FooterVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.FooterVariable.FindOne.Open: ", err)
		}

		return footerVariable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.FooterVariable.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM footer_variables"

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
			fmt.Println("Model.FooterVariable.FindOne.Query: ", err)
		}

		return footerVariable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.FooterVariable.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	footerVariables := []FooterVariable{}

	for rows.Next() {
		footerVariable := FooterVariable{}

		fields := []interface{}{
			&footerVariable.ID,
			&footerVariable.UserID,
			&footerVariable.VariableID,
			&footerVariable.IsCustom,
			&footerVariable.Position,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.FooterVariable.FindOne.Scan: ", err)
			}

			return footerVariable, err
		}

		if footerVariable.ID != 0 {
			footerVariables = append(footerVariables, footerVariable)
		}
	}

	if len(footerVariables) > 0 {
		footerVariable = footerVariables[0]
	}

	return footerVariable, err
}
