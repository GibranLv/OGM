package groupfactor

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (GroupFactor, error) {
	factorOut := GroupFactor{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GroupFactor.Update.Open: ", err)
		}

		return factorOut, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.GroupFactor.Update.Close: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.GroupFactor.Update.Values: ", err)
		}

		return factorOut, err
	}

	var stmt *sql.Stmt

	query := "UPDATE group_factors SET {{fields}} WHERE id = ?"

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
		fmt.Println("Model.Factor.GroupFactor.Prepare: ", err)

		return factorOut, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.Factor.GroupFactor.Stmt.Close: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.Factor.GroupFactor.Exec: ", err)

		return factorOut, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.Factor.GroupFactor.RowsAffected: ", err)

		return factorOut, err
	}

	query = "SELECT * FROM group_factors WHERE id = ?"
	row := db.QueryRow(query, factorOutID)

	fields := []interface{}{
		&factorOut.ID,
		&factorOut.FactorID,
		&factorOut.VariableID,
		&factorOut.IsCustom,
		&factorOut.Status,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.Factor.GroupFactor.Scan: ", err)

		return factorOut, err
	}

	return factorOut, err
}

// UpdateByFactor ...
func (m Model) UpdateByFactor(factorID int64, status bool) (int64, error) {
	var numAfftected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GroupFactor.UpdateByFactor.Open: ", err)
		}

		return numAfftected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.GroupFactor.UpdateByFactor.Close: ", err)
		}
	}(db)

	params := []interface{}{status, factorID}
	var stmt *sql.Stmt

	query := "UPDATE group_factors SET status = ? WHERE factor_id = ?;"

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.GroupFactor.UpdateByFactor.Prepare: ", err)

		return numAfftected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.GroupFactor.UpdateByFactor.Stmt.Close: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.GroupFactor.UpdateByFactor.Exec: ", err)

		return numAfftected, err
	}

	numAfftected, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.GroupFactor.UpdateByFactor.RowsAffected: ", err)

		return numAfftected, err
	}

	return numAfftected, err
}
