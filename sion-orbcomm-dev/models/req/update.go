package req

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Req, error) {
	Req := Req{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Req.Update.Open: ", err)
		}

		return Req, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Req.Update.Open: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.Req.Update.Values: ", err)
		}

		return Req, err
	}

	var stmt *sql.Stmt

	query := "UPDATE reqs SET {{fields}} WHERE id = ?"

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

	ReqID := values[KeyID]
	params = append(params, ReqID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Req.Update.Prepare: ", err)
		}

		return Req, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Req.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Req.Update.Exec: ", err)
		}

		return Req, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Req.Update.RowsAffected: ", err)
		}

		return Req, err
	}

	query = "SELECT * FROM reqs WHERE id = ?"
	row := db.QueryRow(query, ReqID)

	fields := []interface{}{
		&Req.ID,
		&Req.AccessID,
		&Req.Password,
		&Req.NextStartID,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Req.Update.Scan: ", err)
		}

		return Req, err
	}

	return Req, err
}
