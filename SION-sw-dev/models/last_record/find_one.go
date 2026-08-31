package lastrecord

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (LastRecord, error) {
	lastRecord := LastRecord{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.LastRecord.FindOne.Open: ", err)
		}

		return lastRecord, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM last_records"

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
			fmt.Println("Model.LastRecord.FindOne.Query: ", err)
		}

		return lastRecord, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.LastRecord.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	lastRecords := []LastRecord{}

	for rows.Next() {
		lastRecord := LastRecord{}

		fields := []interface{}{
			&lastRecord.ID,
			&lastRecord.VariableID,
			&lastRecord.IsCustom,
			&lastRecord.Value,
			&lastRecord.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			// filtro de Timestamp
			if lastRecord.timestamp.Valid {
				lastRecord.Timestamp = lastRecord.timestamp.Time
			}

			lastRecords = append(lastRecords, lastRecord)

		} else {
			if m.Debug {
				fmt.Println("Model.LastRecord.FindOne.Scan: ", err)
			}
		}
	}

	if len(lastRecords) > 0 {
		lastRecord = lastRecords[0]
	}

	return lastRecord, err
}
