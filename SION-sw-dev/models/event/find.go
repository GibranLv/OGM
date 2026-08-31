package event

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]Event, error) {
	var err error
	events := []Event{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.Find.Open: ", err)
		}

		return events, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.Find.Close: ", err)
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

	orderByValue := ""
	if v, ok := where[models.OrderBy]; ok {
		order, isString := v.(string)
		if isString {
			orderByValue = order
			delete(where, models.OrderBy)
		}
	}

	limitValue := 0
	if v, ok := where[models.Limit]; ok {
		limit, isInt := v.(int)
		if isInt {
			if limit > 0 {
				limitValue = limit
				delete(where, models.Limit)
			}
		}
	}

	iniValue := 0
	if v, ok := where[models.Ini]; ok {
		ini, isInt := v.(int)
		if isInt {
			if ini > 0 {
				iniValue = ini
				delete(where, models.Ini)
			}
		}
	}

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

	if iniValue > 0 {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND e.id > ?"
		} else {
			query = query + " WHERE e.id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY e.id " + orderByValue
	} else {
		query = query + " ORDER BY e.created_at DESC"
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.Find.Query: ", err)
		}

		return events, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		event := Event{}

		fields = []interface{}{
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
			fmt.Println("Model.Event.Find.Scan: ", err)

		} else {
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

	return events, err
}

// FindForRange ...
func (m Model) FindForRange(where map[string]interface{}, startDate, finalDate string) ([]Event, error) {
	events := []Event{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.Find.Open: ", err)
		}

		return events, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.Find.Close: ", err)
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

	orderByValue := ""
	if v, ok := where[models.OrderBy]; ok {
		order, isString := v.(string)
		if isString {
			orderByValue = order
			delete(where, models.OrderBy)
		}
	}

	limitValue := 0
	if v, ok := where[models.Limit]; ok {
		limit, isInt := v.(int)
		if isInt {
			if limit > 0 {
				limitValue = limit
				delete(where, models.Limit)
			}
		}
	}

	iniValue := 0
	if v, ok := where[models.Ini]; ok {
		ini, isInt := v.(int)
		if isInt {
			if ini > 0 {
				iniValue = ini
				delete(where, models.Ini)
			}
		}
	}

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

	if iniValue > 0 {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND e.id > ?"
		} else {
			query = query + " WHERE e.id > ?"
		}

		params = append(params, iniValue)
	}

	if startDate != "" && finalDate != "" {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND e.created_at >= ? AND e.created_at < ?"
		} else {
			query = query + " WHERE e.created_at >= ? AND e.created_at < ?"
		}

		params = append(params, startDate, finalDate)
	}

	if orderByValue != "" {
		query = query + " ORDER BY e.id " + orderByValue
	} else {
		query = query + " ORDER BY e.created_at DESC"
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.Find.Query: ", err)
		}

		return events, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		event := Event{}

		fields = []interface{}{
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
				fmt.Println("Model.Event.Find.Open: ", err)
			}

		} else {
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

	return events, err
}

// FindByUserAndSeen ...
func (m Model) FindByUserAndSeen(userID int64, limit int, typeIn uint8, isSeen bool) ([]Event, error) {
	events := []Event{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.FindByUserAndSeen.Open: ", err)
		}

		return events, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindByUserAndSeen.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{userID, isSeen}
	var rows *sql.Rows

	/*query := `SELECT
		e.id, e.type, e.description,
		e.created_at, e.updated_at,
		ue.user_id, u.name AS user
	FROM events AS e
	LEFT JOIN users_events AS ue ON e.id = ue.event_id
	LEFT JOIN users AS u ON u.id = ue.user_id
	WHERE u.id = ? AND ue.is_seen = ?`*/

	query := `SELECT 
							e.id, e.type, e.description,
							e.created_at, e.updated_at,
							ue.user_id, u.name AS user
						FROM users_events AS ue
						LEFT JOIN events AS e ON e.id = ue.event_id
						LEFT JOIN users AS u ON u.id = ue.user_id
						WHERE ue.user_id = ? AND ue.is_seen = ?`

	if typeIn != 0 {
		query = query + " AND e.type = ?"

		params = append(params, typeIn)
	}

	query = query + " ORDER BY ue.id DESC"

	if limit == 0 {
		limit = 30

		query = query + " LIMIT ?"
		params = append(params, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.FindByUserAndSeen.Query: ", err)
		}

		return events, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindByUserAndSeen.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		event := Event{}

		fields = []interface{}{
			&event.id,
			&event.typeIn,
			&event.description,
			&event.createdAt,
			&event.updatedAt,
			&event.userID,
			&event.user,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindByUserAndSeen.Scan: ", err)
			}

		} else {
			if event.id.Valid {
				event.ID = event.id.Int64

				if event.ID > 0 {
					// filtro de CreatedAt
					if event.createdAt.Valid {
						event.CreatedAt = event.createdAt.Time
					}

					// filtro de UpdatedAt
					if event.updatedAt.Valid {
						event.UpdatedAt = event.updatedAt.Time
					}

					// filtro de Type
					if event.typeIn.Valid {
						typeIn := event.typeIn.Int64
						event.Type = uint8(typeIn)
					}

					// filtro de Description
					if event.description.Valid {
						event.Description = event.description.String
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
		}
	}

	return events, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(where map[string]interface{}, value uint8, startDate, finalDate string) ([]Event, error) {
	events := []Event{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.FindByUserOrLowerValue.Open: ", err)
		}

		return events, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var userID int64
	var eType uint8

	lenWhere := len(where)
	if lenWhere > 0 {
		for k, v := range where {
			if k == KeyUserID {
				userID = v.(int64)

			} else if k == KeyType {
				eType = v.(uint8)
			}
		}
	}

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT e.id, e.type, e.description,
							e.created_at, e.updated_at,
							ue.user_id, u.name AS user
						FROM events AS e
						LEFT JOIN users_events AS ue ON e.id = ue.event_id
						LEFT JOIN users AS u ON u.id = ue.user_id
						WHERE u.id = ? OR u.value > ?`

	if startDate != "" && finalDate != "" {
		query = query + " AND (e.created_at >= ? AND e.created_at < ?)"

		params = append(params, startDate, finalDate)
	}

	if eType != 0 {
		query = query + " AND e.type = ?"

		params = append(params, eType)
	}

	query = query + " ORDER BY e.created_at DESC"

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.FindByUserOrLowerValue.Query: ", err)
		}

		return events, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		event := Event{}

		fields = []interface{}{
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
				fmt.Println("Model.Event.FindByUserOrLowerValue.Scan: ", err)
			}

		} else {

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

	return events, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(where map[string]interface{}, value uint8, startDate, finalDate string) ([]Event, error) {
	events := []Event{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.FindByUserAndLowerValue.Open: ", err)
		}

		return events, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var userID int64
	var eType uint8

	lenWhere := len(where)
	if lenWhere > 0 {
		for k, v := range where {
			if k == KeyUserID {
				userID = v.(int64)
			} else if k == KeyType {
				eType = v.(uint8)
			}
		}
	}

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT 
							e.id, e.type, e.description,
							e.created_at, e.updated_at,
							ue.user_id, u.name AS user
						FROM events AS e
						LEFT JOIN users_events AS ue ON e.id = ue.event_id
						LEFT JOIN users AS u ON u.id = ue.user_id
						WHERE u.id = ? AND u.value > ?`

	if startDate != "" && finalDate != "" {
		query = query + " AND (e.created_at >= ? AND e.created_at < ?)"

		params = append(params, startDate, finalDate)
	}

	if eType != 0 {
		query = query + " AND e.type = ?"

		params = append(params, eType)
	}

	query = query + " ORDER BY e.created_at DESC"

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Event.FindByUserAndLowerValue.Query: ", err)
		}

		return events, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Event.FindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		event := Event{}

		fields = []interface{}{
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
				fmt.Println("Model.Event.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {

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

	return events, err
}
