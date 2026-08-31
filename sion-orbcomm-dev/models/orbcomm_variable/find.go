package orbcommvariable

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-orbcomm/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]OrbcommVariable, error) {
	variables := []OrbcommVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.OrbcommVariable.Find.Open: ", err)
		}

		return variables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommVariable.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM orbcomms_variables"

	orderByValue := ""
	if v, ok := where[models.OrderBy]; ok {
		order, isString := v.(string)
		if isString {
			orderByValue = order
			delete(where, models.OrderBy)
		}
	}

	limitValue := 0
	if v, ok := where[models.Limit]; ok {
		limit, isInt := v.(int)
		if isInt {
			if limit > 0 {
				limitValue = limit
				delete(where, models.Limit)
			}
		}
	}

	iniValue := 0
	if v, ok := where[models.Ini]; ok {
		ini, isInt := v.(int)
		if isInt {
			if ini > 0 {
				iniValue = ini
				delete(where, models.Ini)
			}
		}
	}

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

	if iniValue > 0 {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND id > ?"
		} else {
			query = query + " WHERE id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY id " + orderByValue
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.OrbcommVariable.Find.Query: ", err)
		}

		return variables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommVariable.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variable := OrbcommVariable{}

		fields = []interface{}{
			&variable.ID,
			&variable.OrbcommID,
			&variable.VariableID,
			&variable.Name,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommVariable.Find.Scan: ", err)
			}

		} else {
			variables = append(variables, variable)
		}
	}

	return variables, err
}

// FindVariable    ...
func (m Model) FindVariables(mobileID string) ([]OrbcommVariable, error) {
	var OrbcommVars []OrbcommVariable

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.FindVariables.Open: ", err)
		}

		return OrbcommVars, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindVariables.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{mobileID}
	var rows *sql.Rows

	query := `SELECT ov.id, ov.orbcomm_id, ov.variable_id, ov.name
						FROM orbcomms AS o
						LEFT JOIN orbcomms_variables AS ov ON o.id = ov.orbcomm_id
						WHERE o.mobile_id = ?;`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.FindVariables.Query: ", err)
		}

		return OrbcommVars, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindVariables.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		orbcommV := OrbcommVariable{}

		fields := []interface{}{
			&orbcommV.ID,
			&orbcommV.OrbcommID,
			&orbcommV.VariableID,
			&orbcommV.Name,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindVariables.Scan: ", err)
			}

			return OrbcommVars, err
		}

		if orbcommV.ID > 0 {
			OrbcommVars = append(OrbcommVars, orbcommV)
		}
	}

	return OrbcommVars, err
}
