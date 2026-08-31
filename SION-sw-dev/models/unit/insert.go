package unit

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Unit, error) {
	unit := Unit{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Unit.Create.Open: ", err)
		}

		return unit, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO units SET"

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
				fmt.Println("Model.Unit.Create.Prepare: ", err)
			}

			return unit, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Unit.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.Create.Exec: ", err)
			}

			return unit, err
		}

		var unitID int64
		unitID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.Create.LastInsertId: ", err)
			}

			return unit, err
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
				fmt.Println("Model.Unit.Create.Scan: ", err)
			}

			return unit, err
		}
	}

	return unit, err
}
