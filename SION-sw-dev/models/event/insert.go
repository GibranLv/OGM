package event

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Event, error) {
	event := Event{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.Create.Open: ", err)
		}

		return event, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO events SET"

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
				fmt.Println("Model.Event.Create.Prepare: ", err)
			}

			return event, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Event.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.Create.Exec: ", err)
			}

			return event, err
		}

		var eventID int64
		eventID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.Create.LastInsertId: ", err)
			}

			return event, err
		}

		query = `SELECT 
							e.id, e.type, e.description,
							e.created_at, e.updated_at,
							ue.user_id, u.name AS user
						FROM events AS e
						LEFT JOIN users_events AS ue ON e.id = ue.event_id
						LEFT JOIN users AS u ON u.id = ue.user_id
						WHERE e.id = ?`

		row := db.QueryRow(query, eventID)

		fields := []interface{}{
			&event.ID,
			&event.Type,
			&event.Description,
			&event.createdAt,
			&event.updatedAt,
			&event.userID,
			&event.user,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.Create.Scan: ", err)
			}

			return event, err
		}

		// filtro de CreatedAt
		if event.createdAt.Valid {
			event.CreatedAt = event.createdAt.Time
		}

		// filtro de UpdatedAt
		if event.updatedAt.Valid {
			event.UpdatedAt = event.updatedAt.Time
		}

		// filtro de UserID
		if event.userID.Valid {
			event.UserID = event.userID.Int64
		}

		// filtro de User
		if event.user.Valid {
			event.User = event.user.String
		}

	}

	return event, err
}
