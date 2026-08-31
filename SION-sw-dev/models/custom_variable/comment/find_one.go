package comment

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Comment, error) {
	comment := Comment{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Comment.FindOne.Open: ", err)
		}

		return comment, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Comment.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM custom_variables_comments"

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
			fmt.Println("Model.CustomVariable.Comment.FindOne.Query: ", err)
		}

		return comment, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Comment.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	comments := []Comment{}

	for rows.Next() {
		comment := Comment{}

		fields := []interface{}{
			&comment.ID,
			&comment.UserCustomVariableID,
			&comment.Comment,
			&comment.createdAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Comment.FindOne.Scan: ", err)
			}

			return comment, err
		}

		if comment.ID != 0 {

			// filtro de CreatedAt
			if comment.createdAt.Valid {
				comment.CreatedAt = comment.createdAt.Time
			}

			comments = append(comments, comment)
		}
	}

	if len(comments) == 0 {
		return comment, err
	}

	comment = comments[0]

	return comment, err
}
