package variablealarmevent

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID         = "id"
	KeyAlarmID    = "alarm_id"
	KeyRecordID   = "record_id"
	KeyVariableID = "variable_id"
	KeyIsCustom   = "is_custom"
	KeyName       = "name"
	KeyMessage    = "message"
	KeyCreatedAt  = "created_at"
)

// VariableAlarmEvent ...
type VariableAlarmEvent struct {
	ID         int64     `json:"id"`
	AlarmID    int64     `json:"alarm_id"`
	RecordID   int64     `json:"record_id,omitempty"`
	VariableID int64     `json:"variable_id"`
	IsCustom   bool      `json:"is_custom"`
	Name       string    `json:"name"`
	Message    string    `json:"message"`
	CreatedAt  time.Time `json:"created_at"`

	createdAt mysql.NullTime
	recordID  sql.NullInt64
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
