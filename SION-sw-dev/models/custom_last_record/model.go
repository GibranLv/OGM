package customlastrecord

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// Constants ...
const (
	KeyID         = "id"
	KeyVariableID = "variable_id"
	KeyValue      = "value"
	KeyTimestamp  = "timestamp"
)

// CustomLastRecord ...
type CustomLastRecord struct {
	ID         int64     `json:"id"`
	VariableID int64     `json:"variable_id"`
	Value      float64   `json:"value"`
	Timestamp  time.Time `json:"timestamp"`
	timestamp  mysql.NullTime
}

// Model ...
type Model struct {
	UserDB string
	PwdDB  string
	NameDB string
	Host   string
	Port   string
	Debug  bool
}
