package dashboard

import (
	"database/sql"
	"fmt"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]UserDashboard, error) {
	dashboards := []UserDashboard{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserDashboard.Find.Open: ", err)
		}

		return dashboards, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserDashboard.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users_dashboard"

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
			fmt.Println("Model.UserDashboard.Find.Query: ", err)
		}

		return dashboards, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserDashboard.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		dashboard := UserDashboard{}

		fields := []interface{}{
			&dashboard.ID,
			&dashboard.UserID,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserDashboard.Find.Scan: ", err)
			}

			return dashboards, err
		}

		if dashboard.ID != 0 {
			dashboards = append(dashboards, dashboard)
		}
	}

	return dashboards, err
}
