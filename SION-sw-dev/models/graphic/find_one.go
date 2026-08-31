package graphic

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Graphic, error) {
	graphic := Graphic{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.FindOne.Open: ", err)
		}

		return graphic, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM graphics"

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
			fmt.Println("Model.Graphic.FindOne.Query: ", err)
		}

		return graphic, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	graphics := []Graphic{}

	for rows.Next() {
		graphic := Graphic{}

		fields := []interface{}{
			&graphic.ID,
			&graphic.UserID,
			&graphic.MatrixID,
			&graphic.GroupID,
			&graphic.JSON,
			&graphic.Background,
			&graphic.createdAt,
			&graphic.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindOne.Scan: ", err)
			}

			return graphic, err
		}

		if graphic.ID != 0 {

			// filtro de CreatedAt
			if graphic.createdAt.Valid {
				graphic.CreatedAt = graphic.createdAt.Time
			}

			// filtro de UpdatedAt
			if graphic.updatedAt.Valid {
				graphic.UpdatedAt = graphic.updatedAt.Time
			}

			if graphic.JSON != "" {
				buffer := []byte(graphic.JSON)
				_ = json.Unmarshal(buffer, &graphic.Variables)
			}

			graphics = append(graphics, graphic)
		}
	}

	if len(graphics) == 0 {
		return graphic, err
	}

	graphic = graphics[0]

	return graphic, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (Graphic, error) {
	graphic := Graphic{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.FindOneByGraphicOrLowerValue.Open: ", err)
		}

		return graphic, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindOneByGraphicOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT g.id, g.user_id, g.matrix_id, g.group_id, g.json, g.background,
							g.created_at, g.updated_at
						FROM graphics AS g
						LEFT JOIN users AS u ON u.id = g.user_id
						WHERE g.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.FindOneByGraphicOrLowerValue.Query: ", err)
		}

		return graphic, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindOneByGraphicOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	graphics := []Graphic{}

	for rows.Next() {
		graphic := Graphic{}

		fields := []interface{}{
			&graphic.ID,
			&graphic.UserID,
			&graphic.MatrixID,
			&graphic.GroupID,
			&graphic.JSON,
			&graphic.Background,
			&graphic.createdAt,
			&graphic.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindOneByGraphicOrLowerValue.Scan: ", err)
			}

			return graphic, err
		}

		if graphic.ID != 0 {

			// filtro de CreatedAt
			if graphic.createdAt.Valid {
				graphic.CreatedAt = graphic.createdAt.Time
			}

			// filtro de UpdatedAt
			if graphic.updatedAt.Valid {
				graphic.UpdatedAt = graphic.updatedAt.Time
			}

			if graphic.JSON != "" {
				buffer := []byte(graphic.JSON)
				_ = json.Unmarshal(buffer, &graphic.Variables)
			}

			graphics = append(graphics, graphic)
		}
	}

	if len(graphics) == 0 {
		return graphic, err
	}

	graphic = graphics[0]

	return graphic, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (Graphic, error) {
	graphic := Graphic{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.FindOneByUser.Open: ", err)
		}

		return graphic, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT 
							g.id, g.user_id, g.matrix_id, g.group_id, g.json, g.background,
							g.created_at, g.updated_at
						FROM graphics AS g
						LEFT JOIN users AS u ON u.id = g.user_id
						WHERE g.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.FindOneByUser.Query: ", err)
		}

		return graphic, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	graphics := []Graphic{}

	for rows.Next() {
		graphic := Graphic{}

		fields := []interface{}{
			&graphic.ID,
			&graphic.UserID,
			&graphic.MatrixID,
			&graphic.GroupID,
			&graphic.JSON,
			&graphic.Background,
			&graphic.createdAt,
			&graphic.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindOneByUser.Scan: ", err)
			}

			return graphic, err
		}

		if graphic.ID != 0 {

			// filtro de CreatedAt
			if graphic.createdAt.Valid {
				graphic.CreatedAt = graphic.createdAt.Time
			}

			// filtro de UpdatedAt
			if graphic.updatedAt.Valid {
				graphic.UpdatedAt = graphic.updatedAt.Time
			}

			if graphic.JSON != "" {
				buffer := []byte(graphic.JSON)
				_ = json.Unmarshal(buffer, &graphic.Variables)
			}

			graphics = append(graphics, graphic)
		}
	}

	if len(graphics) == 0 {
		return graphic, err
	}

	graphic = graphics[0]

	return graphic, err
}
