package alarm

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Alarm, error) {
	alarm := Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindOne.Open: ", err)
		}

		return alarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM alarms"

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
			fmt.Println("Model.Alarm.FindOne.Query: ", err)
		}

		return alarm, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	alarms := []Alarm{}

	for rows.Next() {
		alarm := Alarm{}

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

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindOne.Scan: ", err)
			}

			return alarm, err
		}

		if alarm.ID != 0 {
			// filtro de UnitID
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			alarms = append(alarms, alarm)
		}
	}

	if len(alarms) == 0 {
		return alarm, err
	}

	alarm = alarms[0]

	if alarm.unitID.Valid {
		alarm.UnitID = alarm.unitID.Int64
	}

	return alarm, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (Alarm, error) {
	alarm := Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindOneByAlarmOrLowerValue.Open: ", err)
		}

		return alarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindOneByAlarmOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
							a.id, a.unit_id, a.name, a.alias, a.color, a.expression,
							a.message, a.setpoint, a.timeout, a.is_timeout, a.priority_level, a.sound, a.status,
							ua.user_id, ua.is_creator
						FROM alarms AS a
						LEFT JOIN users_alarms AS ua ON a.id = ua.alarm_id
						LEFT JOIN users AS u ON u.id = ua.user_id
						WHERE a.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindOneByAlarmOrLowerValue.Query: ", err)
		}

		return alarm, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindOneByAlarmOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	alarms := []Alarm{}

	for rows.Next() {
		alarm := Alarm{}

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
			&alarm.UserID,
			&alarm.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindOneByAlarmOrLowerValue.Scan: ", err)
			}

			return alarm, err
		}

		if alarm.ID != 0 {
			// filtro de UnitID
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			alarms = append(alarms, alarm)
		}
	}

	if len(alarms) == 0 {
		return alarm, err
	}

	alarm = alarms[0]

	return alarm, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (Alarm, error) {
	alarm := Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindOneByUser.Open: ", err)
		}

		return alarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT
							a.id, a.unit_id, a.name, a.alias, a.color, a.expression,
							a.message, a.setpoint, a.timeout, a.is_timeout, a.priority_level, a.sound, a.status,
							ua.user_id, ua.is_creator
						FROM alarms AS a
						LEFT JOIN users_alarms AS ua ON a.id = ua.alarm_id
						LEFT JOIN users AS u ON u.id = ua.user_id
						WHERE a.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.FindOneByUser.Query: ", err)
		}

		return alarm, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindOneByUser.Close: ", err)
			}
		}
	}(rows)

	alarms := []Alarm{}

	for rows.Next() {
		alarm := Alarm{}

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
			&alarm.UserID,
			&alarm.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.FindOneByUser.Scan: ", err)
			}

			return alarm, err
		}

		if alarm.ID != 0 {

			// filtro de UnitID
			if alarm.unitID.Valid {
				alarm.UnitID = alarm.unitID.Int64
			}

			alarms = append(alarms, alarm)
		}
	}

	if len(alarms) == 0 {
		return alarm, err
	}

	alarm = alarms[0]

	return alarm, err
}
