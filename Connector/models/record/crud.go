package record

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/go-sql-driver/mysql"

	"github.com/JamsMendez/Connector/models"
)

// constants of Model
const (
	KeyID        = "id"
	KeyAlias     = "alias"
	KeyValue     = "value"
	KeyUnit      = "unit"
	KeyTimeStamp = "timestamp"
	KeyCreatedAt = "created_at"
	KeyUpdatedAt = "updated_at"
)

// Record ...
type Record struct {
	ID        int64     `json:"id"`
	Alias     string    `json:"alias"`
	Value     float32   `json:"value"`
	Unit      string    `json:"unit"`
	Timestamp time.Time `json:"timestamp"`
	timestamp mysql.NullTime
}

// Model ...
type Model struct {
}

// FindOneLast ...
func (m Model) FindOneLast(alias string) (Record, error) {
	var msgErr error
	record := Record{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Record.FindOneLast.Open: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos")
		return record, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT *
						FROM records
						WHERE alias = ?
						ORDER BY timestamp
						DESC
						LIMIT 1`

	params = append(params, alias)

	rows, err = db.Query(query, params...)
	if err != nil {
		fmt.Println("Model.Record.FindOneLast.Query: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos de la variable")
		return record, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	records := []Record{}

	for rows.Next() {
		var fields []interface{}

		record := Record{}

		fields = []interface{}{
			&record.ID,
			&record.Alias,
			&record.Value,
			&record.Unit,
			&record.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			if record.timestamp.Valid {
				record.Timestamp = record.timestamp.Time
			}

			records = append(records, record)

		} else {
			fmt.Println("Model.Record.FindOneLast.Scan: ", err)
		}
	}

	length := len(records)
	if length > 0 {
		record = records[0]

		return record, msgErr
	}

	return record, msgErr
}

// Find ...
func (m Model) Find(where map[string]interface{}) ([]Record, error) {
	var msgErr error
	records := []Record{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Record.Find.Open: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos")
		return records, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM records"

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
		fmt.Println("Model.Record.Find.Query: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos")
		return records, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		record := Record{}

		fields = []interface{}{
			&record.ID,
			&record.Alias,
			&record.Value,
			&record.Unit,
			&record.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			if record.timestamp.Valid {
				record.Timestamp = record.timestamp.Time
			}

			records = append(records, record)

		} else {
			fmt.Println("Model.Record.Find.Scan: ", err)
		}
	}

	return records, msgErr
}

// FindForDay ...
func (m Model) FindForDay(alias, first, last string) ([]Record, error) {
	var msgErr error
	records := []Record{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Record.FindOneLast.Open: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos")
		return records, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := `SELECT *
						FROM records
						WHERE alias = ?
						AND timestamp >= ?
						AND timestamp < ?`

	params = append(params, alias, first, last)

	rows, err = db.Query(query, params...)
	if err != nil {
		fmt.Println("Model.Record.FindOneLast.Query: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos de la variable")
		return records, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		record := Record{}

		fields = []interface{}{
			&record.ID,
			&record.Alias,
			&record.Value,
			&record.Unit,
			&record.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			if record.timestamp.Valid {
				record.Timestamp = record.timestamp.Time
			}

			records = append(records, record)

		} else {
			fmt.Println("Model.Record.FindOneLast.Scan: ", err)
		}
	}

	return records, msgErr
}

// FindOne ...
func (m Model) FindOne(where map[string]interface{}) (Record, error) {
	var msgErr error
	record := Record{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Record.FindOne.Open: ", err)
		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos")
		return record, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM records"

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
		fmt.Println("Model.Record.FindOne.Query: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos")
		return record, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	records := []Record{}

	for rows.Next() {
		record := Record{}

		fields := []interface{}{
			&record.ID,
			&record.Alias,
			&record.Value,
			&record.Unit,
			&record.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			if record.timestamp.Valid {
				record.Timestamp = record.timestamp.Time
			}

			records = append(records, record)

		} else {
			fmt.Println("Model.Record.FindOne.Scan: ", err)
		}
	}

	if len(records) == 0 {
		return record, msgErr
	}

	record = records[0]

	return record, msgErr
}

// Create ...
func (m Model) Create(values map[string]interface{}) (Record, error) {
	var msgErr error
	record := Record{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Record.Create.Open: ", err)
		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos")
		return record, msgErr
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

		query := "INSERT INTO records SET"

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
			fmt.Println("Model.Record.Create.Prepare: ", err)

			msgErr = errors.New("Ocurrió un error al guardar la información de la record")
			return record, msgErr
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
			fmt.Println("Model.Record.Create.Exec: ", err)

			msgErr = errors.New("Ocurrió un error al guardar la información de la record")
			return record, msgErr
		}

		var recordID int64
		recordID, err = res.LastInsertId()
		if err != nil {
			fmt.Println("Model.Record.Create.LastInsertId: ", err)

			msgErr = errors.New("Ocurrió un error al guardar la información de la record")
			return record, msgErr
		}

		query = "SELECT * FROM records WHERE id = ?"
		row := db.QueryRow(query, recordID)

		fields := []interface{}{
			&record.ID,
			&record.Alias,
			&record.Value,
			&record.Unit,
			&record.timestamp,
		}

		err = row.Scan(fields...)

		if err != nil {
			fmt.Println("Model.Record.Create.Scan: ", err)

			msgErr = errors.New("Ocurrió un error al guardar la información de la record")
			return record, msgErr
		}

		if record.timestamp.Valid {
			record.Timestamp = record.timestamp.Time
		}
	}

	return record, msgErr
}

// Update ...
func (m Model) Update(values map[string]interface{}) (Record, error) {
	var msgErr error
	record := Record{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Record.Update.Open: ", err)
		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos")
		return record, msgErr
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
		msgErr = errors.New("La información a guardar no es consistente con la record")
		return record, msgErr
	}

	var stmt *sql.Stmt

	query := "UPDATE records SET {{fields}} WHERE id = ?"

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

	recordID := values[KeyID]
	params = append(params, recordID)

	stmt, err = db.Prepare(query)
	if err != nil {
		fmt.Println("Model.Record.Update.Prepare: ", err)

		msgErr = errors.New("Ocurrió un error al cambiar la información de la record")
		return record, msgErr
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
		fmt.Println("Model.Record.Update.Exec: ", err)

		msgErr = errors.New("Ocurrió un error al guardar la información de la record")
		return record, msgErr
	}

	var rowsAffected int64
	rowsAffected, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.Record.Update.RowsAffected: ", err)

		msgErr = errors.New("Ocurrió un error al guardar la información de la record")
		return record, msgErr
	}

	if rowsAffected == 0 {
		msgErr = errors.New("No se realizo ningun cambio en la información de la record")
		return record, msgErr
	}

	query = "SELECT * FROM records WHERE id = ?"
	row := db.QueryRow(query, recordID)

	fields := []interface{}{
		&record.ID,
		&record.Alias,
		&record.Value,
		&record.Unit,
		&record.timestamp,
	}

	err = row.Scan(fields...)

	if err != nil {
		fmt.Println("Model.Record.Update.Scan: ", err)

		msgErr = errors.New("Ocurrió un error al guardar la información de la record")
		return record, msgErr
	}

	if record.timestamp.Valid {
		record.Timestamp = record.timestamp.Time
	}

	return record, msgErr
}

// Remove ...
func (m Model) Remove(where map[string]interface{}) (int64, error) {
	var numAffected int64
	var msgErr error

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Record.Remove.Open: ", err)
		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos")
		return numAffected, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	query := "DELETE FROM records WHERE"

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
		fmt.Println("Model.Record.Remove.Prepare: ", err)

		msgErr = errors.New("Ocurrió un error al eliminar la información de la record")
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
		fmt.Println("Model.Record.Remove.Exec: ", err)

		msgErr = errors.New("Ocurrió un error al eliminar la información de la record")
		return numAffected, msgErr
	}

	numAffected, err = res.RowsAffected()
	if err != nil {
		fmt.Println("Model.Record.Remove.RowsAffected: ", err)

		msgErr = errors.New("Ocurrió un error al eliminar la información de la record")
		return numAffected, msgErr
	}

	return numAffected, msgErr
}

// Find2 ...
func (m Model) Find2(where map[string]interface{}) ([]Record, error) {
	var msgErr error
	records := []Record{}

	connStr := models.Config.DBUser + ":" + models.Config.DBPwd + "@tcp(" + models.Config.DBHost + ":" + models.Config.DBPort + ")/" + models.Config.DBName
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Record.Find.Open: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos")
		return records, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM records"

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

	query = query + " AND timestamp >= '2020-04-30 19:00:00' AND timestamp < '2020-05-20 16:18:22';"

	rows, err = db.Query(query, params...)
	if err != nil {
		fmt.Println("Model.Record.Find.Query: ", err)

		msgErr = errors.New("Ocurrió un error al obtener la información de los historicos")
		return records, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		record := Record{}

		fields = []interface{}{
			&record.ID,
			&record.Alias,
			&record.Value,
			&record.Unit,
			&record.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			if record.timestamp.Valid {
				record.Timestamp = record.timestamp.Time
			}

			records = append(records, record)

		} else {
			fmt.Println("Model.Record.Find.Scan: ", err)
		}
	}

	return records, msgErr
}
