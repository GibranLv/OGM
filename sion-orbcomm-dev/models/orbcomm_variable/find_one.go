package orbcommvariable

import (
	"database/sql"
	"fmt"
)

// FindOneVariable    ...
func (m Model) FindOneVariable(mobileID, name string) (OrbcommVariable, error) {
	var OrbcommVOne OrbcommVariable

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.FindOneVariable.Open: ", err)
		}

		return OrbcommVOne, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOneVariable.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{mobileID, name}
	var rows *sql.Rows

	query := `SELECT ov.id, ov.orbcomm_id, ov.variable_id, ov.name
						FROM orbcomms AS o
						LEFT JOIN orbcomms_variables AS ov ON o.id = ov.orbcomm_id
						WHERE o.mobile_id = ? AND ov.name = ?;`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Orbcomm.FindOneVariable.Query: ", err)
		}

		return OrbcommVOne, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOneVariable.Rows.Close: ", err)
			}
		}
	}(rows)

	orbcommVs := []OrbcommVariable{}

	for rows.Next() {
		orbcommV := OrbcommVariable{}

		fields := []interface{}{
			&orbcommV.ID,
			&orbcommV.OrbcommID,
			&orbcommV.VariableID,
			&orbcommV.Name,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Orbcomm.FindOneVariable.Scan: ", err)
			}

			return OrbcommVOne, err
		}

		if orbcommV.ID > 0 {
			orbcommVs = append(orbcommVs, orbcommV)

		}
	}

	if len(orbcommVs) == 0 {
		return OrbcommVOne, err
	}

	OrbcommVOne = orbcommVs[0]

	return OrbcommVOne, err
}
