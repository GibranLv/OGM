package profile

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Profile, error) {
	profile := Profile{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Profile.FindOne.Open: ", err)
		}

		return profile, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Profile.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM profiles"

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
			fmt.Println("Model.Profile.FindOne.Query: ", err)
		}

		return profile, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Profile.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	profiles := []Profile{}

	for rows.Next() {
		profile := Profile{}

		fields := []interface{}{
			&profile.ID,
			&profile.UserID,
			&profile.Avatar,
			&profile.Company,
			&profile.Job,
			&profile.Phone,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Profile.FindOne.Scan: ", err)
			}

			return profile, err
		}

		if profile.ID != 0 {

			// filtro de CreatedAt
			if profile.createdAt.Valid {
				profile.CreatedAt = profile.createdAt.Time
			}

			// filtro de UpdatedAt
			if profile.updatedAt.Valid {
				profile.UpdatedAt = profile.updatedAt.Time
			}

			profiles = append(profiles, profile)
		}
	}

	if len(profiles) == 0 {
		return profile, err
	}

	profile = profiles[0]

	return profile, err
}
