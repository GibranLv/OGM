package orbcomm

import (
	"database/sql"
	"fmt"

	variableDB "github.com/JamsMendez/SION-sw/models/variable"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Orbcomm, error) {
	orbcomm := Orbcomm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.FindOne.Open: ", err)
		}

		return orbcomm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM orbcomms"

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
			fmt.Println("Model.Orbcomm.FindOne.Query: ", err)
		}

		return orbcomm, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	orbcomms := []Orbcomm{}

	for rows.Next() {
		orbcomm := Orbcomm{}

		fields := []interface{}{
			&orbcomm.ID,
			&orbcomm.MobileID,
			&orbcomm.NextStartID,
			&orbcomm.Modbus,
			&orbcomm.Status,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOne.Scan: ", err)
			}

			return orbcomm, err
		}

		if orbcomm.ID != 0 {
			orbcomms = append(orbcomms, orbcomm)

		}
	}

	if len(orbcomms) == 0 {
		return orbcomm, err
	}

	orbcomm = orbcomms[0]

	return orbcomm, err
}

// FindOneVariable    ...
func (m Model) FindOneVariable(mobileID, name string) (variableDB.Variable, error) {
	var variableOne variableDB.Variable

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.FindOneVariable.Open: ", err)
		}

		return variableOne, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOneVariable.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{mobileID, name}
	var rows *sql.Rows

	query := `SELECT *
						FROM orbcomms AS o
						LEFT JOIN orbcomms_variables AS ov ON o.id = ov.orbcomm_id
						WHERE o.mobile_id = ? AND ov.name = ?;`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.FindOneVariable.Query: ", err)
		}

		return variableOne, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOneVariable.Rows.Close: ", err)
			}
		}
	}(rows)

	variables := []variableDB.Variable{}

	for rows.Next() {
		variable := variableDB.Variable{}

		fields := []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Alias,
			&variable.Device,
			&variable.ReadingUnit,
			&variable.ExpressionInsert,
			&variable.Status,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOneVariable.Scan: ", err)
			}

			return variableOne, err
		}

		if variable.ID > 0 {
			variables = append(variables, variable)

		}
	}

	if len(variables) == 0 {
		return variableOne, err
	}

	variableOne = variables[0]

	return variableOne, err
}
