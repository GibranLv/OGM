package graphic

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]Graphic, error) {
	graphics := []Graphic{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.Find.Open: ", err)
		}

		return graphics, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM graphics"

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
			fmt.Println("Model.Graphic.Find.Query: ", err)
		}

		return graphics, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.Find.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		graphic := Graphic{}

		fields = []interface{}{
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
				fmt.Println("Model.Graphic.Find.Scan: ", err)
			}
		} else {
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

	return graphics, err
}

// FindByUser ...
func (m Model) FindByUser(userID int64) ([]Graphic, error) {
	graphics := []Graphic{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.FindByUser.Open: ", err)
		}

		return graphics, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindByUser.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT 
							g.id, g.user_id, g.matrix_id, g.group_id, g.json, g.background,
							g.created_at, g.updated_at
						FROM graphics AS g
						LEFT JOIN users AS u ON u.id = g.user_id
						WHERE g.user_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.FindByUser.Query: ", err)
		}

		return graphics, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		graphic := Graphic{}

		fields = []interface{}{
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
				fmt.Println("Model.Graphic.FindByUser.Scan: ", err)
			}

		} else {

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

	return graphics, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(userID int64, value uint8) ([]Graphic, error) {
	graphics := []Graphic{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.FindByUserOrLowerValue.Open: ", err)
		}

		return graphics, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT g.id, g.user_id, g.matrix_id, g.group_id, g.json, g.background,
							g.created_at, g.updated_at
						FROM graphics AS g
						LEFT JOIN users AS u ON u.id = g.user_id
						WHERE u.id = ? OR u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.FindByUserOrLowerValue.Query: ", err)
		}

		return graphics, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindByUserOrLowerValue.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		graphic := Graphic{}

		fields = []interface{}{
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
				fmt.Println("Model.Graphic.FindByUserOrLowerValue.Scan: ", err)
			}

		} else {

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

	return graphics, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(userID int64, value uint8) ([]Graphic, error) {
	graphics := []Graphic{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.FindByUserAndLowerValue.Open: ", err)
		}

		return graphics, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT 
							g.id, g.user_id, g.matrix_id, g.group_id, g.json, g.background,
							g.created_at, g.updated_at
						FROM graphics AS g
						LEFT JOIN users AS u ON u.id = g.user_id
						WHERE u.id = ? AND u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.FindByUserAndLowerValue.Query: ", err)
		}

		return graphics, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.FindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		graphic := Graphic{}

		fields = []interface{}{
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
				fmt.Println("Model.Graphic.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {

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

	return graphics, err
}
