package orbcommtimeout

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (OrbcommTimeout, error) {
	orbcommTimeout := OrbcommTimeout{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.OrbcommTimeout.Update.Open: ", err)
		}

		return orbcommTimeout, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.OrbcommTimeout.Update.Close: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.OrbcommTimeout.Update.Values: ", err)
		}

		return orbcommTimeout, err
	}

	var stmt *sql.Stmt

	query := "UPDATE orbcomm_timeouts SET {{fields}} WHERE id = ?"

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

	var orbcommTimeoutID int64
	if value, hasID := values[KeyID]; hasID {
		i64, isOk := value.(int64)
		if isOk {
			orbcommTimeoutID = i64
		}
	}

	params = append(params, orbcommTimeoutID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.OrbcommTimeout.Update.Prepare: ", err)

		return orbcommTimeout, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.OrbcommTimeout.Update.Stmt.Close: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.OrbcommTimeout.Update.Exec: ", err)

		return orbcommTimeout, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.OrbcommTimeout.Update.RowsAffected: ", err)

		return orbcommTimeout, err
	}

	query = "SELECT * FROM orbcomm_timeouts WHERE id = ?"
	row := db.QueryRow(query, orbcommTimeoutID)

	fields := []interface{}{
		&orbcommTimeout.ID,
		&orbcommTimeout.OrbcommID,
		&orbcommTimeout.IsTimeout,
		&orbcommTimeout.VariableID,
		&orbcommTimeout.IsZero,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.OrbcommTimeout.Update.Scan: ", err)

		return orbcommTimeout, err
	}

	return orbcommTimeout, err
}
