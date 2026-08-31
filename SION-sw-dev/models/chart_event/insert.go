package chartevent

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (ChartEvent, error) {
	chartEvent := ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Chart.Create.Open: ", err)
		}

		return chartEvent, err
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

		query := "INSERT INTO chart_events SET"

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

			return chartEvent, err
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

			return chartEvent, err
		}

		var chartEventID int64
		chartEventID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Chart.Create.LastInsertId: ", err)
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
				fmt.Println("Model.Chart.Create.Scan: ", err)
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

	}

	return chartEvent, err
}
