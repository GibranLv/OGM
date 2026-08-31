package lastrecord

import (
	"database/sql"
	"fmt"
)

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.Remove.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.Remove.Close: ", err)
			}
		}
	}(db)

	query := "DELETE FROM last_records WHERE"

	var params []interface{}
	var stmt *sql.Stmt
	var res sql.Result

	lenWhere := len(where)
	if lenWhere > 0 {
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

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.Remove.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.Remove.Stmt.Close: ", err)
			}
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.Remove.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.Remove.numAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}

// RemoveByOrbcomm ...
func (m Model) RemoveByOrbcomm(orbcommID int64) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.RemoveByOrbcomm.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.RemoveByOrbcomm.Close: ", err)
			}
		}
	}(db)

	query := `DELETE lr
						FROM last_records AS lr
						LEFT JOIN orbcomms_variables AS ov ON lr.variable_id = ov.variable_id
						LEFT JOIN orbcomms AS o ON ov.orbcomm_id = o.id
						WHERE o.id = ?`

	var stmt *sql.Stmt
	var res sql.Result

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.RemoveByOrbcomm.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.RemoveByOrbcomm.Stmt.Close: ", err)
			}
		}
	}(stmt)

	params := []interface{}{orbcommID}

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.RemoveByOrbcomm.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.RemoveByOrbcomm.numAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}
