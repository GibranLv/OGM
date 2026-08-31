package variable

import (
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]Variable, error) {
	variables := []Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.Find.Open: ", err)
		}

		return variables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM variables"

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
			query = query + " " + k + " = ?"

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
			query = query + " AND id > ?"
		} else {
			query = query + " WHERE id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY id " + orderByValue
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.Find.Query: ", err)
		}

		return variables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variable := Variable{}

		fields = []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Alias,
			&variable.Device,
			&variable.ReadingUnit,
			&variable.ExpressionInsert,
			&variable.Status,
			&variable.createdAt,
			&variable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.Find.Scan: ", err)
			}

		} else {
			// filtro de CreatedAt
			if variable.createdAt.Valid {
				variable.CreatedAt = variable.createdAt.Time
			}

			// filtro de UpdatedAt
			if variable.updatedAt.Valid {
				variable.UpdatedAt = variable.updatedAt.Time
			}

			variables = append(variables, variable)
		}
	}

	return variables, err
}

// FindByUser ...
func (m Model) FindByUser(userID int64) ([]Variable, error) {
	variables := []Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindByUser.Open: ", err)
		}

		return variables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindByUser.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT
							v.id, v.name, v.alias, v.device, v.reading_unit,
							v.expression_insert, v.status, v.created_at, v.updated_at
						FROM variables AS v
						LEFT JOIN users_variables AS uv ON v.id = uv.variable_id
						WHERE uv.user_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindByUser.Query: ", err)
		}

		return variables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variable := Variable{}

		fields = []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Alias,
			&variable.Device,
			&variable.ReadingUnit,
			&variable.ExpressionInsert,
			&variable.Status,
			&variable.createdAt,
			&variable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindByUser.Scan: ", err)
			}

		} else {
			// filtro de CreatedAt
			if variable.createdAt.Valid {
				variable.CreatedAt = variable.createdAt.Time
			}

			// filtro de UpdatedAt
			if variable.updatedAt.Valid {
				variable.UpdatedAt = variable.updatedAt.Time
			}

			variables = append(variables, variable)
		}
	}

	return variables, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(userID int64, value uint8) ([]Variable, error) {
	variables := []Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variables.FindByUserAndLowerValue.Open: ", err)
		}

		return variables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variables.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT v.id, v.name, v.alias, v.device, v.reading_unit,
							v.expression_insert, v.status, v.created_at, v.updated_at
						FROM variables AS v
						LEFT JOIN users_variables AS uv ON v.id = uv.variable_id
						LEFT JOIN users AS u ON u.id = uv.user_id
						WHERE u.id = ? OR u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variables.FindByUserAndLowerValue.Query: ", err)
		}

		return variables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variables.FindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variable := Variable{}

		fields = []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Alias,
			&variable.Device,
			&variable.ReadingUnit,
			&variable.ExpressionInsert,
			&variable.Status,
			&variable.createdAt,
			&variable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variables.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {

			// filtro de CreatedAt
			if variable.createdAt.Valid {
				variable.CreatedAt = variable.createdAt.Time
			}

			// filtro de UpdatedAt
			if variable.updatedAt.Valid {
				variable.UpdatedAt = variable.updatedAt.Time
			}

			variables = append(variables, variable)
		}
	}

	return variables, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(userID int64, value uint8) ([]Variable, error) {
	variables := []Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variables.FindByUserAndLowerValue.Open: ", err)
		}

		return variables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variables.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
							v.id, v.name, v.alias, v.device, v.reading_unit,
							v.expression_insert, v.status, v.created_at, v.updated_at
						FROM variables AS v
						LEFT JOIN users_variables AS uv ON v.id = uv.variable_id
						LEFT JOIN users AS u ON u.id = uv.user_id
						WHERE u.id = ? AND u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variables.FindByUserAndLowerValue.Query: ", err)
		}

		return variables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variables.FindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variable := Variable{}

		fields = []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Alias,
			&variable.Device,
			&variable.ReadingUnit,
			&variable.ExpressionInsert,
			&variable.Status,
			&variable.createdAt,
			&variable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variables.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {

			// filtro de CreatedAt
			if variable.createdAt.Valid {
				variable.CreatedAt = variable.createdAt.Time
			}

			// filtro de UpdatedAt
			if variable.updatedAt.Valid {
				variable.UpdatedAt = variable.updatedAt.Time
			}

			variables = append(variables, variable)
		}
	}

	return variables, err
}

// FindByUserAndAlarm ...
func (m Model) FindByUserAndAlarm(userID, alarmID int64) ([]Variable, error) {
	variables := []Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindByUserAndAlarm.Open: ", err)
		}

		return variables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindByUserAndAlarm.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, alarmID}
	var rows *sql.Rows

	query := `SELECT
							v.id, v.name, v.alias, v.device, v.reading_unit,
							v.expression_insert, v.status, v.created_at, v.updated_at
						FROM variables AS v
						LEFT JOIN users_variables AS uv ON uv.variable_id = v.id
						LEFT JOIN users_variables_alarms AS uva ON uva.user_variable_id = uv.id
						LEFT JOIN users_alarms AS ua ON ua.id = uva.user_alarm_id
						WHERE ua.user_id = ? AND ua.alarm_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindByUserAndAlarm.Query: ", err)
		}

		return variables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindByUserAndAlarm.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variable := Variable{}

		fields = []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Alias,
			&variable.Device,
			&variable.ReadingUnit,
			&variable.ExpressionInsert,
			&variable.Status,
			&variable.createdAt,
			&variable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindByUserAndAlarm.Scan: ", err)
			}

		} else {
			// filtro de CreatedAt
			if variable.createdAt.Valid {
				variable.CreatedAt = variable.createdAt.Time
			}

			// filtro de UpdatedAt
			if variable.updatedAt.Valid {
				variable.UpdatedAt = variable.updatedAt.Time
			}

			variables = append(variables, variable)
		}
	}

	return variables, err
}

// FindIDByUserAndAlarm ...
func (m Model) FindIDByUserAndAlarm(userID, alarmID int64) ([]Variable, error) {
	variables := []Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindIDByUserAndAlarm.Open: ", err)
		}

		return variables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindIDByUserAndAlarm.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, alarmID}
	var rows *sql.Rows

	query := `SELECT
							v.id,
							uva.id AS user_variable_alarm_id,
							uv.id AS user_variable_id
						FROM variables AS v
						LEFT JOIN users_variables AS uv ON uv.variable_id = v.id
						LEFT JOIN users_variables_alarms AS uva ON uva.user_variable_id = uv.id
						LEFT JOIN users_alarms AS ua ON ua.id = uva.user_alarm_id
						WHERE ua.user_id = ? AND ua.alarm_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindIDByUserAndAlarm.Query: ", err)
		}

		return variables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindIDByUserAndAlarm.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variable := Variable{}

		fields = []interface{}{
			&variable.ID,
			&variable.UserVariableAlarmID,
			&variable.UserVariableID,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindIDByUserAndAlarm.Scan: ", err)
			}

		} else {
			variables = append(variables, variable)
		}
	}

	return variables, err
}

// FindAlarmsByUser ...
func (m Model) FindAlarmsByUser(userID int64) ([]Alarm, error) {
	alarms := []Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindAlarmsByUser.Open: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindAlarmsByUser.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	/*
		DEPRECATED
		query := `SELECT
							a.id AS alarm_id, a.name, a.alias, a.color, a.setpoint, a.sound, a.is_timeout, a.priority_level,
							uv.variable_id
						FROM users_variables AS uv
						LEFT JOIN variable_active_alarms AS vaa ON uv.variable_id = vaa.variable_id
						LEFT JOIN users_alarms AS ua ON ua.alarm_id = vaa.alarm_id
						LEFT JOIN alarms AS a ON a.id = ua.alarm_id
						WHERE uv.user_id = ?
						ORDER BY a.priority_level`*/

	query := `SELECT
							ua.alarm_id, a.name, a.alias, a.color, a.setpoint, a.sound, a.is_timeout, a.priority_level,
							uv.variable_id
						FROM users_variables AS uv
						LEFT JOIN users_variables_alarms AS uva ON uva.user_variable_id = uv.id
						LEFT JOIN users_alarms AS ua ON uva.user_alarm_id = ua.id
						LEFT JOIN alarms AS a ON ua.alarm_id = a.id
						WHERE uv.user_id = ?
						ORDER BY a.priority_level`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindAlarmsByUser.Query: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindAlarmsByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		alarm := Alarm{}

		fields = []interface{}{
			&alarm.alarmID,
			&alarm.name,
			&alarm.alias,
			&alarm.color,
			&alarm.setpoint,
			&alarm.sound,
			&alarm.isTimeout,
			&alarm.priorityLevel,
			&alarm.variableID,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindAlarmsByUser.Scan: ", err)
			}

		} else {
			// filtro de AlarmID
			if alarm.alarmID.Valid {
				alarm.AlarmID = alarm.alarmID.Int64
			}

			// filtro de Name
			if alarm.name.Valid {
				alarm.Name = alarm.name.String
			}

			// filtro de Alias
			if alarm.alias.Valid {
				alarm.Alias = alarm.alias.String
			}

			// filtro de Color
			if alarm.color.Valid {
				alarm.Color = alarm.color.String
			}

			// filtro de Setpoint
			if alarm.setpoint.Valid {
				alarm.Setpoint = alarm.setpoint.Float64
			}

			// filtro de Sound
			if alarm.sound.Valid {
				alarm.Sound = alarm.sound.Int64
			}

			// filtro de IsTimeout
			if alarm.isTimeout.Valid {
				alarm.IsTimeout = alarm.isTimeout.Bool
			}

			// filtro de PriorityLevel
			if alarm.priorityLevel.Valid {
				alarm.PriorityLevel = alarm.priorityLevel.Int64
			}

			// filtro de VariableID
			if alarm.variableID.Valid {
				alarm.VariableID = alarm.variableID.Int64
			}

			alarms = append(alarms, alarm)
		}
	}

	return alarms, err
}

// FindLastRecordByUser ...
func (m Model) FindLastRecordByUser(userID int64) ([]Variable, error) {
	variables := []Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindLastRecord.Open: ", err)
		}

		return variables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindLastRecord.Close: ", err)
			}
		}
	}(db)

	var rows *sql.Rows

	query := `SELECT v.id, v.name, v.device, lr.value, lr.timestamp, v.reading_unit
						FROM users_variables AS uv
						LEFT JOIN variables AS v ON uv.variable_id = v.id
						LEFT JOIN last_records AS lr ON lr.variable_id = v.id
						WHERE lr.is_custom = FALSE AND uv.user_id = ?`

	rows, err = db.Query(query, userID)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindLastRecordByUser.Query: ", err)
		}

		return variables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindLastRecordByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	for rows.Next() {
		var fields []interface{}

		variable := Variable{}

		fields = []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Device,
			&variable.value,
			&variable.timestamp,
			&variable.ReadingUnit,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindLastRecordByUser.Scan: ", err)
			}

		} else {
			// filtro de Value
			if variable.value.Valid {
				variable.Value = variable.value.Float64
			}

			// filtro de Timestamp
			if variable.timestamp.Valid {
				variable.Timestamp = variable.timestamp.Time.In(location).Format(constants.DateTimeFormat)
			}

			variables = append(variables, variable)
		}
	}

	return variables, err
}

// FindLastRecord ...
func (m Model) FindLastRecord() ([]Variable, error) {
	variables := []Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindLastRecord.Open: ", err)
		}

		return variables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindLastRecord.Close: ", err)
			}
		}
	}(db)

	var rows *sql.Rows

	query := `SELECT v.id, v.name, v.device, lr.value, lr.timestamp, v.reading_unit
						FROM variables AS v
						LEFT JOIN last_records AS lr ON lr.variable_id = v.id
						WHERE lr.is_custom = FALSE`

	rows, err = db.Query(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindLastRecord.Query: ", err)
		}

		return variables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindLastRecord.Rows.Close: ", err)
			}
		}
	}(rows)

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	for rows.Next() {
		var fields []interface{}

		variable := Variable{}

		fields = []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Device,
			&variable.value,
			&variable.timestamp,
			&variable.ReadingUnit,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindLastRecord.Scan: ", err)
			}

		} else {
			// filtro de Value
			if variable.value.Valid {
				variable.Value = variable.value.Float64
			}

			// filtro de Timestamp
			if variable.timestamp.Valid {
				variable.Timestamp = variable.timestamp.Time.In(location).Format(constants.DateTimeFormat)
			}

			variables = append(variables, variable)
		}
	}

	return variables, err
}
