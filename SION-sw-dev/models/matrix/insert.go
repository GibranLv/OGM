package matrix

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Matrix, error) {
	matrix := Matrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.Create.Open: ", err)
		}

		return matrix, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO matrices SET"

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
				fmt.Println("Model.Matrix.Create.Prepare: ", err)
			}

			return matrix, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Matrix.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.Create.Exec: ", err)
			}

			return matrix, err
		}

		var matrixID int64
		matrixID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.Create.LastInsertId: ", err)
			}

			return matrix, err
		}

		query = "SELECT * FROM matrices WHERE id = ?"
		row := db.QueryRow(query, matrixID)

		fields := []interface{}{
			&matrix.ID,
			&matrix.Name,
			&matrix.structureJSON,
			&matrix.createdAt,
			&matrix.updatedAt,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.Create.Scan: ", err)
			}

			return matrix, err
		}

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
					fmt.Println("Model.Matrix.Create.StructureJSON.Unmarshal: ", err)
				}
			}

			if matrix.Structure == nil {
				matrix.Structure = []Struct{}
			}

			if matrix.StructureJSON == nil {
				matrix.StructureJSON = []StructJSON{}
			}
		}
	}

	return matrix, err
}
