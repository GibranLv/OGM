package logalarm

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// constants of Model
const (
	KeyID         = "id"
	KeyUserID     = "user_id"
	KeyLogAlarmID = "log_alarm_id"
	KeyViewed     = "viewed"
)

// UserLogAlarm ...
type UserLogAlarm struct {
	ID         int64
	UserID     int64
	LogAlarmID int64
	Viewed     bool
}

// Model ...
type Model struct {
	UserDB string
	PwdDB  string
	NameDB string
	Host   string
	Port   string
	Debug  bool
}

// Find ...
func (m Model) Find(where map[string]interface{}) ([]UserLogAlarm, error) {
	usersLogAlarms := []UserLogAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Find.Open: ", err)
		}

		return usersLogAlarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users_log_alarms"

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
			fmt.Println("Model.UserLogAlarm.Find.Query: ", err)
		}

		return usersLogAlarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		userLogAlarm := UserLogAlarm{}

		fields = []interface{}{
			&userLogAlarm.ID,
			&userLogAlarm.UserID,
			&userLogAlarm.LogAlarmID,
			&userLogAlarm.Viewed,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.Find.Scan: ", err)
			}

		} else {
			usersLogAlarms = append(usersLogAlarms, userLogAlarm)
		}
	}

	return usersLogAlarms, err
}

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (UserLogAlarm, error) {
	usersLogAlarmOne := UserLogAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.FindOne.Open: ", err)
		}

		return usersLogAlarmOne, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users_log_alarms"

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
			fmt.Println("Model.UserLogAlarm.FindOne.Query: ", err)
		}

		return usersLogAlarmOne, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	usersLogAlarms := []UserLogAlarm{}

	for rows.Next() {
		var fields []interface{}

		userLogAlarm := UserLogAlarm{}

		fields = []interface{}{
			&userLogAlarm.ID,
			&userLogAlarm.UserID,
			&userLogAlarm.LogAlarmID,
			&userLogAlarm.Viewed,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.FindOne.Scan: ", err)
			}

		} else {
			usersLogAlarms = append(usersLogAlarms, userLogAlarm)
		}
	}

	if len(usersLogAlarms) > 0 {
		usersLogAlarmOne = usersLogAlarms[0]
	}

	return usersLogAlarmOne, err
}

// Create ...
func (m Model) Create(values map[string]interface{}) (UserLogAlarm, error) {
	userLogAlarm := UserLogAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Create.Open: ", err)
		}

		return userLogAlarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO users_log_alarms SET"

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
				fmt.Println("Model.UserLogAlarm.Create.Prepare: ", err)
			}

			return userLogAlarm, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.UserLogAlarm.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.Create.Exec: ", err)
			}

			return userLogAlarm, err
		}

		var userLogAlarmID int64
		userLogAlarmID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.Create.LastInsertId: ", err)
			}

			return userLogAlarm, err
		}

		query = "SELECT * FROM users_log_alarms WHERE id = ?"
		row := db.QueryRow(query, userLogAlarmID)

		fields := []interface{}{
			&userLogAlarm.ID,
			&userLogAlarm.UserID,
			&userLogAlarm.LogAlarmID,
			&userLogAlarm.Viewed,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.Create.Scan: ", err)
			}

			return userLogAlarm, err
		}

	}

	return userLogAlarm, err
}

// Update ...
func (m Model) Update(values map[string]interface{}) (UserLogAlarm, error) {
	userLogAlarm := UserLogAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Update.Open: ", err)
		}

		return userLogAlarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Update.Values: ", err)
		}

		return userLogAlarm, err
	}

	var stmt *sql.Stmt

	query := "UPDATE users_log_alarms SET {{fields}} WHERE id = ?"

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

	userLogAlarmID := values[KeyID]
	params = append(params, userLogAlarmID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Update.Prepare: ", err)
		}

		return userLogAlarm, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Update.Exec: ", err)
		}

		return userLogAlarm, err
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Update.RowsAffected: ", err)
		}

		return userLogAlarm, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = "SELECT * FROM users_log_alarms WHERE id = ?"
	row := db.QueryRow(query, userLogAlarmID)

	fields := []interface{}{
		&userLogAlarm.ID,
		&userLogAlarm.UserID,
		&userLogAlarm.LogAlarmID,
		&userLogAlarm.Viewed,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Update.Scan: ", err)
		}

		return userLogAlarm, err
	}

	return userLogAlarm, err
}

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Remove.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.Remove.Close: ", err)
			}
		}
	}(db)

	query := "DELETE FROM users_log_alarms WHERE"

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
			fmt.Println("Model.UserLogAlarm.Remove.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserLogAlarm.Remove.Stmt.Close: ", err)
			}
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Remove.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserLogAlarm.Remove.RowsAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}
