package orbcomm

import (
	"database/sql"
)

// Claves de la tabla
const (
	KeyID          = "id"
	KeyMobileID    = "mobile_id"
	KeyNextStartID = "next_start_id"
	KeyModbus      = "modbus"
	KeyStatus      = "status"

	KeyVariableID = "variable_id"
	KeyName       = "name"
	KeyTimestamp  = "timestamp"
	KeyIsTimeout  = "is_timeout"
	KeyParameter  = "parameter"
)

// Orbcomm ... Estructura de un Orbcomm
type Orbcomm struct {
	ID          int64  `json:"id"`
	MobileID    string `json:"mobile_id"`
	NextStartID int64  `json:"next_start_id"`
	Modbus      string `json:"modbus"`
	Status      bool   `json:"status"`
}

// LogVariable ... Estructura de un LogVariable
type LogVariable struct {
	ID         int64  `json:"id"`
	VariableID int64  `json:"variable_id"`
	Name       string `json:"name"`
	Timestamp  string `json:"timestamp"`
	IsTimeout  bool   `json:"is_timeout"`
	Parameter  string `json:"parameter"`
	MobileID   string `json:"mobile_id"`

	mobileID  sql.NullString
	parameter sql.NullString
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
