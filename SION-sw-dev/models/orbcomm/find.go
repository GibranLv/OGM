package orbcomm

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]Orbcomm, error) {
	orbcomms := []Orbcomm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.Find.Open: ", err)
		}

		return orbcomms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM orbcomms"

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
			fmt.Println("Model.Orbcomm.Find.Query: ", err)
		}

		return orbcomms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		orbcomm := Orbcomm{}

		fields = []interface{}{
			&orbcomm.ID,
			&orbcomm.MobileID,
			&orbcomm.NextStartID,
			&orbcomm.Modbus,
			&orbcomm.Status,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.Find.Scan: ", err)
			}

		} else {
			orbcomms = append(orbcomms, orbcomm)
		}
	}

	return orbcomms, err
}

// FindVariables ...
func (m Model) FindVariables(where map[string]interface{}) ([]LogVariable, error) {
	variables := []LogVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.FindVariables.Open: ", err)
		}

		return variables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindVariables.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT l.id, l.variable_id, l.name, l.ts, l.is_timeout, ov.name AS
						parameter, o.mobile_id
						FROM logs AS l
						LEFT JOIN orbcomms_variables AS ov ON l.variable_id = ov.variable_id
						LEFT JOIN orbcomms AS o ON ov.orbcomm_id = o.id
						WHERE o.status = 1
						ORDER BY l.is_timeout DESC;`

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
			query = query + " l." + k + " = ?"

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
			query = query + " AND l.id > ?"
		} else {
			query = query + " WHERE l.id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY l.id " + orderByValue
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.FindVariables.Query: ", err)
		}

		return variables, err
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
		var fields []interface{}

		variable := LogVariable{}

		fields = []interface{}{
			&variable.ID,
			&variable.VariableID,
			&variable.Name,
			&variable.Timestamp,
			&variable.IsTimeout,
			&variable.parameter,
			&variable.mobileID,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindVariables.Scan: ", err)
			}

		} else {
			if variable.parameter.Valid {
				variable.Parameter = variable.parameter.String
			}

			if variable.mobileID.Valid {
				variable.MobileID = variable.mobileID.String
			}

			variables = append(variables, variable)
		}
	}

	return variables, err
}
