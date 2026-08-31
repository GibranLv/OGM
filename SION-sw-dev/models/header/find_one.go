package header

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Header, error) {
	header := Header{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Header.FindOne.Open: ", err)
		}

		return header, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM headers"

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
			fmt.Println("Model.Header.FindOne.Query: ", err)
		}

		return header, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	headers := []Header{}

	for rows.Next() {
		header := Header{}

		fields := []interface{}{
			&header.ID,
			&header.TitleOne,
			&header.TitleTwo,
			&header.TitleOneLeft,
			&header.TitleTwoLeft,
			&header.LogoLeft,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.FindOne.Scan: ", err)
			}

			return header, err
		}

		if header.ID != 0 {
			headers = append(headers, header)
		}
	}

	if len(headers) == 0 {
		return header, err
	}

	header = headers[0]

	return header, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(userID int64) (Header, error) {
	header := Header{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Header.FindOneByUser.Open: ", err)
		}

		return header, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT
							h.id, h.title_one, h.title_two, h.title_one_left,
							h.title_two_left, h.logo_left
						FROM headers AS h
						LEFT JOIN users_headers AS uh ON h.id = uh.header_id
						LEFT JOIN users AS u ON u.id = uh.user_id
						WHERE u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Header.FindOneByUser.Query: ", err)
		}

		return header, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	headers := []Header{}

	for rows.Next() {
		header := Header{}

		fields := []interface{}{
			&header.ID,
			&header.TitleOne,
			&header.TitleTwo,
			&header.TitleOneLeft,
			&header.TitleTwoLeft,
			&header.LogoLeft,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.FindOneByUser.Scan: ", err)
			}

			return header, err
		}

		if header.ID != 0 {

			headers = append(headers, header)
		}
	}

	if len(headers) == 0 {
		return header, err
	}

	header = headers[0]

	return header, err
}
