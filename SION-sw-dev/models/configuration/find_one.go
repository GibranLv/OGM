package configuration

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Configuration, error) {
	configuration := Configuration{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Configuration.FindOne.Open: ", err)
		}

		return configuration, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Configuration.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM configurations"

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
			fmt.Println("Model.Configuration.FindOne.Query: ", err)
		}

		return configuration, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Configuration.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	configurations := []Configuration{}

	for rows.Next() {
		configuration := Configuration{}

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

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Configuration.FindOne.Scan: ", err)
			}

			return configuration, err
		}

		if configuration.ID != 0 {

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
						fmt.Println("Model.Configuration.FindOne.JSONMatrixSounds: ", err)
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
						fmt.Println("Model.Configuration.FindOne.JSONGraphicSounds: ", err)
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

			configurations = append(configurations, configuration)
		}
	}

	if len(configurations) == 0 {
		return configuration, err
	}

	configuration = configurations[0]

	return configuration, err
}
