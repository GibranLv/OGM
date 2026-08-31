package alarm

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Alarm, error) {
	alarm := Alarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Alarm.Create.Open: ", err)
		}

		return alarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO alarms SET"

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
				fmt.Println("Model.Alarm.Create.Prepare: ", err)
			}

			return alarm, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Alarm.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.Create.Exec: ", err)
			}

			return alarm, err
		}

		var alarmID int64
		alarmID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Alarm.Create.LastInsertId: ", err)
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
				fmt.Println("Model.Alarm.Create.Scan: ", err)
			}

			return alarm, err
		}

		if alarm.unitID.Valid {
			alarm.UnitID = alarm.unitID.Int64
		}
	}

	return alarm, err
}
