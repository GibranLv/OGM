package variablealarmevent

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (VariableAlarmEvent, error) {
	variableAlarmEvent := VariableAlarmEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableAlarmEvent.Create.Open: ", err)
		}

		return variableAlarmEvent, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEvent.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO variable_alarm_events SET"

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
				fmt.Println("Model.VariableAlarmEvent.Create.Prepare: ", err)
			}

			return variableAlarmEvent, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.VariableAlarmEvent.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEvent.Create.Exec: ", err)
			}

			return variableAlarmEvent, err
		}

		var variableAlarmEventID int64
		variableAlarmEventID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEvent.Create.LastInsertId: ", err)
			}

			return variableAlarmEvent, err
		}

		query = "SELECT * FROM variable_alarm_events WHERE id = ?"
		row := db.QueryRow(query, variableAlarmEventID)

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

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableAlarmEvent.Create.Scan: ", err)
			}

			return variableAlarmEvent, err
		}
	}

	// filtro de RecordID
	if variableAlarmEvent.recordID.Valid {
		variableAlarmEvent.RecordID = variableAlarmEvent.recordID.Int64
	}

	// Filtro de CreatedAt
	if variableAlarmEvent.createdAt.Valid {
		variableAlarmEvent.CreatedAt = variableAlarmEvent.createdAt.Time
	}

	return variableAlarmEvent, err
}
