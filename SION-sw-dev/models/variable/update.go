package variable

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Variable, error) {
	variable := Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.Update.Open: ", err)
		}

		return variable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.Variable.Update.Close: ", err)
		}

		return variable, err
	}

	var stmt *sql.Stmt

	query := "UPDATE variables SET {{fields}} WHERE id = ?"

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

	variableID := values[KeyID]
	params = append(params, variableID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.Update.Prepare: ", err)
		}

		return variable, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.Update.Exec: ", err)
		}

		return variable, err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.Update.RowsAffected: ", err)
		}

		return variable, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.Variable.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = "SELECT * FROM variables WHERE id = ?"
	row := db.QueryRow(query, variableID)

	fields := []interface{}{
		&variable.ID,
		&variable.Name,
		&variable.Alias,
		&variable.Device,
		&variable.ReadingUnit,
		&variable.ExpressionInsert,
		&variable.Status,
		&variable.createdAt,
		&variable.updatedAt,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.Update.Scan: ", err)
		}

		return variable, err
	}

	// filtro de CreatedAt
	if variable.createdAt.Valid {
		variable.CreatedAt = variable.createdAt.Time
	}

	// filtro de UpdatedAt
	if variable.updatedAt.Valid {
		variable.UpdatedAt = variable.updatedAt.Time
	}

	return variable, err
}
