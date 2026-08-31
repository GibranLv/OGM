package GRD

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
	KeySlave     = "slave"
	KeyAlias     = "alias"
	KeyPort      = "port"
	KeyActive    = "active"
	KeyCreatedAt = "created_at"
	KeyUpdatedAt = "updated_at"
)

// GRD ...
type GRD struct {
	ID     int64  `json:"id"`
	Alias  string `json:"alias"`
	Slave  uint8  `json:"slave"`
	Port   string `json:"port"`
	Active bool   `json:"active"`
}

// Model ...
type Model struct {
}

// Find ...
func (m Model) Find(where map[string]interface{}) ([]GRD, error) {
	var msgErr error
	grds := []GRD{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.GRD.Find.Open: ", err)

		msgErr = errors.New("ocurrió un error al obtener la información de los grds")
		return grds, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM grds"

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
		fmt.Println("Model.GRD.Find.Query: ", err)

		msgErr = errors.New("ocurrió un error al obtener la información de los grds")
		return grds, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		grd := GRD{}

		fields = []interface{}{
			&grd.ID,
			&grd.Alias,
			&grd.Slave,
			&grd.Port,
			&grd.Active,
		}

		err = rows.Scan(fields...)
		if err == nil {
			grds = append(grds, grd)

		} else {
			fmt.Println("Model.GRD.Find.Scan: ", err)
		}
	}

	return grds, msgErr
}

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (GRD, error) {
	var msgErr error
	grd := GRD{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.GRD.FindOne.Open: ", err)
		msgErr = errors.New("ocurrió un error al obtener la información de los grds")
		return grd, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM grds"

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
		fmt.Println("Model.GRD.FindOne.Query: ", err)

		msgErr = errors.New("ocurrió un error al obtener la información de los grds")
		return grd, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	grds := []GRD{}

	for rows.Next() {
		grd := GRD{}

		fields := []interface{}{
			&grd.ID,
			&grd.Alias,
			&grd.Slave,
			&grd.Port,
			&grd.Active,
		}

		err = rows.Scan(fields...)
		if err == nil {
			grds = append(grds, grd)

		} else {
			fmt.Println("Model.GRD.FindOne.Scan: ", err)
		}
	}

	if len(grds) == 0 {
		return grd, msgErr
	}

	grd = grds[0]

	return grd, msgErr
}

// Create ...
func (m Model) Create(values map[string]interface{}) (GRD, error) {
	var msgErr error
	grd := GRD{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.GRD.Create.Open: ", err)
		msgErr = errors.New("ocurrió un error al obtener la información de los grds")
		return grd, msgErr
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

		query := "INSERT INTO grds SET"

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
			fmt.Println("Model.GRD.Create.Prepare: ", err)

			msgErr = errors.New("ocurrió un error al guardar la información del grd")
			return grd, msgErr
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
			fmt.Println("Model.GRD.Create.Exec: ", err)

			msgErr = errors.New("ocurrió un error al guardar la información del grd")
			return grd, msgErr
		}

		var grdID int64
		grdID, err = res.LastInsertId()
		if err != nil {
			fmt.Println("Model.GRD.Create.LastInsertId: ", err)

			msgErr = errors.New("ocurrió un error al guardar la información del grd")
			return grd, msgErr
		}

		query = "SELECT * FROM grds WHERE id = ?"
		row := db.QueryRow(query, grdID)

		fields := []interface{}{
			&grd.ID,
			&grd.Alias,
			&grd.Slave,
			&grd.Port,
			&grd.Active,
		}

		err = row.Scan(fields...)

		if err != nil {
			fmt.Println("Model.GRD.Create.Scan: ", err)

			msgErr = errors.New("ocurrió un error al guardar la información del grd")
			return grd, msgErr
		}
	}

	return grd, msgErr
}

// Update ...
func (m Model) Update(values map[string]interface{}) (GRD, error) {
	var msgErr error
	grd := GRD{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.GRD.Update.Open: ", err)
		msgErr = errors.New("ocurrió un error al obtener la información de los grds")
		return grd, msgErr
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
		msgErr = errors.New("la información a guardar no es consistente con la grd")
		return grd, msgErr
	}

	var stmt *sql.Stmt

	query := "UPDATE grds SET {{fields}} WHERE id = ?"

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

	grdID := values[KeyID]
	params = append(params, grdID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.GRD.Update.Prepare: ", err)

		msgErr = errors.New("ocurrió un error al cambiar la información del grd")
		return grd, msgErr
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
		fmt.Println("Model.GRD.Update.Exec: ", err)

		msgErr = errors.New("ocurrió un error al guardar la información del grd")
		return grd, msgErr
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.GRD.Update.RowsAffected: ", err)

		msgErr = errors.New("ocurrió un error al guardar la información del grd")
		return grd, msgErr
	}

	if rowsAffected == 0 {
		msgErr = errors.New("no se realizo ningun cambio en la información del grd")
		return grd, msgErr
	}

	query = "SELECT * FROM grds WHERE id = ?"
	row := db.QueryRow(query, grdID)

	fields := []interface{}{
		&grd.ID,
		&grd.Alias,
		&grd.Slave,
		&grd.Port,
		&grd.Active,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.GRD.Update.Scan: ", err)

		msgErr = errors.New("ocurrió un error al guardar la información del grd")
		return grd, msgErr
	}

	return grd, msgErr
}

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64
	var msgErr error

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.GRD.Remove.Open: ", err)
		msgErr = errors.New("ocurrió un error al obtener la información de los grds")
		return numAffected, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	query := "DELETE FROM grds WHERE"

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
		fmt.Println("Model.GRD.Remove.Prepare: ", err)

		msgErr = errors.New("ocurrió un error al eliminar la información del grd")
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
		fmt.Println("Model.GRD.Remove.Exec: ", err)

		msgErr = errors.New("ocurrió un error al eliminar la información del grd")
		return numAffected, msgErr
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.GRD.Remove.RowsAffected: ", err)

		msgErr = errors.New("ocurrió un error al eliminar la información del grd")
		return numAffected, msgErr
	}

	return numAffected, msgErr
}

// FindForSearch ...
func (m Model) FindForSearch(search string) ([]GRD, error) {
	var msgErr error
	grds := []GRD{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.GRD.FindForSearch.Open: ", err)

		msgErr = errors.New("ocurrió un error al obtener la información de los grds por búsqueda")
		return grds, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT * FROM grds 
						WHERE alias LIKE ? OR
									slave LIKE ? OR
									port LIKE ?`

	search = "%" + search + "%"

	if search != "" {
		for i := 0; i < 3; i++ {
			params = append(params, search)
		}
	}

	query = query + " ORDER BY alias, slave"

	rows, err = db.Query(query, params...)
	if err != nil {
		fmt.Println("Model.GRD.FindForSearch.Query: ", err)

		msgErr = errors.New("ocurrió un error al obtener la información de los grds por búsqueda")
		return grds, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		grd := GRD{}

		fields = []interface{}{
			&grd.ID,
			&grd.Alias,
			&grd.Slave,
			&grd.Port,
			&grd.Active,
		}

		err = rows.Scan(fields...)
		if err == nil {
			grds = append(grds, grd)

		} else {
			fmt.Println("Model.GRD.FindForSearch..Scan: ", err)
		}
	}

	return grds, msgErr
}
