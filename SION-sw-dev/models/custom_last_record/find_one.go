package customlastrecord

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (CustomLastRecord, error) {
	customLastRecord := CustomLastRecord{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomLastRecord.FindOne.Open: ", err)
		}

		return customLastRecord, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomLastRecord.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM custom_last_records"

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

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomLastRecord.FindOne.Query: ", err)
		}

		return customLastRecord, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomLastRecord.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	customLastRecords := []CustomLastRecord{}

	for rows.Next() {
		customLastRecord := CustomLastRecord{}

		fields := []interface{}{
			&customLastRecord.ID,
			&customLastRecord.VariableID,
			&customLastRecord.Value,
			&customLastRecord.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			// filtro de Timestamp
			if customLastRecord.timestamp.Valid {
				customLastRecord.Timestamp = customLastRecord.timestamp.Time
			}

			customLastRecords = append(customLastRecords, customLastRecord)

		} else {
			if m.Debug {
				fmt.Println("Model.CustomLastRecord.FindOne.Scan: ", err)
			}
		}
	}

	if len(customLastRecords) > 0 {
		customLastRecord = customLastRecords[0]
	}

	return customLastRecord, err
}
