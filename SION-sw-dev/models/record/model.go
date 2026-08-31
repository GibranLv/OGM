package record

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID        = "id"
	KeyValue     = "value"
	KeyTimestamp = "timestamp"

	recordTableSQL = `
	CREATE TABLE IF NOT EXISTS %s.%s (
  	id INT NOT NULL AUTO_INCREMENT,
  	value DECIMAL(10,4) NOT NULL,
  	timestamp DATETIME NOT NULL,
  	PRIMARY KEY (id),
		INDEX timestamp_index (timestamp)
	)
	ENGINE = InnoDB;
	`
)

// Record ...
type Record struct {
	ID              int64     `json:"id"`
	Value           float64   `json:"value"`
	Timestamp       time.Time `json:"timestamp"`
	TimestampString string    `json:"ts,omitempty"`

	value     sql.NullFloat64
	timestamp mysql.NullTime
}

// LiteRecord ...
type LiteRecord struct {
	ID              int64     `json:"id"`
	Value           float64   `json:"v"`
	Timestamp       time.Time `json:"t"`
	TimestampString string    `json:"ts,omitempty"`

	value     sql.NullFloat64
	timestamp mysql.NullTime
}

// AVG ...
type AVG struct {
	Value           float64   `json:"avg"`
	TimestampString string    `json:"hr"`
	Timestamp       time.Time `json:"-"`

	value sql.NullFloat64
}

// SUM ...
type SUM struct {
	Value           float64   `json:"avg"`
	TimestampString string    `json:"hr"`
	Timestamp       time.Time `json:"-"`

	value sql.NullFloat64
}

// Where ....
type Where struct {
	Glt string
	Lt  string
}

// IndexRecord ...
type IndexRecord struct {
	Index   int
	Records []Record
}

// Model ...
type Model struct {
	UserDB string
	PwdDB  string
	NameDB string
	Host   string
	Port   string
	Debug  bool

	DB *sql.DB
}
