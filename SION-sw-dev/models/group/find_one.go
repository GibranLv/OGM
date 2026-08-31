package group

import (
	"database/sql"
	"errors"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Group, error) {
	group := Group{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindOne.Open: ", err)
		}

		return group, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows


	// fixed keyword of MySQL v8
	query := "SELECT * FROM `groups`"

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
			fmt.Println("Model.Group.FindOne.Query: ", err)
		}

		return group, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	groups := []Group{}

	for rows.Next() {
		group := Group{}

		fields := []interface{}{
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
				fmt.Println("Model.Group.FindOne.Scan: ", err)
			}

			return group, err
		}

		if group.ID != 0 {

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

	if len(groups) == 0 {
		return group, err
	}

	group = groups[0]

	return group, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (Group, error) {
	group := Group{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindOneByGroupOrLowerValue.Open: ", err)
		}

		return group, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindOneByGroupOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
				DISTINCT g.id, g.name, g.type, g.latitude, g.longitude, g.marker_icon,
				g.created_at, g.updated_at,
				ug.user_id, ug.is_creator
			FROM %s AS g
			LEFT JOIN users_groups AS ug ON g.id = ug.group_id
			LEFT JOIN users AS u ON u.id = ug.user_id
			WHERE g.id = ? AND (u.id = ? OR u.value > ?)`

	// fixed keyword`groups` of MySQL v8
	query = fmt.Sprintf(query, "`groups`")

	rows, err = db.Query(query, params...)
	if err != nil {
		fmt.Println("Model.Group.FindOneByGroupOrLowerValue.Query: ", err)

		err = errors.New("Ocurrió un error al obtener la información de los grupos")
		return group, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindOneByGroupOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	groups := []Group{}

	for rows.Next() {
		group := Group{}

		fields := []interface{}{
			&group.ID,
			&group.Name,
			&group.Type,
			&group.Latitude,
			&group.Longitude,
			&group.MarkerIcon,
			&group.createdAt,
			&group.updatedAt,
			&group.UserID,
			&group.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindOneByGroupOrLowerValue.Scan: ", err)
			}

			return group, err
		}

		if group.ID != 0 {

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

	if len(groups) == 0 {
		return group, err
	}

	group = groups[0]

	return group, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (Group, error) {
	group := Group{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindOneByUser.Open: ", err)
		}

		return group, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT 
				g.id, g.name, g.type, g.latitude, g.longitude, g.marker_icon,
				g.created_at, g.updated_at,
				ug.user_id, ug.is_creator
			FROM %s AS g
			LEFT JOIN users_groups AS ug ON g.id = ug.group_id
			LEFT JOIN users AS u ON u.id = ug.user_id
			WHERE g.id = ? AND u.id = ?`

	// fixed keyword`groups` of MySQL v8
	query = fmt.Sprintf(query, "`groups`")

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Group.FindOneByUser.Query: ", err)
		}

		return group, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	groups := []Group{}

	for rows.Next() {
		group := Group{}

		fields := []interface{}{
			&group.ID,
			&group.Name,
			&group.Type,
			&group.Latitude,
			&group.Longitude,
			&group.MarkerIcon,
			&group.createdAt,
			&group.updatedAt,
			&group.UserID,
			&group.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Group.FindOneByUser.Scan: ", err)
			}

			return group, err
		}

		if group.ID != 0 {

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

	if len(groups) == 0 {
		return group, err
	}

	group = groups[0]

	return group, err
}
