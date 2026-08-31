package report

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Report, error) {
	report := Report{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.FindOne.Open: ", err)
		}

		return report, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindOne.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM reports"

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
			fmt.Println("Model.Report.FindOne.Query: ", err)
		}

		return report, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindOne.Rows.Close: ", err)
			}
		}
	}(rows)

	reports := []Report{}

	for rows.Next() {
		report := Report{}

		fields := []interface{}{
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
				fmt.Println("Model.Report.FindOne.Scan: ", err)
			}

			return report, err
		}

		if report.ID != 0 {

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
						fmt.Println("Model.Report.FindOne.Unmarshal: ", err)
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

	if len(reports) == 0 {
		return report, err
	}

	report = reports[0]

	return report, err
}

// FindOneByUser ...
func (m Model) FindOneByUser(ID, userID int64) (Report, error) {
	report := Report{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.FindOneByUser.Open: ", err)
		}

		return report, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindOneByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID}
	var rows *sql.Rows

	query := `SELECT
							r.id, r.name, r.template, r.structure_json, r.created_at, r.updated_at,
							ur.user_id, ur.is_creator
						FROM reports AS r
						LEFT JOIN users_reports AS ur ON r.id = ur.report_id
						LEFT JOIN users AS u ON u.id = ur.user_id
						WHERE r.id = ? AND u.id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.FindOneByUser.Query: ", err)
		}

		return report, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindOneByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	reports := []Report{}

	for rows.Next() {
		report := Report{}

		fields := []interface{}{
			&report.ID,
			&report.Name,
			&report.Template,
			&report.structureJSON,
			&report.createdAt,
			&report.updatedAt,
			&report.UserID,
			&report.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindOneByUser.Scan: ", err)
			}

			return report, err
		}

		if report.ID != 0 {

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
						fmt.Println("Model.Report.FindOneByUser.Unmarshal: ", err)
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

	if len(reports) == 0 {
		return report, err
	}

	report = reports[0]

	return report, err
}

// FindOneByUserOrLowerValue ...
func (m Model) FindOneByUserOrLowerValue(ID, userID int64, value uint8) (Report, error) {
	report := Report{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.FindOneByUserOrLowerValue.Open: ", err)
		}

		return report, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindOneByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{ID, userID, value}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT r.id, r.name, r.template, r.structure_json, r.created_at, r.updated_at,
							ur.user_id, ur.is_creator
						FROM reports AS r
						LEFT JOIN users_reports AS ur ON r.id = ur.report_id
						LEFT JOIN users AS u ON u.id = ur.user_id
						WHERE r.id = ? AND (u.id = ? OR u.value > ?)`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Report.FindOneByUserOrLowerValue.Query: ", err)
		}

		return report, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindOneByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	reports := []Report{}

	for rows.Next() {
		report := Report{}

		fields := []interface{}{
			&report.ID,
			&report.Name,
			&report.Template,
			&report.structureJSON,
			&report.createdAt,
			&report.updatedAt,
			&report.UserID,
			&report.IsCreator,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Report.FindOneByUserOrLowerValue.Scan: ", err)
			}

			return report, err
		}

		if report.ID != 0 {

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
						fmt.Println("Model.Report.FindOneByUserOrLowerValue.Unmarshal: ", err)
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

	if len(reports) == 0 {
		return report, err
	}

	report = reports[0]

	return report, err
}
