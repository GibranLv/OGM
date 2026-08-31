package automaticreport


import (
	"database/sql"
	"fmt"
	
	_ "github.com/go-sql-driver/mysql"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (AutomaticReport, error) {
	autoReport := AutomaticReport{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.AutomaticReport.FindOne.Open: ", err)
		}

		return autoReport, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.AutomaticReport.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT
	            id, report_id, name, trigger_date, date_to, minutes, created
	        FROM automatic_reports`

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
			fmt.Println("Model.AutomaticReport.FindOne.Query: ", err)
		}

		return autoReport, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.AutomaticReport.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	autoReports := []AutomaticReport{}

	for rows.Next() {
		autoReport := AutomaticReport{}

		fields := []interface{}{
			&autoReport.ID,
			&autoReport.ReportID,
			&autoReport.Name,
			&autoReport.TriggerDate,
			&autoReport.DateTo,
			&autoReport.Minutes,
			&autoReport.Created,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.AutomaticReport.FindOne.Scan: ", err)
			}

			return autoReport, err
		}

		if autoReport.ID != 0 {
			autoReports = append(autoReports, autoReport)
		}
	}

	if len(autoReports) == 0 {
		return autoReport, err
	}

	autoReport = autoReports[0]

	return autoReport, err
}
