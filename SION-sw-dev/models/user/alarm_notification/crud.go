package alarmnotification

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]UserAlarmNotification, error) {
	usersAlarms := []UserAlarmNotification{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Find.Open: ", err)
		}

		return usersAlarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users_alarms_notifications"

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
			fmt.Println("Model.UserAlarmNotification.Find.Query: ", err)
		}

		return usersAlarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		userAlarmNotification := UserAlarmNotification{}

		fields = []interface{}{
			&userAlarmNotification.ID,
			&userAlarmNotification.UserAlarmID,
			&userAlarmNotification.SendEmail,
			&userAlarmNotification.SendSMS,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.Find.Scan: ", err)
			}

		} else {
			usersAlarms = append(usersAlarms, userAlarmNotification)
		}
	}

	return usersAlarms, err
}

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (UserAlarmNotification, error) {
	usersAlarmOne := UserAlarmNotification{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.FindOne.Open: ", err)
		}

		return usersAlarmOne, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users_alarms_notifications"

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
			fmt.Println("Model.UserAlarmNotification.FindOne.Query: ", err)
		}

		return usersAlarmOne, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	usersAlarms := []UserAlarmNotification{}

	for rows.Next() {
		var fields []interface{}

		userAlarmOne := UserAlarmNotification{}

		fields = []interface{}{
			&userAlarmOne.ID,
			&userAlarmOne.UserAlarmID,
			&userAlarmOne.SendEmail,
			&userAlarmOne.SendSMS,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.FindOne.Scan: ", err)
			}

		} else {
			usersAlarms = append(usersAlarms, userAlarmOne)
		}
	}

	if len(usersAlarms) > 0 {
		usersAlarmOne = usersAlarms[0]
	}

	return usersAlarmOne, err
}

// Create ...
func (m Model) Create(values map[string]interface{}) (UserAlarmNotification, error) {
	userAlarmNotification := UserAlarmNotification{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Create.Open: ", err)
		}

		return userAlarmNotification, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO users_alarms_notifications SET"

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
				fmt.Println("Model.UserAlarmNotification.Create.Prepare: ", err)
			}

			return userAlarmNotification, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.UserAlarmNotification.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.Create.Exec: ", err)
			}

			return userAlarmNotification, err
		}

		var userAlarmNotificationID int64
		userAlarmNotificationID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.Create.LastInsertId: ", err)
			}

			return userAlarmNotification, err
		}

		query = "SELECT * FROM users_alarms_notifications WHERE id = ?"
		row := db.QueryRow(query, userAlarmNotificationID)

		fields := []interface{}{
			&userAlarmNotification.ID,
			&userAlarmNotification.UserAlarmID,
			&userAlarmNotification.SendEmail,
			&userAlarmNotification.SendSMS,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.Create.Scan: ", err)
			}

			return userAlarmNotification, err
		}

	}

	return userAlarmNotification, err
}

// Update ...
func (m Model) Update(values map[string]interface{}) (UserAlarmNotification, error) {
	userAlarmNotification := UserAlarmNotification{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Update.Open: ", err)
		}

		return userAlarmNotification, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Update.Values: ", err)
		}

		return userAlarmNotification, err
	}

	var stmt *sql.Stmt

	query := "UPDATE users_alarms_notifications SET {{fields}} WHERE id = ?"

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

	userAlarmNotificationID := values[KeyID]
	params = append(params, userAlarmNotificationID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Update.Prepare: ", err)
		}

		return userAlarmNotification, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Update.Exec: ", err)
		}

		return userAlarmNotification, err
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Update.RowsAffected: ", err)
		}

		return userAlarmNotification, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = "SELECT * FROM users_alarms_notifications WHERE id = ?"
	row := db.QueryRow(query, userAlarmNotificationID)

	fields := []interface{}{
		&userAlarmNotification.ID,
		&userAlarmNotification.UserAlarmID,
		&userAlarmNotification.SendEmail,
		&userAlarmNotification.SendSMS,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Update.Scan: ", err)
		}

		return userAlarmNotification, err
	}

	return userAlarmNotification, err
}

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Remove.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.Remove.Close: ", err)
			}
		}
	}(db)

	query := "DELETE FROM users_alarms_notifications WHERE"

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
			fmt.Println("Model.UserAlarmNotification.Remove.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserAlarmNotification.Remove.Stmt.Close: ", err)
			}
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Remove.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserAlarmNotification.Remove.RowsAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}
