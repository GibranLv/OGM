package variablealarmevent

import (
	"database/sql"
	"fmt"
	"strings"
)

// Find ...
func (m Model) Find(start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]VariableAlarmEvent, error) {
	variableAlarmEvents := []VariableAlarmEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableAlarmEvent.Find.Open: ", err)
		}

		return variableAlarmEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEvent.Find.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{variableID, isCustom}
	var rows *sql.Rows

	query := "SELECT * FROM variable_alarm_events WHERE variable_id = ? AND is_custom = ?"

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE created_at >= '%s' AND created_at < '%s'"
		} else {
			query = query + " AND created_at >= '%s' AND created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE id >= %d"
		} else {
			query = query + " AND id >= %d"
		}

		query = fmt.Sprintf(query, start)
	}

	query = query + " ORDER BY created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableAlarmEvent.Find.Query: ", err)
		}

		return variableAlarmEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEvent.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variableAlarmEvent := VariableAlarmEvent{}

		fields = []interface{}{
			&variableAlarmEvent.ID,
			&variableAlarmEvent.AlarmID,
			&variableAlarmEvent.recordID,
			&variableAlarmEvent.VariableID,
			&variableAlarmEvent.IsCustom,
			&variableAlarmEvent.Name,
			&variableAlarmEvent.Message,
			&variableAlarmEvent.createdAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEvent.Find.Scan: ", err)
			}

		} else {
			// filtro de RecordID
			if variableAlarmEvent.recordID.Valid {
				variableAlarmEvent.RecordID = variableAlarmEvent.recordID.Int64
			}

			// Filtro de CreatedAt
			if variableAlarmEvent.createdAt.Valid {
				variableAlarmEvent.CreatedAt = variableAlarmEvent.createdAt.Time
			}

			variableAlarmEvents = append(variableAlarmEvents, variableAlarmEvent)
		}
	}

	return variableAlarmEvents, err
}

// FindByUser ...
func (m Model) FindByUser(userID int64, start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]VariableAlarmEvent, error) {
	variableAlarmEvents := []VariableAlarmEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("ModelVariableAlarmEventFindByUser.Open: ", err)
		}

		return variableAlarmEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("ModelVariableAlarmEventFindByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{userID, variableID, isCustom}
	var rows *sql.Rows

	query := `SELECT 
							vae.id, vae.alarm_id, vae.variable_id, vae.is_custom,
							vae.name, vae.message, vae.created_at
						FROM variable_alarm_events as vae
						LEFT JOIN alarms AS a ON vae.alarm_id = a.id
						LEFT JOIN users_alarms AS ua ON a.id = ua.alarm_id
						WHERE ua.user_id = ? AND vae.variable_id = ? AND vae.is_custom = ?`

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE vae.created_at >= '%s' AND vae.created_at < '%s'"
		} else {
			query = query + " AND vae.created_at >= '%s' AND vae.created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		query = query + " AND vae.id >= %d"
		query = fmt.Sprintf(query, start)
	}

	query = query + " ORDER BY vae.created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableAlarmEventFindByUser.Query: ", err)
		}

		return variableAlarmEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEventFindByUser.Query: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variableAlarmEvent := VariableAlarmEvent{}

		fields = []interface{}{
			&variableAlarmEvent.ID,
			&variableAlarmEvent.AlarmID,
			&variableAlarmEvent.recordID,
			&variableAlarmEvent.VariableID,
			&variableAlarmEvent.IsCustom,
			&variableAlarmEvent.Name,
			&variableAlarmEvent.Message,
			&variableAlarmEvent.createdAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("ModelVariableAlarmEventFindByUser.Scan: ", err)
			}

		} else {
			// filtro de RecordID
			if variableAlarmEvent.recordID.Valid {
				variableAlarmEvent.RecordID = variableAlarmEvent.recordID.Int64
			}

			// filtro de CreatedAt
			if variableAlarmEvent.createdAt.Valid {
				variableAlarmEvent.CreatedAt = variableAlarmEvent.createdAt.Time
			}

			variableAlarmEvents = append(variableAlarmEvents, variableAlarmEvent)
		}
	}

	return variableAlarmEvents, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(userID int64, value uint8, start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]VariableAlarmEvent, error) {
	variableAlarmEvents := []VariableAlarmEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("ModelVariableAlarmEventFindByUserOrLowerValue.Open: ", err)
		}

		return variableAlarmEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("ModelVariableAlarmEventFindByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value, variableID, isCustom}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT vae.id, vae.alarm_id, vae.variable_id, vae.is_custom,
							vae.name, vae.message, vae.created_at
						FROM variable_alarm_events as vae
						LEFT JOIN alarms AS a ON vae.alarm_id = a.id
						LEFT JOIN users_alarms AS ua ON a.id = ua.alarm_id
						LEFT JOIN users AS u ON u.id = ua.user_id
						WHERE u.id = ? OR u.value > ? AND vae.variable_id = ? AND vae.is_custom = ?`

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE vae.created_at >= '%s' AND vae.created_at < '%s'"
		} else {
			query = query + " AND vae.created_at >= '%s' AND vae.created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		query = query + " AND vae.id >= %d"
		query = fmt.Sprintf(query, start)
	}

	query = " ORDER BY vae.created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("ModelVariableAlarmEventFindByUserOrLowerValue.Query: ", err)
		}

		return variableAlarmEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("ModelVariableAlarmEventFindByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variableAlarmEvent := VariableAlarmEvent{}

		fields = []interface{}{
			&variableAlarmEvent.ID,
			&variableAlarmEvent.AlarmID,
			&variableAlarmEvent.recordID,
			&variableAlarmEvent.VariableID,
			&variableAlarmEvent.IsCustom,
			&variableAlarmEvent.Name,
			&variableAlarmEvent.Message,
			&variableAlarmEvent.createdAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("ModelVariableAlarmEventFindByUserOrLowerValue.Scan: ", err)
			}

		} else {
			// filtro de RecordID
			if variableAlarmEvent.recordID.Valid {
				variableAlarmEvent.RecordID = variableAlarmEvent.recordID.Int64
			}

			// filtro de CreatedAt
			if variableAlarmEvent.createdAt.Valid {
				variableAlarmEvent.CreatedAt = variableAlarmEvent.createdAt.Time
			}

			variableAlarmEvents = append(variableAlarmEvents, variableAlarmEvent)
		}
	}

	return variableAlarmEvents, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(userID int64, value uint8, start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]VariableAlarmEvent, error) {
	variableAlarmEvents := []VariableAlarmEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("ModelVariableAlarmEventFindByUserAndLowerValue.Open: ", err)
		}

		return variableAlarmEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params = []interface{}{userID, value, variableID, isCustom}
	var rows *sql.Rows

	query := `SELECT 
							vae.id, vae.alarm_id, vae.variable_id, vae.is_custom,
							vae.name, vae.message, vae.created_at
						FROM variable_alarm_events as vae
						LEFT JOIN alarms AS a ON vae.alarm_id = a.id
						LEFT JOIN users_alarms AS ua ON a.id = ua.alarm_id
						LEFT JOIN users AS u ON u.id = ua.user_id
						WHERE u.id = ? OR u.value > ? AND vae.variable_id = ? AND vae.is_custom = ?`

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE vae.created_at >= '%s' AND vae.created_at < '%s'"
		} else {
			query = query + " AND vae.created_at >= '%s' AND vae.created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		query = query + " AND vae.id >= %d"
		query = fmt.Sprintf(query, start)
	}

	query = " ORDER BY vae.created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("ModelVariableAlarmEventFindByUserAndLowerValue.Query: ", err)
		}

		return variableAlarmEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("ModelVariableAlarmEventFindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variableAlarmEvent := VariableAlarmEvent{}

		fields = []interface{}{
			&variableAlarmEvent.ID,
			&variableAlarmEvent.AlarmID,
			&variableAlarmEvent.recordID,
			&variableAlarmEvent.VariableID,
			&variableAlarmEvent.IsCustom,
			&variableAlarmEvent.Name,
			&variableAlarmEvent.Message,
			&variableAlarmEvent.createdAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("ModelVariableAlarmEventFindByUserAndLowerValue.Scan: ", err)
			}

		} else {
			// filtro de RecordID
			if variableAlarmEvent.recordID.Valid {
				variableAlarmEvent.RecordID = variableAlarmEvent.recordID.Int64
			}

			// filtro de CreatedAt
			if variableAlarmEvent.createdAt.Valid {
				variableAlarmEvent.CreatedAt = variableAlarmEvent.createdAt.Time
			}

			variableAlarmEvents = append(variableAlarmEvents, variableAlarmEvent)
		}
	}

	return variableAlarmEvents, err
}
