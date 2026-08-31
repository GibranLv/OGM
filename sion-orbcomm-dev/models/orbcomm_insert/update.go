package orbcomminsert

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (OrbcommInsert, error) {
	orbcommInsert := OrbcommInsert{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.OrbcommInsert.Update.Open: ", err)
		}

		return orbcommInsert, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.OrbcommInsert.Update.Close: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.OrbcommInsert.Update.Values: ", err)
		}

		return orbcommInsert, err
	}

	var stmt *sql.Stmt

	query := "UPDATE orbcomm_inserts SET {{fields}} WHERE id = ?"

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

	var orbcommInsertID int64
	if value, hasID := values[KeyID]; hasID {
		i64, isOk := value.(int64)
		if isOk {
			orbcommInsertID = i64
		}
	}

	params = append(params, orbcommInsertID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.OrbcommInsert.Update.Prepare: ", err)

		return orbcommInsert, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.OrbcommInsert.Update.Stmt.Close: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.OrbcommInsert.Update.Exec: ", err)

		return orbcommInsert, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.OrbcommInsert.Update.RowsAffected: ", err)

		return orbcommInsert, err
	}

	query = "SELECT * FROM orbcomm_inserts WHERE id = ?"
	row := db.QueryRow(query, orbcommInsertID)

	fields := []interface{}{
		&orbcommInsert.ID,
		&orbcommInsert.OrbcommID,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.OrbcommInsert.Update.Scan: ", err)

		return orbcommInsert, err
	}

	return orbcommInsert, err
}
