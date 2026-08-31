package groupfactor

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (GroupFactor, error) {
	groupfactorOut := GroupFactor{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GroupFactor.FindOne.Open: ", err)
		}

		return groupfactorOut, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GroupFactor.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM group_factors"

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
			fmt.Println("Model.GroupFactor.FindOne.Query: ", err)
		}

		return groupfactorOut, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GroupFactor.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	groupfactorOuts := []GroupFactor{}

	for rows.Next() {
		groupfactorOut := GroupFactor{}

		fields := []interface{}{
			&groupfactorOut.ID,
			&groupfactorOut.FactorID,
			&groupfactorOut.VariableID,
			&groupfactorOut.IsCustom,
			&groupfactorOut.Status,
		}

		err = rows.Scan(fields...)
		if err == nil {
			groupfactorOuts = append(groupfactorOuts, groupfactorOut)

		} else {
			if m.Debug {
				fmt.Println("Model.GroupFactor.FindOne.Scan: ", err)
			}
		}
	}

	if len(groupfactorOuts) > 0 {
		groupfactorOut = groupfactorOuts[0]
	}

	return groupfactorOut, err
}
