package factor

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Factor, error) {
	factorOut := Factor{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Factor.Update.Open: ", err)
		}

		return factorOut, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.Factor.Update.Close: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.Factor.Update.Values: ", err)
		}

		return factorOut, err
	}

	var stmt *sql.Stmt

	query := "UPDATE factors SET {{fields}} WHERE id = ?"

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

	var factorOutID int64
	if value, hasID := values[KeyID]; hasID {
		i64, isOk := value.(int64)
		if isOk {
			factorOutID = i64
		}
	}

	params = append(params, factorOutID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.Factor.Update.Prepare: ", err)

		return factorOut, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.Factor.Update.Stmt.Close: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.Factor.Update.Exec: ", err)

		return factorOut, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.Factor.Update.RowsAffected: ", err)

		return factorOut, err
	}

	query = "SELECT * FROM factors WHERE id = ?"
	row := db.QueryRow(query, factorOutID)

	fields := []interface{}{
		&factorOut.ID,
		&factorOut.Probability,
		&factorOut.Status,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.Factor.Update.Scan: ", err)

		return factorOut, err
	}

	return factorOut, err
}
