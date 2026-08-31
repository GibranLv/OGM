package file

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (File, error) {
	file := File{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.File.FindOne.Open: ", err)
		}

		return file, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.File.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM files"

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
			fmt.Println("Model.File.FindOne.Query: ", err)
		}

		return file, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.File.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	files := []File{}

	for rows.Next() {
		file := File{}

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

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.File.FindOne.Scan: ", err)
			}

			return file, err
		}

		if file.ID != 0 {

			// filtro de CreatedAt
			if file.createdAt.Valid {
				file.CreatedAt = file.createdAt.Time
			}

			// filtro de UpdatedAt
			if file.updatedAt.Valid {
				file.UpdatedAt = file.updatedAt.Time
			}

			files = append(files, file)
		}
	}

	if len(files) == 0 {
		return file, err
	}

	file = files[0]

	return file, err
}
