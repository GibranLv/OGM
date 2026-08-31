package operation

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Operation, error) {
	operation := Operation{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.Update.Open: ", err)
		}

		return operation, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.Operation.Update.Values: ", err)
		}

		return operation, err
	}

	var stmt *sql.Stmt

	query := "UPDATE operations SET {{fields}} WHERE id = ?"

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

	operationID := values[KeyID]
	params = append(params, operationID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.Update.Prepare: ", err)
		}

		return operation, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("stmt.Error: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.Update.Exec: ", err)
		}

		return operation, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.Update.RowsAffected: ", err)
		}

		return operation, err
	}

	query = `SELECT 
							o.id, o.user_id, o.matrix_id, o.group_id, o.title, o.description,
							o.created_at, o.updated_at,
							u.name AS user, m.name AS matrix, g.name AS group_name
						FROM operations AS o
						LEFT JOIN users AS u ON u.id = o.user_id
						LEFT JOIN matrices AS m ON m.id = o.matrix_id
						LEFT JOIN groups AS g ON g.id = o.group_id
						WHERE o.id = ?`

	row := db.QueryRow(query, operationID)

	fields := []interface{}{
		&operation.ID,
		&operation.UserID,
		&operation.MatrixID,
		&operation.GroupID,
		&operation.Title,
		&operation.Description,
		&operation.createdAt,
		&operation.updatedAt,
		&operation.User,
		&operation.Matrix,
		&operation.Group,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.Update.Scan: ", err)
		}

		return operation, err
	}

	// filtro de CreatedAt
	if operation.createdAt.Valid {
		operation.CreatedAt = operation.createdAt.Time
	}

	// filtro de UpdatedAt
	if operation.updatedAt.Valid {
		operation.UpdatedAt = operation.updatedAt.Time
	}

	return operation, err
}
