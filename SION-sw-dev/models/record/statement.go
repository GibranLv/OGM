package record

import (
	"database/sql"
	"fmt"
)

// CreateTable ...
func (m Model) CreateTable(name string) error {
	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.CreateTable.Open: ", err)
		}

		return err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.CreateTable.Close: ", err)
			}
		}
	}(db)

	var stmt *sql.Stmt

	query := fmt.Sprintf(recordTableSQL, m.NameDB, name)
	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.CreateTable.Prepare: ", err)
		}

		return err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("stmt.Error: ", err)
			}
		}
	}(stmt)

	_, err = stmt.Exec()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.CreateTable.Exec: ", err)
		}

		return err
	}

	return err
}

// GetTables ...
func (m Model) GetTables() ([]string, error) {
	var tables []string

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.GetTables.Open: ", err)
		}

		return tables, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.GetTable.Close: ", err)
			}
		}
	}(db)

	query := "SHOW TABLES;"
	rows, err := db.Query(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.GetTable.Prepare: ", err)
		}

		return tables, err
	}

	for rows.Next() {
		var table string

		err := rows.Scan(&table)
		if err != nil {
			fmt.Println("Model.Record.GetTable.Scan: ", err)

		} else {
			tables = append(tables, table)
		}
	}

	return tables, err
}
