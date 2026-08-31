package customvariablealarm

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// constants of Model
const (
	KeyID                   = "id"
	KeyUserCustomVariableID = "user_custom_variable_id"
	KeyUserAlarmID          = "user_alarm_id"
)

// UserCustomVariableAlarm ...
type UserCustomVariableAlarm struct {
	ID                   int64
	UserCustomVariableID int64
	UserAlarmID          int64
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
func (m Model) Find(where map[string]interface{}) ([]UserCustomVariableAlarm, error) {
	userCustomVariableAlarms := []UserCustomVariableAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserCustomVariableAlarm.Find.Open: ", err)
		}

		return userCustomVariableAlarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserCustomVariableAlarm.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users_custom_variables_alarms"

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
			fmt.Println("Model.UserCustomVariableAlarm.Find.Query: ", err)
		}

		return userCustomVariableAlarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserCustomVariableAlarm.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		userCustomVariableAlarm := UserCustomVariableAlarm{}

		fields = []interface{}{
			&userCustomVariableAlarm.ID,
			&userCustomVariableAlarm.UserCustomVariableID,
			&userCustomVariableAlarm.UserAlarmID,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserCustomVariableAlarm.Find.Scan: ", err)
			}

		} else {
			userCustomVariableAlarms = append(userCustomVariableAlarms, userCustomVariableAlarm)
		}
	}

	return userCustomVariableAlarms, err
}

// Create ...
func (m Model) Create(values map[string]interface{}) (UserCustomVariableAlarm, error) {
	userCustomVariableAlarm := UserCustomVariableAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserCustomVariableAlarm.Create.Open: ", err)
		}

		return userCustomVariableAlarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserCustomVariableAlarm.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO users_custom_variables_alarms SET"

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
				fmt.Println("Model.UserCustomVariableAlarm.Create.Prepare: ", err)
			}

			return userCustomVariableAlarm, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				fmt.Println("stmt.Error: ", err)
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserCustomVariableAlarm.Create.Exec: ", err)
			}

			return userCustomVariableAlarm, err
		}

		var userCustomVariableAlarmID int64
		userCustomVariableAlarmID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserCustomVariableAlarm.Create.LastInsertId: ", err)
			}

			return userCustomVariableAlarm, err
		}

		query = "SELECT * FROM users_custom_variables_alarms WHERE id = ?"
		row := db.QueryRow(query, userCustomVariableAlarmID)

		fields := []interface{}{
			&userCustomVariableAlarm.ID,
			&userCustomVariableAlarm.UserCustomVariableID,
			&userCustomVariableAlarm.UserAlarmID,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserCustomVariableAlarm.Create.Scan: ", err)
			}

			return userCustomVariableAlarm, err
		}

	}

	return userCustomVariableAlarm, err
}

// Update ...
func (m Model) Update(values map[string]interface{}) (UserCustomVariableAlarm, error) {
	userCustomVariableAlarm := UserCustomVariableAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserCustomVariableAlarm.Update.Open: ", err)
		}

		return userCustomVariableAlarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserCustomVariableAlarm.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")
		if m.Debug {
			fmt.Println("Model.UserCustomVariableAlarm.Update.Values: ", err)
		}

		return userCustomVariableAlarm, err
	}

	var stmt *sql.Stmt

	query := "UPDATE users_custom_variables_alarms SET {{fields}} WHERE id = ?"

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

	userCustomVariableAlarmID := values[KeyID]
	params = append(params, userCustomVariableAlarmID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserCustomVariableAlarm.Update.Prepare: ", err)
		}

		return userCustomVariableAlarm, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("stmt.Error: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserCustomVariableAlarm.Update.Exec: ", err)
		}

		return userCustomVariableAlarm, err
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserCustomVariableAlarm.Update.RowsAffected: ", err)
		}

		return userCustomVariableAlarm, err
	}

	if rowsAffected == 0 {
		return userCustomVariableAlarm, err
	}

	query = "SELECT * FROM users_custom_variables_alarms WHERE id = ?"
	row := db.QueryRow(query, userCustomVariableAlarmID)

	fields := []interface{}{
		&userCustomVariableAlarm.ID,
		&userCustomVariableAlarm.UserCustomVariableID,
		&userCustomVariableAlarm.UserAlarmID,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserCustomVariableAlarm.Update.Scan: ", err)
		}

		return userCustomVariableAlarm, err
	}

	return userCustomVariableAlarm, err
}

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserCustomVariableAlarm.Remove.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserCustomVariableAlarm.Remove.Close: ", err)
			}
		}
	}(db)

	query := "DELETE FROM users_custom_variables_alarms WHERE"

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
			fmt.Println("Model.UserCustomVariableAlarm.Remove.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserCustomVariableAlarm.Remove.Stmt.Close: ", err)
			}
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserCustomVariableAlarm.Remove.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserCustomVariableAlarm.Remove.RowsAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}
