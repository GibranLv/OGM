package chart

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Chart, error) {
	chart := Chart{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.FindOne.Open: ", err)
		}

		return chart, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM charts"

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
			fmt.Println("Model.Chart.FindOne.Query: ", err)
		}

		return chart, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	charts := []Chart{}

	for rows.Next() {
		chart := Chart{}

		fields := []interface{}{
			&chart.ID,
			&chart.UserID,
			&chart.VariableID,
			&chart.IsCustom,
			&chart.unitID,
			&chart.Name,
			&chart.Color,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.FindOne.Scan: ", err)
			}

			return chart, err
		}

		if chart.ID != 0 {

			// filtro de UnitID
			if chart.unitID.Valid {
				chart.UnitID = chart.unitID.Int64
			}

			charts = append(charts, chart)
		}
	}

	if len(charts) == 0 {
		return chart, err
	}

	chart = charts[0]

	return chart, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (Chart, error) {
	chart := Chart{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.FindOneByChartOrLowerValue.Open: ", err)
		}

		return chart, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.FindOneByChartOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT 
							c.id, c.user_id, c.variable_id, c.is_custom, c.unit_id, c.color
						FROM charts AS c
						LEFT JOIN users AS u ON u.id = c.user_id
						WHERE c.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.FindOneByChartOrLowerValue.query: ", err)
		}

		return chart, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.FindOneByChartOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	charts := []Chart{}

	for rows.Next() {
		chart := Chart{}

		fields := []interface{}{
			&chart.ID,
			&chart.UserID,
			&chart.VariableID,
			&chart.IsCustom,
			&chart.unitID,
			&chart.Color,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.FindOneByChartOrLowerValue.Scan: ", err)
			}

			return chart, err
		}

		if chart.ID != 0 {

			// filtro de UnitID
			if chart.unitID.Valid {
				chart.UnitID = chart.unitID.Int64
			}

			charts = append(charts, chart)
		}
	}

	if len(charts) == 0 {
		return chart, err
	}

	chart = charts[0]

	return chart, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (Chart, error) {
	chart := Chart{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.FindOneByUser.Open: ", err)
		}

		return chart, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT 
							c.id, c.user_id, c.variable_id, c.is_custom, c.unit_id, c.color
						FROM charts AS c
						LEFT JOIN users AS u ON u.id = c.user_id
						WHERE c.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.FindOneByUser.Query: ", err)
		}

		return chart, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	charts := []Chart{}

	for rows.Next() {
		chart := Chart{}

		fields := []interface{}{
			&chart.ID,
			&chart.UserID,
			&chart.VariableID,
			&chart.IsCustom,
			&chart.unitID,
			&chart.Color,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.FindOneByUser.Scan: ", err)
			}

			return chart, err
		}

		if chart.ID != 0 {

			// filtro de UnitID
			if chart.unitID.Valid {
				chart.UnitID = chart.unitID.Int64
			}

			charts = append(charts, chart)
		}
	}

	if len(charts) == 0 {
		return chart, err
	}

	chart = charts[0]

	return chart, err
}
