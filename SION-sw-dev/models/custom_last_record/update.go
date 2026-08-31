package customlastrecord

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (CustomLastRecord, error) {
	customLastRecord := CustomLastRecord{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomLastRecord.Update.Open: ", err)
		}

		return customLastRecord, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomLastRecord.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.CustomLastRecord.Update.Values: ", err)
		}

		return customLastRecord, err
	}

	var stmt *sql.Stmt

	query := "UPDATE custom_last_records SET {{fields}} WHERE id = ?"

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

	var customLastRecordID int64
	if value, hasID := values[KeyID]; hasID {
		i64, isOk := value.(int64)
		if isOk {
			customLastRecordID = i64
		}
	}

	params = append(params, customLastRecordID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomLastRecord.Update.Prepare: ", err)
		}

		return customLastRecord, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomLastRecord.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomLastRecord.Update.Exec: ", err)
		}

		return customLastRecord, err
	}

	//var rowsAffected int64
	//rowsAffected, err = res.RowsAffected()

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomLastRecord.Update.RowsAffected: ", err)
		}

		return customLastRecord, err
	}

	/*if rowsAffected == 0 {
		err = errors.New("")

		if m.Debug {
			fmt.Println("Model.CustomLastRecord.Update.RowsAffected: ", err)
		}

		return customLastRecord, err
	}*/

	query = "SELECT * FROM custom_last_records WHERE id = ?"
	row := db.QueryRow(query, customLastRecordID)

	fields := []interface{}{
		&customLastRecord.ID,
		&customLastRecord.VariableID,
		&customLastRecord.Value,
		&customLastRecord.timestamp,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomLastRecord.Update.Scan: ", err)
		}

		return customLastRecord, err
	}

	// filtro de Timestamp
	if customLastRecord.timestamp.Valid {
		customLastRecord.Timestamp = customLastRecord.timestamp.Time
	}

	return customLastRecord, err
}
