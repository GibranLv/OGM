package matrix

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Matrix, error) {
	matrix := Matrix{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.Update.Open: ", err)
		}

		return matrix, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.Matrix.Update.Values: ", err)
		}

		return matrix, err
	}

	var stmt *sql.Stmt

	query := "UPDATE matrices SET {{fields}} WHERE id = ?"

	i := 0
	for k, v := range values {
		isID := k == KeyID
		if !isID {
			params = append(params, v)

			if i == 0 {
				fieldsIn = fieldsIn + " " + k + " = ?"
				i = i + 1
			} else {
				fieldsIn = fieldsIn + ", " + k + " = ?"
			}
		}
	}

	query = strings.Replace(query, "{{fields}}", fieldsIn, 1)

	matrixID := values[KeyID]
	params = append(params, matrixID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.Update.Prepare: ", err)
		}

		return matrix, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Matrix.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.Update.Exec: ", err)
		}

		return matrix, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Matrix.Update.RowsAffected: ", err)
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
			fmt.Println("Model.Matrix.Update.Scan: ", err)
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
				fmt.Println("Model.Matrix.Update.StructureJSON.Unmarshal: ", err)
			}
		}

		if matrix.Structure == nil {
			matrix.Structure = []Struct{}
		}

		if matrix.StructureJSON == nil {
			matrix.StructureJSON = []StructJSON{}
		}
	}

	return matrix, err
}
