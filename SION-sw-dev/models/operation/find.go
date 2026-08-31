package operation

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}, startDate, finalDate string) ([]Operation, error) {
	operations := []Operation{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.Find.Open: ", err)
		}

		return operations, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.Find.Close: ", err)
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

	orderByValue := ""
	if v, ok := where[models.OrderBy]; ok {
		order, isString := v.(string)
		if isString {
			orderByValue = order
			delete(where, models.OrderBy)
		}
	}

	limitValue := 0
	if v, ok := where[models.Limit]; ok {
		limit, isInt := v.(int)
		if isInt {
			if limit > 0 {
				limitValue = limit
				delete(where, models.Limit)
			}
		}
	}

	iniValue := 0
	if v, ok := where[models.Ini]; ok {
		ini, isInt := v.(int)
		if isInt {
			if ini > 0 {
				iniValue = ini
				delete(where, models.Ini)
			}
		}
	}

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

	if iniValue > 0 {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND o.id > ?"
		} else {
			query = query + " WHERE o.id > ?"
		}

		params = append(params, iniValue)
	}

	if startDate != "" && finalDate != "" {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND o.created_at >= ? AND o.created_at < ?"
		} else {
			query = query + " WHERE o.created_at >= ? AND o.created_at < ?"
		}

		params = append(params, startDate, finalDate)
	}

	if orderByValue != "" {
		query = query + " ORDER BY o.id " + orderByValue
	} else {
		query = query + " ORDER BY o.created_at DESC"
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.Find.Query: ", err)
		}

		return operations, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		operation := Operation{}

		fields = []interface{}{
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
				fmt.Println("Model.Operation.Find.Scan: ", err)
			}

		} else {
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

	return operations, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(where map[string]interface{}, value uint8, startDate, finalDate string) ([]Operation, error) {
	operations := []Operation{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.FindByUserOrLowerValue.Open: ", err)
		}

		return operations, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var userID, matritID, groupID int64

	lenWhere := len(where)
	if lenWhere > 0 {
		for k, v := range where {
			if k == KeyUserID {
				userID = v.(int64)
			} else if k == KeyMatrixID {
				matritID = v.(int64)
			} else if k == KeyGroupID {
				groupID = v.(int64)
			}
		}
	}

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT o.id, o.user_id, o.matrix_id, o.group_id, o.title, o.description,
							o.created_at, o.updated_at,
							u.name AS user, m.name AS matrix, g.name AS operation
						FROM operations AS o
						LEFT JOIN users AS u ON u.id = o.user_id
						LEFT JOIN matrices AS m ON m.id = o.matrix_id
						LEFT JOIN groups AS g ON g.id = o.group_id
						WHERE u.id = ? OR u.value > ?`

	if startDate != "" && finalDate != "" {
		query = query + " AND (o.created_at >= ? AND o.created_at < ?)"

		params = append(params, startDate, finalDate)
	}

	if matritID != 0 {
		query = query + " AND o.matrix_id = ?"

		params = append(params, matritID)
	}

	if groupID != 0 {
		query = query + " AND o.group_id = ?"

		params = append(params, groupID)
	}

	query = query + " ORDER BY o.created_at DESC"

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.FindByUserOrLowerValue.Query: ", err)
		}

		return operations, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		operation := Operation{}

		fields = []interface{}{
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
				fmt.Println("Model.Operation.FindByUserOrLowerValue.Scan: ", err)
			}

		} else {

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

	return operations, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(where map[string]interface{}, value uint8, startDate, finalDate string) ([]Operation, error) {
	operations := []Operation{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.FindByUserAndLowerValue.Open: ", err)
		}

		return operations, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var userID, matritID, groupID int64

	lenWhere := len(where)
	if lenWhere > 0 {
		for k, v := range where {
			if k == KeyUserID {
				userID = v.(int64)
			} else if k == KeyMatrixID {
				matritID = v.(int64)
			} else if k == KeyGroupID {
				groupID = v.(int64)
			}
		}
	}

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT 
							o.id, o.user_id, o.matrix_id, o.group_id, o.title, o.description,
							o.created_at, o.updated_at,
							u.name AS user, m.name AS matrix, g.name AS operation 
						FROM operations AS o
						LEFT JOIN users AS u ON u.id = o.user_id
						LEFT JOIN matrices AS m ON m.id = o.matrix_id
						LEFT JOIN groups AS g ON g.id = o.group_id
						WHERE u.id = ? AND u.value > ?`

	if startDate != "" && finalDate != "" {
		query = query + " AND (o.created_at >= ? AND o.created_at < ?)"

		params = append(params, startDate, finalDate)
	}

	if matritID != 0 {
		query = query + " AND o.matrix_id = ?"

		params = append(params, matritID)
	}

	if groupID != 0 {
		query = query + " AND o.group_id = ?"

		params = append(params, groupID)
	}

	query = query + " ORDER BY o.created_at DESC"

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Operation.FindByUserAndLowerValue.Query: ", err)
		}

		return operations, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Operation.FindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		operation := Operation{}

		fields = []interface{}{
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
				fmt.Println("Model.Operation.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {

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

	return operations, err
}
