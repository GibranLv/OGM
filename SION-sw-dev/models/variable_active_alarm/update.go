package variableactivealarm

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (VariableActiveAlarm, error) {
	variableActiveAlarm := VariableActiveAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.Update.Open: ", err)
		}

		return variableActiveAlarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.Update.Values: ", err)
		}

		return variableActiveAlarm, err
	}

	var stmt *sql.Stmt

	query := "UPDATE variable_active_alarms SET {{fields}} WHERE id = ?"

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

	variableActiveAlarmID := values[KeyID]
	params = append(params, variableActiveAlarmID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.Update.Prepare: ", err)
		}

		return variableActiveAlarm, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.Update.Exec: ", err)
		}

		return variableActiveAlarm, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.Update.RowsAffected: ", err)
		}

		return variableActiveAlarm, err
	}

	query = "SELECT * FROM variable_active_alarms WHERE id = ?"
	row := db.QueryRow(query, variableActiveAlarmID)

	fields := []interface{}{
		&variableActiveAlarm.ID,
		&variableActiveAlarm.AlarmID,
		&variableActiveAlarm.VariableID,
		&variableActiveAlarm.IsCustom,
		&variableActiveAlarm.createdAt,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.Update.Scan: ", err)
		}

		return variableActiveAlarm, err
	}

	// Filtro de CreatedAt
	if variableActiveAlarm.createdAt.Valid {
		variableActiveAlarm.CreatedAt = variableActiveAlarm.createdAt.Time
	}

	return variableActiveAlarm, err
}
