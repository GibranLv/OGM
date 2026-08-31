package lastrecord

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (LastRecord, error) {
	lastRecord := LastRecord{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.Update.Open: ", err)
		}

		return lastRecord, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.LastRecord.Update.Close: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.LastRecord.Update.Values: ", err)
		}

		return lastRecord, err
	}

	var stmt *sql.Stmt

	query := "UPDATE last_records SET {{fields}} WHERE id = ?"

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

	var lastRecordID int64
	if value, hasID := values[KeyID]; hasID {
		i64, isOk := value.(int64)
		if isOk {
			lastRecordID = i64
		}
	}

	params = append(params, lastRecordID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.LastRecord.Update.Prepare: ", err)

		return lastRecord, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.LastRecord.Update.Stmt.Close: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.LastRecord.Update.Exec: ", err)

		return lastRecord, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.LastRecord.Update.RowsAffected: ", err)

		return lastRecord, err
	}

	query = "SELECT * FROM last_records WHERE id = ?"
	row := db.QueryRow(query, lastRecordID)

	fields := []interface{}{
		&lastRecord.ID,
		&lastRecord.VariableID,
		&lastRecord.IsCustom,
		&lastRecord.Value,
		&lastRecord.timestamp,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.LastRecord.Update.Scan: ", err)

		return lastRecord, err
	}

	// filtro de Timestamp
	if lastRecord.timestamp.Valid {
		lastRecord.Timestamp = lastRecord.timestamp.Time
	}

	return lastRecord, err
}
