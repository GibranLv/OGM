package user

import (
	"database/sql"
	"fmt"

	"github.com/JamsMendez/SION-sw/encrypted"
)

// LogIn ...
func (m Model) LogIn(username, password string) (User, error) {
	user := User{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.LogIn.Open: ", err)
		}

		return user, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.LogIn.Close: ", err)
			}
		}
	}(db)

	if username == "" {
		if m.Debug {
			fmt.Println("Model.User.LogIn: username value is empty")
		}

		return user, err
	}

	if password == "" {
		if m.Debug {
			fmt.Println("Model.User.LogIn.KeyPassword: password value is empty")
		}

		return user, err
	}

	var rows *sql.Rows

	query := `SELECT 
							u.id, u.username, u.password, u.email, u.name, u.role, u.value,
							p.avatar, p.company, p.job, p.phone,
							u.created_at, u.updated_at
	          FROM users AS u
						LEFT JOIN profiles AS p ON u.id = p.user_id
						WHERE u.username = ?`

	rows, err = db.Query(query, username)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.LogIn.Query: ", err)
		}

		return user, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.LogIn.Rows.Close: ", err)
			}
		}
	}(rows)

	users := []User{}

	for rows.Next() {
		user := User{}

		fields := []interface{}{
			&user.ID,
			&user.Username,
			&user.password,
			&user.Email,
			&user.Name,
			&user.Role,
			&user.Value,
			&user.avatar,
			&user.company,
			&user.job,
			&user.phone,
			&user.createdAt,
			&user.updatedAt,
		}

		err = rows.Scan(fields...)

		if err == nil {
			// filtro de Avatar
			if user.avatar.Valid {
				user.Avatar = user.avatar.String
			}

			// filtro de Company
			if user.company.Valid {
				user.Company = user.company.String
			}

			// filtro de Job
			if user.job.Valid {
				user.Job = user.job.String
			}

			// filtro de Phone
			if user.phone.Valid {
				user.Phone = user.phone.String
			}

			// filtro de CreatedAt
			if user.createdAt.Valid {
				user.CreatedAt = user.createdAt.Time
			}

			// filtro de UpdatedAt
			if user.updatedAt.Valid {
				user.UpdatedAt = user.updatedAt.Time
			}

			if user.ID != 0 {
				users = append(users, user)
			}

		} else {
			if m.Debug {
				fmt.Println("Model.User.LogIn.Scan: ", err)
			}
		}
	}

	if len(users) == 0 {
		return user, err
	}

	userOne := users[0]

	isOk := encrypted.CheckPasswordHash(password, userOne.password)
	if !isOk {
		if m.Debug {
			fmt.Println("Model.User.LogIn.CheckPasswordHash: Incorrect password ")
		}

		return user, err
	}

	user = users[0]

	return user, err
}

// GetSession ...
func (m Model) GetSession(userID int64) (User, error) {
	user := User{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.GetSession.Open: ", err)
		}

		return user, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.GetSession.Close: ", err)
			}
		}
	}(db)

	var rows *sql.Rows

	query := `SELECT 
							u.id, u.username, u.email, u.name, u.role, u.value,
							p.avatar, p.company, p.job, p.phone,
							u.created_at, u.updated_at
	          FROM users AS u
						LEFT JOIN profiles AS p ON u.id = p.user_id
						WHERE u.id = ?`

	rows, err = db.Query(query, userID)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.GetSession.Query: ", err)
		}

		return user, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.GetSession.Rows.Close: ", err)
			}
		}
	}(rows)

	users := []User{}

	for rows.Next() {
		user := User{}

		fields := []interface{}{
			&user.ID,
			&user.Username,
			&user.Email,
			&user.Name,
			&user.Role,
			&user.Value,
			&user.avatar,
			&user.company,
			&user.job,
			&user.phone,
			&user.createdAt,
			&user.updatedAt,
		}

		err = rows.Scan(fields...)

		if err == nil {
			// filtro de Avatar
			if user.avatar.Valid {
				user.Avatar = user.avatar.String
			}

			// filtro de Company
			if user.company.Valid {
				user.Company = user.company.String
			}

			// filtro de Job
			if user.job.Valid {
				user.Job = user.job.String
			}

			// filtro de Phone
			if user.phone.Valid {
				user.Phone = user.phone.String
			}

			// filtro de CreatedAt
			if user.createdAt.Valid {
				user.CreatedAt = user.createdAt.Time
			}

			// filtro de UpdatedAt
			if user.updatedAt.Valid {
				user.UpdatedAt = user.updatedAt.Time
			}

			if user.ID != 0 {
				users = append(users, user)
			}

		} else {
			if m.Debug {
				fmt.Println("Model.User.GetSession.Scan: ", err)
			}
		}
	}

	if len(users) > 0 {
		user = users[0]
		return user, err
	}

	return user, err
}
