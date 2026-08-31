package variableoverwrite

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (VariableOverwrite, error) {
	overwrite := VariableOverwrite{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableOverwrite.Create.Open: ", err)
		}

		return overwrite, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableOverwrite.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO variable_overwrites SET"

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
				fmt.Println("Model.VariableOverwrite.Create.Prepare: ", err)
			}

			return overwrite, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.VariableOverwrite.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableOverwrite.Create.Exec: ", err)
			}

			return overwrite, err
		}

		var overwriteID int64
		overwriteID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableOverwrite.Create.LastInsertId: ", err)
			}

			return overwrite, err
		}

		query = "SELECT * FROM variable_overwrites WHERE id = ?"
		row := db.QueryRow(query, overwriteID)

		fields := []interface{}{
			&overwrite.ID,
			&overwrite.VariableID,
			&overwrite.ValueI,
			&overwrite.ValueF,
			&overwrite.Operator,
			&overwrite.Status,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableOverwrite.Create.Scan: ", err)
			}

			return overwrite, err
		}
	}

	return overwrite, err
}
