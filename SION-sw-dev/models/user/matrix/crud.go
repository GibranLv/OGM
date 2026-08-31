package matrix

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// constants of Model
const (
	KeyID        = "id"
	KeyUserID    = "user_id"
	KeyMatrixID  = "matrix_id"
	KeyIsCreator = "is_creator"
)

// UserMatrix ...
type UserMatrix struct {
	ID        int64
	UserID    int64
	MatrixID  int64
	IsCreator bool
}

// Model ...
type Model struct {
	UserDB string
	PwdDB  string
	NameDB string
	Host   string
	Port   string
	Debug  bool
}

// Find ...
func (m Model) Find(where map[string]interface{}) ([]UserMatrix, error) {
	usersMatrices := []UserMatrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Find.Open: ", err)
		}

		return usersMatrices, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserMatrix.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users_matrices"

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
			query = query + " " + k + " = ?"

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
			query = query + " AND id > ?"
		} else {
			query = query + " WHERE id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY id " + orderByValue
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Find.Query: ", err)
		}

		return usersMatrices, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserMatrix.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		userMatrix := UserMatrix{}

		fields = []interface{}{
			&userMatrix.ID,
			&userMatrix.UserID,
			&userMatrix.MatrixID,
			&userMatrix.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserMatrix.Find.Scan: ", err)
			}

		} else {
			usersMatrices = append(usersMatrices, userMatrix)
		}
	}

	return usersMatrices, err
}

// Create ...
func (m Model) Create(values map[string]interface{}) (UserMatrix, error) {
	userMatrix := UserMatrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Create.Open: ", err)
		}

		return userMatrix, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserMatrix.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO users_matrices SET"

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
				fmt.Println("Model.UserMatrix.Create.Prepare: ", err)
			}

			return userMatrix, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.UserMatrix.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserMatrix.Create.Exec: ", err)
			}

			return userMatrix, err
		}

		var userMatrixID int64
		userMatrixID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserMatrix.Create.LastInsertId: ", err)
			}

			return userMatrix, err
		}

		query = "SELECT * FROM users_matrices WHERE id = ?"
		row := db.QueryRow(query, userMatrixID)

		fields := []interface{}{
			&userMatrix.ID,
			&userMatrix.UserID,
			&userMatrix.MatrixID,
			&userMatrix.IsCreator,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserMatrix.Create.Scan: ", err)
			}

			return userMatrix, err
		}

	}

	return userMatrix, err
}

// Update ...
func (m Model) Update(values map[string]interface{}) (UserMatrix, error) {
	userMatrix := UserMatrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Update.Open: ", err)
		}

		return userMatrix, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserMatrix.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.UserMatrix.Update.Values: ", err)
		}

		return userMatrix, err
	}

	var stmt *sql.Stmt

	query := "UPDATE users_matrices SET {{fields}} WHERE id = ?"

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

	userMatrixID := values[KeyID]
	params = append(params, userMatrixID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Update.Prepare: ", err)
		}

		return userMatrix, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserMatrix.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Update.Exec: ", err)
		}

		return userMatrix, err
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Update.RowsAffected: ", err)
		}

		return userMatrix, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = "SELECT * FROM users_matrices WHERE id = ?"
	row := db.QueryRow(query, userMatrixID)

	fields := []interface{}{
		&userMatrix.ID,
		&userMatrix.UserID,
		&userMatrix.MatrixID,
		&userMatrix.IsCreator,
	}

	err = row.Scan(fields...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Update.Scan: ", err)
		}

		return userMatrix, err
	}

	return userMatrix, err
}

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Remove.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserMatrix.Remove.Close: ", err)
			}
		}
	}(db)

	query := "DELETE FROM users_matrices WHERE"

	var params []interface{}
	var stmt *sql.Stmt
	var res sql.Result

	lenWhere := len(where)
	if lenWhere > 0 {
		i := 1
		for k, v := range where {
			query = query + " " + k + " = ?"

			if i < lenWhere {
				query = query + " AND "
			}

			params = append(params, v)
			i = i + 1
		}
	}

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Remove.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("stmt.Error: ", err)
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Remove.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserMatrix.Remove.RowsAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}
