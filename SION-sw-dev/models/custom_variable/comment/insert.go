package comment

import (
	"database/sql"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Comment, error) {
	comment := Comment{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Comment.Create.Open: ", err)
		}

		return comment, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				if m.Debug {
					fmt.Println("Model.CustomVariable.Comment.Create.Close: ", err)
				}
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO custom_variables_comments SET"

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
				fmt.Println("Model.CustomVariable.Comment.Create.Prepare: ", err)
			}

			return comment, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("stmt.Error: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Comment.Create.Exec: ", err)
			}

			return comment, err
		}

		var commentID int64
		commentID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Comment.Create.LastInsertId: ", err)
			}

			return comment, err
		}

		query = "SELECT * FROM custom_variables_comments WHERE id = ?"
		row := db.QueryRow(query, commentID)

		fields := []interface{}{
			&comment.ID,
			&comment.UserCustomVariableID,
			&comment.Comment,
			&comment.createdAt,
		}

		err = row.Scan(fields...)

		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Comment.Create.Scan: ", err)
			}

			return comment, err
		}

		// filtro de CreateAt
		if comment.createdAt.Valid {
			comment.CreatedAt = comment.createdAt.Time
		}

	}

	return comment, err
}
