package graphic

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Graphic, error) {
	graphic := Graphic{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.Update.Open: ", err)
		}

		return graphic, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.Graphic.Update.Values: ", err)
		}

		return graphic, err
	}

	var stmt *sql.Stmt

	query := "UPDATE graphics SET {{fields}} WHERE id = ?"

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

	graphicID := values[KeyID]
	params = append(params, graphicID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.Update.Prepare: ", err)
		}

		return graphic, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.Update.Stmt.Close: ", err)
			}
		}

	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.Update.Exec: ", err)
		}

		return graphic, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.Update.RowsAffected: ", err)
		}

		return graphic, err
	}

	query = "SELECT * FROM graphics WHERE id = ?"
	row := db.QueryRow(query, graphicID)

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

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.Update.Scan: ", err)
		}

		return graphic, err
	}

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

	return graphic, err
}
