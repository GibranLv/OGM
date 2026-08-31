package usersession

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (UserSession, error) {
	userSession := UserSession{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserSession.FindOne.Open: ", err)
		}

		return userSession, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserSession.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM user_sessions"

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

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserSession.FindOne.Query: ", err)
		}

		return userSession, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserSession.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	userSessions := []UserSession{}

	for rows.Next() {
		userSession := UserSession{}

		fields := []interface{}{
			&userSession.ID,
			&userSession.UserID,
			&userSession.AccessTokenHash,
			&userSession.RefreshTokenHash,
			&userSession.Value,
			&userSession.createdAt,
			&userSession.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserSession.FindOne.Scan: ", err)
			}

			return userSession, err
		}

		if userSession.ID != 0 {

			// filtro de CreatedAt
			if userSession.createdAt.Valid {
				userSession.CreatedAt = userSession.createdAt.Time
			}

			// filtro de UpdatedAt
			if userSession.updatedAt.Valid {
				userSession.UpdatedAt = userSession.updatedAt.Time
			}

			userSessions = append(userSessions, userSession)
		}
	}

	if len(userSessions) == 0 {
		return userSession, err
	}

	userSession = userSessions[0]

	return userSession, err
}
