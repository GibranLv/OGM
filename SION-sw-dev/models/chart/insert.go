package chart

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Chart, error) {
	chart := Chart{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.Create.Open: ", err)
		}

		return chart, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO charts SET"

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
				fmt.Println("Model.Chart.Create.Prepare: ", err)
			}

			return chart, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Chart.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.Create.Exec: ", err)
			}

			return chart, err
		}

		var chartID int64
		chartID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.Create.LastInsertId: ", err)
			}

			return chart, err
		}

		query = "SELECT * FROM charts WHERE id = ?"
		row := db.QueryRow(query, chartID)

		fields := []interface{}{
			&chart.ID,
			&chart.UserID,
			&chart.VariableID,
			&chart.IsCustom,
			&chart.unitID,
			&chart.Name,
			&chart.Color,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.Create.Scan: ", err)
			}

			return chart, err
		}

		// filtro de UnitID
		if chart.unitID.Valid {
			chart.UnitID = chart.unitID.Int64
		}

	}

	return chart, err
}
