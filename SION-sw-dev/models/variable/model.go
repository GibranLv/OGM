package variable

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID               = "id"
	KeyName             = "name"
	KeyAlias            = "alias"
	KeyDevice           = "device"
	KeyReadingUnit      = "reading_unit"
	KeyExpressionInsert = "expression_insert"
	KeyStatus           = "status"
	KeyCreatedAt        = "created_at"
	KeyUpdatedAt        = "updated_at"
)

// Variable ...
type Variable struct {
	ID               int64     `json:"id"`
	Name             string    `json:"name"`
	Alias            string    `json:"alias,omitempty"`
	Device           string    `json:"device,omitempty"`
	ReadingUnit      string    `json:"reading_unit,omiempty"`
	ExpressionInsert string    `json:"expression_insert,omitempty"`
	Status           bool      `json:"status,omitempty"`
	CreatedAt        time.Time `json:"created_at,omitempty"`
	UpdatedAt        time.Time `json:"updated_at,omitempty"`
	createdAt        mysql.NullTime
	updatedAt        mysql.NullTime

	UserVariableAlarmID int64 `json:"-"`
	UserVariableID      int64 `json:"-"`

	Comment   string  `json:"comment,omitempty"`
	Value     float64 `json:"value"`
	Timestamp string  `json:"timestamp,omitempty"`

	value     sql.NullFloat64
	timestamp mysql.NullTime
}

// Alarm ...
type Alarm struct {
	AlarmID       int64   `json:"alarm_id,omitempty"`
	Name          string  `json:"name,omitempty"`
	Alias         string  `json:"alias,omitempty"`
	Color         string  `json:"color,omitempty"`
	Setpoint      float64 `json:"setpoint,omitempty"`
	Sound         int64   `json:"sound,omitempty"`
	IsTimeout     bool    `json:"is_timeout,omitempty"`
	PriorityLevel int64   `json:"priority_level,omitempty"`
	VariableID    int64   `json:"variable_id"`
	IsCustom      bool    `json:"is_custom"`

	alarmID       sql.NullInt64
	name          sql.NullString
	alias         sql.NullString
	color         sql.NullString
	setpoint      sql.NullFloat64
	sound         sql.NullInt64
	isTimeout     sql.NullBool
	priorityLevel sql.NullInt64
	variableID    sql.NullInt64
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
