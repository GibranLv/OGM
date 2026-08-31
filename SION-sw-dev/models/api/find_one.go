package api

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (API, error) {
	api := API{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.API.FindOne.Open: ", err)
		}

		return api, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.API.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM api"

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
			fmt.Println("Model.API.FindOne.Query: ", err)
		}

		return api, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.API.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	apis := []API{}

	for rows.Next() {
		api := API{}

		fields := []interface{}{
			&api.ID,
			&api.AccessTokenKey,
			&api.RefreshTokenKey,
			&api.ActivationTokenKey,
			&api.SessionKey,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.API.FindOne.Scan: ", err)
			}

			return api, err
		}

		if api.ID != 0 {
			apis = append(apis, api)
		}
	}

	if len(apis) == 0 {
		return api, err
	}

	api = apis[0]

	return api, err
}
