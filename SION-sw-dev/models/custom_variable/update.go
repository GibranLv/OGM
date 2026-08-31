package customvariable

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (CustomVariable, error) {
	customVariable := CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Update.Open: ", err)
		}

		return customVariable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.CustomVariable.Update.Values: ", err)
		}

		return customVariable, err
	}

	var stmt *sql.Stmt

	query := "UPDATE custom_variables SET {{fields}} WHERE id = ?"

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

	customVariableID := values[KeyID]
	params = append(params, customVariableID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Update.Prepare: ", err)
		}

		return customVariable, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Update.Exec: ", err)
		}

		return customVariable, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Update.RowsAffected: ", err)
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
			fmt.Println("Model.CustomVariable.Update.Scan: ", err)
		}

		return customVariable, err
	}

	if customVariable.variablesJSON.Valid {
		sJSON := customVariable.variablesJSON.String
		bJSON := []byte(sJSON)
		err = json.Unmarshal(bJSON, &customVariable.VariablesJSON)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Update.VariablesJSON.Unmarshal: ", err)
			}
		}
	}

	if customVariable.createdAt.Valid {
		customVariable.CreatedAt = customVariable.createdAt.Time
	}

	if customVariable.updatedAt.Valid {
		customVariable.UpdatedAt = customVariable.updatedAt.Time
	}

	return customVariable, err
}
