package shortdaybefore

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (ShortDayBefore, error) {
	dayBefore := ShortDayBefore{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ShortDayBefore.FindOne.Open: ", err)
		}

		return dayBefore, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ShortDayBefore.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM short_day_befores"

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
			fmt.Println("Model.ShortDayBefore.FindOne.Query: ", err)
		}

		return dayBefore, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ShortDayBefore.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	dayBefores := []ShortDayBefore{}

	for rows.Next() {
		dayBefore := ShortDayBefore{}

		fields := []interface{}{
			&dayBefore.ID,
			&dayBefore.VariableID,
			&dayBefore.IsCustom,
			&dayBefore.Value,
			&dayBefore.IsUpdated,
			&dayBefore.AccumulatedAlias,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ShortDayBefore.FindOne.Scan: ", err)
			}

			return dayBefore, err
		}

		if dayBefore.ID != 0 {
			dayBefores = append(dayBefores, dayBefore)

		}
	}

	if len(dayBefores) == 0 {
		return dayBefore, err
	}

	dayBefore = dayBefores[0]

	return dayBefore, err
}
