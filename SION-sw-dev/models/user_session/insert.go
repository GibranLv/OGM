package usersession

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (UserSession, error) {
	userSession := UserSession{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserSession.Create.Open: ", err)
		}

		return userSession, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserSession.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO user_sessions SET"

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
				fmt.Println("Model.UserSession.Create.Prepare: ", err)
			}

			return userSession, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.UserSession.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserSession.Create.Exec: ", err)
			}

			return userSession, err
		}

		var userSessionID int64
		userSessionID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserSession.Create.LastInsertId: ", err)
			}

			return userSession, err
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
				fmt.Println("Model.UserSession.Create.Scan: ", err)
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
	}

	return userSession, err
}
