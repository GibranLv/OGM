package variablealarm

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// constants of Model
const (
	KeyID             = "id"
	KeyUserVariableID = "user_variable_id"
	KeyUserAlarmID    = "user_alarm_id"
)

// UserVariableAlarm ...
type UserVariableAlarm struct {
	ID             int64
	UserVariableID int64
	UserAlarmID    int64
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
func (m Model) Find(where map[string]interface{}) ([]UserVariableAlarm, error) {
	userVariableAlarms := []UserVariableAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVariableAlarm.Find.Open: ", err)
		}

		return userVariableAlarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.UserVariableAlarm.Find.Close: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users_variables_alarms"

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
			fmt.Println("Model.UserVariableAlarm.Find.Query: ", err)
		}

		return userVariableAlarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.UserVariableAlarm.Find.Rows.Close: ", err)
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		userVariableAlarm := UserVariableAlarm{}

		fields = []interface{}{
			&userVariableAlarm.ID,
			&userVariableAlarm.UserVariableID,
			&userVariableAlarm.UserAlarmID,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVariableAlarm.Find.Scan: ", err)
			}

		} else {
			userVariableAlarms = append(userVariableAlarms, userVariableAlarm)
		}
	}

	return userVariableAlarms, err
}

// Create ...
func (m Model) Create(values map[string]interface{}) (UserVariableAlarm, error) {
	userVariableAlarm := UserVariableAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVariableAlarm.Create.Open: ", err)
		}

		return userVariableAlarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVariableAlarm.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO users_variables_alarms SET"

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
				fmt.Println("Model.UserVariableAlarm.Create.Prepare: ", err)
			}

			return userVariableAlarm, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.UserVariableAlarm.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVariableAlarm.Create.Stmt.Exec: ", err)
			}

			return userVariableAlarm, err
		}

		var userVariableAlarmID int64
		userVariableAlarmID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVariableAlarm.Create.LastInsertId: ", err)
			}

			return userVariableAlarm, err
		}

		query = "SELECT * FROM users_variables_alarms WHERE id = ?"
		row := db.QueryRow(query, userVariableAlarmID)

		fields := []interface{}{
			&userVariableAlarm.ID,
			&userVariableAlarm.UserVariableID,
			&userVariableAlarm.UserAlarmID,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVariableAlarm.Create.Scan: ", err)
			}

			return userVariableAlarm, err
		}

	}

	return userVariableAlarm, err
}

// Update ...
func (m Model) Update(values map[string]interface{}) (UserVariableAlarm, error) {
	userVariableAlarm := UserVariableAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVariableAlarm.Update.Open: ", err)
		}

		return userVariableAlarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVariableAlarm.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.UserVariableAlarm.Update.Values: ", err)
		}

		return userVariableAlarm, err
	}

	var stmt *sql.Stmt

	query := "UPDATE users_variables_alarms SET {{fields}} WHERE id = ?"

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

	userVariableAlarmID := values[KeyID]
	params = append(params, userVariableAlarmID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVariableAlarm.Update.Prepare: ", err)
		}

		return userVariableAlarm, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVariableAlarm.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVariableAlarm.Update.Stmt.Exec: ", err)
		}

		return userVariableAlarm, err
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVariableAlarm.Update.RowsAffected: ", err)
		}

		return userVariableAlarm, err
	}

	if rowsAffected == 0 {
		return userVariableAlarm, err
	}

	query = "SELECT * FROM users_variables_alarms WHERE id = ?"
	row := db.QueryRow(query, userVariableAlarmID)

	fields := []interface{}{
		&userVariableAlarm.ID,
		&userVariableAlarm.UserVariableID,
		&userVariableAlarm.UserAlarmID,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVariableAlarm.Update.Scan: ", err)
		}

		return userVariableAlarm, err
	}

	return userVariableAlarm, err
}

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVariableAlarm.Remove.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVariableAlarm.Remove.Close: ", err)
			}
		}
	}(db)

	query := "DELETE FROM users_variables_alarms WHERE"

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
			fmt.Println("Model.UserVariableAlarm.Remove.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVariableAlarm.Remove.Stmt.Close: ", err)
			}
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVariableAlarm.Remove.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVariableAlarm.Remove.RowsAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}
