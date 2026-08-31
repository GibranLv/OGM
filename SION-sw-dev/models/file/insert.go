package file

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (File, error) {
	file := File{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.File.Create.Open: ", err)
		}

		return file, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.File.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO files SET"

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
				fmt.Println("Model.File.Create.Prepare: ", err)
			}

			return file, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.File.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.File.Create.Exec: ", err)
			}

			return file, err
		}

		var fileID int64
		fileID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.File.Create.LastInsertId: ", err)
			}

			return file, err
		}

		query = "SELECT * FROM files WHERE id = ?"
		row := db.QueryRow(query, fileID)

		fields := []interface{}{
			&file.ID,
			&file.UserID,
			&file.Name,
			&file.Type,
			&file.Path,
			&file.NameVirtual,
			&file.PathVirtual,
			&file.IsDir,
			&file.createdAt,
			&file.updatedAt,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.File.Create.Scan: ", err)
			}

			return file, err
		}

		// filtro de CreatedAt
		if file.createdAt.Valid {
			file.CreatedAt = file.createdAt.Time
		}

		// filtro de UpdatedAt
		if file.updatedAt.Valid {
			file.UpdatedAt = file.updatedAt.Time
		}

	}

	return file, err
}
