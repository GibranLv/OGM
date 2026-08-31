package unit

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Unit, error) {
	unit := Unit{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Unit.FindOne.Open: ", err)
		}

		return unit, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM units"

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
			fmt.Println("Model.Unit.FindOne.Query: ", err)
		}

		return unit, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	units := []Unit{}

	for rows.Next() {
		unit := Unit{}

		fields := []interface{}{
			&unit.ID,
			&unit.Name,
			&unit.Expression,
			&unit.Display,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.FindOne.Scan: ", err)
			}

			return unit, err
		}

		if unit.ID != 0 {
			units = append(units, unit)
		}
	}

	if len(units) == 0 {
		return unit, err
	}

	unit = units[0]

	return unit, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (Unit, error) {
	unit := Unit{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Unit.FindOneByUser.Open: ", err)
		}

		return unit, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT 
							u.id, u.name, u.expression, u.display,
							uu.user_id, uu.is_creator
						FROM units AS u
						LEFT JOIN users_units AS uu ON u.id = uu.unit_id
						LEFT JOIN users ON users.id = uu.user_id
						WHERE u.id = ? AND users.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Unit.FindOneByUser.Query: ", err)
		}

		return unit, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	units := []Unit{}

	for rows.Next() {
		unit := Unit{}

		fields := []interface{}{
			&unit.ID,
			&unit.Name,
			&unit.Expression,
			&unit.Display,
			&unit.UserID,
			&unit.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.FindOneByUser.Scan: ", err)
			}

			return unit, err
		}

		if unit.ID != 0 {

			units = append(units, unit)
		}
	}

	if len(units) == 0 {
		return unit, err
	}

	unit = units[0]

	return unit, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (Unit, error) {
	unit := Unit{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Unit.FindOneByUserOrLowerValue.Open: ", err)
		}

		return unit, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.FindOneByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT u.id, u.name, u.expression, u.display,
							uu.user_id, uu.is_creator
						FROM units AS u
						LEFT JOIN users_units AS uu ON u.id = uu.unit_id
						LEFT JOIN users ON users.id = uu.user_id
						WHERE u.id = ? AND (users.id = ? OR users.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Unit.FindOneByUserOrLowerValue.Query: ", err)
		}

		return unit, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.FindOneByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	units := []Unit{}

	for rows.Next() {
		unit := Unit{}

		fields := []interface{}{
			&unit.ID,
			&unit.Name,
			&unit.Expression,
			&unit.Display,
			&unit.UserID,
			&unit.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Unit.FindOneByUserOrLowerValue.Scan: ", err)
			}

			return unit, err
		}

		if unit.ID != 0 {
			units = append(units, unit)
		}
	}

	if len(units) == 0 {
		return unit, err
	}

	unit = units[0]

	return unit, err
}
