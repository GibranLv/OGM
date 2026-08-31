package variable

import (
	"database/sql"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Variable, error) {
	variable := Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindOne.Open: ", err)
		}

		return variable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM variables"

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
			fmt.Println("Model.Variable.FindOne.Query: ", err)
		}

		return variable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	variables := []Variable{}

	for rows.Next() {
		variable := Variable{}

		fields := []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Alias,
			&variable.Device,
			&variable.ReadingUnit,
			&variable.ExpressionInsert,
			&variable.Status,
			&variable.createdAt,
			&variable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOne.Scan: ", err)
			}

			return variable, err
		}

		if variable.ID != 0 {

			// filtro de CreatedAt
			if variable.createdAt.Valid {
				variable.CreatedAt = variable.createdAt.Time
			}

			// filtro de UpdatedAt
			if variable.updatedAt.Valid {
				variable.UpdatedAt = variable.updatedAt.Time
			}

			variables = append(variables, variable)
		}
	}

	if len(variables) == 0 {
		return variable, err
	}

	variable = variables[0]

	return variable, err
}

// FindOneLast ...
func (m Model) FindOneLast() (Variable, error) {
	variable := Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindLast.Open: ", err)
		}

		return variable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindLast.Close: ", err)
			}
		}
	}(db)

	var rows *sql.Rows

	query := "SELECT * FROM variables ORDER BY id DESC LIMIT 1"

	rows, err = db.Query(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindLast.Query: ", err)
		}

		return variable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindLast.Rows.Close: ", err)
			}
		}
	}(rows)

	variables := []Variable{}

	for rows.Next() {
		variable := Variable{}

		fields := []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Alias,
			&variable.Device,
			&variable.ReadingUnit,
			&variable.ExpressionInsert,
			&variable.Status,
			&variable.createdAt,
			&variable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err == nil {
			// filtro de CreateAt
			if variable.createdAt.Valid {
				variable.CreatedAt = variable.createdAt.Time
			}

			// filtro de UpdatedAt
			if variable.updatedAt.Valid {
				variable.UpdatedAt = variable.updatedAt.Time
			}

			variables = append(variables, variable)

		} else {
			if m.Debug {
				fmt.Println("Model.Variable.FindLast.Scan: ", err)
			}
		}
	}

	if len(variables) > 0 {
		variable = variables[0]
	}

	return variable, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (Variable, error) {
	variable := Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindOneByVariableOrLowerValue.Open: ", err)
		}

		return variable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOneByVariableOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT v.id, v.name, v.alias, v.device, v.reading_unit,
							v.expression_insert, v.status,
							v.created_at, v.updated_at
						FROM variables AS v
						LEFT JOIN users_variables AS uv ON v.id = uv.variable_id
						LEFT JOIN users AS u ON u.id = uv.user_id
						WHERE v.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindOneByVariableOrLowerValue.Query: ", err)
		}

		return variable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOneByVariableOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	variables := []Variable{}

	for rows.Next() {
		variable := Variable{}

		fields := []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Alias,
			&variable.Device,
			&variable.ReadingUnit,
			&variable.ExpressionInsert,
			&variable.Status,
			&variable.createdAt,
			&variable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOneByVariableOrLowerValue.Scan: ", err)
			}

			return variable, err
		}

		if variable.ID != 0 {

			// filtro de CreatedAt
			if variable.createdAt.Valid {
				variable.CreatedAt = variable.createdAt.Time
			}

			// filtro de UpdatedAt
			if variable.updatedAt.Valid {
				variable.UpdatedAt = variable.updatedAt.Time
			}

			variables = append(variables, variable)
		}
	}

	if len(variables) == 0 {
		return variable, err
	}

	variable = variables[0]

	return variable, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (Variable, error) {
	variable := Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindOneByUser.Open: ", err)
		}

		return variable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT
							v.id, v.name, v.alias, v.device, v.reading_unit,
							v.expression_insert, v.status,
							v.created_at, v.updated_at
						FROM variables AS v
						LEFT JOIN users_variables AS uv ON v.id = uv.variable_id
						LEFT JOIN users AS u ON u.id = uv.user_id
						WHERE v.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindOneByUser.Query: ", err)
		}

		return variable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	variables := []Variable{}

	for rows.Next() {
		variable := Variable{}

		fields := []interface{}{
			&variable.ID,
			&variable.Name,
			&variable.Alias,
			&variable.Device,
			&variable.ReadingUnit,
			&variable.ExpressionInsert,
			&variable.Status,
			&variable.createdAt,
			&variable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOneByUser.Scan: ", err)
			}

			return variable, err
		}

		if variable.ID != 0 {

			// filtro de CreatedAt
			if variable.createdAt.Valid {
				variable.CreatedAt = variable.createdAt.Time
			}

			// filtro de UpdatedAt
			if variable.updatedAt.Valid {
				variable.UpdatedAt = variable.updatedAt.Time
			}

			variables = append(variables, variable)
		}
	}

	if len(variables) == 0 {
		return variable, err
	}

	variable = variables[0]

	return variable, err
}

// FindOneUVA ...
func (m Model) FindOneUVA(userID, alarmID int64) (Variable, error) {
	variable := Variable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindOneUVA.Open: ", err)
		}

		return variable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOneUVA.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT uv.variable_id FROM alarms AS a
						LEFT JOIN users_alarms AS ua ON ua.alarm_id = a.id
						LEFT JOIN users_variables_alarms AS uva ON ua.id = uva.user_alarm_id
						LEFT JOIN users_variables AS uv ON uv.id = uva.user_variable_id
						WHERE a.id = ? AND ua.user_id = ?;`

	params = append(params, alarmID, userID)

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Variable.FindOneUVA.Query: ", err)
		}

		return variable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOneUVA.Rows.Close: ", err)
			}
		}
	}(rows)

	variables := []Variable{}

	for rows.Next() {
		variable := Variable{}

		fields := []interface{}{
			&variable.ID,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Variable.FindOneUVA.Scan: ", err)
			}

			return variable, err
		}

		if variable.ID != 0 {
			variables = append(variables, variable)
		}
	}

	if len(variables) == 0 {
		return variable, err
	}

	variable = variables[0]

	return variable, err
}
