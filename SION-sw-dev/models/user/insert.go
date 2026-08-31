package user

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (User, error) {
	user := User{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.Create.Open: ", err)
		}

		return user, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO users SET"

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
				fmt.Println("Model.User.Create.Prepare: ", err)
			}

			return user, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.User.Create.Stmt: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.Create.Exec: ", err)
			}

			return user, err
		}

		var userID int64
		userID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.Create.LastInsertId: ", err)
			}

			return user, err
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
				fmt.Println("Model.User.Create.Scan: ", err)
			}

			return user, err
		}
	}

	return user, err
}
