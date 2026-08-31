package matrix

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Matrix, error) {
	matrix := Matrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.FindOne.Open: ", err)
		}

		return matrix, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM matrices"

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
			fmt.Println("Model.Matrix.FindOne.Query: ", err)
		}

		return matrix, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	matrices := []Matrix{}

	for rows.Next() {
		matrix := Matrix{}

		fields := []interface{}{
			&matrix.ID,
			&matrix.Name,
			&matrix.structureJSON,
			&matrix.createdAt,
			&matrix.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindOne.Scan: ", err)
			}

			return matrix, err
		}

		if matrix.ID != 0 {

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
					if m.Debug {
						fmt.Println("Model.Matrix.FindOne.StructureJSON.Unmarshal: ", err)
					}
				}

				if matrix.Structure == nil {
					matrix.Structure = []Struct{}
				}

				if matrix.StructureJSON == nil {
					matrix.StructureJSON = []StructJSON{}
				}
			}

			matrices = append(matrices, matrix)
		}
	}

	if len(matrices) == 0 {
		return matrix, err
	}

	matrix = matrices[0]

	return matrix, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (Matrix, error) {
	matrix := Matrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.FindOneByUser.Open: ", err)
		}

		return matrix, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT
							m.id, m.name, m.structure_json, m.created_at, m.updated_at,
							um.user_id, um.is_creator
						FROM matrices AS m
						LEFT JOIN users_matrices AS um ON m.id = um.matrix_id
						LEFT JOIN users AS u ON u.id = um.user_id
						WHERE m.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.FindOneByUser.Query: ", err)
		}

		return matrix, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	matrices := []Matrix{}

	for rows.Next() {
		matrix := Matrix{}

		fields := []interface{}{
			&matrix.ID,
			&matrix.Name,
			&matrix.structureJSON,
			&matrix.createdAt,
			&matrix.updatedAt,
			&matrix.UserID,
			&matrix.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindOneByUser.Scan: ", err)
			}

			return matrix, err
		}

		if matrix.ID != 0 {

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
					if m.Debug {
						fmt.Println("Model.Matrix.FindOneByUser.StructureJSON.Unmarshal: ", err)
					}
				}
			}

			if matrix.Structure == nil {
				matrix.Structure = []Struct{}
			}

			if matrix.StructureJSON == nil {
				matrix.StructureJSON = []StructJSON{}
			}

			matrices = append(matrices, matrix)
		}
	}

	if len(matrices) == 0 {
		return matrix, err
	}

	matrix = matrices[0]

	return matrix, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (Matrix, error) {
	matrix := Matrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.FindOneByUserOrLowerValue.Open: ", err)
		}

		return matrix, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindOneByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT m.id, m.name, m.structure_json, m.created_at, m.updated_at,
							um.user_id, um.is_creator
						FROM matrices AS m
						LEFT JOIN users_matrices AS um ON m.id = um.matrix_id
						LEFT JOIN users AS u ON u.id = um.user_id
						WHERE m.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.FindOneByUserOrLowerValue.Query: ", err)
		}

		return matrix, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindOneByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	matrices := []Matrix{}

	for rows.Next() {
		matrix := Matrix{}

		fields := []interface{}{
			&matrix.ID,
			&matrix.Name,
			&matrix.structureJSON,
			&matrix.createdAt,
			&matrix.updatedAt,
			&matrix.UserID,
			&matrix.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.FindOneByUserOrLowerValue.Scan: ", err)
			}

			return matrix, err
		}

		if matrix.ID != 0 {

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
					if m.Debug {
						fmt.Println("Model.Matrix.FindOneByUserOrLowerValue.StructureJSON.Unmarshal: ", err)
					}
				}

				if matrix.Structure == nil {
					matrix.Structure = []Struct{}
				}

				if matrix.StructureJSON == nil {
					matrix.StructureJSON = []StructJSON{}
				}
			}

			matrices = append(matrices, matrix)
		}
	}

	if len(matrices) == 0 {
		return matrix, err
	}

	matrix = matrices[0]

	return matrix, err
}
