package record

import (
	"time"
)

// constants of Model
const (
	KeyID        = "id"
	KeyValue     = "value"
	KeyTimestamp = "timestamp"
)

// Record ...
type Record struct {
	ID              int64     `json:"id" bson:"_id"`
	Value           float64   `json:"value" bson:"value"`
	Timestamp       time.Time `json:"timestamp" bson:"timestamp"`
	TimestampString string    `json:"ts"`
}

// AVG ...
type AVG struct {
	Value           float64 `json:"avg"`
	TimestampString string  `json:"hr"`
}

// Where ....
type Where struct {
	Glt time.Time
	Lt  time.Time
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
