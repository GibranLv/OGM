package file

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (File, error) {
	file := File{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.File.Update.Open: ", err)
		}

		return file, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.File.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values empty")

		if m.Debug {
			fmt.Println("Model.File.Update.Values: ", err)
		}

		return file, err
	}

	var stmt *sql.Stmt

	query := "UPDATE files SET {{fields}} WHERE id = ?"

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

	fileID := values[KeyID]
	params = append(params, fileID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.File.Update.Prepare: ", err)
		}

		return file, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.File.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.File.Update.Exec: ", err)
		}

		return file, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.File.Update.RowsAffected: ", err)
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
			fmt.Println("Model.File.Update.Scan: ", err)
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

	return file, err
}
