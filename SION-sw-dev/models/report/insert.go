package report

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Report, error) {
	report := Report{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.Create.Open: ", err)
		}

		return report, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO reports SET"

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
				fmt.Println("Model.Report.Create.Prepare: ", err)
			}

			return report, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Report.Create.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.Create.Exec: ", err)
			}

			return report, err
		}

		var reportID int64
		reportID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.Create.LastInsertId: ", err)
			}

			return report, err
		}

		query = "SELECT * FROM reports WHERE id = ?"
		row := db.QueryRow(query, reportID)

		fields := []interface{}{
			&report.ID,
			&report.Name,
			&report.Template,
			&report.structureJSON,
			&report.createdAt,
			&report.updatedAt,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.Create.Scan: ", err)
			}

			return report, err
		}

		// filtro de CreatedAt
		if report.createdAt.Valid {
			report.CreatedAt = report.createdAt.Time
		}

		// filtro de UpdatedAt
		if report.updatedAt.Valid {
			report.UpdatedAt = report.updatedAt.Time
		}

		if report.structureJSON.Valid {
			s := report.structureJSON.String
			bs := []byte(s)
			err := json.Unmarshal(bs, &report.StructureJSON)
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Report.Create.Unmarshal: ", err)
				}
			}

			if report.Structure == nil {
				report.Structure = []Struct{}
			}

			if report.StructureJSON == nil {
				report.StructureJSON = []StructJSON{}
			}
		}
	}

	return report, err
}
