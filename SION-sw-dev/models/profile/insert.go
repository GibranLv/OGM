package profile

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Profile, error) {
	profile := Profile{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Profile.Create.Open: ", err)
		}

		return profile, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Profile.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO profiles SET"

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
				fmt.Println("Model.Profile.Create.Prepare: ", err)
			}

			return profile, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Profile.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Profile.Create.Exec: ", err)
			}

			return profile, err
		}

		var profileID int64
		profileID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Profile.Create.LastInsertId: ", err)
			}

			return profile, err
		}

		query = "SELECT * FROM profiles WHERE id = ?"
		row := db.QueryRow(query, profileID)

		fields := []interface{}{
			&profile.ID,
			&profile.UserID,
			&profile.Avatar,
			&profile.Company,
			&profile.Job,
			&profile.Phone,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.Profile.Create.Scan: ", err)
			}

			return profile, err
		}

		// filtro de CreatedAt
		if profile.createdAt.Valid {
			profile.CreatedAt = profile.createdAt.Time
		}

		// filtro de UpdatedAt
		if profile.updatedAt.Valid {
			profile.UpdatedAt = profile.updatedAt.Time
		}

	}

	return profile, err
}
