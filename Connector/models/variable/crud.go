package variable

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/JamsMendez/Connector/models"
)

// constants of Model
const (
	KeyID        = "id"
	KeyGRDID     = "grd_id"
	KeyName      = "name"
	KeyMask      = "mask"
	KeyDevice    = "device"
	KeyUnit      = "unit"
	KeyActive    = "active"
	KeyAddress   = "address"
	KeyCreatedAt = "created_at"
	KeyUpdatedAt = "updated_at"
)

// Variable ...
type Variable struct {
	ID       int64  `json:"id"`
	GRDID    int64  `json:"grd_id,omitempty"`
	GRDAlias string `json:"grd_alias,omitempty"`
	Name     string `json:"name"`
	Mask     string `json:"mask,omitempty"`
	Device   string `json:"device"`
	Unit     string `json:"unit"`
	Active   bool   `json:"active"`
	Address  int16  `json:"address"`

	grdID    sql.NullInt64
	grdAlias sql.NullString
	mask     sql.NullString
}

// Model ...
type Model struct {
}

// Find ...
func (m Model) Find(where map[string]interface{}) ([]Variable, error) {
	var msgErr error
	variables := []Variable{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Variable.Find.Open: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de las variables")
		return variables, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT
						v.id, v.grd_id, g.alias AS grd_alias,
						v.name, v.mask, v.device, v.unit, v.active, v.address
						FROM variables AS v
						LEFT JOIN grds AS g ON v.grd_id = g.id`

	rows, err = db.Query(query, params...)
	if err != nil {
		fmt.Println("Model.Variable.Find.Query: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de las variables")
		return variables, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variable := Variable{}

		fields = []interface{}{
			&variable.ID,
			&variable.grdID,
			&variable.grdAlias,
			&variable.Name,
			&variable.mask,
			&variable.Device,
			&variable.Unit,
			&variable.Active,
			&variable.Address,
		}

		err = rows.Scan(fields...)
		if err == nil {
			if variable.grdID.Valid {
				variable.GRDID = variable.grdID.Int64
			}

			if variable.grdAlias.Valid {
				variable.GRDAlias = variable.grdAlias.String
			}

			if variable.mask.Valid {
				variable.Mask = variable.mask.String
			}

			variables = append(variables, variable)

		} else {
			fmt.Println("Model.Variable.Find.Scan: ", err)
		}
	}

	return variables, msgErr
}

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Variable, error) {
	var msgErr error
	variable := Variable{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Variable.FindOne.Open: ", err)
		msgErr = errors.New("Ocurrió un error al obtener la información de las variables")
		return variable, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
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
		fmt.Println("Model.Variable.FindOne.Query: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de las variables")
		return variable, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	variables := []Variable{}

	for rows.Next() {
		variable := Variable{}

		fields := []interface{}{
			&variable.ID,
			&variable.grdID,
			&variable.Name,
			&variable.mask,
			&variable.Device,
			&variable.Unit,
			&variable.Active,
			&variable.Address,
		}

		err = rows.Scan(fields...)
		if err == nil {
			if variable.grdID.Valid {
				variable.GRDID = variable.grdID.Int64
			}

			if variable.mask.Valid {
				variable.Mask = variable.mask.String
			}

			variables = append(variables, variable)

		} else {
			fmt.Println("Model.Variable.FindOne.Scan: ", err)
		}
	}

	if len(variables) == 0 {
		return variable, msgErr
	}

	variable = variables[0]

	return variable, msgErr
}

// Create ...
func (m Model) Create(values map[string]interface{}) (Variable, error) {
	var msgErr error
	variable := Variable{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Variable.Create.Open: ", err)
		msgErr = errors.New("Ocurrió un error al obtener la información de las variables")
		return variable, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	if len(values) > 0 {
		var params []interface{}
		var stmt *sql.Stmt

		query := "INSERT INTO variables SET"

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
			fmt.Println("Model.Variable.Create.Prepare: ", err)

			msgErr = errors.New("Ocurrió un error al guardar la información de la variable")
			return variable, msgErr
		}

		defer func(r *sql.Stmt) {
			err := r.Close()
			if err != nil {
				fmt.Println("stmt.Error: ", err)
			}
		}(stmt)

		var res sql.Result
		res, err = stmt.Exec(params...)
		if err != nil {
			fmt.Println("Model.Variable.Create.Exec: ", err)

			msgErr = errors.New("Ocurrió un error al guardar la información de la variable")
			return variable, msgErr
		}

		var variableID int64
		variableID, err = res.LastInsertId()
		if err != nil {
			fmt.Println("Model.Variable.Create.LastInsertId: ", err)

			msgErr = errors.New("Ocurrió un error al guardar la información de la variable")
			return variable, msgErr
		}

		query = `SELECT 
						v.id, v.grd_id, g.alias AS grd_alias,
						v.name, v.mask, v.device, v.unit, v.active, v.address
						FROM variables AS v
						LEFT JOIN grds AS g ON v.grd_id = g.id
						WHERE v.id = ?;`

		row := db.QueryRow(query, variableID)

		fields := []interface{}{
			&variable.ID,
			&variable.grdID,
			&variable.grdAlias,
			&variable.Name,
			&variable.mask,
			&variable.Device,
			&variable.Unit,
			&variable.Active,
			&variable.Address,
		}

		err = row.Scan(fields...)

		if err != nil {
			fmt.Println("Model.Variable.Create.Scan: ", err)

			msgErr = errors.New("Ocurrió un error al guardar la información de la variable")
			return variable, msgErr
		}

		if variable.grdID.Valid {
			variable.GRDID = variable.grdID.Int64
		}

		if variable.grdAlias.Valid {
			variable.GRDAlias = variable.grdAlias.String
		}

		if variable.mask.Valid {
			variable.Mask = variable.mask.String
		}
	}

	return variable, msgErr
}

// Update ...
func (m Model) Update(values map[string]interface{}) (Variable, error) {
	var msgErr error
	variable := Variable{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Variable.Update.Open: ", err)
		msgErr = errors.New("Ocurrió un error al obtener la información de las variables")
		return variable, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var fieldsIn string

	if len(values) == 0 {
		msgErr = errors.New("La información a guardar no es consistente con la variable")
		return variable, msgErr
	}

	var stmt *sql.Stmt

	query := "UPDATE variables SET {{fields}} WHERE id = ?"

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

	variableID := values[KeyID]
	params = append(params, variableID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.Variable.Update.Prepare: ", err)

		msgErr = errors.New("Ocurrió un error al cambiar la información de la variable")
		return variable, msgErr
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("stmt.Error: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.Variable.Update.Exec: ", err)

		msgErr = errors.New("Ocurrió un error al guardar la información de la variable")
		return variable, msgErr
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.Variable.Update.RowsAffected: ", err)

		msgErr = errors.New("Ocurrió un error al guardar la información de la variable")
		return variable, msgErr
	}

	if rowsAffected == 0 {
		msgErr = errors.New("No se realizo ningun cambio en la información de la variable")
		return variable, msgErr
	}

	query = `SELECT
						v.id, v.grd_id, g.alias AS grd_alias,
						v.name, v.mask, v.device, v.unit, v.active, v.address
						FROM variables AS v
						LEFT JOIN grds AS g ON v.grd_id = g.id
						WHERE v.id = ?;`

	row := db.QueryRow(query, variableID)

	fields := []interface{}{
		&variable.ID,
		&variable.grdID,
		&variable.grdAlias,
		&variable.Name,
		&variable.mask,
		&variable.Device,
		&variable.Unit,
		&variable.Active,
		&variable.Address,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.Variable.Update.Scan: ", err)

		msgErr = errors.New("Ocurrió un error al guardar la información de la variable")
		return variable, msgErr
	}

	if variable.grdID.Valid {
		variable.GRDID = variable.grdID.Int64
	}

	if variable.grdAlias.Valid {
		variable.GRDAlias = variable.grdAlias.String
	}

	if variable.mask.Valid {
		variable.Mask = variable.mask.String
	}

	return variable, msgErr
}

// UpdateMask ...
func (m Model) UpdateMask(name, device, mask string) (Variable, error) {
	var msgErr error
	variable := Variable{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Variable.UpdateMask.Open: ", err)
		msgErr = errors.New("Ocurrió un error al obtener la información de las variables")
		return variable, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	params := []interface{}{mask, name, device}

	var stmt *sql.Stmt

	query := "UPDATE variables SET mask = ? WHERE name = ? AND device = ?"

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.Variable.UpdateMask.Prepare: ", err)

		msgErr = errors.New("Ocurrió un error al cambiar la información de la variable")
		return variable, msgErr
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("stmt.Error: ", err)
		}
	}(stmt)

	var res sql.Result
	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.Variable.UpdateMask.Exec: ", err)

		msgErr = errors.New("Ocurrió un error al guardar la información de la variable")
		return variable, msgErr
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.Variable.UpdateMask.RowsAffected: ", err)

		msgErr = errors.New("Ocurrió un error al guardar la información de la variable")
		return variable, msgErr
	}

	if rowsAffected == 0 {
		msgErr = errors.New("No se realizo ningun cambio en la información de la variable")
		return variable, msgErr
	}

	query = "SELECT * FROM variables WHERE name = ? AND device = ?"
	row := db.QueryRow(query, name, device)

	fields := []interface{}{
		&variable.ID,
		&variable.grdID,
		&variable.Name,
		&variable.mask,
		&variable.Device,
		&variable.Unit,
		&variable.Active,
		&variable.Address,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.Variable.UpdateMask.Scan: ", err)

		msgErr = errors.New("Ocurrió un error al guardar la información de la variable")
		return variable, msgErr
	}

	if variable.grdID.Valid {
		variable.GRDID = variable.grdID.Int64
	}

	if variable.mask.Valid {
		variable.Mask = variable.mask.String
	}

	return variable, msgErr
}

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64
	var msgErr error

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Variable.Remove.Open: ", err)
		msgErr = errors.New("Ocurrió un error al obtener la información de las variables")
		return numAffected, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	query := "DELETE FROM variables WHERE"

	var params []interface{}
	var stmt *sql.Stmt
	var res sql.Result

	lenWhere := len(where)
	if lenWhere > 0 {
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

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.Variable.Remove.Prepare: ", err)

		msgErr = errors.New("Ocurrió un error al eliminar la información de la variable")
		return numAffected, msgErr
	}

	defer func(r *sql.Stmt) {
		err := r.Close()
		if err != nil {
			fmt.Println("stmt.Error: ", err)
		}
	}(stmt)

	res, err = stmt.Exec(params...)
	if err != nil {
		fmt.Println("Model.Variable.Remove.Exec: ", err)

		msgErr = errors.New("Ocurrió un error al eliminar la información de la variable")
		return numAffected, msgErr
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.Variable.Remove.RowsAffected: ", err)

		msgErr = errors.New("Ocurrió un error al eliminar la información de la variable")
		return numAffected, msgErr
	}

	return numAffected, msgErr
}

// FindForSearch ...
func (m Model) FindForSearch(search string) ([]Variable, error) {
	var msgErr error
	variables := []Variable{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Variable.FindForSearch.Open: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de las variables por búsqueda")
		return variables, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT
						v.id, v.grd_id, g.alias AS grd_alias,
						v.name, v.mask, v.device, v.unit, v.active, v.address
						FROM variables AS v
						LEFT JOIN grds AS g ON v.grd_id = g.id
						WHERE g.alias LIKE ? OR
									v.name LIKE ? OR
									v.mask LIKE ? OR
									v.device LIKE ? OR
									v.address LIKE ?`

	search = "%" + search + "%"

	if search != "" {
		for i := 0; i < 5; i++ {
			params = append(params, search)
		}
	}

	query = query + " ORDER BY v.name, g.alias, v.mask, v.device, v.address"

	rows, err = db.Query(query, params...)
	if err != nil {
		fmt.Println("Model.Variable.FindForSearch.Query: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de las variables por búsqueda")
		return variables, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		variable := Variable{}

		fields = []interface{}{
			&variable.ID,
			&variable.grdID,
			&variable.grdAlias,
			&variable.Name,
			&variable.mask,
			&variable.Device,
			&variable.Unit,
			&variable.Active,
			&variable.Address,
		}

		err = rows.Scan(fields...)
		if err == nil {
			if variable.grdID.Valid {
				variable.GRDID = variable.grdID.Int64
			}

			if variable.grdAlias.Valid {
				variable.GRDAlias = variable.grdAlias.String
			}

			if variable.mask.Valid {
				variable.Mask = variable.mask.String
			}

			variables = append(variables, variable)

		} else {
			fmt.Println("Model.Variable.FindForSearch..Scan: ", err)
		}
	}

	return variables, msgErr
}
