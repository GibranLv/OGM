package variableactivealarm

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (VariableActiveAlarm, error) {
	variableActiveAlarm := VariableActiveAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.Create.Open: ", err)
		}

		return variableActiveAlarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO variable_active_alarms SET"

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
				fmt.Println("Model.VariableActiveAlarm.Create.Prepare: ", err)
			}

			return variableActiveAlarm, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.VariableActiveAlarm.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.Create.Exec: ", err)
			}

			return variableActiveAlarm, err
		}

		var variableActiveAlarmID int64
		variableActiveAlarmID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.Create.LastInsertId: ", err)
			}

			return variableActiveAlarm, err
		}

		query = "SELECT * FROM variable_active_alarms WHERE id = ?"
		row := db.QueryRow(query, variableActiveAlarmID)

		fields := []interface{}{
			&variableActiveAlarm.ID,
			&variableActiveAlarm.AlarmID,
			&variableActiveAlarm.VariableID,
			&variableActiveAlarm.IsCustom,
			&variableActiveAlarm.createdAt,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.Create.Scan: ", err)
			}

			return variableActiveAlarm, err
		}
	}

	// Filtro de CreatedAt
	if variableActiveAlarm.createdAt.Valid {
		variableActiveAlarm.CreatedAt = variableActiveAlarm.createdAt.Time
	}

	return variableActiveAlarm, err
}
