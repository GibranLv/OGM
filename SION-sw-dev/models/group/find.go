package group

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]Group, error) {
	groups := []Group{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.Find.Open: ", err)
		}

		return groups, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	// fixed keyword of MySQL v8
	query := "SELECT * FROM `groups`"

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
			query = query + " " + k + " = ?"

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
			query = query + " AND id > ?"
		} else {
			query = query + " WHERE id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY id " + orderByValue
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.Find.Query: ", err)
		}

		return groups, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		group := Group{}

		fields = []interface{}{
			&group.ID,
			&group.Name,
			&group.Type,
			&group.Latitude,
			&group.Longitude,
			&group.MarkerIcon,
			&group.createdAt,
			&group.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.Find.Scan: ", err)
			}

		} else {
			// filtro de CreatedAt
			if group.createdAt.Valid {
				group.CreatedAt = group.createdAt.Time
			}

			// filtro de UpdatedAt
			if group.updatedAt.Valid {
				group.UpdatedAt = group.updatedAt.Time
			}

			groups = append(groups, group)
		}
	}

	return groups, err
}

// FindByUser ...
func (m Model) FindByUser(userID int64) ([]Group, error) {
	groups := []Group{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindByUser.Open: ", err)
		}

		return groups, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUser.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT
				g.id, g.name, g.type, g.latitude, g.longitude, g.marker_icon,
				g.created_at, g.updated_at
			FROM %s AS g
			LEFT JOIN users_groups AS ug ON g.id = ug.group_id
			WHERE ug.user_id = ?`

	// fixed keyword`groups` of MySQL v8
	query = fmt.Sprintf(query, "`groups`")

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindByUser.Query: ", err)
		}

		return groups, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		group := Group{}

		fields = []interface{}{
			&group.ID,
			&group.Name,
			&group.Type,
			&group.Latitude,
			&group.Longitude,
			&group.MarkerIcon,
			&group.createdAt,
			&group.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUser.Scan: ", err)
			}

		} else {

			// filtro de CreatedAt
			if group.createdAt.Valid {
				group.CreatedAt = group.createdAt.Time
			}

			// filtro de UpdatedAt
			if group.updatedAt.Valid {
				group.UpdatedAt = group.updatedAt.Time
			}

			groups = append(groups, group)
		}
	}

	return groups, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(userID int64, value uint8) ([]Group, error) {
	groups := []Group{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindByUserOrLowerValue.Open: ", err)
		}

		return groups, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
				DISTINCT g.id, g.name, g.type, g.latitude, g.longitude, g.marker_icon,
				g.created_at, g.updated_at
			FROM %s AS g
			LEFT JOIN users_groups AS ug ON g.id = ug.group_id
			LEFT JOIN users AS u ON u.id = ug.user_id
			WHERE u.id = ? OR u.value > ?`

	// fixed keyword`groups` of MySQL v8
	query = fmt.Sprintf(query, "`groups`")

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindByUserOrLowerValue.Query: ", err)
		}

		return groups, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		group := Group{}

		fields = []interface{}{
			&group.ID,
			&group.Name,
			&group.Type,
			&group.Latitude,
			&group.Longitude,
			&group.MarkerIcon,
			&group.createdAt,
			&group.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUserOrLowerValue.Scan: ", err)
			}

		} else {

			// filtro de CreatedAt
			if group.createdAt.Valid {
				group.CreatedAt = group.createdAt.Time
			}

			// filtro de UpdatedAt
			if group.updatedAt.Valid {
				group.UpdatedAt = group.updatedAt.Time
			}

			groups = append(groups, group)
		}
	}

	return groups, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(userID int64, value uint8) ([]Group, error) {
	groups := []Group{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindByUserAndLowerValue.Open: ", err)
		}

		return groups, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT 
				g.id, g.name, g.type, g.latitude, g.longitude, g.marker_icon,
				g.created_at, g.updated_at
			FROM %s AS g
			LEFT JOIN users_groups AS ug ON g.id = ug.group_id
			LEFT JOIN users AS u ON u.id = ug.user_id
			WHERE u.id = ? AND u.value > ?`


	// fixed keyword`groups` of MySQL v8
	query = fmt.Sprintf(query, "`groups`")

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindByUserAndLowerValue.Query: ", err)
		}

		return groups, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		group := Group{}

		fields = []interface{}{
			&group.ID,
			&group.Name,
			&group.Type,
			&group.Latitude,
			&group.Longitude,
			&group.MarkerIcon,
			&group.createdAt,
			&group.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {

			// filtro de CreatedAt
			if group.createdAt.Valid {
				group.CreatedAt = group.createdAt.Time
			}

			// filtro de UpdatedAt
			if group.updatedAt.Valid {
				group.UpdatedAt = group.updatedAt.Time
			}

			groups = append(groups, group)
		}
	}

	return groups, err
}

// FindByUserWithComment ...
func (m Model) FindByUserWithComment(userID int64) ([]Group, error) {
	groups := []Group{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindByUserWithComment.Open: ", err)
		}

		return groups, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUserWithComment.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT
				g.id, gc.comment
			FROM %s AS g
			LEFT JOIN users_groups AS ug ON g.id = ug.group_id
			LEFT JOIN groups_comments AS gc ON gc.user_group_id = ug.id
			WHERE ug.user_id = ?`

	// fixed keyword`groups` of MySQL v8
	query = fmt.Sprintf(query, "`groups`")

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindByUserWithComment.Query: ", err)
		}

		return groups, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUserWithComment.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		group := Group{}

		fields = []interface{}{
			&group.ID,
			&group.comment,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindByUserWithComment.Scan: ", err)
			}

		} else {
			if group.comment.Valid {
				group.Comment = group.comment.String
			}

			groups = append(groups, group)
		}
	}

	return groups, err
}
