package report

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// constants of Model
const (
	KeyID        = "id"
	KeyUserID    = "user_id"
	KeyReportID  = "report_id"
	KeyIsCreator = "is_creator "
)

// UserReport ...
type UserReport struct {
	ID        int64
	UserID    int64
	ReportID  int64
	IsCreator bool
}

// Model ...
type Model struct {
	UserDB string
	PwdDB  string
	NameDB string
	Host   string
	Port   string
	Debug  bool
}

// Find ...
func (m Model) Find(where map[string]interface{}) ([]UserReport, error) {
	usersReports := []UserReport{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Find.Open: ", err)
		}

		return usersReports, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserReport.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM users_reports"

	orderByValue := ""
	if v, ok := where[models.OrderBy]; ok {
		order, isString := v.(string)
		if isString {
			orderByValue = order
			delete(where, models.OrderBy)
		}
	}

	limitValue := 0
	if v, ok := where[models.Limit]; ok {
		limit, isInt := v.(int)
		if isInt {
			if limit > 0 {
				limitValue = limit
				delete(where, models.Limit)
			}
		}
	}

	iniValue := 0
	if v, ok := where[models.Ini]; ok {
		ini, isInt := v.(int)
		if isInt {
			if ini > 0 {
				iniValue = ini
				delete(where, models.Ini)
			}
		}
	}

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

	if iniValue > 0 {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND id > ?"
		} else {
			query = query + " WHERE id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY id " + orderByValue
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Find.Query: ", err)
		}

		return usersReports, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserReport.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		userReport := UserReport{}

		fields = []interface{}{
			&userReport.ID,
			&userReport.UserID,
			&userReport.ReportID,
			&userReport.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserReport.Find.Scan: ", err)
			}

		} else {
			usersReports = append(usersReports, userReport)
		}
	}

	return usersReports, err
}

// Create ...
func (m Model) Create(values map[string]interface{}) (UserReport, error) {
	userReport := UserReport{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Create.Open: ", err)
		}

		return userReport, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserReport.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO users_reports SET"

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
				fmt.Println("Model.UserReport.Create.Prepare: ", err)
			}

			return userReport, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.UserReport.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserReport.Create.Exec: ", err)
			}

			return userReport, err
		}

		var userReportID int64
		userReportID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserReport.Create.LastInsertId: ", err)
			}

			return userReport, err
		}

		query = "SELECT * FROM users_reports WHERE id = ?"
		row := db.QueryRow(query, userReportID)

		fields := []interface{}{
			&userReport.ID,
			&userReport.UserID,
			&userReport.ReportID,
			&userReport.IsCreator,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserReport.Create.Scan: ", err)
			}

			return userReport, err
		}

	}

	return userReport, err
}

// Update ...
func (m Model) Update(values map[string]interface{}) (UserReport, error) {
	userReport := UserReport{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Update.Open: ", err)
		}

		return userReport, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserReport.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values area empty")

		if m.Debug {
			fmt.Println("Model.UserReport.Update.Close: ", err)
		}

		return userReport, err
	}

	var stmt *sql.Stmt

	query := "UPDATE users_reports SET {{fields}} WHERE id = ?"

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

	userReportID := values[KeyID]
	params = append(params, userReportID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Update.Prepare: ", err)
		}

		return userReport, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("stmt.Error: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Update.Exec: ", err)
		}

		return userReport, err
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Update.RowsAffected: ", err)
		}

		return userReport, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.UserReport.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = "SELECT * FROM users_reports WHERE id = ?"
	row := db.QueryRow(query, userReportID)

	fields := []interface{}{
		&userReport.ID,
		&userReport.UserID,
		&userReport.ReportID,
		&userReport.IsCreator,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Update.Scan: ", err)
		}

		return userReport, err
	}

	return userReport, err
}

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Remove.Open: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserReport.Remove.Close: ", err)
			}
		}
	}(db)

	query := "DELETE FROM users_reports WHERE"

	var params []interface{}
	var stmt *sql.Stmt
	var res sql.Result

	lenWhere := len(where)
	if lenWhere > 0 {
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

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Remove.Prepare: ", err)
		}

		return numAffected, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserReport.Remove.Stmt.Close: ", err)
			}
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Remove.Exec: ", err)
		}

		return numAffected, err
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserReport.Remove.RowsAffected: ", err)
		}

		return numAffected, err
	}

	return numAffected, err
}
