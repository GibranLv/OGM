package record

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

// Find ...
func (m *Model) Find(table, start, final string) ([]Record, error) {
	records := []Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinute.Open: ", err)
		}

		return records, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinute.Close: ", err)
			}
		}
	}(db)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinute.Open: ", err)
		}

		return records, err
	}

	var rows *sql.Rows

	query := fmt.Sprintf("SELECT * FROM %s WHERE timestamp >= ? AND timestamp < ?", table)

	rows, err = db.Query(query, start, final)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinute.Query: ", err)
		}

		return records, err
	}

	for rows.Next() {
		record := Record{}

		fields := []interface{}{
			&record.ID,
			&record.value,
			&record.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {

			// filtro de Value
			if record.value.Valid {
				record.Value = record.value.Float64
			}

			// filtro de Timestamp
			if record.timestamp.Valid {
				record.Timestamp = record.timestamp.Time

				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					record.TimestampString = record.Timestamp.In(location).Format(constants.DateTimeFormat)
				}
			}

			records = append(records, record)

		} else {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinute.Scan: ", err)
			}
		}
	}

	return records, err
}

// FindByMinuteEqual ...
func (m *Model) FindByMinuteEqual(table, start, final string) ([]Record, error) {
	records := []Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteEqual.Open: ", err)
		}

		return records, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinuteEqual.Close: ", err)
			}
		}
	}(db)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteEqual.Open: ", err)
		}

		return records, err
	}

	var rows *sql.Rows

	query := fmt.Sprintf("SELECT * FROM %s WHERE timestamp >= ? AND timestamp <= ?;", table)

	rows, err = db.Query(query, start, final)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteEqual.Query: ", err)
		}

		return records, err
	}

	for rows.Next() {
		record := Record{}

		fields := []interface{}{
			&record.ID,
			&record.value,
			&record.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {

			// filtro de Value
			if record.value.Valid {
				record.Value = record.value.Float64
			}

			// filtro de Timestamp
			if record.timestamp.Valid {
				record.Timestamp = record.timestamp.Time

				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					record.TimestampString = record.Timestamp.In(location).Format(constants.DateTimeFormat)
				}
			}

			records = append(records, record)

		} else {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinuteEqual.Scan: ", err)
			}
		}
	}

	return records, err
}

// FindByMinuteByID ...
func (m *Model) FindByMinuteByID(table string, ID int64) ([]Record, error) {
	records := []Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinute.Open: ", err)
		}

		return records, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinute.Close: ", err)
			}
		}
	}(db)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinute.Open: ", err)
		}

		return records, err
	}

	var rows *sql.Rows

	query := fmt.Sprintf("SELECT * FROM %s WHERE id > ? AND id <= 1063", table)

	rows, err = db.Query(query, ID)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinute.Query: ", err)
		}

		return records, err
	}

	for rows.Next() {
		record := Record{}

		fields := []interface{}{
			&record.ID,
			&record.value,
			&record.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {

			// filtro de Value
			if record.value.Valid {
				record.Value = record.value.Float64
			}

			// filtro de Timestamp
			if record.timestamp.Valid {
				record.Timestamp = record.timestamp.Time

				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					record.TimestampString = record.Timestamp.In(location).Format(constants.DateTimeFormat)
				}
			}

			records = append(records, record)

		} else {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinute.Scan: ", err)
			}
		}
	}

	return records, err
}

// FindMaxMin ...
func (m *Model) FindMaxMin(table, start, final string) (float64, float64, error) {
	var max, min float64

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindMaxMin.Open: ", err)
		}

		return max, min, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.FindMaxMin.Close: ", err)
			}
		}
	}(db)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindMaxMin.Open: ", err)
		}

		return max, min, err
	}

	var rows *sql.Rows

	query := fmt.Sprintf("SELECT MAX(value), MIN(value) FROM %s WHERE timestamp >= ? AND timestamp < ?", table)

	rows, err = db.Query(query, start, final)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindMaxMin.Query: ", err)
		}

		return max, min, err
	}

	for rows.Next() {
		err = rows.Scan(&max, &min)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.FindMaxMin.Scan: ", err)
			}
		}
	}

	return max, min, err
}

// AvgForRange ...
func (m Model) AvgForRange(table string, first, last time.Time) (AVG, error) {
	var err error
	avg := AVG{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.AvgForRange.Open: ", err)
		}

		return avg, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.AvgForRange.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{first, last}
	var rows *sql.Rows

	query := fmt.Sprintf("SELECT AVG(value) FROM %s WHERE timestamp >= ? AND timestamp < ?", table)

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.AvgForRange.Query: ", err)
		}

		return avg, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.AvgForRange.Rows.Close: ", err)
			}
		}
	}(rows)

	avgs := []AVG{}

	for rows.Next() {
		a := AVG{}
		fields := []interface{}{&a.value}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.AvgForRange.Scan: ", err)
			}

			return avg, err
		}

		// filtro de Value
		if a.value.Valid {
			a.Value = a.value.Float64
		}

		// filtro de Timestamp
		a.Timestamp = last

		location, err := time.LoadLocation(constants.TZ)
		if err != nil {
			location = time.Local
		}

		a.TimestampString = last.In(location).Format(constants.DateTimeFormat)

		avgs = append(avgs, a)
	}

	if len(avgs) > 0 {
		avg = avgs[0]
	}

	return avg, err
}

// SumByRange ...
func (m Model) SumByRange(table string, first, last time.Time) (SUM, error) {
	var err error
	sum := SUM{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.SumByRange.Open: ", err)
		}

		return sum, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.SumByRange.Close: ", err)
			}
		}
	}(db)

	params := []interface{}{first, last}
	var rows *sql.Rows

	query := fmt.Sprintf("SELECT SUM(value) FROM %s WHERE timestamp >= ? AND timestamp < ?", table)

	rows, err = db.Query(query, params...)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.SumByRange.Query: ", err)
		}

		return sum, err
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.SumByRange.Rows.Close: ", err)
			}
		}
	}(rows)

	sums := []SUM{}

	for rows.Next() {
		s := SUM{}
		fields := []interface{}{&s.value}

		err = rows.Scan(fields...)
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.SumByRange.Scan: ", err)
			}

			return sum, err
		}

		// filtro de Value
		if s.value.Valid {
			s.Value = s.value.Float64
		}

		// filtro de Timestamp
		s.Timestamp = last

		location, err := time.LoadLocation(constants.TZ)
		if err != nil {
			location = time.Local
		}

		s.TimestampString = last.In(location).Format(constants.DateTimeFormat)

		sums = append(sums, s)
	}

	if len(sums) > 0 {
		sum = sums[0]
	}

	return sum, err
}

// FindByMinuteAnnualByArray ...
func (m *Model) FindByMinuteAnnualByArray(table string, wheres []Where, num int) ([]Record, error) {
	var err error
	records := []Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteMinAndMaxByArray.Open: ", err)
		}

		return records, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinuteMinAndMaxByArray.Close: ", err)
			}
		}
	}(db)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.FindByMinute.FindByMinuteMinAndMaxByArray.Open: ", err)
		}

		return records, err
	}

	data := map[int][]Record{}
	results := make(chan IndexRecord)
	nWheres := len(wheres)

	for i := 0; i < nWheres; i++ {
		go func(index int, o *sql.DB) {
			where := wheres[index]

			var rows *sql.Rows
			query := fmt.Sprintf("SELECT * FROM %s WHERE timestamp >= ? AND timestamp < ? ORDER BY value LIMIT ?", table)

			rows, err = o.Query(query, where.Glt, where.Lt, num)
			if err != nil {
				if m.Debug {
					fmt.Println("Model.FindByMinute.FindByMinuteMinAndMaxByArray.Query: ", err)
				}
			}

			defer func(r *sql.Rows) {
				err := r.Close()
				if err != nil {
					if m.Debug {
						fmt.Println("Model.Record.FindByMinuteMinAndMaxByArray.Rows.Close: ", err)
					}
				}
			}(rows)

			recordsOut := []Record{}
			recordMin := Record{}
			recordAvg := Record{}
			recordMax := Record{}

			for rows.Next() {
				fields := []interface{}{
					&recordMin.ID,
					&recordMin.value,
					&recordMin.timestamp,
				}

				err = rows.Scan(fields...)
				if err == nil {

					// filtro de Value
					if recordMin.value.Valid {
						recordMin.Value = recordMin.value.Float64
					}

					// filtro de Timestamp
					if recordMin.timestamp.Valid {
						recordMin.Timestamp = recordMin.timestamp.Time

						location, err := time.LoadLocation(constants.TZ)
						if err == nil {
							recordMin.TimestampString = recordMin.Timestamp.In(location).Format(constants.DateTimeFormat)
						}
					}

				} else {
					if m.Debug {
						fmt.Println("Model.FindByMinute.FindByMinuteMinAndMaxByArray.Scan: ", err)
					}
				}
			}

			// AVG
			query = fmt.Sprintf("SELECT AVG(value) FROM %s WHERE timestamp >= ? AND timestamp < ? LIMIT ?", table)

			rows, err = o.Query(query, where.Glt, where.Lt, num)
			if err != nil {
				if m.Debug {
					fmt.Println("Model.FindByMinute.FindByMinuteMinAndMaxByArray.Query: ", err)
				}
			}

			defer func(r *sql.Rows) {
				err := r.Close()
				if err != nil {
					if m.Debug {
						fmt.Println("Model.FindByMinute.FindByMinuteMinAndMaxByArray.Rows.Close: ", err)
					}
				}
			}(rows)

			for rows.Next() {
				fields := []interface{}{
					&recordAvg.value,
				}

				err = rows.Scan(fields...)
				if err == nil {

					// filtro de Value
					if recordAvg.value.Valid {
						recordAvg.Value = recordAvg.value.Float64
					}

					location, err := time.LoadLocation(constants.TZ)
					if err != nil {
						fmt.Println("time.LoadLocation: ", err)
						location = time.Local
					}

					a, _ := time.ParseInLocation(constants.DateTimeFormat, where.Glt, time.UTC)
					b, _ := time.ParseInLocation(constants.DateTimeFormat, where.Lt, time.UTC)

					diff := b.Sub(a)
					hrs := diff.Hours()
					v := int(hrs / 2)
					s := fmt.Sprintf("%dh", v)

					duration, _ := time.ParseDuration(s)

					recordAvg.Timestamp = a.Add(duration)
					recordAvg.TimestampString = recordAvg.Timestamp.In(location).Format(constants.DateTimeFormat)

				} else {
					if m.Debug {
						fmt.Println("Model.FindByMinute.FindByMinuteMinAndMaxByArray.Scan: ", err)
					}
				}
			}

			// MAX
			query = fmt.Sprintf("SELECT * FROM %s WHERE timestamp >= ? AND timestamp < ? ORDER BY value DESC LIMIT ?", table)

			rows, err = o.Query(query, where.Glt, where.Lt, num)
			if err != nil {
				if m.Debug {
					fmt.Println("Model.FindByMinute.FindByMinuteMinAndMaxByArray.Query: ", err)
				}
			}

			defer func(r *sql.Rows) {
				err := r.Close()
				if err != nil {
					if m.Debug {
						fmt.Println("Model.FindByMinute.FindByMinuteMinAndMaxByArray.Rows.Close: ", err)
					}
				}
			}(rows)

			for rows.Next() {
				fields := []interface{}{
					&recordMax.ID,
					&recordMax.value,
					&recordMax.timestamp,
				}

				err = rows.Scan(fields...)
				if err == nil {

					// filtro de Value
					if recordMax.value.Valid {
						recordMax.Value = recordMax.value.Float64
					}

					// filtro de Timestamp
					if recordMax.timestamp.Valid {
						recordMax.Timestamp = recordMax.timestamp.Time

						location, err := time.LoadLocation(constants.TZ)
						if err == nil {
							recordMax.TimestampString = recordMax.Timestamp.In(location).Format(constants.DateTimeFormat)
						}
					}

				} else {
					if m.Debug {
						fmt.Println("Model.FindByMinute.FindByMinuteMinAndMaxByArray.Scan: ", err)
					}
				}
			}

			if recordMin.Timestamp.Before(recordMax.Timestamp) {
				var insertAvg bool

				if recordMin.ID != 0 {
					if recordMin.Timestamp.Before(recordAvg.Timestamp) {
						recordsOut = append(recordsOut, recordMin)
					} else {
						recordsOut = append(recordsOut, recordAvg, recordMin)
						insertAvg = true
					}
				}

				if recordMax.ID != 0 {
					if !insertAvg {
						if recordMax.Timestamp.Before(recordAvg.Timestamp) {
							recordsOut = append(recordsOut, recordMax, recordAvg)
						} else {
							recordsOut = append(recordsOut, recordAvg, recordMax)
						}
					} else {
						recordsOut = append(recordsOut, recordMax)
					}
				}

			} else {
				var insertAvg bool

				if recordMax.ID != 0 {
					if recordMax.Timestamp.Before(recordAvg.Timestamp) {
						recordsOut = append(recordsOut, recordMax)
					} else {
						recordsOut = append(recordsOut, recordAvg, recordMax)
						insertAvg = true
					}
				}

				if recordMin.ID != 0 {
					if !insertAvg {
						if recordMin.Timestamp.Before(recordAvg.Timestamp) {
							recordsOut = append(recordsOut, recordMin, recordAvg)
						} else {
							recordsOut = append(recordsOut, recordAvg, recordMin)
						}
					} else {
						recordsOut = append(recordsOut, recordMin)
					}
				}
			}

			s := IndexRecord{
				Index:   index,
				Records: recordsOut,
			}

			results <- s
		}(i, db)
	}

	for res := range results {
		data[res.Index] = res.Records

		size := len(data)
		if size == nWheres {
			close(results)
		}
	}

	for j := 0; j < nWheres; j++ {
		rs := data[j]
		records = append(records, rs...)
	}

	return records, err
}

// FindByMinuteLast ...
func (m *Model) FindByMinuteLast(table string, num int) ([]Record, error) {
	records := []Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteLast.Open: ", err)
		}

		return records, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinuteLast.Close: ", err)
			}
		}
	}(db)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteLast.Open: ", err)
		}

		return records, err
	}

	var rows *sql.Rows

	query := fmt.Sprintf("SELECT * FROM %s ORDER BY timestamp DESC LIMIT ?;", table)

	rows, err = db.Query(query, num)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteLast.Query: ", err)
		}

		return records, err
	}

	for rows.Next() {
		recordOne := Record{}

		fields := []interface{}{
			&recordOne.ID,
			&recordOne.value,
			&recordOne.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {

			// filtro de Value
			if recordOne.value.Valid {
				recordOne.Value = recordOne.value.Float64
			}

			// filtro de Timestamp
			if recordOne.timestamp.Valid {
				recordOne.Timestamp = recordOne.timestamp.Time

				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					recordOne.TimestampString = recordOne.Timestamp.In(location).Format(constants.DateTimeFormat)
				}
			}

			records = append(records, recordOne)

		} else {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinuteLast.Scan: ", err)
			}
		}
	}

	return records, err
}

// FindByMinuteLastByTimestamp ...
func (m *Model) FindByMinuteLastByTimestamp(table string, num int, timestamp time.Time) ([]Record, error) {
	records := []Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteLast.Open: ", err)
		}

		return records, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinuteLast.Close: ", err)
			}
		}
	}(db)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteLast.Open: ", err)
		}

		return records, err
	}

	var rows *sql.Rows

	query := fmt.Sprintf("SELECT * FROM %s WHERE timestamp < ? ORDER BY timestamp DESC LIMIT ?;", table)

	rows, err = db.Query(query, timestamp, num)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteLast.Query: ", err)
		}

		return records, err
	}

	for rows.Next() {
		recordOne := Record{}

		fields := []interface{}{
			&recordOne.ID,
			&recordOne.value,
			&recordOne.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {

			// filtro de Value
			if recordOne.value.Valid {
				recordOne.Value = recordOne.value.Float64
			}

			// filtro de Timestamp
			if recordOne.timestamp.Valid {
				recordOne.Timestamp = recordOne.timestamp.Time

				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					recordOne.TimestampString = recordOne.Timestamp.In(location).Format(constants.DateTimeFormat)
				}
			}

			records = append(records, recordOne)

		} else {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinuteLast.Scan: ", err)
			}
		}
	}

	return records, err
}

// FindByMinuteOneByTimestamp ...
func (m *Model) FindByMinuteOneByTimestamp(table string, timestamp time.Time) ([]Record, error) {
	records := []Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteOneByTimestamp.Open: ", err)
		}

		return records, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinuteOneByTimestamp.Close: ", err)
			}
		}
	}(db)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteOneByTimestamp.Open: ", err)
		}

		return records, err
	}

	var rows *sql.Rows

	query := fmt.Sprintf("SELECT * FROM %s WHERE timestamp = ?;", table)

	rows, err = db.Query(query, timestamp)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteOneByTimestamp.Query: ", err)
		}

		return records, err
	}

	for rows.Next() {
		recordOne := Record{}

		fields := []interface{}{
			&recordOne.ID,
			&recordOne.value,
			&recordOne.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {

			// filtro de Value
			if recordOne.value.Valid {
				recordOne.Value = recordOne.value.Float64
			}

			// filtro de Timestamp
			if recordOne.timestamp.Valid {
				recordOne.Timestamp = recordOne.timestamp.Time

				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					recordOne.TimestampString = recordOne.Timestamp.In(location).Format(constants.DateTimeFormat)
				}
			}

			records = append(records, recordOne)

		} else {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinuteOneByTimestamp.Scan: ", err)
			}
		}
	}

	return records, err
}

// FindByMinuteLastByTimestamp ...
func (m *Model) FindByMinuteLastByTimestamp2(table string, num int, timestamp time.Time) ([]Record, error) {
	records := []Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteLast.Open: ", err)
		}

		return records, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinuteLast.Close: ", err)
			}
		}
	}(db)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteLast.Open: ", err)
		}

		return records, err
	}

	var rows *sql.Rows

	query := fmt.Sprintf("SELECT * FROM %s WHERE timestamp <= ? ORDER BY timestamp DESC LIMIT ?;", table)

	rows, err = db.Query(query, timestamp, num)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteLast.Query: ", err)
		}

		return records, err
	}

	for rows.Next() {
		recordOne := Record{}

		fields := []interface{}{
			&recordOne.ID,
			&recordOne.value,
			&recordOne.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {

			// filtro de Value
			if recordOne.value.Valid {
				recordOne.Value = recordOne.value.Float64
			}

			// filtro de Timestamp
			if recordOne.timestamp.Valid {
				recordOne.Timestamp = recordOne.timestamp.Time

				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					recordOne.TimestampString = recordOne.Timestamp.In(location).Format(constants.DateTimeFormat)
				}
			}

			records = append(records, recordOne)

		} else {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinuteLast.Scan: ", err)
			}
		}
	}

	return records, err
}

// FindByMinute ...
func (m *Model) FindByMinute(table, start, final string) ([]Record, error) {
	records := []Record{}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", m.UserDB, m.PwdDB, m.Host, m.Port, m.NameDB)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinuteByMinute.Open: ", err)
		}

		return records, err
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinute.Close: ", err)
			}
		}
	}(db)

	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinute.Open: ", err)
		}

		return records, err
	}

	var rows *sql.Rows
	dateFormat := "%Y-%m-%d %H:%i:00"

	// `SELECT
	// 	DATE_FORMAT(timestamp, '%s') AS n_timestamp,
	// 	AVG(value) AS n_value,
	// 	COUNT(value) AS number_rows
	// FROM %s
	// WHERE timestamp >= ? and timestamp < ?
	// GROUP BY n_timestamp;`,

	query := fmt.Sprintf(
		`SELECT
			DATE_FORMAT(timestamp, '%s') AS n_timestamp,
			AVG(value) AS n_value
		FROM %s
		WHERE timestamp >= ? and timestamp < ?
		GROUP BY n_timestamp;`,
		dateFormat,
		table,
	)

	rows, err = db.Query(query, start, final)
	if err != nil {
		if m.Debug {
			fmt.Println("Model.Record.FindByMinute.Query: ", err)
		}

		return records, err
	}

	for rows.Next() {
		record := Record{}

		fields := []interface{}{
			&record.timestamp,
			&record.value,
		}

		err = rows.Scan(fields...)
		if err == nil {

			// filtro de Value
			if record.value.Valid {
				record.Value = record.value.Float64
			}

			// filtro de Timestamp
			if record.timestamp.Valid {
				record.Timestamp = record.timestamp.Time

				location, err := time.LoadLocation(constants.TZ)
				if err == nil {
					record.TimestampString = record.Timestamp.In(location).Format(constants.DateTimeFormat)
				}
			}

			records = append(records, record)

		} else {
			if m.Debug {
				fmt.Println("Model.Record.FindByMinute.Scan: ", err)
			}
		}
	}

	return records, err
}
