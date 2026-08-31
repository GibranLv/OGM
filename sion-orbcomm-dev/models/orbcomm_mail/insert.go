package orbcommmail

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (OrbcommMail, error) {
	orbcommMail := OrbcommMail{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.OrbcommMail.Create.Open: ", err)
		}

		return orbcommMail, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommMail.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO orbcomm_mails SET"

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
				fmt.Println("Model.OrbcommMail.Create.Prepare: ", err)
			}

			return orbcommMail, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.OrbcommMail.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommMail.Create.Exec: ", err)
			}

			return orbcommMail, err
		}

		var orbcommMailID int64
		orbcommMailID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommMail.Create.LastInsertId: ", err)
			}

			return orbcommMail, err
		}

		query = "SELECT * FROM orbcomm_mails WHERE id = ?"
		row := db.QueryRow(query, orbcommMailID)

		fields := []interface{}{
			&orbcommMail.ID,
			&orbcommMail.OrbcommID,
			&orbcommMail.Mail,
			&orbcommMail.timestamp,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommMail.Create.Scan: ", err)
			}

			return orbcommMail, err
		}

		// filtro de Timestamp
		if orbcommMail.timestamp.Valid {
			orbcommMail.Timestamp = orbcommMail.timestamp.Time
		}
	}

	return orbcommMail, err
}
