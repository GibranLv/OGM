package dynamometercard

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (DynamometerCard, error) {
	dynamometerCard := DynamometerCard{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.DynamometerCard.FindOne.Open: ", err)
		}

		return dynamometerCard, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.DynamometerCard.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM dynamometer_cards"

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
			fmt.Println("Model.DynamometerCard.FindOne.Query: ", err)
		}

		return dynamometerCard, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.DynamometerCard.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	dynamometerCards := []DynamometerCard{}

	for rows.Next() {
		dynamometerCard := DynamometerCard{}

		fields := []interface{}{
			&dynamometerCard.ID,
			&dynamometerCard.initialDate,
			&dynamometerCard.finalDate,
			&dynamometerCard.createdAt,
			&dynamometerCard.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.DynamometerCard.FindOne.Scan: ", err)
			}

			return dynamometerCard, err
		}

		if dynamometerCard.ID != 0 {

			// filtro de InitialDate
			if dynamometerCard.initialDate.Valid {
				dynamometerCard.InitialDate = dynamometerCard.initialDate.Time
			}

			// filtro de FinalDate
			if dynamometerCard.finalDate.Valid {
				dynamometerCard.FinalDate = dynamometerCard.finalDate.Time
			}

			// filtro de CreatedAt
			if dynamometerCard.createdAt.Valid {
				dynamometerCard.CreatedAt = dynamometerCard.createdAt.Time
			}

			// filtro de UpdatedAt
			if dynamometerCard.updatedAt.Valid {
				dynamometerCard.UpdatedAt = dynamometerCard.updatedAt.Time
			}

			dynamometerCards = append(dynamometerCards, dynamometerCard)
		}
	}

	if len(dynamometerCards) == 0 {
		return dynamometerCard, err
	}

	dynamometerCard = dynamometerCards[0]

	return dynamometerCard, err
}
