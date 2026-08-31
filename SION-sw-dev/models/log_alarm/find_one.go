package logalarm

import (
	"database/sql"
	"fmt"
	"strings"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (LogAlarm, error) {
	logalarm := LogAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.FindOne.Open: ", err)
		}

		return logalarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT
							a.id, a.user_id, a.alarm_id, al.alias, a.variable_id, a.is_custom,
							a.variable_name, a.variable_device, a.value, a.is_timeout,
							a.message, a.comment, a.checked, a.created_at,
							a.updated_at
						FROM log_alarms AS a
						LEFT JOIN alarms AS al ON al.id = a.alarm_id`

	lenWhere := len(where)
	if lenWhere > 0 {
		query = query + " WHERE"

		i := 1
		for k, v := range where {
			query = query + " a." + k + " = ?"

			if i < lenWhere {
				query = query + " AND "
			}

			params = append(params, v)
			i = i + 1
		}
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.FindOne.Query: ", err)
		}

		return logalarm, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	logalarms := []LogAlarm{}

	for rows.Next() {
		logAlarmOne := LogAlarm{}

		fields := []interface{}{
			&logAlarmOne.ID,
			&logAlarmOne.userID,
			&logAlarmOne.AlarmID,
			&logAlarmOne.alias,
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

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.FindOne.Scan: ", err)
			}

			return logalarm, err
		}

		if logAlarmOne.ID != 0 {

			if logAlarmOne.alias.Valid {
				logAlarmOne.Alias = logAlarmOne.alias.String
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

			logalarms = append(logalarms, logAlarmOne)
		}
	}

	if len(logalarms) == 0 {
		return logalarm, err
	}

	logalarm = logalarms[0]

	return logalarm, err
}

// FindOneByUserID ...
func (m Model) FindOneByUserID(where map[string]interface{}, userID int64) (LogAlarm, error) {
	logAlarmOne := LogAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.FindOne.Open: ", err)
		}

		return logAlarmOne, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT
							a.id, a.user_id, a.alarm_id, al.alias, a.variable_id, a.is_custom,
							a.variable_name, a.variable_device, a.value, a.is_timeout,
							a.message, a.comment, a.checked, a.created_at,
							a.updated_at
						FROM log_alarms AS a
						LEFT JOIN users_log_alarms AS u ON a.id = u.log_alarm_id
						LEFT JOIN alarms AS al ON al.id = a.alarm_id`

	lenWhere := len(where)
	if lenWhere > 0 {
		query = query + " WHERE"

		i := 1
		for k, v := range where {
			query = query + " a." + k + " = ?"

			if i < lenWhere {
				query = query + " AND "
			}

			params = append(params, v)
			i = i + 1
		}
	}

	if userID > 0 {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND u.user_id = ?"
		} else {
			query = query + " WHERE u.user_id = ?"
		}

		params = append(params, userID)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.FindOne.Query: ", err)
		}

		return logAlarmOne, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	logAlarms := []LogAlarm{}

	for rows.Next() {
		logAlarmOne := LogAlarm{}

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

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.FindOne.Scan: ", err)
			}

			return logAlarmOne, err
		}

		if logAlarmOne.ID != 0 {

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

			logAlarms = append(logAlarms, logAlarmOne)
		}
	}

	if len(logAlarms) == 0 {
		return logAlarmOne, err
	}

	logAlarmOne = logAlarms[0]

	return logAlarmOne, err
}
