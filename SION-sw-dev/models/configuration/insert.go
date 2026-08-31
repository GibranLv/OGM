package configuration

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// Create ...
func (m Model) Create(values map[string]interface{}) (Configuration, error) {
	configuration := Configuration{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Configuration.Create.Open: ", err)
		}

		return configuration, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Configuration.Create.Close: ", err)
			}
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO configurations SET"

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
				fmt.Println("Model.Configuration.Create.Prepare: ", err)
			}

			return configuration, err
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				if m.Debug {
					fmt.Println("Model.Configuration.Create.Stmt.Close: ", err)
				}
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Configuration.Create.Exec: ", err)
			}

			return configuration, err
		}

		var configurationID int64
		configurationID, err = res.LastInsertId()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Configuration.Create.LastInsertId: ", err)
			}

			return configuration, err
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
				fmt.Println("Model.Configuration.Create.Scan: ", err)
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
					fmt.Println("Model.Configuration.Create.JSONMatrixSounds: ", err)
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
					fmt.Println("Model.Configuration.Create.JSONGraphicSounds: ", err)
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

	}

	return configuration, err
}
