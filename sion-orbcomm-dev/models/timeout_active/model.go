package timeoutactive

import (
	"database/sql"
	"time"
)

// constants of Model
const (
	KeyID         = "id"
	KeyVariableID = "variable_id"
	KeyIsCustom   = "is_custom"
	KeyActive     = "active"
	KeyTimestamp  = "timestamp"
)

// TimeoutActive ...
type TimeoutActive struct {
	ID         int64     `json:"id"`
	VariableID int64     `json:"variable_id"`
	IsCustom   bool      `json:"is_custom"`
	Active     bool      `json:"active"`
	Timestamp  time.Time `json:"timestamp"`

	timestamp sql.NullTime
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
