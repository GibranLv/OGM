package alarmemail

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]UserAlarmEmail, error) {
	usersAlarms := []UserAlarmEmail{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Find.Open: ", err)
		}

		return usersAlarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmEmail.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users_alarms_emails"

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
			fmt.Println("Model.UserAlarmEmail.Find.Query: ", err)
		}

		return usersAlarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmEmail.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		userAlarmEmail := UserAlarmEmail{}

		fields = []interface{}{
			&userAlarmEmail.ID,
			&userAlarmEmail.UserAlarmID,
			&userAlarmEmail.SendEmail,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmEmail.Find.Scan: ", err)
			}

		} else {
			usersAlarms = append(usersAlarms, userAlarmEmail)
		}
	}

	return usersAlarms, err
}

// Create ...
func (m Model) Create(values map[string]interface{}) (UserAlarmEmail, error) {
	userAlarmEmail := UserAlarmEmail{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Create.Open: ", err)
		}

		return userAlarmEmail, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmEmail.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO users_alarms_emails SET"

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
				fmt.Println("Model.UserAlarmEmail.Create.Prepare: ", err)
			}

			return userAlarmEmail, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.UserAlarmEmail.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmEmail.Create.Exec: ", err)
			}

			return userAlarmEmail, err
		}

		var userAlarmEmailID int64
		userAlarmEmailID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmEmail.Create.LastInsertId: ", err)
			}

			return userAlarmEmail, err
		}

		query = "SELECT * FROM users_alarms_emails WHERE id = ?"
		row := db.QueryRow(query, userAlarmEmailID)

		fields := []interface{}{
			&userAlarmEmail.ID,
			&userAlarmEmail.UserAlarmID,
			&userAlarmEmail.SendEmail,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmEmail.Create.Scan: ", err)
			}

			return userAlarmEmail, err
		}

	}

	return userAlarmEmail, err
}

// Update ...
func (m Model) Update(values map[string]interface{}) (UserAlarmEmail, error) {
	userAlarmEmail := UserAlarmEmail{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Update.Open: ", err)
		}

		return userAlarmEmail, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmEmail.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Update.Values: ", err)
		}

		return userAlarmEmail, err
	}

	var stmt *sql.Stmt

	query := "UPDATE users_alarms_emails SET {{fields}} WHERE id = ?"

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

	userAlarmEmailID := values[KeyID]
	params = append(params, userAlarmEmailID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Update.Prepare: ", err)
		}

		return userAlarmEmail, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmEmail.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Update.Exec: ", err)
		}

		return userAlarmEmail, err
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Update.RowsAffected: ", err)
		}

		return userAlarmEmail, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = "SELECT * FROM users_alarms_emails WHERE id = ?"
	row := db.QueryRow(query, userAlarmEmailID)

	fields := []interface{}{
		&userAlarmEmail.ID,
		&userAlarmEmail.UserAlarmID,
		&userAlarmEmail.SendEmail,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Update.Scan: ", err)
		}

		return userAlarmEmail, err
	}

	return userAlarmEmail, err
}

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Remove.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmEmail.Remove.Close: ", err)
			}
		}
	}(db)

	query := "DELETE FROM users_alarms_emails WHERE"

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
			fmt.Println("Model.UserAlarmEmail.Remove.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmEmail.Remove.Stmt.Close: ", err)
			}
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Remove.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmEmail.Remove.RowsAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}
