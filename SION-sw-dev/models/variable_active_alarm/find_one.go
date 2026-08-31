package variableactivealarm

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (VariableActiveAlarm, error) {
	variableActiveAlarm := VariableActiveAlarm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.FindOne.Open: ", err)
		}

		return variableActiveAlarm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM variable_active_alarms"

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
			fmt.Println("Model.VariableActiveAlarm.FindOne.Query: ", err)
		}

		return variableActiveAlarm, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	variableActiveAlarms := []VariableActiveAlarm{}

	for rows.Next() {
		variableActiveAlarm := VariableActiveAlarm{}

		fields := []interface{}{
			&variableActiveAlarm.ID,
			&variableActiveAlarm.AlarmID,
			&variableActiveAlarm.VariableID,
			&variableActiveAlarm.IsCustom,
			&variableActiveAlarm.createdAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.FindOne.Scan: ", err)
			}

			return variableActiveAlarm, err
		}

		if variableActiveAlarm.ID != 0 {

			// filtro de CreatedAt
			if variableActiveAlarm.createdAt.Valid {
				variableActiveAlarm.CreatedAt = variableActiveAlarm.createdAt.Time
			}

			variableActiveAlarms = append(variableActiveAlarms, variableActiveAlarm)
		}
	}

	if len(variableActiveAlarms) == 0 {
		return variableActiveAlarm, err
	}

	variableActiveAlarm = variableActiveAlarms[0]

	return variableActiveAlarm, err
}
