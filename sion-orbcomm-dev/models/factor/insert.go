package factor

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Factor, error) {
	factorOut := Factor{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Factor.Create.Open: ", err)
		}

		return factorOut, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Factor.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO factors SET"

		i := 0
		for k, v := range values {
			params = append(params, v)

			if i == 0 {
				query = query + " " + k + " = ?"
				i = i + 1
			} else {
				query = query + ", " + k + " = ?"
			}
		}

		stmt, err = db.Prepare(query)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Factor.Create.Prepare: ", err)
			}

			return factorOut, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Factor.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Factor.Create.Exec: ", err)
			}

			return factorOut, err
		}

		var factorOutID int64
		factorOutID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Factor.Create.LastInsertId: ", err)
			}

			return factorOut, err
		}

		query = "SELECT * FROM factors WHERE id = ?"
		row := db.QueryRow(query, factorOutID)

		fields := []interface{}{
			&factorOut.ID,
			&factorOut.Probability,
			&factorOut.Status,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.Factor.Create.Scan: ", err)
			}

			return factorOut, err
		}
	}

	return factorOut, err
}
