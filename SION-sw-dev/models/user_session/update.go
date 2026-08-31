package usersession

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (UserSession, error) {
	userSession := UserSession{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserSession.Update.Open: ", err)
		}

		return userSession, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserSession.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.UserSession.Update.Values: ", err)
		}

		return userSession, err
	}

	var stmt *sql.Stmt

	query := "UPDATE user_sessions SET {{fields}} WHERE id = ?"

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

	userSessionID := values[KeyID]
	params = append(params, userSessionID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserSession.Update.Prepare: ", err)
		}

		return userSession, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserSession.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserSession.Update.Exec: ", err)
		}

		return userSession, err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserSession.Update.RowsAffected: ", err)
		}

		return userSession, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.UserSession.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = "SELECT * FROM user_sessions WHERE id = ?"
	row := db.QueryRow(query, userSessionID)

	fields := []interface{}{
		&userSession.ID,
		&userSession.UserID,
		&userSession.AccessTokenHash,
		&userSession.RefreshTokenHash,
		&userSession.Value,
		&userSession.createdAt,
		&userSession.updatedAt,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserSession.Update.Scan: ", err)
		}

		return userSession, err
	}

	// filtro de CreatedAt
	if userSession.createdAt.Valid {
		userSession.CreatedAt = userSession.createdAt.Time
	}

	// filtro de UpdatedAt
	if userSession.updatedAt.Valid {
		userSession.UpdatedAt = userSession.updatedAt.Time
	}

	return userSession, err
}
