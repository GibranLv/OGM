package variableactivealarm

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID         = "id"
	KeyVariableID = "variable_id"
	KeyAlarmID    = "alarm_id"
	KeyIsCustom   = "is_custom"
	KeyCreatedAt  = "created_at"
)

// VariableActiveAlarm ...
type VariableActiveAlarm struct {
	ID         int64     `json:"id"`
	VariableID int64     `json:"variable_id"`
	AlarmID    int64     `json:"alarm_id"`
	IsCustom   bool      `json:"is_custom"`
	CreatedAt  time.Time `json:"created_at"`

	createdAt mysql.NullTime
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
