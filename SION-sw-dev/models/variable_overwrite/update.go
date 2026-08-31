package variableoverwrite

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (VariableOverwrite, error) {
	overwrite := VariableOverwrite{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableOverwrite.Update.Open: ", err)
		}

		return overwrite, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableOverwrite.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.VariableOverwrite.Update.Values: ", err)
		}

		return overwrite, err
	}

	var stmt *sql.Stmt

	query := "UPDATE variable_overwrites SET {{fields}} WHERE id = ?"

	i := 0
	for k, v := range values {
		isID := k == KeyID
		if !isID {
			params = append(params, v)

			if i == 0 {
				fieldsIn = fieldsIn + " " + k + " = ?"
				i = i + 1
			} else {
				fieldsIn = fieldsIn + ", " + k + " = ?"
			}
		}
	}

	query = strings.Replace(query, "{{fields}}", fieldsIn, 1)

	overwriteID := values[KeyID]
	params = append(params, overwriteID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableOverwrite.Update.Prepare: ", err)
		}

		return overwrite, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableOverwrite.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableOverwrite.Update.Exec: ", err)
		}

		return overwrite, err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableOverwrite.Update.RowsAffected: ", err)
		}

		return overwrite, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.VariableOverwrite.Update.RowsAffected: ", rowsAffected)
		}
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
			fmt.Println("Model.VariableOverwrite.Update.Scan: ", err)
		}

		return overwrite, err
	}

	return overwrite, err
}
