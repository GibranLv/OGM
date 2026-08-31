package chartevent

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/JamsMendez/SION-sw/models"
)

// Find ...
func (m Model) Find(where map[string]interface{}) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.Find.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.Find.Close: ", err)
			}
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	query := "SELECT * FROM chart_events"

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
			fmt.Println("Model.ChartEvent.Find.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.Find.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.Find.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindByUser ...
func (m Model) FindByUser(userID int64) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUser.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUser.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID}
	var rows *sql.Rows

	query := `SELECT 
							c.id, c.user_id, c.record_id, c.variable_id, c.is_custom,
							c.name, c.description, c.files, c.created_at, c.updated_at
						FROM chart_events AS c
						LEFT JOIN users AS u ON u.id = c.user_id
						WHERE u.user_id = ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUser.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUser.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindByUserOrLowerValue ...
func (m Model) FindByUserOrLowerValue(userID int64, value uint8) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserOrLowerValue.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT
						DISTINCT c.id, c.user_id, c.record_id, c.variable_id, c.is_custom,
							c.name, c.description, c.files, c.created_at, c.updated_at
						FROM chart_events AS c
						LEFT JOIN users AS u ON u.id = c.user_id
						WHERE u.id = ? OR u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserOrLowerValue.query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOrLowerValue.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindByUserAndLowerValue ...
func (m Model) FindByUserAndLowerValue(userID int64, value uint8) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserAndLowerValue.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserAndLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value}
	var rows *sql.Rows

	query := `SELECT 
							c.id, c.user_id, c.record_id, c.variable_id, c.is_custom,
							c.name, c.description, c.files, c.created_at, c.updated_at
						FROM chart_events AS c
						LEFT JOIN users AS u ON u.id = c.user_id
						WHERE u.id = ? AND u.value > ?`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserAndLowerValue.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserAndLowerValue.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindSegment ...
func (m Model) FindSegment(start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegment.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegment.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{variableID, isCustom}
	var rows *sql.Rows

	query := "SELECT * FROM chart_events WHERE variable_id = ? AND is_custom = ?"

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE created_at >= '%s' AND created_at < '%s'"
		} else {
			query = query + " AND created_at >= '%s' AND created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE id >= %d"
		} else {
			query = query + " AND id >= %d"
		}

		query = fmt.Sprintf(query, start)
	}

	query = query + " ORDER BY created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegment.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegment.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegment.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

//FindSegmentByUser ...
func (m Model) FindSegmentByUser(userID int64, start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUser.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUser.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{userID, variableID, isCustom}
	var rows *sql.Rows

	query := `SELECT
							c.id, c.user_id, c.record_id, c.variable_id, c.is_custom,
							c.name, c.description, c.files, c.created_at, c.updated_at
						FROM chart_events AS c
						WHERE c.user_id = ? AND c.variable_id = ? AND c.is_custom = ?`

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE c.created_at >= '%s' AND c.created_at < '%s'"
		} else {
			query = query + " AND c.created_at >= '%s' AND c.created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		query = query + " AND c.id >= %d"
		query = fmt.Sprintf(query, start)
	}

	query = query + " ORDER BY c.created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUser.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUser.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUser.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

//FindSegmentByUserOrLowerValue ...
func (m Model) FindSegmentByUserOrLowerValue(userID int64, value uint8, start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUserOrLowerValue.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserOrLowerValue.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value, variableID, isCustom}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT c.id, c.user_id, c.record_id, c.variable_id, c.is_custom,
							c.name, c.description, c.files, c.created_at, c.updated_at
						FROM chart_events AS c
						LEFT JOIN users AS u ON u.id = c.user_id
						WHERE u.id = ? OR u.value > ? AND c.variable_id = ? AND c.is_custom = ?`

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE c.created_at >= '%s' AND c.created_at < '%s'"
		} else {
			query = query + " AND c.created_at >= '%s' AND c.created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		query = query + " AND c.id >= %d"
		query = fmt.Sprintf(query, start)
	}

	query = " ORDER BY c.created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUserOrLowerValue.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserOrLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserOrLowerValue.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

//FindSegmentByUserAndLowerValue ...
func (m Model) FindSegmentByUserAndLowerValue(userID int64, value uint8, start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUserAndLowerValue.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserAndLowerValue.Open: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value, variableID, isCustom}
	var rows *sql.Rows

	query := `SELECT 
							c.id, c.user_id, c.record_id, c.variable_id, c.is_custom,
							c.name, c.description, c.files, c.created_at, c.updated_at
						FROM chart_events AS c
						LEFT JOIN users AS u ON u.id = c.user_id
						WHERE u.id = ? OR u.value > ? AND c.variable_id = ? AND c.is_custom = ?`

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE c.created_at >= '%s' AND c.created_at < '%s'"
		} else {
			query = query + " AND c.created_at >= '%s' AND c.created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		query = query + " AND c.id >= %d"
		query = fmt.Sprintf(query, start)
	}

	query = " ORDER BY c.created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUserAndLowerValue.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserAndLowerValue.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserAndLowerValue.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindSegmentToTable ...
func (m Model) FindSegmentToTable(start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentToTable.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentToTable.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{variableID, isCustom}
	var rows *sql.Rows

	table := "variables"
	if isCustom {
		table = "custom_variables"
	}

	query := fmt.Sprintf(`SELECT 
												ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
												ce.description, ce.files, ce.created_at, ce.updated_at,
												u.name AS user_name,
												v.name AS variable_name,
												v.device AS variable_device
											FROM chart_events AS ce
											LEFT JOIN users AS u ON ce.user_id = u.id
											LEFT JOIN %s AS v ON ce.variable_id = v.id
											WHERE ce.variable_id = ? AND ce.is_custom = ?`, table)

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE ce.created_at >= '%s' AND ce.created_at < '%s'"
		} else {
			query = query + " AND ce.created_at >= '%s' AND ce.created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE ce.id >= %d"
		} else {
			query = query + " AND ce.id >= %d"
		}

		query = fmt.Sprintf(query, start)
	}

	query = query + " ORDER BY ce.created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentToTable.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentToTable.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentToTable.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

//FindSegmentByUserToTable ...
func (m Model) FindSegmentByUserToTable(userID int64, start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUserToTable.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserToTable.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{userID, variableID, isCustom}
	var rows *sql.Rows

	table := "variables"
	if isCustom {
		table = "custom_variables"
	}

	query := fmt.Sprintf(`SELECT
												ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
												ce.description, ce.files, ce.created_at, ce.updated_at,
												u.name AS user_name,
												v.name AS variable_name,
												v.device AS variable_device
											FROM chart_events AS ce
											LEFT JOIN users AS u ON ce.user_id = u.id
											LEFT JOIN %s AS v ON ce.variable_id = v.id
											WHERE u.id = ? AND ce.variable_id = ? AND ce.is_custom = ?`, table)

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE ce.created_at >= '%s' AND ce.created_at < '%s'"
		} else {
			query = query + " AND ce.created_at >= '%s' AND ce.created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		query = query + " AND ce.id >= %d"
		query = fmt.Sprintf(query, start)
	}

	query = query + " ORDER BY ce.created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUserToTable.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserToTable.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserToTable.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

//FindSegmentByUserOrLowerValueToTable ...
func (m Model) FindSegmentByUserOrLowerValueToTable(userID int64, value uint8, start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUserOrLowerValueToTable.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserOrLowerValueToTable.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value, variableID, isCustom}
	var rows *sql.Rows

	table := "variables"
	if isCustom {
		table = "custom_variables"
	}

	query := fmt.Sprintf(`SELECT
												DISTINCT ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
												ce.description, ce.files, ce.created_at, ce.updated_at,
												u.name AS user_name,
												v.name AS variable_name,
												v.device AS variable_device
											FROM chart_events AS ce
											LEFT JOIN users AS u ON ce.user_id = u.id
											LEFT JOIN %s AS v ON ce.variable_id = v.id
											WHERE ce.variable_id = ? AND ce.is_custom = ?`, table)

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE ce.created_at >= '%s' AND ce.created_at < '%s'"
		} else {
			query = query + " AND ce.created_at >= '%s' AND ce.created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		query = query + " AND ce.id >= %d"
		query = fmt.Sprintf(query, start)
	}

	query = " ORDER BY ce.created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUserOrLowerValueToTable.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserOrLowerValueToTable.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserOrLowerValueToTable.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

//FindSegmentByUserAndLowerValueToTable ...
func (m Model) FindSegmentByUserAndLowerValueToTable(userID int64, value uint8, start, limit int, variableID int64, isCustom bool, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUserAndLowerValueToTable.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserAndLowerValueToTable.Open: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value, variableID, isCustom}
	var rows *sql.Rows

	table := "variables"
	if isCustom {
		table = "custom_variables"
	}

	query := fmt.Sprintf(`SELECT
												ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
												ce.description, ce.files, ce.created_at, ce.updated_at,
												u.name AS user_name,
												v.name AS variable_name,
												v.device AS variable_device
											FROM chart_events AS ce
											LEFT JOIN users AS u ON ce.user_id = u.id
											LEFT JOIN %s AS v ON ce.variable_id = v.id
											WHERE ce.variable_id = ? AND ce.is_custom = ?`, table)

	if startDate != "" && finalDate != "" {
		if strings.Index(query, "WHERE") == -1 {
			query = query + " WHERE ce.created_at >= '%s' AND ce.created_at < '%s'"
		} else {
			query = query + " AND ce.created_at >= '%s' AND ce.created_at < '%s'"
		}

		query = fmt.Sprintf(query, startDate, finalDate)
	}

	if start > 0 {
		query = query + " AND ce.id >= %d"
		query = fmt.Sprintf(query, start)
	}

	query = " ORDER BY ce.created_at DESC"

	if limit > 0 {
		query = query + " LIMIT %d"
		query = fmt.Sprintf(query, limit)
	}

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindSegmentByUserAndLowerValueToTable.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserAndLowerValueToTable.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindSegmentByUserAndLowerValueToTable.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindOfVariablesToTable ...
func (m Model) FindOfVariablesToTable(startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindOfVariablesToTable.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOfVariablesToTable.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{startDate, finalDate}
	var rows *sql.Rows

	query := `SELECT 
							ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
							ce.description, ce.files, ce.created_at, ce.updated_at,
							u.name AS user_name,
							v.name AS variable_name,
							v.device AS variable_device
						FROM chart_events AS ce
						LEFT JOIN users AS u ON ce.user_id = u.id
						LEFT JOIN variables AS v ON ce.variable_id = v.id
						WHERE ce.created_at >= ? AND ce.created_at < ? AND ce.is_custom = FALSE
						ORDER BY ce.created_at DESC`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindOfVariablesToTable.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOfVariablesToTable.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOfVariablesToTable.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindOfCustomVariablesToTable ...
func (m Model) FindOfCustomVariablesToTable(startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.Find.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOfCustomVariablesToTable.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{startDate, finalDate}
	var rows *sql.Rows

	query := `SELECT 
							ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
							ce.description, ce.files, ce.created_at, ce.updated_at,
							u.name AS user_name,
							v.name AS variable_name,
							v.device AS variable_device
						FROM chart_events AS ce
						LEFT JOIN users AS u ON ce.user_id = u.id
						LEFT JOIN custom_variables AS v ON ce.variable_id = v.id
						WHERE ce.created_at >= ? AND ce.created_at < ? AND ce.is_custom = TRUE
						ORDER BY ce.created_at DESC`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindOfCustomVariablesToTable.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOfCustomVariablesToTable.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindOfCustomVariablesToTable.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindByUserOfVariablesToTable ...
func (m Model) FindByUserOfVariablesToTable(userID int64, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserOfVariablesToTable.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOfVariablesToTable.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{userID, startDate, finalDate}
	var rows *sql.Rows

	query := `SELECT 
							ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
							ce.description, ce.files, ce.created_at, ce.updated_at,
							u.name AS user_name,
							v.name AS variable_name,
							v.device AS variable_device
						FROM chart_events AS ce
						LEFT JOIN users AS u ON ce.user_id = u.id
						LEFT JOIN variables AS v ON ce.variable_id = v.id
						WHERE ce.created_at >= ? AND ce.created_at < ? AND ce.user_id = ? AND ce.is_custom = FALSE
						ORDER BY ce.created_at DESC`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserOfVariablesToTable.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOfVariablesToTable.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOfVariablesToTable.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindByUserOfCustomVariablesToTable ...
func (m Model) FindByUserOfCustomVariablesToTable(userID int64, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserOfCustomVariablesToTable.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOfCustomVariablesToTable.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{userID, startDate, finalDate}
	var rows *sql.Rows

	query := `SELECT 
							ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
							ce.description, ce.files, ce.created_at, ce.updated_at,
							u.name AS user_name,
							v.name AS variable_name,
							v.device AS variable_device
						FROM chart_events AS ce
						LEFT JOIN users AS u ON ce.user_id = u.id
						LEFT JOIN custom_variables AS v ON ce.variable_id = v.id
						WHERE ce.created_at >= ? AND ce.created_at < ? AND ce.user_id = ? AND ce.is_custom = TRUE
						ORDER BY ce.created_at DESC`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserOfCustomVariablesToTable.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOfCustomVariablesToTable.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOfCustomVariablesToTable.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindByUserOrLowerValueOfVariables ...
func (m Model) FindByUserOrLowerValueOfVariables(userID int64, value uint8, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserOrLowerValueOfVariables.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOrLowerValueOfVariables.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value, startDate, finalDate}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
							ce.description, ce.files, ce.created_at, ce.updated_at,
							u.name AS user_name,
							v.name AS variable_name,
							v.device AS variable_device
						FROM chart_events AS ce
						LEFT JOIN users AS u ON ce.user_id = u.id
						LEFT JOIN variables AS v ON ce.variable_id = v.id
						WHERE (u.id = ? OR u.value > ?) AND
									ce.created_at >= ? AND ce.created_at < ? AND ce.is_custom = FALSE
						ORDER BY ce.created_at DESC`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserOrLowerValueOfVariables.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOrLowerValueOfVariables.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOrLowerValueOfVariables.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindByUserOrLowerValueOfCustomVariables ...
func (m Model) FindByUserOrLowerValueOfCustomVariables(userID int64, value uint8, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserOrLowerValueOfCustomVariables.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOrLowerValueOfCustomVariables.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value, startDate, finalDate}
	var rows *sql.Rows

	query := `SELECT
							DISTINCT ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
							ce.description, ce.files, ce.created_at, ce.updated_at,
							u.name AS user_name,
							v.name AS variable_name,
							v.device AS variable_device
						FROM chart_events AS ce
						LEFT JOIN users AS u ON ce.user_id = u.id
						LEFT JOIN custom_variables AS v ON ce.variable_id = v.id
						WHERE (u.id = ? OR u.value > ?) AND
									ce.created_at >= ? AND ce.created_at < ? AND ce.is_custom = TRUE
						ORDER BY ce.created_at DESC`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserOrLowerValueOfCustomVariables.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOrLowerValueOfCustomVariables.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserOrLowerValueOfCustomVariables.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindByUserAndLowerValueOfVariables ...
func (m Model) FindByUserAndLowerValueOfVariables(userID int64, value uint8, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserAndLowerValueOfVariables.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserAndLowerValueOfVariables.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value, startDate, finalDate}
	var rows *sql.Rows

	query := `SELECT
							ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
							ce.description, ce.files, ce.created_at, ce.updated_at,
							u.name AS user_name,
							v.name AS variable_name,
							v.device AS variable_device
						FROM chart_events AS ce
						LEFT JOIN users AS u ON ce.user_id = u.id
						LEFT JOIN variables AS v ON ce.variable_id = v.id
						WHERE (u.id = ? AND u.value > ?) AND
									ce.created_at >= ? AND ce.created_at < ?  AND ce.is_custom = FALSE
						ORDER BY ce.created_at DESC`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserAndLowerValueOfVariables.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserAndLowerValueOfVariables.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserAndLowerValueOfVariables.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}

// FindByUserAndLowerValueOfCustomVariables ...
func (m Model) FindByUserAndLowerValueOfCustomVariables(userID int64, value uint8, startDate, finalDate string) ([]ChartEvent, error) {
	chartEvents := []ChartEvent{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserAndLowerValueOfCustomVariables.Open: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserAndLowerValueOfCustomVariables.Close: ", err)
			}
		}
	}(db)

	var params = []interface{}{userID, value, startDate, finalDate}
	var rows *sql.Rows

	query := `SELECT
							ce.id, ce.user_id, ce.record_id, ce.variable_id, ce.is_custom, ce.name,
							ce.description, ce.files, ce.created_at, ce.updated_at,
							u.name AS user_name,
							v.name AS variable_name,
							v.device AS variable_device
						FROM chart_events AS ce
						LEFT JOIN users AS u ON ce.user_id = u.id
						LEFT JOIN custom_variables AS v ON ce.variable_id = v.id
						WHERE (u.id = ? AND u.value > ?) AND
								ce.created_at >= ? AND ce.created_at < ? AND ce.is_custom = TRUE
						ORDER BY ce.created_at DESC`

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.ChartEvent.FindByUserAndLowerValueOfCustomVariables.Query: ", err)
		}

		return chartEvents, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserAndLowerValueOfCustomVariables.Rows.Close: ", err)
			}
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		chartEvent := ChartEvent{}

		fields = []interface{}{
			&chartEvent.ID,
			&chartEvent.UserID,
			&chartEvent.RecordID,
			&chartEvent.VariableID,
			&chartEvent.IsCustom,
			&chartEvent.Name,
			&chartEvent.Description,
			&chartEvent.files,
			&chartEvent.createdAt,
			&chartEvent.updatedAt,
			&chartEvent.userName,
			&chartEvent.variableName,
			&chartEvent.variableDevice,
		}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.ChartEvent.FindByUserAndLowerValueOfCustomVariables.Scan: ", err)
			}

		} else {
			// filtro de Files
			if chartEvent.files.Valid {
				s := chartEvent.files.String
				buffer := []byte(s)
				_ = json.Unmarshal(buffer, &chartEvent.Files)
			} else {
				chartEvent.Files = []File{}
			}

			// filtro de CreatedAt
			if chartEvent.createdAt.Valid {
				chartEvent.CreatedAt = chartEvent.createdAt.Time
			}

			// filtro de UpdatedAt
			if chartEvent.updatedAt.Valid {
				chartEvent.UpdatedAt = chartEvent.updatedAt.Time
			}

			// filtro de UserName
			if chartEvent.userName.Valid {
				chartEvent.UserName = chartEvent.userName.String
			}

			// filtro de VariableName
			if chartEvent.variableName.Valid {
				chartEvent.VariableName = chartEvent.variableName.String
			}

			// filtro de VariableDevice
			if chartEvent.variableDevice.Valid {
				chartEvent.VariableDevice = chartEvent.variableDevice.String
			}

			chartEvents = append(chartEvents, chartEvent)
		}
	}

	return chartEvents, err
}
