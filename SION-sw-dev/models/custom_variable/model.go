package customvariable

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID            = "id"
	KeyName          = "name"
	KeyDevice        = "device"
	KeyVariablesJSON = "variables_json"
	KeyExpression    = "expression"
	KeyUnit          = "unit"
	KeyStatus        = "status"
	KeyCreatedAt     = "created_at"
	KeyUpdatedAt     = "updated_at"
)

// CustomVariable ...
type CustomVariable struct {
	ID            int64     `json:"id"`
	Name          string    `json:"name"`
	Device        string    `json:"device"`
	VariablesJSON []int64   `json:"variables_json,omitempty"`
	Expression    string    `json:"expression"`
	Unit          string    `json:"unit"`
	Status        bool      `json:"status"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`

	UserID    int64 `json:"-"`
	IsCreator bool  `json:"-"`

	UserCustomVariableAlarmID int64 `json:"-"`
	UserCustomVariableID      int64 `json:"-"`

	Variables []interface{} `json:"variables,omitempty"`

	Comment   string  `json:"comment,omitempty"`
	Value     float64 `json:"value"`
	Timestamp string  `json:"timestamp,omitempty"`

	variablesJSON sql.NullString
	value         sql.NullFloat64
	timestamp     mysql.NullTime
	createdAt     mysql.NullTime
	updatedAt     mysql.NullTime
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
