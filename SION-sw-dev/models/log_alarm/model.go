package logalarm

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// Claves de la tabla
const (
	KeyID             = "id"
	KeyUserID         = "user_id"
	KeyAlarmID        = "alarm_id"
	KeyVariableID     = "variable_id"
	KeyIsCustom       = "is_custom"
	KeyVariableName   = "variable_name"
	KeyVariableDevice = "variable_device"
	KeyValue          = "value"
	KeyIsTimeout      = "is_timeout"
	KeyMessage        = "message"
	KeyComment        = "comment"
	KeyColor          = "color"
	KeyChecked        = "checked"
	KeyUpdatedAt      = "updated_at"
	KeyCreatedAt      = "created_at"
)

// LogAlarm ... Estructura de log de alarmas
type LogAlarm struct {
	ID             int64     `json:"id"`
	UserID         int64     `json:"user_id"`
	AlarmID        int64     `json:"alarm_id"`
	VariableID     int64     `json:"variable_id"`
	IsCustom       bool      `json:"is_custom"`
	VariableName   string    `json:"variable_name"`
	VariableDevice string    `json:"variable_device"`
	Value          float64   `json:"value"`
	IsTimeout      bool      `json:"is_timeout"`
	Message        string    `json:"message"`
	Comment        string    `json:"comment"`
	Color          string    `json:"color"`
	Checked        bool      `json:"checked"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`

	Alias string `json:"alias"`

	CreatedAtIn string `json:"created_at_in"`
	UpdatedAtIn string `json:"updated_at_in"`

	CreatedAtOut string `json:"created_at_out"`
	UpdatedAtOut string `json:"updated_at_out"`

	color     sql.NullString
	alias     sql.NullString
	userID    sql.NullInt64
	createdAt mysql.NullTime
	updatedAt mysql.NullTime
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
