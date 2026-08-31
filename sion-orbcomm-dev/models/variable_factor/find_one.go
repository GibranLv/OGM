package variablefactor

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (VariableFactor, error) {
	factor := VariableFactor{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableFactor.FindOne.Open: ", err)
		}

		return factor, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableFactor.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM variable_factors"

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
			fmt.Println("Model.VariableFactor.FindOne.Query: ", err)
		}

		return factor, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableFactor.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	factors := []VariableFactor{}

	for rows.Next() {
		factor := VariableFactor{}

		fields := []interface{}{
			&factor.ID,
			&factor.VariableID,
			&factor.IsCustom,
			&factor.Value,
			&factor.Probability,
			&factor.IsIncremental,
			&factor.IsRandom,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableFactor.FindOne.Scan: ", err)
			}

			return factor, err
		}

		if factor.ID != 0 {
			factors = append(factors, factor)

		}
	}

	if len(factors) == 0 {
		return factor, err
	}

	factor = factors[0]

	return factor, err
}
