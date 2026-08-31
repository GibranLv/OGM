package log

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Log, error) {
	logOut := Log{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Log.Update.Open: ", err)
		}

		return logOut, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.Log.Update.Close: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.Log.Update.Values: ", err)
		}

		return logOut, err
	}

	var stmt *sql.Stmt

	query := "UPDATE logs SET {{fields}} WHERE id = ?"

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

	var logOutID int64
	if value, hasID := values[KeyID]; hasID {
		i64, isOk := value.(int64)
		if isOk {
			logOutID = i64
		}
	}

	params = append(params, logOutID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.Log.Update.Prepare: ", err)

		return logOut, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.Log.Update.Stmt.Close: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.Log.Update.Exec: ", err)

		return logOut, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.Log.Update.RowsAffected: ", err)

		return logOut, err
	}

	query = "SELECT * FROM logs WHERE id = ?"
	row := db.QueryRow(query, logOutID)

	fields := []interface{}{
		&logOut.ID,
		&logOut.VariableID,
		&logOut.Name,
		&logOut.TS,
		&logOut.timestamp,
		&logOut.IsTimeout,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.Log.Update.Scan: ", err)

		return logOut, err
	}

	// filtro de Timestamp
	if logOut.timestamp.Valid {
		logOut.Timestamp = logOut.timestamp.Time
	}

	return logOut, err
}
