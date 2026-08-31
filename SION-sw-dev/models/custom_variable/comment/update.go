package comment

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Comment, error) {
	comment := Comment{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Comment.Update.Open: ", err)
		}

		return comment, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Comment.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.CustomVariable.Comment.Update.Values: ", err)
		}

		return comment, err
	}

	var stmt *sql.Stmt

	query := "UPDATE custom_variables_comments SET {{fields}} WHERE id = ?"

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

	commentID := values[KeyID]
	params = append(params, commentID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Comment.Update.Prepare: ", err)
		}

		return comment, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.Comment.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Comment.Update.Exec: ", err)
		}

		return comment, err
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Comment.Update.RowsAffected: ", err)
		}

		return comment, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.CustomVariable.Comment.Update.RowsAffected: ", rowsAffected)
		}
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
			fmt.Println("Model.CustomVariable.Comment.Update.Scan: ", err)
		}

		return comment, err
	}

	// filtro de CreatedAt
	if comment.createdAt.Valid {
		comment.CreatedAt = comment.createdAt.Time
	}

	return comment, err
}
