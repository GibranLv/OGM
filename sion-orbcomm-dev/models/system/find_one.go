package system

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (System, error) {
	system := System{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.System.FindOne.Open: ", err)
		}

		return system, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.System.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM systems"

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
			fmt.Println("Model.System.FindOne.Query: ", err)
		}

		return system, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.System.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	systems := []System{}

	for rows.Next() {
		system := System{}

		fields := []interface{}{
			&system.ID,
			&system.User,
			&system.Password,
			&system.Name,
			&system.Host,
			&system.Port,
			&system.URL,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.System.FindOne.Scan: ", err)
			}

			return system, err
		}

		if system.ID != 0 {
			systems = append(systems, system)

		}
	}

	if len(systems) == 0 {
		return system, err
	}

	system = systems[0]

	return system, err
}
