package customvariable

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (CustomVariable, error) {
	customVariable := CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindOne.Open: ", err)
		}

		return customVariable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM custom_variables"

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
			fmt.Println("Model.CustomVariable.FindOne.Query: ", err)
		}

		return customVariable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	customVars := []CustomVariable{}

	for rows.Next() {
		customVariable := CustomVariable{}

		fields := []interface{}{
			&customVariable.ID,
			&customVariable.Name,
			&customVariable.Device,
			&customVariable.variablesJSON,
			&customVariable.Expression,
			&customVariable.Unit,
			&customVariable.Status,
			&customVariable.createdAt,
			&customVariable.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindOne.Scan: ", err)
			}

			return customVariable, err
		}

		if customVariable.ID != 0 {
			// filtro de VariableJSON
			if customVariable.variablesJSON.Valid {
				sJSON := customVariable.variablesJSON.String
				bJSON := []byte(sJSON)
				_ = json.Unmarshal(bJSON, &customVariable.VariablesJSON)
			}

			// filtro de CreatedAt
			if customVariable.createdAt.Valid {
				customVariable.CreatedAt = customVariable.createdAt.Time
			}

			// filtro de UpdatedAt
			if customVariable.updatedAt.Valid {
				customVariable.UpdatedAt = customVariable.updatedAt.Time
			}

			customVars = append(customVars, customVariable)
		}
	}

	if len(customVars) == 0 {
		return customVariable, err
	}

	customVariable = customVars[0]

	return customVariable, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (CustomVariable, error) {
	var err error
	customVariable := CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindOneByUser.Open: ", err)
		}

		return customVariable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT
							v.id, v.name, v.device, v.variables_json, v.expression, v.unit,
							v.status, v.created_at, v.updated_at,
							uv.user_id, uv.is_creator
						FROM custom_variables AS v
						LEFT JOIN users_custom_variables AS uv ON v.id = uv.custom_variable_id
						LEFT JOIN users AS u ON u.id = uv.user_id
						WHERE v.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindOneByUser.Query: ", err)
		}

		return customVariable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	customVariables := []CustomVariable{}

	for rows.Next() {
		customVariable := CustomVariable{}

		fields := []interface{}{
			&customVariable.ID,
			&customVariable.Name,
			&customVariable.Device,
			&customVariable.variablesJSON,
			&customVariable.Expression,
			&customVariable.Unit,
			&customVariable.Status,
			&customVariable.createdAt,
			&customVariable.updatedAt,
			&customVariable.UserID,
			&customVariable.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindOneByUser.Scan: ", err)
			}

			return customVariable, err
		}

		if customVariable.ID != 0 {
			// filtro de VariableJSON
			if customVariable.variablesJSON.Valid {
				sJSON := customVariable.variablesJSON.String
				bJSON := []byte(sJSON)
				_ = json.Unmarshal(bJSON, &customVariable.VariablesJSON)
			}

			// filtro de CreatedAt
			if customVariable.createdAt.Valid {
				customVariable.CreatedAt = customVariable.createdAt.Time
			}

			// filtro de UpdatedAt
			if customVariable.updatedAt.Valid {
				customVariable.UpdatedAt = customVariable.updatedAt.Time
			}

			customVariables = append(customVariables, customVariable)
		}
	}

	if len(customVariables) == 0 {
		return customVariable, err
	}

	customVariable = customVariables[0]

	return customVariable, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (CustomVariable, error) {
	var err error
	customVariable := CustomVariable{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindOneByUserOrLowerValue.Open: ", err)
		}

		return customVariable, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindOneByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT v.id, v.name, v.device, v.variables_json, v.expression, v.unit,
							v.status, v.created_at, v.updated_at,
							uv.user_id, uv.is_creator
						FROM custom_variables AS v
						LEFT JOIN users_custom_variables AS uv ON v.id = uv.custom_variable_id
						LEFT JOIN users AS u ON u.id = uv.user_id
						WHERE v.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.CustomVariable.FindOneByUserOrLowerValue.Query: ", err)
		}

		return customVariable, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	customVariables := []CustomVariable{}

	for rows.Next() {
		customVariable := CustomVariable{}

		fields := []interface{}{
			&customVariable.ID,
			&customVariable.Name,
			&customVariable.Device,
			&customVariable.variablesJSON,
			&customVariable.Expression,
			&customVariable.Unit,
			&customVariable.Status,
			&customVariable.createdAt,
			&customVariable.updatedAt,
			&customVariable.UserID,
			&customVariable.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.CustomVariable.FindOneByUserOrLowerValue.Scan: ", err)
			}

			return customVariable, err
		}

		if customVariable.ID != 0 {
			// filtro de VariableJSON
			if customVariable.variablesJSON.Valid {
				sJSON := customVariable.variablesJSON.String
				bJSON := []byte(sJSON)
				_ = json.Unmarshal(bJSON, &customVariable.VariablesJSON)
			}

			// filtro de CreatedAt
			if customVariable.createdAt.Valid {
				customVariable.CreatedAt = customVariable.createdAt.Time
			}

			// filtro de UpdatedAt
			if customVariable.updatedAt.Valid {
				customVariable.UpdatedAt = customVariable.updatedAt.Time
			}

			customVariables = append(customVariables, customVariable)
		}
	}

	if len(customVariables) == 0 {
		return customVariable, err
	}

	customVariable = customVariables[0]

	return customVariable, err
}
