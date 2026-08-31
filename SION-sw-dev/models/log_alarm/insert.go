package logalarm

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (LogAlarm, error) {
	logAlarmOne := LogAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.Create.Open: ", err)
		}

		return logAlarmOne, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO log_alarms SET"

		i := 0
		for k, v := range values {
			params = append(params, v)

			if i == 0 {
				query = query + " " + k + " = ?"
				i = i + 1
			} else {
				query = query + ", " + k + " = ?"
			}
		}

		stmt, err = db.Prepare(query)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Create.Prepare: ", err)
			}

			return logAlarmOne, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.LogAlarm.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Create.Exec: ", err)
			}

			return logAlarmOne, err
		}

		var logalarmID int64
		logalarmID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Create.LastInsertId: ", err)
			}

			return logAlarmOne, err
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
				fmt.Println("Model.LogAlarm.Create.Scan: ", err)
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

	}

	return logAlarmOne, err
}
