package matrix

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]Matrix, error) {
	matrices := []Matrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.Find.Open: ", err)
		}

		return matrices, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM matrices"

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
			fmt.Println("Model.Matrix.Find.Query: ", err)
		}

		return matrices, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		matrix := Matrix{}

		fields = []interface{}{
			&matrix.ID,
			&matrix.Name,
			&matrix.structureJSON,
			&matrix.createdAt,
			&matrix.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.Find.Scan: ", err)
			}

		} else {
			// filtro de CreatedAt
			if matrix.createdAt.Valid {
				matrix.CreatedAt = matrix.createdAt.Time
			}

			// filtro de UpdatedAt
			if matrix.updatedAt.Valid {
				matrix.UpdatedAt = matrix.updatedAt.Time
			}

			if matrix.structureJSON.Valid {
				s := matrix.structureJSON.String
				bs := []byte(s)
				err := json.Unmarshal(bs, &matrix.StructureJSON)
				if err != nil {
					fmt.Println("Model.Matrix.Find.Unmarshal: ", err)
				}
			}

			matrices = append(matrices, matrix)
		}
	}

	return matrices, err
}

// FindByUser ...
func (m Model) FindByUser(userID int64) ([]Matrix, error) {
	matrices := []Matrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.FindByUser.Open: ", err)
		}

		return matrices, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindByUser.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT 
							m.id, m.name, m.structure_json, m.created_at, m.updated_at
						FROM matrices AS m
						LEFT JOIN users_matrices AS um ON m.id = um.matrix_id
						WHERE um.user_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.FindByUser.Query: ", err)
		}

		return matrices, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		matrix := Matrix{}

		fields = []interface{}{
			&matrix.ID,
			&matrix.Name,
			&matrix.structureJSON,
			&matrix.createdAt,
			&matrix.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindByUser.Scan: ", err)
			}

		} else {
			// filtro de StructureJSON
			if matrix.structureJSON.Valid {
				s := matrix.structureJSON.String
				bs := []byte(s)
				err := json.Unmarshal(bs, &matrix.StructureJSON)
				if err != nil {
					if m.Debug {
						fmt.Println("Model.Matrix.FindByUser.StructureJSON.Unmarshal: ", err)
					}
				}
			}

			// filtro de CreatedAt
			if matrix.createdAt.Valid {
				matrix.CreatedAt = matrix.createdAt.Time
			}

			// filtro de UpdatedAt
			if matrix.updatedAt.Valid {
				matrix.UpdatedAt = matrix.updatedAt.Time
			}

			matrices = append(matrices, matrix)
		}
	}

	return matrices, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(userID int64, value uint8) ([]Matrix, error) {
	matrices := []Matrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.FindByUserOrLowerValue.Open: ", err)
		}

		return matrices, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
						DISTINCT m.id, m.name, m.structure_json, m.created_at, m.updated_at
						FROM matrices AS m
						LEFT JOIN users_matrices AS um ON m.id = um.matrix_id
						LEFT JOIN users AS u ON u.id = um.user_id
						WHERE u.id = ? OR u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.FindByUserOrLowerValue.Query: ", err)
		}

		return matrices, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		matrix := Matrix{}

		fields = []interface{}{
			&matrix.ID,
			&matrix.Name,
			&matrix.structureJSON,
			&matrix.createdAt,
			&matrix.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindByUserOrLowerValue.Scan: ", err)
			}

		} else {
			// filtro de StructureJSON
			if matrix.structureJSON.Valid {
				s := matrix.structureJSON.String
				bs := []byte(s)
				err := json.Unmarshal(bs, &matrix.StructureJSON)
				if err != nil {
					if m.Debug {
						fmt.Println("Model.Matrix.FindByUserOrLowerValue.StructureJSON.Unmarshal: ", err)
					}
				}

				if matrix.Structure == nil {
					matrix.Structure = []Struct{}
				}

				if matrix.StructureJSON == nil {
					matrix.StructureJSON = []StructJSON{}
				}
			}

			// filtro de CreatedAt
			if matrix.createdAt.Valid {
				matrix.CreatedAt = matrix.createdAt.Time
			}

			// filtro de UpdatedAt
			if matrix.updatedAt.Valid {
				matrix.UpdatedAt = matrix.updatedAt.Time
			}

			matrices = append(matrices, matrix)
		}
	}

	return matrices, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(userID int64, value uint8) ([]Matrix, error) {
	matrices := []Matrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.FindByUserAndLowerValue.Open: ", err)
		}

		return matrices, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
						DISTINCT m.id, m.name, m.structure_json, m.created_at, m.updated_at
						FROM matrices AS m
						LEFT JOIN users_matrices AS um ON m.id = um.matrix_id
						LEFT JOIN users AS u ON u.id = um.user_id
						WHERE u.id = ? AND u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.FindByUserAndLowerValue.Query: ", err)
		}

		return matrices, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		matrix := Matrix{}

		fields = []interface{}{
			&matrix.ID,
			&matrix.Name,
			&matrix.structureJSON,
			&matrix.createdAt,
			&matrix.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {
			// filtro de StructureJSON
			if matrix.structureJSON.Valid {
				s := matrix.structureJSON.String
				bs := []byte(s)
				err := json.Unmarshal(bs, &matrix.StructureJSON)
				if err != nil {
					if m.Debug {
						fmt.Println("Model.Matrix.FindByUserAndLowerValue.StructureJSON.Unmarshal: ", err)
					}
				}

				if matrix.Structure == nil {
					matrix.Structure = []Struct{}
				}

				if matrix.StructureJSON == nil {
					matrix.StructureJSON = []StructJSON{}
				}
			}

			// filtro de CreatedAt
			if matrix.createdAt.Valid {
				matrix.CreatedAt = matrix.createdAt.Time
			}

			// filtro de UpdatedAt
			if matrix.updatedAt.Valid {
				matrix.UpdatedAt = matrix.updatedAt.Time
			}

			matrices = append(matrices, matrix)
		}
	}

	return matrices, err
}
