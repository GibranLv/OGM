package alarm

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Alarm, error) {
	alarm := Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.Update.Open: ", err)
		}

		return alarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.Alarm.Update.Values: ", err)
		}

		return alarm, err
	}

	var stmt *sql.Stmt

	query := "UPDATE alarms SET {{fields}} WHERE id = ?"

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

	alarmID := values[KeyID]
	params = append(params, alarmID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.Update.Prepare: ", err)
		}

		return alarm, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.Update.Exec: ", err)
		}

		return alarm, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.Update.RowsAffected: ", err)
		}

		return alarm, err
	}

	query = "SELECT * FROM alarms WHERE id = ?"
	row := db.QueryRow(query, alarmID)

	fields := []interface{}{
		&alarm.ID,
		&alarm.unitID,
		&alarm.Name,
		&alarm.Alias,
		&alarm.Color,
		&alarm.Expression,
		&alarm.Message,
		&alarm.Setpoint,
		&alarm.Timeout,
		&alarm.IsTimeout,
		&alarm.PriorityLevel,
		&alarm.Sound,
		&alarm.Status,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.Update.Scan: ", err)
		}

		return alarm, err
	}

	if alarm.unitID.Valid {
		alarm.UnitID = alarm.unitID.Int64
	}

	return alarm, err
}
