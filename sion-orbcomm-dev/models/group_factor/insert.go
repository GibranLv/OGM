package groupfactor

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (GroupFactor, error) {
	groupfactorOut := GroupFactor{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GroupFactor.Create.Open: ", err)
		}

		return groupfactorOut, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GroupFactor.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO group_factors SET"

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
				fmt.Println("Model.GroupFactor.Create.Prepare: ", err)
			}

			return groupfactorOut, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.GroupFactor.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GroupFactor.Create.Exec: ", err)
			}

			return groupfactorOut, err
		}

		var groupfactorOutID int64
		groupfactorOutID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GroupFactor.Create.LastInsertId: ", err)
			}

			return groupfactorOut, err
		}

		query = "SELECT * FROM group_factors WHERE id = ?"
		row := db.QueryRow(query, groupfactorOutID)

		fields := []interface{}{
			&groupfactorOut.ID,
			&groupfactorOut.FactorID,
			&groupfactorOut.VariableID,
			&groupfactorOut.IsCustom,
			&groupfactorOut.Status,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.GroupFactor.Create.Scan: ", err)
			}

			return groupfactorOut, err
		}
	}

	return groupfactorOut, err
}
