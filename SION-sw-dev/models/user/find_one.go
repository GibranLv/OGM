package user

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (User, error) {
	user := User{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.FindOne.Open: ", err)
		}

		return user, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users"

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
			fmt.Println("Model.User.FindOne.Query: ", err)
		}

		return user, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.FindOne.Rows.Close: ", err)
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
			&user.createdAt,
			&user.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.FindOne.Scan: ", err)
			}

			return user, err
		}

		if user.ID != 0 {
			users = append(users, user)
		}
	}

	if len(users) == 0 {
		return user, err
	}

	user = users[0]

	return user, err
}

// FindOneWithProfile ...
func (m Model) FindOneWithProfile(userID int64) (User, error) {
	user := User{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.FindOneWithProfile.Open: ", err)
		}
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.FindOneWithProfile.Close: ", err)
			}

		}
	}(db)

	params := []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT 
							u.id, u.username, u.email, u.name, u.role, u.value,
							p.avatar, p.company, p.job, p.phone
	          FROM users AS u
						LEFT JOIN profiles AS p ON u.id = p.user_id
						WHERE u.id = ?
						`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.FindOneWithProfile.Query: ", err)
		}

		return user, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.FindOneWithProfile.Rows.Close: ", err)
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
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.FindOneWithProfile.Scan: ", err)
			}

			return user, err
		}

		if user.ID != 0 {
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

			users = append(users, user)
		}
	}

	if len(users) == 0 {
		return user, err
	}

	user = users[0]

	return user, err
}

// FindOneByUserAndLowerValue ... LowerValue Indica que entre mayor sea 'value' tiene menores permisos ... OK!
func (m Model) FindOneByUserAndLowerValue(userID int64, value uint8) (User, error) {
	user := User{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.FindOneByUserAndLowerValue.Open: ", err)
		}

		return user, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.FindOneByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT 
							u.id, u.username, u.password, u.email, u.name, u.role, u.value,
							u.created_at, u.updated_at
						FROM users AS u
						WHERE u.id = ? AND u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.FindOneByUserAndLowerValue.Query: ", err)
		}

		return user, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.FindOneByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	users := []User{}

	for rows.Next() {
		var fields []interface{}

		user := User{}

		fields = []interface{}{
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

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.FindOneByUserAndLowerValue.Scan: ", err)
			}

		} else {
			// filtro de CreatedAt
			if user.createdAt.Valid {
				user.CreatedAt = user.createdAt.Time
			}

			// filtro de UpdatedAt
			if user.updatedAt.Valid {
				user.UpdatedAt = user.updatedAt.Time
			}

			users = append(users, user)
		}
	}

	if len(users) == 0 {
		return user, err
	}

	user = users[0]

	return user, err
}
