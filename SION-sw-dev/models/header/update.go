package header

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Header, error) {
	header := Header{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Header.Update.Open: ", err)
		}

		return header, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.Header.Update.Values: ", err)
		}

		return header, err
	}

	var stmt *sql.Stmt

	query := "UPDATE headers SET {{fields}} WHERE id = ?"

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

	headerID := values[KeyID]
	params = append(params, headerID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Header.Update.Prepare: ", err)
		}

		return header, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Header.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Header.Update.Exec: ", err)
		}

		return header, err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Header.Update.RowsAffected: ", err)
		}

		return header, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.Header.Update.RowsAffected: ", rowsAffected)
		}
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
			fmt.Println("Model.Header.Update.Scan: ", err)
		}

		return header, err
	}

	return header, err
}
