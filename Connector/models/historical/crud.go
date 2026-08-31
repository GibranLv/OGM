package historical

import (
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"

	"github.com/JamsMendez/Connector/models"
)

// constants of Model
const (
	KeyHistoricalID = "historical_id"
	KeyGRDID        = "grd_id"
	KeyValue        = "value"
	KeyAddress      = "address"
	KeyTimeStamp    = "timestamp"
	KeyCreatedAt    = "created_at"
	KeyUpdatedAt    = "updated_at"
)

// Historical ...
type Historical struct {
	HistoricalID    int64     `json:"historical_id"`
	GRDID           string    `json:"grd_id"`
	Address         int       `json:"address"`
	Value           float32   `json:"value"`
	Timestamp       time.Time `json:"timestamp"`
	InsertTimestamp time.Time `json:"insert_timestamp"`
	timestamp       mysql.NullTime
	insertTimestamp mysql.NullTime
}

// Model ...
type Model struct {
}

// FindOneLast ...
func (m Model) FindOneLast(grdID int64, address int16) (Historical, error) {
	var msgErr error
	historical := Historical{}

	connStr := models.Config.DBUserGRDXF + ":" + models.Config.DBPwdGRDXF + "@tcp(" + models.Config.DBHostGRDXF + ":" + models.Config.DBPort + ")/" + models.Config.DBNameGRDXF
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Historical.FindOneLast.Open: ", err)

		msgErr = errors.New("ocurrió un error al obtener la información de los historicos del GRD")
		return historical, msgErr
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
						historial_id, grd_id, address, value, timestamp
						FROM historical
						WHERE grd_id = ? AND address = ?
						ORDER BY timestamp
						DESC
						LIMIT 1`

	params = append(params, grdID, address)

	//fmt.Println(query, params)

	rows, err = db.Query(query, params...)
	if err != nil {
		fmt.Println("Model.Historical.FindOneLast.Query: ", err)

		msgErr = errors.New("ocurrió un error al obtener la información de los historicos del GRD")
		return historical, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	historicals := []Historical{}

	for rows.Next() {
		var fields []interface{}

		h := Historical{}

		fields = []interface{}{
			&h.HistoricalID,
			&h.GRDID,
			&h.Address,
			&h.Value,
			&h.timestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			if h.timestamp.Valid {
				h.Timestamp = h.timestamp.Time
			}

			historicals = append(historicals, h)

		} else {
			fmt.Println("Model.Historical.FindOneLast.Scan: ", err)
		}
	}

	length := len(historicals)
	if length > 0 {
		historical = historicals[0]

		return historical, msgErr
	}

	return historical, msgErr
}

// FindLast ...
func (m Model) FindLast(grdID int64, address int16, ts time.Time) ([]Historical, error) {
	var msgErr error
	historicals := []Historical{}

	connStr := models.Config.DBUserGRDXF + ":" + models.Config.DBPwdGRDXF + "@tcp(" + models.Config.DBHostGRDXF + ":" + models.Config.DBPort + ")/" + models.Config.DBNameGRDXF
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		fmt.Println("Model.Historical.FindLast.Open: ", err)

		msgErr = errors.New("ocurrió un error al obtener la información de los historicos del GRD")
		return historicals, msgErr
	}

	defer func(r *sql.DB) {
		err := r.Close()
		if err != nil {
			fmt.Println("db.Error: ", err)
		}
	}(db)

	var params []interface{}
	var rows *sql.Rows

	// query := `SELECT
	// 					historial_id, grd_id, address, value, timestamp
	// 					FROM historical
	// 					WHERE grd_id = ? AND address = ? AND timestamp > ?
	// 					ORDER BY timestamp
	// 					ASC`

	query := `SELECT
						historial_id, grd_id, address, value, timestamp, insertion_time
						FROM historical
						WHERE grd_id = ? AND address = ? AND timestamp > ?
						ORDER BY insertion_time
						ASC`

	params = append(params, grdID, address, ts)

	//fmt.Println(query, params)

	rows, err = db.Query(query, params...)
	if err != nil {
		fmt.Println("Model.Historical.FindLast.Query: ", err)

		msgErr = errors.New("ocurrió un error al obtener la información de los historicos del GRD")
		return historicals, msgErr
	}

	defer func(r *sql.Rows) {
		err := r.Close()
		if err != nil {
			fmt.Println("rows.Error: ", err)
		}
	}(rows)

	for rows.Next() {
		var fields []interface{}

		h := Historical{}

		fields = []interface{}{
			&h.HistoricalID,
			&h.GRDID,
			&h.Address,
			&h.Value,
			&h.timestamp,
			&h.insertTimestamp,
		}

		err = rows.Scan(fields...)
		if err == nil {
			if h.timestamp.Valid {
				h.Timestamp = h.timestamp.Time
			}

			if h.insertTimestamp.Valid {
				h.InsertTimestamp = h.insertTimestamp.Time
			}

			historicals = append(historicals, h)

		} else {
			fmt.Println("Model.Historical.FindLast.Scan: ", err)
		}
	}

	return historicals, msgErr
}
