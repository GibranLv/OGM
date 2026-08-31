package vehicle

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (UserVehicle, error) {
	userVehicle := UserVehicle{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.UserVehicle.Create.Query: ", err)
		}

		return userVehicle, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVehicle.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO users_vehicles SET"

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
				fmt.Println("Model.UserVehicle.Create.Prepare: ", err)
			}

			return userVehicle, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.UserVehicle.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVehicle.Create.Exec: ", err)
			}

			return userVehicle, err
		}

		var userVehicleID int64
		userVehicleID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.UserVehicle.Create.LastInsertId: ", err)
			}

			return userVehicle, err
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
				fmt.Println("Model.UserVehicle.Create.Scan: ", err)
			}

			return userVehicle, err
		}

	}

	return userVehicle, err
}
