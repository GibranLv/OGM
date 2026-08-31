package unit

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Unit, error) {
	unit := Unit{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Unit.Update.Open: ", err)
		}

		return unit, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.Unit.Update.Values: ", err)
		}

		return unit, err
	}

	var stmt *sql.Stmt

	query := "UPDATE units SET {{fields}} WHERE id = ?"

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

	unitID := values[KeyID]
	params = append(params, unitID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Unit.Update.Prepare: ", err)
		}

		return unit, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Unit.Update.Exec: ", err)
		}

		return unit, err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Unit.Update.RowsAffected: ", err)
		}

		return unit, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.Unit.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = "SELECT * FROM units WHERE id = ?"
	row := db.QueryRow(query, unitID)

	fields := []interface{}{
		&unit.ID,
		&unit.Name,
		&unit.Expression,
		&unit.Display,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Unit.Update.Scan: ", err)
		}

		return unit, err
	}

	return unit, err
}
