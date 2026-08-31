package vincremental

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (VariableIncremental, error) {
	vIncremental := VariableIncremental{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableIncremental.Update.Open: ", err)
		}

		return vIncremental, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.VariableIncremental.Update.Close: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.VariableIncremental.Update.Values: ", err)
		}

		return vIncremental, err
	}

	var stmt *sql.Stmt

	query := "UPDATE variable_incrementals SET {{fields}} WHERE id = ?"

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

	var vIncrementalID int64
	if value, hasID := values[KeyID]; hasID {
		i64, isOk := value.(int64)
		if isOk {
			vIncrementalID = i64
		}
	}

	params = append(params, vIncrementalID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.VariableIncremental.Update.Prepare: ", err)

		return vIncremental, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.VariableIncremental.Update.Stmt.Close: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.VariableIncremental.Update.Exec: ", err)

		return vIncremental, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.VariableIncremental.Update.RowsAffected: ", err)

		return vIncremental, err
	}

	query = "SELECT * FROM variable_incrementals WHERE id = ?"
	row := db.QueryRow(query, vIncrementalID)

	fields := []interface{}{
		&vIncremental.ID,
		&vIncremental.VariableID,
		&vIncremental.Value,
		&vIncremental.timestamp,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.VariableIncremental.Update.Scan: ", err)

		return vIncremental, err
	}

	// filtro de Timestamp
	if vIncremental.timestamp.Valid {
		vIncremental.Timestamp = vIncremental.timestamp.Time
	}

	return vIncremental, err
}
