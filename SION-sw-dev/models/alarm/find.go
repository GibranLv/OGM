package alarm

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]Alarm, error) {
	alarms := []Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.Find.Open: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM alarms"

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
			fmt.Println("Model.Alarm.Find.Query: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		alarm := Alarm{}

		fields = []interface{}{
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

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.Find.Scan: ", err)
			}

		} else {
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			alarms = append(alarms, alarm)
		}
	}

	return alarms, err
}

// FindByUser ...
func (m Model) FindByUser(userID int64) ([]Alarm, error) {
	alarms := []Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByUser.Open: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByUser.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT
							a.id, a.unit_id, a.name, a.alias, a.color, a.expression,
							a.message, a.setpoint, a.timeout, a.is_timeout, a.priority_level,
							a.sound, a.status,
							u.name AS unit_name
						FROM alarms AS a
						LEFT JOIN users_alarms AS ua ON a.id = ua.alarm_id
						LEFT JOIN units AS u ON u.id = a.unit_id
						WHERE ua.user_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByUser.Query: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		alarm := Alarm{}

		fields = []interface{}{
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
			&alarm.unitName,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByUser.Scan: ", err)
			}

		} else {
			// filtro de UnitID
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			if alarm.unitName.Valid {
				alarm.UnitName = alarm.unitName.String
			}

			alarms = append(alarms, alarm)
		}
	}

	return alarms, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(userID int64, value uint8) ([]Alarm, error) {
	alarms := []Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByUserOrLowerValue.Open: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
						DISTINCT a.id, a.unit_id, a.name, a.alias, a.color, a.expression,
							a.message, a.setpoint, a.timeout, a.is_timeout, a.priority_level,
							a.sound, a.status,
							us.name AS unit_name
						FROM alarms AS a
						LEFT JOIN users_alarms AS ua ON a.id = ua.alarm_id
						LEFT JOIN users AS u ON u.id = ua.user_id
						LEFT JOIN units AS us ON us.id = a.unit_id
						WHERE u.id = ? OR u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByUserOrLowerValue.Query: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		alarm := Alarm{}

		fields = []interface{}{
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
			&alarm.unitName,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByUserOrLowerValue.Scan: ", err)
			}

		} else {
			// filtro de UnitID
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			if alarm.unitName.Valid {
				alarm.UnitName = alarm.unitName.String
			}

			alarms = append(alarms, alarm)
		}
	}

	return alarms, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(userID int64, value uint8) ([]Alarm, error) {
	alarms := []Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByUserAndLowerValue.Open: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
						DISTINCT a.id, a.unit_id, a.name, a.alias, a.color, a.expression,
							a.message, a.setpoint, a.timeout, a.is_timeout, a.priority_level,
							a.sound, a.status,
							us.name AS unit_name
						FROM alarms AS a
						LEFT JOIN users_alarms AS ua ON a.id = ua.alarm_id
						LEFT JOIN users AS u ON u.id = ua.user_id
						LEFT JOIN units AS us ON us.id = a.unit_id
						WHERE u.id = ? AND u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByUserAndLowerValue.Query: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		alarm := Alarm{}

		fields = []interface{}{
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
			&alarm.unitName,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {
			// filtro de UnitID
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			if alarm.unitName.Valid {
				alarm.UnitName = alarm.unitName.String
			}

			alarms = append(alarms, alarm)
		}
	}

	return alarms, err
}

// FindByVariableAndActive ...
func (m Model) FindByVariableAndActive(variableID int64, isTimeout bool) ([]Alarm, error) {
	alarms := []Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByVariableAndActive.Open: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByVariableAndActive.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{variableID, isTimeout}
	var rows *sql.Rows

	query := `SELECT
							a.id, ua.user_id, a.name, a.alias, a.color, a.expression, a.message, a.setpoint,
							a.timeout, a.is_timeout, a.priority_level, a.sound,
							a.unit_id, u.name AS unit_name, u.expression AS unit_expression,
							u.display AS unit_display
						FROM alarms AS a
						LEFT JOIN units AS u ON u.id = a.unit_id
						LEFT JOIN users_alarms AS ua ON ua.alarm_id = a.id
						LEFT JOIN users_variables_alarms AS uva ON uva.user_alarm_id = ua.id
						LEFT JOIN users_variables AS uv ON uv.id = uva.user_variable_id
						WHERE uv.variable_id = ? AND a.status = TRUE AND a.is_timeout = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByVariableAndActive.Query: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByVariableAndActive.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		alarm := Alarm{}

		fields = []interface{}{
			&alarm.ID,
			&alarm.UserID,
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
			&alarm.unitID,
			&alarm.unitName,
			&alarm.unitExpression,
			&alarm.unitDisplay,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByVariableAndActive.Scan: ", err)
			}

		} else {
			// filtro de UnitID
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			// filtro de UnitName
			if alarm.unitName.Valid {
				alarm.UnitName = alarm.unitName.String
			}

			// filtro de UnitExpression
			if alarm.unitExpression.Valid {
				alarm.UnitExpression = alarm.unitExpression.String
			}

			// filtro de UnitDisplay
			if alarm.unitDisplay.Valid {
				alarm.UnitDisplay = alarm.unitDisplay.String
			}

			alarms = append(alarms, alarm)
		}
	}

	return alarms, err
}

// FindByCustomVariableAndActive ...
func (m Model) FindByCustomVariableAndActive(variableID int64, isTimeout bool) ([]Alarm, error) {
	alarms := []Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByCustomVariable.Open: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByCustomVariable.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{variableID, isTimeout}
	var rows *sql.Rows

	query := `SELECT
							a.id, ua.user_id, a.name, a.alias, a.color, a.expression, a.message, a.setpoint,
							a.timeout, a.is_timeout, a.priority_level, a.sound,
							a.unit_id, u.name AS unit_name, u.expression AS unit_expression,
							u.display AS unit_display
						FROM alarms AS a
						LEFT JOIN units AS u ON u.id = a.unit_id
						LEFT JOIN users_alarms AS ua ON ua.alarm_id = a.id
						LEFT JOIN users_custom_variables_alarms AS ucva ON ucva.user_alarm_id = ua.id
						LEFT JOIN users_custom_variables AS ucv ON ucv.id = ucva.user_custom_variable_id
						WHERE ucv.custom_variable_id = ? AND a.status = TRUE AND a.is_timeout = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByCustomVariable.Query: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByCustomVariable.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		alarm := Alarm{}

		fields = []interface{}{
			&alarm.ID,
			&alarm.UserID,
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
			&alarm.unitID,
			&alarm.unitName,
			&alarm.unitExpression,
			&alarm.unitDisplay,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByCustomVariable.Scan: ", err)
			}

		} else {
			// filtro de UnitID
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			// filtro de UnitName
			if alarm.unitName.Valid {
				alarm.UnitName = alarm.unitName.String
			}

			// filtro de UnitExpression
			if alarm.unitExpression.Valid {
				alarm.UnitExpression = alarm.unitExpression.String
			}

			// filtro de UnitDisplay
			if alarm.unitDisplay.Valid {
				alarm.UnitDisplay = alarm.unitDisplay.String
			}

			alarms = append(alarms, alarm)
		}
	}

	return alarms, err
}

// FindByUserAndVariable ...
func (m Model) FindByUserAndVariable(userID, variableID int64, isTimeout bool) ([]Alarm, error) {
	alarms := []Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByVariableAndActive.Open: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByVariableAndActive.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, variableID, isTimeout}
	var rows *sql.Rows

	query := `SELECT
							a.id, ua.user_id, a.name, a.alias, a.color, a.expression, a.message, a.setpoint,
							a.timeout, a.is_timeout, a.priority_level, a.sound,
							a.unit_id, u.name AS unit_name, u.expression AS unit_expression,
							u.display AS unit_display
						FROM alarms AS a
						LEFT JOIN units AS u ON u.id = a.unit_id
						LEFT JOIN users_alarms AS ua ON ua.alarm_id = a.id
						LEFT JOIN users_variables_alarms AS uva ON uva.user_alarm_id = ua.id
						LEFT JOIN users_variables AS uv ON uv.id = uva.user_variable_id
						WHERE ua.user_id = ? AND uv.variable_id = ? AND a.is_timeout = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByVariableAndActive.Query: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByVariableAndActive.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		alarm := Alarm{}

		fields = []interface{}{
			&alarm.ID,
			&alarm.UserID,
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
			&alarm.unitID,
			&alarm.unitName,
			&alarm.unitExpression,
			&alarm.unitDisplay,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByVariableAndActive.Scan: ", err)
			}

		} else {
			// filtro de UnitID
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			// filtro de UnitName
			if alarm.unitName.Valid {
				alarm.UnitName = alarm.unitName.String
			}

			// filtro de UnitExpression
			if alarm.unitExpression.Valid {
				alarm.UnitExpression = alarm.unitExpression.String
			}

			// filtro de UnitDisplay
			if alarm.unitDisplay.Valid {
				alarm.UnitDisplay = alarm.unitDisplay.String
			}

			alarms = append(alarms, alarm)
		}
	}

	return alarms, err
}

// FindByUserCustomVariable ...
func (m Model) FindByUserCustomVariable(userID, variableID int64, isTimeout bool) ([]Alarm, error) {
	alarms := []Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByUserCustomVariable.Open: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByUserCustomVariable.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, variableID, isTimeout}
	var rows *sql.Rows

	query := `SELECT
							a.id, ua.user_id, a.name, a.alias, a.color, a.expression, a.message, a.setpoint,
							a.timeout, a.is_timeout, a.priority_level, a.sound,
							a.unit_id, u.name AS unit_name, u.expression AS unit_expression,
							u.display AS unit_display
						FROM alarms AS a
						LEFT JOIN units AS u ON u.id = a.unit_id
						LEFT JOIN users_alarms AS ua ON ua.alarm_id = a.id
						LEFT JOIN users_custom_variables_alarms AS ucva ON ucva.user_alarm_id = ua.id
						LEFT JOIN users_custom_variables AS ucv ON ucv.id = ucva.user_custom_variable_id
						WHERE ua.user_id = ? AND ucv.custom_variable_id = ? AND a.is_timeout = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByUserCustomVariable.Query: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByUserCustomVariable.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		alarm := Alarm{}

		fields = []interface{}{
			&alarm.ID,
			&alarm.UserID,
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
			&alarm.unitID,
			&alarm.unitName,
			&alarm.unitExpression,
			&alarm.unitDisplay,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByCustomVariable.Scan: ", err)
			}

		} else {
			// filtro de UnitID
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			// filtro de UnitName
			if alarm.unitName.Valid {
				alarm.UnitName = alarm.unitName.String
			}

			// filtro de UnitExpression
			if alarm.unitExpression.Valid {
				alarm.UnitExpression = alarm.unitExpression.String
			}

			// filtro de UnitDisplay
			if alarm.unitDisplay.Valid {
				alarm.UnitDisplay = alarm.unitDisplay.String
			}

			alarms = append(alarms, alarm)
		}
	}

	return alarms, err
}

// FindByCustomVariable ...
func (m Model) FindByCustomVariable(variableID int64, isTimeout bool) ([]Alarm, error) {
	alarms := []Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByCustomVariable.Open: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByCustomVariable.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{variableID, isTimeout}
	var rows *sql.Rows

	query := `SELECT
							a.id, ua.user_id, a.name, a.alias, a.color, a.expression, a.message, a.setpoint,
							a.timeout, a.is_timeout, a.priority_level, a.sound,
							a.unit_id, u.name AS unit_name, u.expression AS unit_expression,
							u.display AS unit_display
						FROM alarms AS a
						LEFT JOIN units AS u ON u.id = a.unit_id
						LEFT JOIN users_alarms AS ua ON ua.alarm_id = a.id
						LEFT JOIN users_custom_variables_alarms AS ucva ON ucva.user_alarm_id = ua.id
						LEFT JOIN users_custom_variables AS ucv ON ucv.id = ucva.user_custom_variable_id
						WHERE ucv.custom_variable_id = ? AND a.is_timeout = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindByCustomVariable.Query: ", err)
		}

		return alarms, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByCustomVariable.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		alarm := Alarm{}

		fields = []interface{}{
			&alarm.ID,
			&alarm.UserID,
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
			&alarm.unitID,
			&alarm.unitName,
			&alarm.unitExpression,
			&alarm.unitDisplay,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindByCustomVariable.Scan: ", err)
			}

		} else {
			// filtro de UnitID
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			// filtro de UnitName
			if alarm.unitName.Valid {
				alarm.UnitName = alarm.unitName.String
			}

			// filtro de UnitExpression
			if alarm.unitExpression.Valid {
				alarm.UnitExpression = alarm.unitExpression.String
			}

			// filtro de UnitDisplay
			if alarm.unitDisplay.Valid {
				alarm.UnitDisplay = alarm.unitDisplay.String
			}

			alarms = append(alarms, alarm)
		}
	}

	return alarms, err
}
