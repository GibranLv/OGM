package report

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]Report, error) {
	reports := []Report{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.Find.Open: ", err)
		}

		return reports, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM reports"

	orderByValue := ""
	if v, ok := where[models.OrderBy]; ok {
		order, isString := v.(string)
		if isString {
			orderByValue = order
			delete(where, models.OrderBy)
		}
	}

	limitValue := 0
	if v, ok := where[models.Limit]; ok {
		limit, isInt := v.(int)
		if isInt {
			if limit > 0 {
				limitValue = limit
				delete(where, models.Limit)
			}
		}
	}

	iniValue := 0
	if v, ok := where[models.Ini]; ok {
		ini, isInt := v.(int)
		if isInt {
			if ini > 0 {
				iniValue = ini
				delete(where, models.Ini)
			}
		}
	}

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

	if iniValue > 0 {
		hasWhere := strings.Contains(query, "WHERE")
		if hasWhere {
			query = query + " AND id > ?"
		} else {
			query = query + " WHERE id > ?"
		}

		params = append(params, iniValue)
	}

	if orderByValue != "" {
		query = query + " ORDER BY id " + orderByValue
	}

	if limitValue > 0 {
		query = query + " LIMIT ?"
		params = append(params, limitValue)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.Find.Query: ", err)
		}

		return reports, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		report := Report{}

		fields = []interface{}{
			&report.ID,
			&report.Name,
			&report.Template,
			&report.structureJSON,
			&report.createdAt,
			&report.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.Find.Scan: ", err)
			}

		} else {
			// filtro de CreatedAt
			if report.createdAt.Valid {
				report.CreatedAt = report.createdAt.Time
			}

			// filtro de UpdatedAt
			if report.updatedAt.Valid {
				report.UpdatedAt = report.updatedAt.Time
			}

			if report.structureJSON.Valid {
				s := report.structureJSON.String
				bs := []byte(s)
				err := json.Unmarshal(bs, &report.StructureJSON)
				if err != nil {
					if m.Debug {
						fmt.Println("Model.Report.Find.Unmarshal: ", err)
					}
				}

				if report.Structure == nil {
					report.Structure = []Struct{}
				}

				if report.StructureJSON == nil {
					report.StructureJSON = []StructJSON{}
				}
			}

			reports = append(reports, report)
		}
	}

	return reports, err
}

// FindByUser ...
func (m Model) FindByUser(userID int64) ([]Report, error) {
	reports := []Report{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.FindByUser.Open: ", err)
		}

		return reports, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindByUser.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT
							r.id, r.name, r.template, r.structure_json, r.created_at, r.updated_at
						FROM reports AS r
						LEFT JOIN users_reports AS ur ON r.id = ur.report_id
						WHERE ur.user_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.FindByUser.Query: ", err)
		}

		return reports, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		report := Report{}

		fields = []interface{}{
			&report.ID,
			&report.Name,
			&report.Template,
			&report.structureJSON,
			&report.createdAt,
			&report.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindByUser.Scan: ", err)
			}

		} else {
			// filtro de StructureJSON
			if report.structureJSON.Valid {
				s := report.structureJSON.String
				bs := []byte(s)
				err := json.Unmarshal(bs, &report.StructureJSON)
				if err != nil {
					if m.Debug {
						fmt.Println("Model.Report.FindByUser.Unmarshal: ", err)
					}
				}

				if report.Structure == nil {
					report.Structure = []Struct{}
				}

				if report.StructureJSON == nil {
					report.StructureJSON = []StructJSON{}
				}
			}

			// filtro de CreatedAt
			if report.createdAt.Valid {
				report.CreatedAt = report.createdAt.Time
			}

			// filtro de UpdatedAt
			if report.updatedAt.Valid {
				report.UpdatedAt = report.updatedAt.Time
			}

			reports = append(reports, report)
		}
	}

	return reports, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(userID int64, value uint8) ([]Report, error) {
	reports := []Report{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.FindByUserOrLowerValue.Open: ", err)
		}

		return reports, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT r.id, r.name, r.template, r.structure_json, r.created_at, r.updated_at
						FROM reports AS r
						LEFT JOIN users_reports AS ur ON r.id = ur.report_id
						LEFT JOIN users AS u ON u.id = ur.user_id
						WHERE u.id = ? OR u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.FindByUserOrLowerValue.Query: ", err)
		}

		return reports, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		report := Report{}

		fields = []interface{}{
			&report.ID,
			&report.Name,
			&report.Template,
			&report.structureJSON,
			&report.createdAt,
			&report.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindByUserOrLowerValue.Scan: ", err)
			}

		} else {
			// filtro de StructureJSON
			if report.structureJSON.Valid {
				s := report.structureJSON.String
				bs := []byte(s)
				err := json.Unmarshal(bs, &report.StructureJSON)
				if err != nil {
					if m.Debug {
						fmt.Println("Model.Report.FindByUserOrLowerValue.Unmarshal: ", err)
					}

				}

				if report.Structure == nil {
					report.Structure = []Struct{}
				}

				if report.StructureJSON == nil {
					report.StructureJSON = []StructJSON{}
				}
			}

			// filtro de CreatedAt
			if report.createdAt.Valid {
				report.CreatedAt = report.createdAt.Time
			}

			// filtro de UpdatedAt
			if report.updatedAt.Valid {
				report.UpdatedAt = report.updatedAt.Time
			}

			reports = append(reports, report)
		}
	}

	return reports, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(userID int64, value uint8) ([]Report, error) {
	reports := []Report{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.FindByUserAndLowerValue.Open: ", err)
		}

		return reports, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
							r.id, r.name, r.template, r.structure_json, r.created_at, r.updated_at
						FROM reports AS r
						LEFT JOIN users_reports AS ur ON r.id = ur.report_id
						LEFT JOIN users AS u ON u.id = ur.user_id
						WHERE u.id = ? AND u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.FindByUserAndLowerValue.Query: ", err)
		}

		return reports, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		report := Report{}

		fields = []interface{}{
			&report.ID,
			&report.Name,
			&report.Template,
			&report.structureJSON,
			&report.createdAt,
			&report.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {
			// filtro de StructureJSON
			if report.structureJSON.Valid {
				s := report.structureJSON.String
				bs := []byte(s)
				err := json.Unmarshal(bs, &report.StructureJSON)
				if err != nil {
					if m.Debug {
						fmt.Println("Model.Report.FindByUserAndLowerValue.Unmarshal: ", err)
					}
				}

				if report.Structure == nil {
					report.Structure = []Struct{}
				}

				if report.StructureJSON == nil {
					report.StructureJSON = []StructJSON{}
				}
			}

			// filtro de CreatedAt
			if report.createdAt.Valid {
				report.CreatedAt = report.createdAt.Time
			}

			// filtro de UpdatedAt
			if report.updatedAt.Valid {
				report.UpdatedAt = report.updatedAt.Time
			}

			reports = append(reports, report)
		}
	}

	return reports, err
}
