package configuration

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
)

// Update ...
func (m Model) Update(values map[string]interface{}) (Configuration, error) {
	configuration := Configuration{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Configuration.Update.Open: ", err)
		}

		return configuration, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Configuration.Update.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		err = errors.New("Input values are empty")

		if m.Debug {
			fmt.Println("Model.Configuration.Update.Values: ", err)
		}

		return configuration, err
	}

	var stmt *sql.Stmt

	query := "UPDATE configurations SET {{fields}} WHERE id = ?"

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

	configurationID := values[KeyID]
	params = append(params, configurationID)

	stmt, err = db.Prepare(query)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Configuration.Update.Prepare: ", err)
		}

		return configuration, err
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Configuration.Update.Stmt.Close: ", err)
			}
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Configuration.Update.Exec: ", err)
		}

		return configuration, err
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Configuration.Update.RowsAffected: ", err)
		}

		return configuration, err
	}

	if rowsAffected == 0 {
		if m.Debug {
			fmt.Println("Model.Configuration.Update.RowsAffected: ", rowsAffected)
		}
	}

	query = "SELECT * FROM configurations WHERE id = ?"
	row := db.QueryRow(query, configurationID)

	fields := []interface{}{
		&configuration.ID,
		&configuration.UserID,
		&configuration.MainModule,
		&configuration.MainMatrix,
		&configuration.jsonMatrixSounds,
		&configuration.jsonGraphicSounds,
		&configuration.RT,
		&configuration.ChartTheme,
		&configuration.CommentColumn,
		&configuration.createdAt,
		&configuration.updatedAt,
	}

	err = row.Scan(fields...)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Configuration.Update.Scan: ", err)
		}

		return configuration, err
	}

	// filtro de JSONMatrixSounds
	if configuration.jsonMatrixSounds.Valid {
		sJSON := configuration.jsonMatrixSounds.String
		buffer := []byte(sJSON)

		matrices := []Matrix{}
		err := json.Unmarshal(buffer, &matrices)
		if err == nil {
			configuration.JSONMatrixSounds = matrices
		} else {
			if m.Debug {
				fmt.Println("Model.Configuration.Update.JSONMatrixSounds: ", err)
			}
		}
	}

	// filtros de JSONGraphicSounds
	if configuration.jsonGraphicSounds.Valid {
		sJSON := configuration.jsonGraphicSounds.String
		buffer := []byte(sJSON)

		graphics := []Graphic{}
		err := json.Unmarshal(buffer, &graphics)
		if err == nil {
			configuration.JSONGraphicSounds = graphics
		} else {
			if m.Debug {
				fmt.Println("Model.Configuration.Update.JSONGraphicSounds: ", err)
			}
		}
	}

	// filtro de CreatedAt
	if configuration.createdAt.Valid {
		configuration.CreatedAt = configuration.createdAt.Time
	}

	// filtro de UpdatedAt
	if configuration.updatedAt.Valid {
		configuration.UpdatedAt = configuration.updatedAt.Time
	}

	return configuration, err
}
