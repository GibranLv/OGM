package req

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Req, error) {
	req := Req{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Req.FindOne.Open: ", err)
		}

		return req, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Req.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM reqs"

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
			fmt.Println("Model.Req.FindOne.Query: ", err)
		}

		return req, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Req.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	reqs := []Req{}

	for rows.Next() {
		req := Req{}

		fields := []interface{}{
			&req.ID,
			&req.AccessID,
			&req.Password,
			&req.NextStartID,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Req.FindOne.Scan: ", err)
			}

			return req, err
		}

		if req.ID != 0 {
			reqs = append(reqs, req)

		}
	}

	if len(reqs) == 0 {
		return req, err
	}

	req = reqs[0]

	return req, err
}
