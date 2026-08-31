package operation

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Operation, error) {
	operation := Operation{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.FindOne.Open: ", err)
		}

		return operation, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT 
							o.id, o.user_id, o.matrix_id, o.group_id, o.title, o.description,
							o.created_at, o.updated_at,
							u.name AS user, m.name AS matrix, g.name AS group_name
						FROM operations AS o
						LEFT JOIN users AS u ON u.id = o.user_id
						LEFT JOIN matrices AS m ON m.id = o.matrix_id
						LEFT JOIN groups AS g ON g.id = o.group_id`

	lenWhere := len(where)
	if lenWhere > 0 {
		query = query + " WHERE"

		i := 1
		for k, v := range where {
			query = query + " o." + k + " = ?"

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
			fmt.Println("Model.Operation.FindOne.Query: ", err)
		}

		return operation, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindOne.Rows: ", err)
			}
		}
	}(rows)

	operations := []Operation{}

	for rows.Next() {
		operation := Operation{}

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

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindOne.Scan: ", err)
			}

			return operation, err
		}

		if operation.ID != 0 {

			// filtro de CreatedAt
			if operation.createdAt.Valid {
				operation.CreatedAt = operation.createdAt.Time
			}

			// filtro de UpdatedAt
			if operation.updatedAt.Valid {
				operation.UpdatedAt = operation.updatedAt.Time
			}

			operations = append(operations, operation)
		}
	}

	if len(operations) == 0 {
		return operation, err
	}

	operation = operations[0]

	return operation, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (Operation, error) {
	operation := Operation{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.FindOneByOperationOrLowerValue.Open: ", err)
		}

		return operation, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindOneByOperationOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT o.id, o.user_id, o.matrix_id, o.group_id, o.title, o.description,
							o.created_at, o.updated_at,
							u.name AS user, m.name AS matrix, g.name AS group_name
						FROM operations AS o
						LEFT JOIN users AS u ON u.id = o.user_id
						LEFT JOIN matrices AS m ON m.id = o.matrix_id
						LEFT JOIN groups AS g ON g.id = o.group_id
						WHERE o.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.FindOneByOperationOrLowerValue.Query: ", err)
		}

		return operation, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindOneByOperationOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	operations := []Operation{}

	for rows.Next() {
		operation := Operation{}

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

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindOneByOperationOrLowerValue.Scan: ", err)
			}

			return operation, err
		}

		if operation.ID != 0 {

			// filtro de CreatedAt
			if operation.createdAt.Valid {
				operation.CreatedAt = operation.createdAt.Time
			}

			// filtro de UpdatedAt
			if operation.updatedAt.Valid {
				operation.UpdatedAt = operation.updatedAt.Time
			}

			operations = append(operations, operation)
		}
	}

	if len(operations) == 0 {
		return operation, err
	}

	operation = operations[0]

	return operation, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (Operation, error) {
	operation := Operation{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.FindOneByUser.Open: ", err)
		}

		return operation, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT 
							o.id, o.user_id, o.matrix_id, o.group_id, o.title, o.description,
							o.created_at, o.updated_at,
							u.name AS user, m.name AS matrix, g.name AS group_name 
						FROM operations AS o
						LEFT JOIN users AS u ON u.id = o.user_id
						LEFT JOIN matrices AS m ON m.id = o.matrix_id
						LEFT JOIN groups AS g ON g.id = o.group_id
						WHERE o.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.FindOneByUser.Query: ", err)
		}

		return operation, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	operations := []Operation{}

	for rows.Next() {
		operation := Operation{}

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

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindOneByUser.Scan: ", err)
			}

			return operation, err
		}

		if operation.ID != 0 {

			// filtro de CreatedAt
			if operation.createdAt.Valid {
				operation.CreatedAt = operation.createdAt.Time
			}

			// filtro de UpdatedAt
			if operation.updatedAt.Valid {
				operation.UpdatedAt = operation.updatedAt.Time
			}

			operations = append(operations, operation)
		}
	}

	if len(operations) == 0 {
		return operation, err
	}

	operation = operations[0]

	return operation, err
}
