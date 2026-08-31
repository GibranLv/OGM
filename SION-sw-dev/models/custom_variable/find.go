package customvariable

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]CustomVariable, error) {
	customVars := []CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Find.Open: ", err)
		}

		return customVars, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM custom_variables"

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
			fmt.Println("Model.CustomVariable.Find.Query: ", err)
		}

		return customVars, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		customVariable := CustomVariable{}

		fields = []interface{}{
			&customVariable.ID,
			&customVariable.Name,
			&customVariable.Device,
			&customVariable.variablesJSON,
			&customVariable.Expression,
			&customVariable.Unit,
			&customVariable.Status,
			&customVariable.createdAt,
			&customVariable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Find.Scan: ", err)
			}

		} else {
			// filtro de variablesJSON
			if customVariable.variablesJSON.Valid {
				sJSON := customVariable.variablesJSON.String
				bJSON := []byte(sJSON)
				err = json.Unmarshal(bJSON, &customVariable.VariablesJSON)
				if err != nil {
					if m.Debug {
						fmt.Println("Model.CustomVariable.Find.VariablesJSON.Unmarshal: ", err)
					}
				}
			}

			// filtro de CreatedAt
			if customVariable.createdAt.Valid {
				customVariable.CreatedAt = customVariable.createdAt.Time
			}

			// filtro de UpdatedAt
			if customVariable.updatedAt.Valid {
				customVariable.UpdatedAt = customVariable.updatedAt.Time
			}

			customVars = append(customVars, customVariable)
		}
	}

	return customVars, err
}

// FindByUser ...
func (m Model) FindByUser(userID int64) ([]CustomVariable, error) {
	customVariables := []CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindByUser.Open: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUser.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT
							v.id, v.name, v.device, v.variables_json, v.expression, v.unit,
							v.status, v.created_at, v.updated_at
						FROM custom_variables AS v
						LEFT JOIN users_custom_variables AS uv ON v.id = uv.custom_variable_id
						WHERE uv.user_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindByUser.Query: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		customVariable := CustomVariable{}

		fields = []interface{}{
			&customVariable.ID,
			&customVariable.Name,
			&customVariable.Device,
			&customVariable.variablesJSON,
			&customVariable.Expression,
			&customVariable.Unit,
			&customVariable.Status,
			&customVariable.createdAt,
			&customVariable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUser.Scan: ", err)
			}

		} else {
			// filtro de variablesJSON
			if customVariable.variablesJSON.Valid {
				sJSON := customVariable.variablesJSON.String
				bJSON := []byte(sJSON)
				_ = json.Unmarshal(bJSON, &customVariable.VariablesJSON)
			}

			// filtro de CreatedAt
			if customVariable.createdAt.Valid {
				customVariable.CreatedAt = customVariable.createdAt.Time
			}

			// filtro de UpdatedAt
			if customVariable.updatedAt.Valid {
				customVariable.UpdatedAt = customVariable.updatedAt.Time
			}

			customVariables = append(customVariables, customVariable)
		}
	}

	return customVariables, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(userID int64, value uint8) ([]CustomVariable, error) {
	customVariables := []CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindByUserOrLowerValue.Open: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT v.id, v.name, v.device, v.variables_json, v.expression, v.unit,
							v.status, v.created_at, v.updated_at
						FROM custom_variables AS v
						LEFT JOIN users_custom_variables AS uv ON v.id = uv.custom_variable_id
						LEFT JOIN users AS u ON u.id = uv.user_id
						WHERE u.id = ? OR u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindByUserOrLowerValue.Query: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		customVariable := CustomVariable{}

		fields = []interface{}{
			&customVariable.ID,
			&customVariable.Name,
			&customVariable.Device,
			&customVariable.variablesJSON,
			&customVariable.Expression,
			&customVariable.Unit,
			&customVariable.Status,
			&customVariable.createdAt,
			&customVariable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUserOrLowerValue.Scan: ", err)
			}

		} else {
			// filtro de variablesJSON
			if customVariable.variablesJSON.Valid {
				sJSON := customVariable.variablesJSON.String
				bJSON := []byte(sJSON)
				err = json.Unmarshal(bJSON, &customVariable.VariablesJSON)
				if err != nil {
					if m.Debug {
						fmt.Println("Model.CustomVariable.FindByUserOrLowerValue.VariablesJSON.Unmarshal: ", err)
					}
				}
			}

			// filtro de CreatedAt
			if customVariable.createdAt.Valid {
				customVariable.CreatedAt = customVariable.createdAt.Time
			}

			// filtro de UpdatedAt
			if customVariable.updatedAt.Valid {
				customVariable.UpdatedAt = customVariable.updatedAt.Time
			}

			customVariables = append(customVariables, customVariable)
		}
	}

	return customVariables, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(userID int64, value uint8) ([]CustomVariable, error) {
	customVariables := []CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindByUserAndLowerValue.Open: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
							v.id, v.name, v.device, v.variables_json, v.expression, v.unit,
							v.status, v.created_at, v.updated_at
						FROM custom_variables AS v
						LEFT JOIN users_custom_variables AS uv ON v.id = uv.custom_variable_id
						LEFT JOIN users AS u ON u.id = uv.user_id
						WHERE u.id = ? AND u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindByUserAndLowerValue.Query: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		customVariable := CustomVariable{}

		fields = []interface{}{
			&customVariable.ID,
			&customVariable.Name,
			&customVariable.Device,
			&customVariable.variablesJSON,
			&customVariable.Expression,
			&customVariable.Unit,
			&customVariable.Status,
			&customVariable.createdAt,
			&customVariable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {
			// filtro de variablesJSON
			if customVariable.variablesJSON.Valid {
				sJSON := customVariable.variablesJSON.String
				bJSON := []byte(sJSON)
				_ = json.Unmarshal(bJSON, &customVariable.VariablesJSON)
			}

			// filtro de CreatedAt
			if customVariable.createdAt.Valid {
				customVariable.CreatedAt = customVariable.createdAt.Time
			}

			// filtro de UpdatedAt
			if customVariable.updatedAt.Valid {
				customVariable.UpdatedAt = customVariable.updatedAt.Time
			}

			customVariables = append(customVariables, customVariable)
		}
	}

	return customVariables, err
}

// FindByUserAndAlarm ...
func (m Model) FindByUserAndAlarm(userID, alarmID int64) ([]CustomVariable, error) {
	customVariables := []CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindByUserAndAlarm.Open: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUserAndAlarm.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, alarmID}
	var rows *sql.Rows

	query := `SELECT
							cv.id, cv.name, cv.device, cv.variables_json, cv.expression, cv.unit,
							cv.status, cv.created_at, cv.updated_at
						FROM custom_variables AS cv
						LEFT JOIN users_custom_variables AS ucv ON ucv.custom_variable_id = cv.id
						LEFT JOIN users_custom_variables_alarms AS ucva ON ucva.user_custom_variable_id = ucv.id
						LEFT JOIN users_alarms AS ua ON ua.id = ucva.user_alarm_id
						WHERE ua.user_id = ? AND ua.alarm_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindByUserAndAlarm.Query: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUserAndAlarm.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		customVariable := CustomVariable{}

		fields = []interface{}{
			&customVariable.ID,
			&customVariable.Name,
			&customVariable.Device,
			&customVariable.variablesJSON,
			&customVariable.Expression,
			&customVariable.Unit,
			&customVariable.Status,
			&customVariable.createdAt,
			&customVariable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindByUserAndAlarm.Scan: ", err)
			}

		} else {
			// filtro de variablesJSON
			if customVariable.variablesJSON.Valid {
				sJSON := customVariable.variablesJSON.String
				bJSON := []byte(sJSON)
				_ = json.Unmarshal(bJSON, &customVariable.VariablesJSON)
			}

			// filtro de CreatedAt
			if customVariable.createdAt.Valid {
				customVariable.CreatedAt = customVariable.createdAt.Time
			}

			// filtro de UpdatedAt
			if customVariable.updatedAt.Valid {
				customVariable.UpdatedAt = customVariable.updatedAt.Time
			}

			customVariables = append(customVariables, customVariable)
		}
	}

	return customVariables, err
}

// FindIDByUserAndAlarm ...
func (m Model) FindIDByUserAndAlarm(userID, alarmID int64) ([]CustomVariable, error) {
	customVariables := []CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindIDByUserAndAlarm.Open: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindIDByUserAndAlarm.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, alarmID}
	var rows *sql.Rows

	query := `SELECT
							cv.id,
							ucva.id AS user_custom_variable_alarm_id,
							ucv.id AS user_custom_variable_id
						FROM custom_variables AS cv
						LEFT JOIN users_custom_variables AS ucv ON ucv.custom_variable_id = cv.id
						LEFT JOIN users_custom_variables_alarms AS ucva ON ucva.user_custom_variable_id = ucv.id
						LEFT JOIN users_alarms AS ua ON ua.id = ucva.user_alarm_id
						WHERE ua.user_id = ? AND ua.alarm_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindIDByUserAndAlarm.Query: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindIDByUserAndAlarm.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		customVariable := CustomVariable{}

		fields = []interface{}{
			&customVariable.ID,
			&customVariable.UserCustomVariableAlarmID,
			&customVariable.UserCustomVariableID,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindIDByUserAndAlarm.Scan: ", err)
			}

		} else {
			customVariables = append(customVariables, customVariable)
		}
	}

	return customVariables, err
}

// FindAlarmsByUser ...
func (m Model) FindAlarmsByUser(userID int64) ([]Alarm, error) {
	alarms := []Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindAlarmsByUser.Open: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	/*
		DEPRECATED
		query := `SELECT
								a.id AS alarm_id, a.name, a.color, a.is_timeout, ucv.custom_variable_id
							FROM users_custom_variables AS ucv
							LEFT JOIN variable_active_alarms AS vaa ON ucv.custom_variable_id = vaa.variable_id
							LEFT JOIN users_alarms AS ua ON ua.alarm_id = vaa.alarm_id
							LEFT JOIN alarms AS a ON a.id = ua.alarm_id
							WHERE ucv.user_id = ?`*/

	query := `SELECT
							ua.alarm_id, a.name, a.alias, a.color, a.setpoint, a.sound, a.is_timeout, a.priority_level,
							ucv.custom_variable_id
						FROM users_custom_variables AS ucv
						LEFT JOIN users_custom_variables_alarms AS uva ON uva.user_custom_variable_id = ucv.id
						LEFT JOIN users_alarms AS ua ON uva.user_alarm_id = ua.id
						LEFT JOIN alarms AS a ON ua.alarm_id = a.id
						WHERE ucv.user_id = ?
						ORDER BY a.priority_level`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindAlarmsByUser.Query: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindAlarmsByUser.Rows.Close: ", err)
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

			alarm.IsCustom = true

			alarms = append(alarms, alarm)
		}
	}

	return alarms, err
}

// FindLastRecordByUser ...
func (m Model) FindLastRecordByUser(userID int64) ([]CustomVariable, error) {
	customVariables := []CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindLastRecord.Open: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var rows *sql.Rows

	query := `SELECT cv.id, cv.name, cv.device, lr.value, lr.timestamp, cv.unit
						FROM users_custom_variables AS ucv
						LEFT JOIN custom_variables AS cv ON ucv.custom_variable_id = cv.id
						LEFT JOIN last_records AS lr ON lr.variable_id = cv.id
						WHERE lr.is_custom = TRUE AND ucv.user_id = ?`

	rows, err = db.Query(query, userID)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Find.Query: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		customVariable := CustomVariable{}

		fields = []interface{}{
			&customVariable.ID,
			&customVariable.Name,
			&customVariable.Device,
			&customVariable.value,
			&customVariable.timestamp,
			&customVariable.Unit,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Find.Scan: ", err)
			}

		} else {
			// filtro de Value
			if customVariable.value.Valid {
				customVariable.Value = customVariable.value.Float64
			}

			// filtro de Timestamp
			if customVariable.timestamp.Valid {
				location, err := time.LoadLocation(constants.TZ)
				if err != nil {
					location = time.Local
				}

				customVariable.Timestamp = customVariable.timestamp.Time.In(location).Format(constants.DateTimeFormat)
			}

			customVariables = append(customVariables, customVariable)
		}
	}

	return customVariables, err
}

// FindLastRecord ...
func (m Model) FindLastRecord() ([]CustomVariable, error) {
	customVariables := []CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindLastRecord.Open: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindLastRecord.Close: ", err)
			}
		}
	}(db)

	var rows *sql.Rows

	query := `SELECT cv.id, cv.name, cv.device, cv.unit, lr.value, lr.timestamp
						FROM custom_variables AS cv
						LEFT JOIN last_records AS lr ON lr.variable_id = cv.id
						WHERE lr.is_custom = TRUE`

	rows, err = db.Query(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Find.Query: ", err)
		}

		return customVariables, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		customVariable := CustomVariable{}

		fields = []interface{}{
			&customVariable.ID,
			&customVariable.Name,
			&customVariable.Device,
			&customVariable.Unit,
			&customVariable.value,
			&customVariable.timestamp,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Find.Scan: ", err)
			}

		} else {
			// filtro de Value
			if customVariable.value.Valid {
				customVariable.Value = customVariable.value.Float64
			}

			// filtro de Timestamp
			if customVariable.timestamp.Valid {
				location, err := time.LoadLocation(constants.TZ)
				if err != nil {
					location = time.Local
				}

				customVariable.Timestamp = customVariable.timestamp.Time.In(location).Format(constants.DateTimeFormat)
			}

			customVariables = append(customVariables, customVariable)
		}
	}

	return customVariables, err
}
