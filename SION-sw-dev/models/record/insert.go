package record

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

// Create ...
func (m Model) Create(table string, values map[string]interface{}) (Record, error) {
	record := Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.Create.Open: ", err)
		}

		return record, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := fmt.Sprintf("INSERT INTO %s SET ", table)

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
				fmt.Println("Model.Record.Create.Prepare: ", err)
			}

			return record, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Record.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.Create.Exec: ", err)
			}

			return record, err
		}

		var recordID int64
		recordID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.Create.LastInsertId: ", err)
			}

			return record, err
		}

		query = fmt.Sprintf("SELECT * FROM %s WHERE id = ?", table)
		row := db.QueryRow(query, recordID)

		fields := []interface{}{
			&record.ID,
			&record.Value,
			&record.timestamp,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.Create.Scan: ", err)
			}

			return record, err
		}

		// filtro de Timestamp
		if record.timestamp.Valid {
			record.Timestamp = record.timestamp.Time

			location, err := time.LoadLocation(constants.TZ)
			if err != nil {
				location = time.Local
			}

			record.TimestampString = record.Timestamp.In(location).Format(constants.DateTimeFormat)
		}
	}

	return record, err
}
