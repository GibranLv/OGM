package user

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]User, error) {
	users := []User{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.Find.Open: ", err)
		}

		return users, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users"

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
			fmt.Println("Model.User.Find.Query: ", err)
		}

		return users, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.Find.Rows.Close: ", err)
			}
		}
	}(rows)

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
				fmt.Println("Model.User.Find.Scan: ", err)
			}

		} else {
			users = append(users, user)
		}
	}

	return users, err
}

// FindIgnoringUserAndLowerValue ... LowerValue Indica que entre mayor sea 'value' tiene menores permisos ... OK!
func (m Model) FindIgnoringUserAndLowerValue(userID int64, value uint8) ([]User, error) {
	users := []User{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.FindIgnoringUserAndLowerValue.Open: ", err)
		}

		return users, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.FindIgnoringUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT 
							u.id, u.username, u.password, u.email, u.name, u.role, u.value,
							u.created_at, u.updated_at
						FROM users AS u
						WHERE u.id != ? AND u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.User.FindIgnoringUserAndLowerValue.Query: ", err)
		}

		return users, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.User.FindIgnoringUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

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
				fmt.Println("Model.User.FindIgnoringUserAndLowerValue.Scan: ", err)
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

	return users, err
}
