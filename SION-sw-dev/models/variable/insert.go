package variable

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Variable, error) {
	variable := Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.Create.Open: ", err)
		}

		return variable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO variables SET"

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
				fmt.Println("Model.Variable.Create.Prepare: ", err)
			}

			return variable, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Variable.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.Create.Exec: ", err)
			}

			return variable, err
		}

		var variableID int64
		variableID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.Create.LastInsertId: ", err)
			}

			return variable, err
		}

		query = "SELECT * FROM variables WHERE id = ?"
		row := db.QueryRow(query, variableID)

		fields := []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Alias,
			&variable.Device,
			&variable.ReadingUnit,
			&variable.ExpressionInsert,
			&variable.Status,
			&variable.createdAt,
			&variable.updatedAt,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.Create.Scan: ", err)
			}

			return variable, err
		}

		// filtro de CreateAt
		if variable.createdAt.Valid {
			variable.CreatedAt = variable.createdAt.Time
		}

		// filtro de UpdatedAt
		if variable.updatedAt.Valid {
			variable.UpdatedAt = variable.updatedAt.Time
		}

	}

	return variable, err
}
