package graphic

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Graphic, error) {
	graphic := Graphic{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Graphic.Create.Open: ", err)
		}

		return graphic, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO graphics SET"

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
				fmt.Println("Model.Graphic.Create.Prepare: ", err)
			}

			return graphic, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Graphic.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.Create.Exec: ", err)
			}

			return graphic, err
		}

		var graphicID int64
		graphicID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Graphic.Create.LastInsertId: ", err)
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
				fmt.Println("Model.Graphic.Create.Scan: ", err)
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

	}

	return graphic, err
}
