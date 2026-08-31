package automaticreport


import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (AutomaticReport, error) {
	autoReport := AutomaticReport{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.AutomaticReport.Update.Open: ", err)
		}

		return autoReport, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.AutomaticReport.Update.Open: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.AutomaticReport.Update.Values: ", err)
		}

		return autoReport, err
	}

	var stmt *sql.Stmt

	query := "UPDATE automatic_reports SET {{fields}} WHERE id = ?"

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

	autoReportID := values[KeyID]
	params = append(params, autoReportID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.AutomaticReport.Update.Prepare: ", err)
		}

		return autoReport, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.AutomaticReport.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.AutomaticReport.Update.Exec: ", err)
		}

		return autoReport, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.AutomaticReport.Update.RowsAffected: ", err)
		}

		return autoReport, err
	}

	query = `SELECT
				id, report_id, name, trigger_date, date_to, minutes, created
			FROM automatic_reports
			WHERE id = ?`

	row := db.QueryRow(query, autoReportID)

	fields := []interface{}{
		&autoReport.ID,
		&autoReport.ReportID,
		&autoReport.Name,
		&autoReport.TriggerDate,
		&autoReport.DateTo,
		&autoReport.Minutes,
		&autoReport.Created,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.AutomaticReport.Update.Scan: ", err)
		}

		return autoReport, err
	}

	return autoReport, err
}
