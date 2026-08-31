package group

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Group, error) {
	group := Group{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.Update.Open: ", err)
		}

		return group, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.Group.Update.Values: ", err)
		}

		return group, err
	}

	var stmt *sql.Stmt

	query := "UPDATE `groups` SET {{fields}} WHERE id = ?"

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

	groupID := values[KeyID]
	params = append(params, groupID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.Update.Prepare: ", err)
		}

		return group, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.Update.Exec: ", err)
		}

		return group, err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.Update.RowsAffected: ", err)
		}

		return group, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.Group.Update.RowsAffected: ", rowsAffected)
		}
	}

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
			fmt.Println("Model.Group.Update.Scan: ", err)
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

	return group, err
}
