package profile

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Profile, error) {
	profile := Profile{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Profile.Update.Open: ", err)
		}

		return profile, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Profile.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.Profile.Update.Values: ", err)
		}

		return profile, err
	}

	var stmt *sql.Stmt

	query := "UPDATE profiles SET {{fields}} WHERE id = ?"

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

	profileID := values[KeyID]
	params = append(params, profileID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Profile.Update.Prepare: ", err)
		}

		return profile, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Profile.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Profile.Update.Exec: ", err)
		}

		return profile, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Profile.Update.RowsAffected: ", err)
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
			fmt.Println("Model.Profile.Update.Scan: ", err)
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

	return profile, err
}
