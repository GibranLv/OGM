package orbcomminsert

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (OrbcommInsert, error) {
	orbcommInsert := OrbcommInsert{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.OrbcommInsert.FindOne.Open: ", err)
		}

		return orbcommInsert, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommInsert.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM orbcomm_inserts"

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
			fmt.Println("Model.OrbcommInsert.FindOne.Query: ", err)
		}

		return orbcommInsert, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommInsert.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	orbcommInserts := []OrbcommInsert{}

	for rows.Next() {
		orbcommInsert := OrbcommInsert{}

		fields := []interface{}{
			&orbcommInsert.ID,
			&orbcommInsert.OrbcommID,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommInsert.FindOne.Scan: ", err)
			}

			return orbcommInsert, err
		}

		if orbcommInsert.ID != 0 {
			orbcommInserts = append(orbcommInserts, orbcommInsert)

		}
	}

	if len(orbcommInserts) == 0 {
		return orbcommInsert, err
	}

	orbcommInsert = orbcommInserts[0]

	return orbcommInsert, err
}
