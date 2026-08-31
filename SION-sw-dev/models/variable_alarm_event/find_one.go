package variablealarmevent

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (VariableAlarmEvent, error) {
	variableAlarmEvent := VariableAlarmEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableAlarmEvent.FindOne.Open: ", err)
		}

		return variableAlarmEvent, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEvent.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM variable_alarm_events"

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

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableAlarmEvent.FindOne.Query: ", err)
		}

		return variableAlarmEvent, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEvent.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	variableAlarmEvents := []VariableAlarmEvent{}

	for rows.Next() {
		variableAlarmEvent := VariableAlarmEvent{}

		fields := []interface{}{
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
				fmt.Println("Model.VariableAlarmEvent.FindOne.Scan: ", err)
			}

			return variableAlarmEvent, err
		}

		if variableAlarmEvent.ID != 0 {

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

	if len(variableAlarmEvents) == 0 {
		return variableAlarmEvent, err
	}

	variableAlarmEvent = variableAlarmEvents[0]

	return variableAlarmEvent, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (VariableAlarmEvent, error) {
	variableAlarmEvent := VariableAlarmEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("ModelVariableAlarmEventFindOneByAlarmOrLowerValue.Open: ", err)
		}

		return variableAlarmEvent, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("ModelVariableAlarmEventFindOneByAlarmOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT vae.id, vae.alarm_id, vae.variable_id, vae.is_custom,
							vae.name, vae.message, vae.created_at
						FROM variable_alarm_events as vae
						LEFT JOIN alarms AS a ON vae.alarm_id = a.id
						LEFT JOIN users_alarms AS ua ON a.id = ua.alarm_id
						LEFT JOIN users AS u ON u.id = ua.user_id
						WHERE a.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("ModelVariableAlarmEventFindOneByAlarmOrLowerValue.Query: ", err)
		}

		return variableAlarmEvent, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("ModelVariableAlarmEventFindOneByAlarmOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	variableAlarmEvents := []VariableAlarmEvent{}

	for rows.Next() {
		variableAlarmEvent := VariableAlarmEvent{}

		fields := []interface{}{
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
				fmt.Println("ModelVariableAlarmEventFindOneByAlarmOrLowerValue.Scan: ", err)
			}

			return variableAlarmEvent, err
		}

		if variableAlarmEvent.ID != 0 {
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

	if len(variableAlarmEvents) == 0 {
		return variableAlarmEvent, err
	}

	variableAlarmEvent = variableAlarmEvents[0]

	return variableAlarmEvent, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (VariableAlarmEvent, error) {
	variableAlarmEvent := VariableAlarmEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("ModelVariableAlarmEventFindOneByUser.Open: ", err)
		}

		return variableAlarmEvent, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("ModelVariableAlarmEventFindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT 
							vae.id, vae.alarm_id, vae.variable_id, vae.is_custom,
							vae.name, vae.message, vae.created_at
						FROM variable_alarm_events as vae
						LEFT JOIN alarms AS a ON vae.alarm_id = a.id
						LEFT JOIN users_alarms AS ua ON a.id = ua.alarm_id
						LEFT JOIN users AS u ON u.id = ua.user_id
						WHERE a.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("ModelVariableAlarmEventFindOneByUser.Query: ", err)
		}

		return variableAlarmEvent, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("ModelVariableAlarmEventFindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	variableAlarmEvents := []VariableAlarmEvent{}

	for rows.Next() {
		variableAlarmEvent := VariableAlarmEvent{}

		fields := []interface{}{
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
				fmt.Println("ModelVariableAlarmEventFindOneByUser.Scan: ", err)
			}

			return variableAlarmEvent, err
		}

		if variableAlarmEvent.ID != 0 {

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

	if len(variableAlarmEvents) == 0 {
		return variableAlarmEvent, err
	}

	variableAlarmEvent = variableAlarmEvents[0]

	return variableAlarmEvent, err
}
