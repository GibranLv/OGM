package chartevent

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (ChartEvent, error) {
	chartEvent := ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindOne.Open: ", err)
		}

		return chartEvent, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM chart_events"

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
			fmt.Println("Model.ChartEvent.FindOne.Query: ", err)
		}

		return chartEvent, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	chartEvents := []ChartEvent{}

	for rows.Next() {
		chartEvent := ChartEvent{}

		fields := []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOne.Scan: ", err)
			}

			return chartEvent, err
		}

		if chartEvent.ID != 0 {

			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	if len(chartEvents) == 0 {
		return chartEvent, err
	}

	chartEvent = chartEvents[0]

	return chartEvent, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (ChartEvent, error) {
	chartEvent := ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindOneByChartOrLowerValue.Open: ", err)
		}

		return chartEvent, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOneByChartOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT 
							c.id, c.user_id, c.record_id, c.variable_id, c.is_custom,
							c.name, c.description, c.files, c.created_at, c.updated_at
						FROM chart_events AS c
						LEFT JOIN users AS u ON u.id = c.user_id
						WHERE c.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindOneByChartOrLowerValue.query: ", err)
		}

		return chartEvent, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOneByChartOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	chartEvents := []ChartEvent{}

	for rows.Next() {
		chartEvent := ChartEvent{}

		fields := []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOneByChartOrLowerValue.Scan: ", err)
			}

			return chartEvent, err
		}

		if chartEvent.ID != 0 {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	if len(chartEvents) == 0 {
		return chartEvent, err
	}

	chartEvent = chartEvents[0]

	return chartEvent, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (ChartEvent, error) {
	chartEvent := ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindOneByUser.Open: ", err)
		}

		return chartEvent, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT 
							c.id, c.user_id, c.record_id, c.variable_id, c.is_custom,
							c.name, c.description, c.files, c.created_at, c.updated_at
						FROM chart_events AS c
						LEFT JOIN users AS u ON u.id = c.user_id
						WHERE c.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindOneByUser.Query: ", err)
		}

		return chartEvent, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	chartEvents := []ChartEvent{}

	for rows.Next() {
		chartEvent := ChartEvent{}

		fields := []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOneByUser.Scan: ", err)
			}

			return chartEvent, err
		}

		if chartEvent.ID != 0 {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	if len(chartEvents) == 0 {
		return chartEvent, err
	}

	chartEvent = chartEvents[0]

	return chartEvent, err
}

// FindOneTotable ...
func (m Model) FindOneTotable(chartEventID int64, isCustom bool) (ChartEvent, error) {
	chartEvent := ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindOneToTable.Open: ", err)
		}

		return chartEvent, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOneToTable.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{chartEventID}
	var rows *sql.Rows

	table := "variables"
	if isCustom {
		table = "custom_variables"
	}

	query := fmt.Sprintf(`SELECT 
												ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
												ce.description, ce.files, ce.created_at, ce.updated_at,
												u.name AS user_name,
												v.name AS variable_name,
												v.device AS variable_device
											FROM chart_events AS ce
											LEFT JOIN users AS u ON ce.user_id = u.id
											LEFT JOIN %s AS v ON ce.variable_id = v.id
											WHERE ce.id = ?`, table)

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindOneToTable.Query: ", err)
		}

		return chartEvent, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOneToTable.Rows.Close: ", err)
			}
		}
	}(rows)

	chartEvents := []ChartEvent{}

	for rows.Next() {
		chartEvent := ChartEvent{}

		fields := []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOneToTable.Scan: ", err)
			}

			return chartEvent, err
		}

		if chartEvent.ID != 0 {

			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	if len(chartEvents) == 0 {
		return chartEvent, err
	}

	chartEvent = chartEvents[0]

	return chartEvent, err
}
