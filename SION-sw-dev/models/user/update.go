package user

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (User, error) {
	user := User{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.Update.Open: ", err)
		}

		return user, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.User.Update.Values: ", err)
		}

		return user, err
	}

	var stmt *sql.Stmt

	query := "UPDATE users SET {{fields}} WHERE id = ?"

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

	userID := values[KeyID]
	params = append(params, userID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.Update.Prepare: ", err)
		}

		return user, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.Update.Stmt.Exec: ", err)
		}

		return user, err
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.Update.RowsAffected: ", err)
		}

		return user, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.User.Update.RowsAffected: RowsAffected is 0")
		}
	}

	query = "SELECT * FROM users WHERE id = ?"
	row := db.QueryRow(query, userID)

	fields := []interface{}{
		&user.ID,
		&user.Username,
		&user.password,
		&user.Email,
		&user.Name,
		&user.Role,
		&user.Value,
		&user.createdAt,
		&user.updatedAt,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.Update.Scan: ", err)
		}

		return user, err
	}

	return user, err
}
