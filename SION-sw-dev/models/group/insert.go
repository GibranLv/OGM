package group

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Group, error) {
	group := Group{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.Create.Open: ", err)
		}

		return group, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		// fixed keyword of MySQL v8
		query := "INSERT INTO `groups` SET"

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
				fmt.Println("Model.Group.Create.Prepare: ", err)
			}

			return group, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Group.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.Create.Exec: ", err)
			}

			return group, err
		}

		var groupID int64
		groupID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.Create.LastInsertId: ", err)
			}

			return group, err
		}

		// fixed keyword of MySQL v8
		query = "SELECT * FROM `groups` WHERE id = ?"
		row := db.QueryRow(query, groupID)

		fields := []interface{}{
			&group.ID,
			&group.Name,
			&group.Type,
			&group.Latitude,
			&group.Longitude,
			&group.MarkerIcon,
			&group.createdAt,
			&group.updatedAt,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.Create.Scan: ", err)
			}

			return group, err
		}

		// filtro de CreatedAt
		if group.createdAt.Valid {
			group.CreatedAt = group.createdAt.Time
		}

		// filtro de UpdatedAt
		if group.updatedAt.Valid {
			group.UpdatedAt = group.updatedAt.Time
		}

	}

	return group, err
}
