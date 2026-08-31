package factor

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Factor, error) {
	factorOut := Factor{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Factor.FindOne.Open: ", err)
		}

		return factorOut, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Factor.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM factors"

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
			fmt.Println("Model.Factor.FindOne.Query: ", err)
		}

		return factorOut, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Factor.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	factorOuts := []Factor{}

	for rows.Next() {
		factorOut := Factor{}

		fields := []interface{}{
			&factorOut.ID,
			&factorOut.Probability,
			&factorOut.Status,
		}

		err = rows.Scan(fields...)
		if err == nil {
			factorOuts = append(factorOuts, factorOut)

		} else {
			if m.Debug {
				fmt.Println("Model.Factor.FindOne.Scan: ", err)
			}
		}
	}

	if len(factorOuts) > 0 {
		factorOut = factorOuts[0]
	}

	return factorOut, err
}

// FindOneByVariable ...
func (m Model) FindOneByVariable(variableID int64, isCustom bool) (Factor, error) {
	factorOut := Factor{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Factor.FindOneByVariable.Open: ", err)
		}

		return factorOut, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Factor.FindOneByVariable.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{variableID, isCustom}
	var rows *sql.Rows

	query := `SELECT 	f.id, f.probability, f.status, g.id AS gf_id, g.variable_id,
										g.is_custom
						FROM factors AS f
						LEFT JOIN group_factors AS g ON g.factor_id = f.id
						WHERE g.variable_id = ? AND g.is_custom = ?;`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Factor.FindOneByVariable.Query: ", err)
		}

		return factorOut, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Factor.FindOneByVariable.Rows.Close: ", err)
			}
		}
	}(rows)

	factorOuts := []Factor{}

	for rows.Next() {
		factorOut := Factor{}

		fields := []interface{}{
			&factorOut.ID,
			&factorOut.Probability,
			&factorOut.Status,

			&factorOut.GroupFactorID,
			&factorOut.VariableID,
			&factorOut.IsCustom,
		}

		err = rows.Scan(fields...)
		if err == nil {
			factorOuts = append(factorOuts, factorOut)

		} else {
			if m.Debug {
				fmt.Println("Model.Factor.FindOneByVariable.Scan: ", err)
			}
		}
	}

	if len(factorOuts) > 0 {
		factorOut = factorOuts[0]
	}

	return factorOut, err
}
