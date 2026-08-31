package variableactivealarm

import (
	"database/sql"
	"fmt"
)

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.Remove.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.Remove.Close: ", err)
			}
		}
	}(db)

	query := "DELETE FROM variable_active_alarms WHERE"

	var params []interface{}
	var stmt *sql.Stmt
	var res sql.Result

	lenWhere := len(where)
	if lenWhere > 0 {
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

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.Remove.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.Remove.Stmt.Close: ", err)
			}
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.Remove.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.Remove.RowsAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}

// RemoveOfTimeout ...
func (m Model) RemoveOfTimeout(variableID int64, isCustom bool) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.RemoveOfTimeout.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.VariableActiveAlarm.RemoveOfTimeout.Close: ", err)
			}
		}
	}(db)

	query := `DELETE vaa 
						FROM variable_active_alarms as vaa
						LEFT JOIN alarms AS a ON vaa.alarm_id = a.id
						WHERE vaa.variable_id = ? AND vaa.is_custom = ? AND a.is_timeout = TRUE`

	params := []interface{}{variableID, isCustom}
	var stmt *sql.Stmt
	var res sql.Result

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.RemoveOfTimeout.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("stmt.Error: ", err)
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.RemoveOfTimeout.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.RemoveOfTimeout.RowsAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}

// RemoveOfValue ...
func (m Model) RemoveOfValue(variableID int64, isCustom bool) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.RemoveOfValue.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	query := `DELETE vaa 
						FROM variable_active_alarms as vaa
						LEFT JOIN alarms AS a ON vaa.alarm_id = a.id
						WHERE vaa.variable_id = ? AND vaa.is_custom = ? AND a.is_timeout = FALSE`

	params := []interface{}{variableID, isCustom}
	var stmt *sql.Stmt
	var res sql.Result

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.RemoveOfValue.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("stmt.Error: ", err)
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.RemoveOfValue.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.VariableActiveAlarm.RemoveOfValue.RowsAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}
