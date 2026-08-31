package customvariable

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (CustomVariable, error) {
	customVariable := CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Create.Open: ", err)
		}

		return customVariable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO custom_variables SET"

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
				fmt.Println("Model.CustomVariable.Create.Prepare: ", err)
			}

			return customVariable, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.CustomVariable.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Create.Exec: ", err)
			}

			return customVariable, err
		}

		var customVariableID int64
		customVariableID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Create.LastInsertId: ", err)
			}

			return customVariable, err
		}

		query = "SELECT * FROM custom_variables WHERE id = ?"
		row := db.QueryRow(query, customVariableID)

		fields := []interface{}{
			&customVariable.ID,
			&customVariable.Name,
			&customVariable.Device,
			&customVariable.variablesJSON,
			&customVariable.Expression,
			&customVariable.Unit,
			&customVariable.Status,
			&customVariable.createdAt,
			&customVariable.updatedAt,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Create.Scan: ", err)
			}

			return customVariable, err
		}

		if customVariable.variablesJSON.Valid {
			sJSON := customVariable.variablesJSON.String
			bJSON := []byte(sJSON)
			_ = json.Unmarshal(bJSON, &customVariable.VariablesJSON)
		}

		if customVariable.createdAt.Valid {
			customVariable.CreatedAt = customVariable.createdAt.Time
		}

		if customVariable.updatedAt.Valid {
			customVariable.UpdatedAt = customVariable.updatedAt.Time
		}
	}

	return customVariable, err
}
