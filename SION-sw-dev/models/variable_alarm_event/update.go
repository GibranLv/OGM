package variablealarmevent

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (VariableAlarmEvent, error) {
	variableAlarmEvent := VariableAlarmEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableAlarmEvent.Update.Open: ", err)
		}

		return variableAlarmEvent, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEvent.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.VariableAlarmEvent.Update.Values: ", err)
		}

		return variableAlarmEvent, err
	}

	var stmt *sql.Stmt

	query := "UPDATE variable_alarm_events SET {{fields}} WHERE id = ?"

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

	variableAlarmEventID := values[KeyID]
	params = append(params, variableAlarmEventID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableAlarmEvent.Update.Prepare: ", err)
		}

		return variableAlarmEvent, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEvent.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableAlarmEvent.Update.Exec: ", err)
		}

		return variableAlarmEvent, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableAlarmEvent.Update.RowsAffected: ", err)
		}

		return variableAlarmEvent, err
	}

	query = "SELECT * FROM variable_alarm_events WHERE id = ?"
	row := db.QueryRow(query, variableAlarmEventID)

	fields := []interface{}{
		&variableAlarmEvent.ID,
		&variableAlarmEvent.AlarmID,
		&variableAlarmEvent.recordID,
		&variableAlarmEvent.VariableID,
		&variableAlarmEvent.IsCustom,
		&variableAlarmEvent.Name,
		&variableAlarmEvent.Message,
		&variableAlarmEvent.createdAt,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableAlarmEvent.Update.Scan: ", err)
		}

		return variableAlarmEvent, err
	}

	// filtro de RecordID
	if variableAlarmEvent.recordID.Valid {
		variableAlarmEvent.RecordID = variableAlarmEvent.recordID.Int64
	}

	// Filtro de CreatedAt
	if variableAlarmEvent.createdAt.Valid {
		variableAlarmEvent.CreatedAt = variableAlarmEvent.createdAt.Time
	}

	return variableAlarmEvent, err
}
