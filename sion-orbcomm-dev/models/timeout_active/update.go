package timeoutactive

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (TimeoutActive, error) {
	timeout := TimeoutActive{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.TimeoutActive.Update.Open: ", err)
		}

		return timeout, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.TimeoutActive.Update.Close: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.TimeoutActive.Update.Values: ", err)
		}

		return timeout, err
	}

	var stmt *sql.Stmt

	query := "UPDATE timeout_actives SET {{fields}} WHERE id = ?"

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

	var timeoutID int64
	if value, hasID := values[KeyID]; hasID {
		i64, isOk := value.(int64)
		if isOk {
			timeoutID = i64
		}
	}

	params = append(params, timeoutID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.TimeoutActive.Update.Prepare: ", err)

		return timeout, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.TimeoutActive.Update.Stmt.Close: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.TimeoutActive.Update.Exec: ", err)

		return timeout, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.TimeoutActive.Update.RowsAffected: ", err)

		return timeout, err
	}

	query = "SELECT * FROM timeout_actives WHERE id = ?"
	row := db.QueryRow(query, timeoutID)

	fields := []interface{}{
		&timeout.ID,
		&timeout.VariableID,
		&timeout.IsCustom,
		&timeout.Active,
		&timeout.timestamp,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.TimeoutActive.Update.Scan: ", err)

		return timeout, err
	}

	// filtro de Timestamp
	if timeout.timestamp.Valid {
		timeout.Timestamp = timeout.timestamp.Time
	}

	return timeout, err
}
