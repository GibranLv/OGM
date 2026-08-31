package orbcommmail

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (OrbcommMail, error) {
	orbcommMail := OrbcommMail{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.OrbcommMail.Update.Open: ", err)
		}

		return orbcommMail, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.OrbcommMail.Update.Close: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.OrbcommMail.Update.Values: ", err)
		}

		return orbcommMail, err
	}

	var stmt *sql.Stmt

	query := "UPDATE orbcomm_mails SET {{fields}} WHERE id = ?"

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

	var orbcommMailID int64
	if value, hasID := values[KeyID]; hasID {
		i64, isOk := value.(int64)
		if isOk {
			orbcommMailID = i64
		}
	}

	params = append(params, orbcommMailID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.OrbcommMail.Update.Prepare: ", err)

		return orbcommMail, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.OrbcommMail.Update.Stmt.Close: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.OrbcommMail.Update.Exec: ", err)

		return orbcommMail, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.OrbcommMail.Update.RowsAffected: ", err)

		return orbcommMail, err
	}

	query = "SELECT * FROM orbcomm_mails WHERE id = ?"
	row := db.QueryRow(query, orbcommMailID)

	fields := []interface{}{
		&orbcommMail.ID,
		&orbcommMail.OrbcommID,
		&orbcommMail.Mail,
		&orbcommMail.timestamp,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.OrbcommMail.Update.Scan: ", err)

		return orbcommMail, err
	}

	// filtro de Timestamp
	if orbcommMail.timestamp.Valid {
		orbcommMail.Timestamp = orbcommMail.timestamp.Time
	}

	return orbcommMail, err
}
