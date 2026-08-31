package event

import (
	"database/sql"
	"errors"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Event, error) {
	event := Event{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.FindOne.Open: ", err)
		}

		return event, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT 
							e.id, e.type, e.description,
							e.created_at, e.updated_at,
							ue.user_id, u.name AS user
						FROM events AS e
						LEFT JOIN users_events AS ue ON e.id = ue.event_id
						LEFT JOIN users AS u ON u.id = ue.user_id`

	lenWhere := len(where)
	if lenWhere > 0 {
		query = query + " WHERE"

		i := 1
		for k, v := range where {
			if k == KeyUserID {
				query = query + " ue." + k + " = ?"
			} else {
				query = query + " e." + k + " = ?"
			}

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
			fmt.Println("Model.Event.FindOne.Query: ", err)
		}

		return event, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	events := []Event{}

	for rows.Next() {
		event := Event{}

		fields := []interface{}{
			&event.ID,
			&event.Type,
			&event.Description,
			&event.createdAt,
			&event.updatedAt,
			&event.userID,
			&event.user,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindOne.Scan: ", err)
			}

			return event, err
		}

		if event.ID != 0 {

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

			events = append(events, event)
		}
	}

	if len(events) == 0 {
		return event, err
	}

	event = events[0]

	return event, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (Event, error) {
	event := Event{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.FindOneByEventOrLowerValue.Open: ", err)
		}

		return event, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindOneByEventOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT e.id, e.type, e.description,
							e.created_at, e.updated_at,
							ue.user_id, u.name AS user
						FROM events AS e
						LEFT JOIN users_events AS ue ON e.id = ue.user_id
						LEFT JOIN users AS u ON u.id = ue.user_id
						WHERE e.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		fmt.Println("Model.Event.FindOneByEventOrLowerValue.Query: ", err)

		err = errors.New("Ocurrió un error al obtener la información de los eventos")
		return event, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindOneByEventOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	events := []Event{}

	for rows.Next() {
		event := Event{}

		fields := []interface{}{
			&event.ID,
			&event.Type,
			&event.Description,
			&event.createdAt,
			&event.updatedAt,
			&event.userID,
			&event.user,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindOneByEventOrLowerValue.Scan: ", err)
			}

			return event, err
		}

		if event.ID != 0 {

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

			events = append(events, event)
		}
	}

	if len(events) == 0 {
		return event, err
	}

	event = events[0]

	return event, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (Event, error) {
	var err error
	event := Event{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.FindOneByUser.Open: ", err)
		}

		return event, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT 
							e.id, e.type, e.description,
							e.created_at, e.updated_at,
							ue.user_id, u.name AS user
						FROM events AS e
						LEFT JOIN FROM users_events AS ue ON e.id = ue.event_id
						LEFT JOIN users AS u ON u.id = ue.user_id
						WHERE e.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.FindOneByUser.Query: ", err)
		}

		return event, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	events := []Event{}

	for rows.Next() {
		event := Event{}

		fields := []interface{}{
			&event.ID,
			&event.Type,
			&event.Description,
			&event.createdAt,
			&event.updatedAt,
			&event.userID,
			&event.user,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindOneByUser.Scan: ", err)
			}

			return event, err
		}

		if event.ID != 0 {

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

			events = append(events, event)
		}
	}

	if len(events) == 0 {
		return event, err
	}

	event = events[0]

	return event, err
}
