package orbcommmail

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (OrbcommMail, error) {
	orbcommMail := OrbcommMail{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.OrbcommMail.FindOne.Open: ", err)
		}

		return orbcommMail, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommMail.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM orbcomm_mails"

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
			fmt.Println("Model.OrbcommMail.FindOne.Query: ", err)
		}

		return orbcommMail, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.OrbcommMail.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	orbcommMails := []OrbcommMail{}

	for rows.Next() {
		orbcommMail := OrbcommMail{}

		fields := []interface{}{
			&orbcommMail.ID,
			&orbcommMail.OrbcommID,
			&orbcommMail.Mail,
			&orbcommMail.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			// filtro de Timestamp
			if orbcommMail.timestamp.Valid {
				orbcommMail.Timestamp = orbcommMail.timestamp.Time
			}

			orbcommMails = append(orbcommMails, orbcommMail)

		} else {
			if m.Debug {
				fmt.Println("Model.OrbcommMail.FindOne.Scan: ", err)
			}
		}
	}

	if len(orbcommMails) > 0 {
		orbcommMail = orbcommMails[0]
	}

	return orbcommMail, err
}
