package chartevent

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (ChartEvent, error) {
	chartEvent := ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.Update.Open: ", err)
		}

		return chartEvent, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.Update.Close: ", err)
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

		return chartEvent, err
	}

	var stmt *sql.Stmt

	query := "UPDATE chart_events SET {{fields}} WHERE id = ?"

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

	chartEventID := values[KeyID]
	params = append(params, chartEventID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.Update.Prepare: ", err)
		}

		return chartEvent, err
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

		return chartEvent, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.Update.RowsAffected: ", err)
		}

		return chartEvent, err
	}

	query = "SELECT * FROM chart_events WHERE id = ?"
	row := db.QueryRow(query, chartEventID)

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

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.Update.Scan: ", err)
		}

		return chartEvent, err
	}

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

	return chartEvent, err
}
