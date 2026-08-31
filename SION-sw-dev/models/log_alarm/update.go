package logalarm

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (LogAlarm, error) {
	logAlarmOne := LogAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.Update.Open: ", err)
		}

		return logAlarmOne, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.LogAlarm.Update.Values: ", err)
		}

		return logAlarmOne, err
	}

	var stmt *sql.Stmt

	query := "UPDATE log_alarms SET {{fields}} WHERE id = ?"

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

	logalarmID := values[KeyID]
	params = append(params, logalarmID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.Update.Prepare: ", err)
		}

		return logAlarmOne, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.Update.Exec: ", err)
		}

		return logAlarmOne, err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.Update.RowsAffected: ", err)
		}

		return logAlarmOne, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.LogAlarm.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = "SELECT * FROM log_alarms WHERE id = ?"
	row := db.QueryRow(query, logalarmID)

	fields := []interface{}{
		&logAlarmOne.ID,
		&logAlarmOne.userID,
		&logAlarmOne.AlarmID,
		&logAlarmOne.VariableID,
		&logAlarmOne.IsCustom,
		&logAlarmOne.VariableName,
		&logAlarmOne.VariableDevice,
		&logAlarmOne.Value,
		&logAlarmOne.IsTimeout,
		&logAlarmOne.Message,
		&logAlarmOne.Comment,
		&logAlarmOne.Checked,
		&logAlarmOne.createdAt,
		&logAlarmOne.updatedAt,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.Update.Scan: ", err)
		}

		return logAlarmOne, err
	}

	if logAlarmOne.userID.Valid {
		logAlarmOne.UserID = logAlarmOne.userID.Int64
	}

	// filtro de CreatedAt
	if logAlarmOne.createdAt.Valid {
		logAlarmOne.CreatedAt = logAlarmOne.createdAt.Time
	}

	// filtro de UpdatedAt
	if logAlarmOne.updatedAt.Valid {
		logAlarmOne.UpdatedAt = logAlarmOne.updatedAt.Time
	}

	return logAlarmOne, err
}
