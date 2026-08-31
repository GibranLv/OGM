package shortdaybefore

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (ShortDayBefore, error) {
	dayBefore := ShortDayBefore{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ShortDayBefore.Update.Open: ", err)
		}

		return dayBefore, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.ShortDayBefore.Update.Close: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.ShortDayBefore.Update.Values: ", err)
		}

		return dayBefore, err
	}

	var stmt *sql.Stmt

	query := "UPDATE short_day_befores SET {{fields}} WHERE id = ?"

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

	var dayBeforeID int64
	if value, hasID := values[KeyID]; hasID {
		i64, isOk := value.(int64)
		if isOk {
			dayBeforeID = i64
		}
	}

	params = append(params, dayBeforeID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.ShortDayBefore.Update.Prepare: ", err)

		return dayBefore, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("Model.ShortDayBefore.Update.Stmt.Close: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.ShortDayBefore.Update.Exec: ", err)

		return dayBefore, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.ShortDayBefore.Update.RowsAffected: ", err)

		return dayBefore, err
	}

	query = "SELECT * FROM short_day_befores WHERE id = ?"
	row := db.QueryRow(query, dayBeforeID)

	fields := []interface{}{
		&dayBefore.ID,
		&dayBefore.VariableID,
		&dayBefore.IsCustom,
		&dayBefore.Value,
		&dayBefore.IsUpdated,
		&dayBefore.AccumulatedAlias,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.ShortDayBefore.Update.Scan: ", err)

		return dayBefore, err
	}

	return dayBefore, err
}
