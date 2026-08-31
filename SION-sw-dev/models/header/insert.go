package header

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Header, error) {
	header := Header{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Header.Create.Open: ", err)
		}

		return header, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO headers SET"

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
				fmt.Println("Model.Header.Create.Prepare: ", err)
			}

			return header, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Header.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.Create.Exec: ", err)
			}

			return header, err
		}

		var headerID int64
		headerID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.Create.LastInsertId: ", err)
			}

			return header, err
		}

		query = "SELECT * FROM headers WHERE id = ?"
		row := db.QueryRow(query, headerID)

		fields := []interface{}{
			&header.ID,
			&header.TitleOne,
			&header.TitleTwo,
			&header.TitleOneLeft,
			&header.TitleTwoLeft,
			&header.LogoLeft,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.Create.Scan: ", err)
			}

			return header, err
		}
	}

	return header, err
}
