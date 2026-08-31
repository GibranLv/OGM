package orbcomm

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Orbcomm, error) {
	orbcomm := Orbcomm{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.FindOne.Open: ", err)
		}

		return orbcomm, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM orbcomms"

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
			fmt.Println("Model.Orbcomm.FindOne.Query: ", err)
		}

		return orbcomm, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	orbcomms := []Orbcomm{}

	for rows.Next() {
		orbcomm := Orbcomm{}

		fields := []interface{}{
			&orbcomm.ID,
			&orbcomm.SystemID,
			&orbcomm.MobileID,
			&orbcomm.Modbus,
			&orbcomm.Status,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOne.Scan: ", err)
			}

			return orbcomm, err
		}

		if orbcomm.ID != 0 {
			orbcomms = append(orbcomms, orbcomm)

		}
	}

	if len(orbcomms) == 0 {
		return orbcomm, err
	}

	orbcomm = orbcomms[0]

	return orbcomm, err
}
