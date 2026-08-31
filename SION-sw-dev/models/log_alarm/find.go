package logalarm

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]LogAlarm, error) {
	logAlarms := []LogAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.Find.Open: ", err)
		}

		return logAlarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT
							a.id, a.user_id, a.alarm_id, al.alias, a.variable_id, a.is_custom,
							a.variable_name, a.variable_device, a.value, a.is_timeout,
							a.message, a.comment, al.color, a.checked, a.created_at,
							a.updated_at
						FROM log_alarms AS a
						LEFT JOIN alarms AS al ON al.id = a.alarm_id`

	orderByValue := ""
	if v, ok := where[models.OrderBy]; ok {
		order, isString := v.(string)
		if isString {
			orderByValue = order
			delete(where, models.OrderBy)
		}
	}

	limitValue := 0
	if v, ok := where[models.Limit]; ok {
		limit, isInt := v.(int)
		if isInt {
			if limit > 0 {
				limitValue = limit
				delete(where, models.Limit)
			}
		}
	}

	iniValue := 0
	if v, ok := where[models.Ini]; ok {
		ini, isInt := v.(int)
		if isInt {
			if ini > 0 {
				iniValue = ini
				delete(where, models.Ini)
			}
		}
	}

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

	if iniValue > 0 {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND a.id > ?"
		} else {
			query = query + " WHERE a.id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY a.id " + orderByValue
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.Find.Query: ", err)
		}

		return logAlarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		logAlarmOne := LogAlarm{}

		fields = []interface{}{
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
			&logAlarmOne.Color,
			&logAlarmOne.Checked,
			&logAlarmOne.createdAt,
			&logAlarmOne.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Find.Scan: ", err)
			}

		} else {
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

			logAlarms = append(logAlarms, logAlarmOne)
		}
	}

	return logAlarms, err
}

// FindForRange ...
func (m Model) FindForRange(where map[string]interface{}, userID int64, startDate, finalDate string) ([]LogAlarm, error) {
	logAlarms := []LogAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.Find.Open: ", err)
		}

		return logAlarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT
							a.id, a.user_id, a.alarm_id, al.alias, a.variable_id, a.is_custom,
							a.variable_name, a.variable_device, a.value, a.is_timeout,
							a.message, a.comment, al.color, a.checked, a.created_at,
							a.updated_at
						FROM log_alarms AS a
						LEFT JOIN users_log_alarms AS u ON a.id = u.log_alarm_id
						LEFT JOIN alarms AS al ON al.id = a.alarm_id`

	orderByValue := ""
	if v, ok := where[models.OrderBy]; ok {
		order, isString := v.(string)
		if isString {
			orderByValue = order
			delete(where, models.OrderBy)
		}
	}

	limitValue := 0
	if v, ok := where[models.Limit]; ok {
		limit, isInt := v.(int)
		if isInt {
			if limit > 0 {
				limitValue = limit
				delete(where, models.Limit)
			}
		}
	}

	iniValue := 0
	if v, ok := where[models.Ini]; ok {
		ini, isInt := v.(int)
		if isInt {
			if ini > 0 {
				iniValue = ini
				delete(where, models.Ini)
			}
		}
	}

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

	if iniValue > 0 {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND a.id > ?"
		} else {
			query = query + " WHERE a.id > ?"
		}

		params = append(params, iniValue)
	}

	if startDate != "" && finalDate != "" {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND a.created_at >= ? AND a.created_at < ?"
		} else {
			query = query + " WHERE a.created_at >= ? AND a.created_at < ?"
		}

		params = append(params, startDate, finalDate)
	}

	if orderByValue != "" {
		query = query + " ORDER BY a.id " + orderByValue
	} else {
		query = query + " ORDER BY a.created_at DESC"
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LogAlarm.Find.Query: ", err)
		}

		return logAlarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		logAlarmOne := LogAlarm{}

		fields = []interface{}{
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
			&logAlarmOne.color,
			&logAlarmOne.Checked,
			&logAlarmOne.createdAt,
			&logAlarmOne.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LogAlarm.Find.Scan: ", err)
			}

		} else {
			// filtro de alias
			if logAlarmOne.alias.Valid {
				logAlarmOne.Alias = logAlarmOne.alias.String
			}

			// filtro de color
			if logAlarmOne.color.Valid {
				logAlarmOne.Color = logAlarmOne.color.String
			}

			// filtro de UserID
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

	return logAlarms, err
}
