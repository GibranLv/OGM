package recordsrequest

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (RecordsRequest, error) {
	recordsRequest := RecordsRequest{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.RecordsRequest.Create.Open: ", err)
		}

		return recordsRequest, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.RecordsRequest.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO records_requests SET"

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
				fmt.Println("Model.RecordsRequest.Create.Prepare: ", err)
			}

			return recordsRequest, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.RecordsRequest.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.RecordsRequest.Create.Exec: ", err)
			}

			return recordsRequest, err
		}

		var recordsRequestID int64
		recordsRequestID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.RecordsRequest.Create.LastInsertId: ", err)
			}

			return recordsRequest, err
		}

		query = "SELECT * FROM records_requests WHERE id = ?"
		row := db.QueryRow(query, recordsRequestID)

		fields := []interface{}{
			&recordsRequest.ID,
			&recordsRequest.json,
			&recordsRequest.createdAt,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.RecordsRequest.Create.Scan: ", err)
			}

			return recordsRequest, err
		}

		if recordsRequest.json.Valid {
			recordsRequest.JSON = recordsRequest.json.String
		}

		if recordsRequest.createdAt.Valid {
			recordsRequest.CreatedAt = recordsRequest.createdAt.Time
		}

	}

	return recordsRequest, err
}
