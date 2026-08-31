package log

import (
	"database/sql"
	"time"
)

// Constants ...
const (
	KeyID         = "id"
	KeyVariableID = "variable_id"
	KeyName       = "name"
	KeyTS         = "ts"
	KeyTimestamp  = "timestamp"
	KeyIsTimeout  = "is_timeout"
)

// Log ...
type Log struct {
	ID         int64     `json:"id"`
	VariableID int64     `json:"variable_id"`
	Name       string    `json:"name"`
	TS         string    `json:"ts"`
	Timestamp  time.Time `json:"timestamp"`
	IsTimeout  bool      `json:"is_timeout"`
	timestamp  sql.NullTime
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
