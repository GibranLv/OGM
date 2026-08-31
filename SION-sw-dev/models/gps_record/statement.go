package gpsrecord

import (
	"database/sql"
	"fmt"
)

// CreateTable ...
func (m Model) CreateTable(name string) error {
	var msgErr error

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSRecord.CreateTable.Open: ", err)
		}

		return msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSRecord.CreateTable.Close: ", err)
			}
		}
	}(db)

	var stmt *sql.Stmt

	query := fmt.Sprintf(recordTableSQL, m.NameDB, name)
	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSRecord.CreateTable.Prepare: ", err)
		}

		return msgErr
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.GPSRecord.CreateTable.Stmt.Close: ", err)
			}
		}
	}(stmt)

	_, err = stmt.Exec()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.GPSRecord.CreateTable.Exec: ", err)
		}

		return msgErr
	}

	return msgErr
}
