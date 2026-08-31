package gpsrecord

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID        = "id"
	KeyLatitude  = "latitude"
	KeyLongitude = "longitude"
	KeySpeed     = "speed"
	KeyTimestamp = "timestamp"
	KeyValue     = "value"

	recordTableSQL = `
	CREATE TABLE IF NOT EXISTS %s.%s (
  	id INT NOT NULL AUTO_INCREMENT,
  	latitude DECIMAL(10,8) NOT NULL,
  	longitude DECIMAL(11,8) NOT NULL,
		speed DECIMAL(10,4) NOT NULL,
  	timestamp DATETIME NOT NULL,
		value INT NULL,
  	PRIMARY KEY (id),
		INDEX timestamp_index (timestamp)
	)
	ENGINE = InnoDB;
	`
)

// constants of reports
const (
	ModeSpeedGtZero = 1
	ModeSpeedZero   = 2
)

// Record ...
type Record struct {
	ID        int64     `json:"id"`
	Latitude  float64   `json:"latitude"`
	Longitude float64   `json:"longitude"`
	Speed     float64   `json:"speed"`
	Timestamp time.Time `json:"timestamp"`
	Value     int64     `json:"value"`

	TimestampString string `json:"ts"`

	value     sql.NullInt64
	timestamp mysql.NullTime
}

// Where ....
type Where struct {
	Glt string
	Lt  string
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
