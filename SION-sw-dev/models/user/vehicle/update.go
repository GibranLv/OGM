package vehicle

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (UserVehicle, error) {
	userVehicle := UserVehicle{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVehicle.Update.Open: ", err)
		}

		return userVehicle, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVehicle.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.UserVehicle.Update.Values: ", err)
		}

		return userVehicle, err
	}

	var stmt *sql.Stmt

	query := "UPDATE users_vehicles SET {{fields}} WHERE id = ?"

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

	var userVehicleID interface{}

	if value, isOk := values[KeyID]; isOk {
		userVehicleID = value
	}

	params = append(params, userVehicleID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVehicle.Update.Prepare: ", err)
		}

		return userVehicle, err
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
			fmt.Println("Model.UserVehicle.Update.Exec: ", err)
		}

		return userVehicle, err
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVehicle.Update.RowsAffected: ", err)
		}

		return userVehicle, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.UserVehicle.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = "SELECT * FROM users_vehicles WHERE id = ?"
	row := db.QueryRow(query, userVehicleID)

	fields := []interface{}{
		&userVehicle.ID,
		&userVehicle.UserID,
		&userVehicle.VehicleID,
		&userVehicle.Visible,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVehicle.Update.Scan: ", err)
		}

		return userVehicle, err
	}

	return userVehicle, err
}
