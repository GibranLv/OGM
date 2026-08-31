package chart

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Chart, error) {
	chart := Chart{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.Update.Open: ", err)
		}

		return chart, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.Update.Open: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.Chart.Update.Values: ", err)
		}

		return chart, err
	}

	var stmt *sql.Stmt

	query := "UPDATE charts SET {{fields}} WHERE id = ?"

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

	chartID := values[KeyID]
	params = append(params, chartID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.Update.Prepare: ", err)
		}

		return chart, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.Update.Exec: ", err)
		}

		return chart, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.Update.RowsAffected: ", err)
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
			fmt.Println("Model.Chart.Update.Scan: ", err)
		}

		return chart, err
	}

	// filtro de UnitID
	if chart.unitID.Valid {
		chart.UnitID = chart.unitID.Int64
	}

	return chart, err
}
