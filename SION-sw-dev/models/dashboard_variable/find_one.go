package dashboardvariable

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (DashboardVariable, error) {
	dashboardVariable := DashboardVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.DashboardVariable.FindOne.Open: ", err)
		}

		return dashboardVariable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.DashboardVariable.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM dashboard_variables"

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
			fmt.Println("Model.DashboardVariable.FindOne.Query: ", err)
		}

		return dashboardVariable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.DashboardVariable.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	dashboardVariables := []DashboardVariable{}

	for rows.Next() {
		dashboardVariable := DashboardVariable{}

		fields := []interface{}{
			&dashboardVariable.ID,
			&dashboardVariable.UserID,
			&dashboardVariable.VariableID,
			&dashboardVariable.IsCustom,
			&dashboardVariable.Position,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.DashboardVariable.FindOne.Scan: ", err)
			}

			return dashboardVariable, err
		}

		if dashboardVariable.ID != 0 {
			dashboardVariables = append(dashboardVariables, dashboardVariable)
		}
	}

	if len(dashboardVariables) > 0 {
		dashboardVariable = dashboardVariables[0]
	}

	return dashboardVariable, err
}
