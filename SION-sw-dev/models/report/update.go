package report

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Report, error) {
	report := Report{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.Update.Open: ", err)
		}

		return report, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.Report.Update.Values: ", err)
		}

		return report, err
	}

	var stmt *sql.Stmt

	query := "UPDATE reports SET {{fields}} WHERE id = ?"

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

	reportID := values[KeyID]
	params = append(params, reportID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.Update.Prepare: ", err)
		}

		return report, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.Update.Exec: ", err)
		}

		return report, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.Update.RowsAffected: ", err)
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
			fmt.Println("Model.Report.Update.Scan: ", err)
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
				fmt.Println("Model.Report.Find.Unmarshal: ", err)
			}
		}

		if report.Structure == nil {
			report.Structure = []Struct{}
		}

		if report.StructureJSON == nil {
			report.StructureJSON = []StructJSON{}
		}
	}

	return report, err
}
