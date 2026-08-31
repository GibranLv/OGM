package broadcastcomment

import (
	"database/sql"
	"encoding/json"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (BroadcastComment, error) {
	broadcast := BroadcastComment{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.BroadcastComment.FindOne.Open: ", err)
		}

		return broadcast, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.BroadcastComment.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM broadcast_comments"

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
			fmt.Println("Model.BroadcastComment.FindOne.Query: ", err)
		}

		return broadcast, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.BroadcastComment.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	broadcasts := []BroadcastComment{}

	for rows.Next() {
		broadcast := BroadcastComment{}

		fields := []interface{}{
			&broadcast.ID,
			&broadcast.UserID,
			&broadcast.usersJSON,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.BroadcastComment.FindOne.Scan: ", err)
			}

			return broadcast, err
		}

		if broadcast.ID != 0 {
			if broadcast.usersJSON.Valid {
				oJSON := broadcast.usersJSON.String

				buffer := []byte(oJSON)
				err := json.Unmarshal(buffer, &broadcast.Users)
				if err != nil {
					fmt.Println("Model.BroadcastComment.Unmarshal.Users: ", err)
				}
			}

			broadcasts = append(broadcasts, broadcast)
		}
	}

	if len(broadcasts) == 0 {
		return broadcast, err
	}

	broadcast = broadcasts[0]

	return broadcast, err
}
