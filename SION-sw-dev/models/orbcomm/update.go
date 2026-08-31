package orbcomm

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Orbcomm, error) {
	orbcomm := Orbcomm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.Update.Open: ", err)
		}

		return orbcomm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.Update.Open: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.Orbcomm.Update.Values: ", err)
		}

		return orbcomm, err
	}

	var stmt *sql.Stmt

	query := "UPDATE orbcomms SET {{fields}} WHERE id = ?"

	i := 0
	for k, v := range values {
		isID := k == KeyID
		if !isID {
			params = append(params, v)

			if i == 0 {
				fieldsIn = fieldsIn + " " + k + " = ?"
				i = i + 1
			} else {
				fieldsIn = fieldsIn + ", " + k + " = ?"
			}
		}
	}

	query = strings.Replace(query, "{{fields}}", fieldsIn, 1)

	orbcommID := values[KeyID]
	params = append(params, orbcommID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.Update.Prepare: ", err)
		}

		return orbcomm, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.Update.Exec: ", err)
		}

		return orbcomm, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.Update.RowsAffected: ", err)
		}

		return orbcomm, err
	}

	query = "SELECT * FROM orbcomms WHERE id = ?"
	row := db.QueryRow(query, orbcommID)

	fields := []interface{}{
		&orbcomm.ID,
		&orbcomm.MobileID,
		&orbcomm.NextStartID,
		&orbcomm.Modbus,
		&orbcomm.Status,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.Update.Scan: ", err)
		}

		return orbcomm, err
	}

	return orbcomm, err
}
