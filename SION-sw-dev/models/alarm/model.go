package alarm

import (
	"database/sql"
)

// constants of Model
const (
	KeyID            = "id"
	KeyUnitID        = "unit_id"
	KeyName          = "name"
	KeyAlias         = "alias"
	KeyColor         = "color"
	KeyExpression    = "expression"
	KeyMessage       = "message"
	KeySetpoint      = "setpoint"
	KeyTimeout       = "timeout"
	KeyIsTimeout     = "is_timeout"
	KeyPriorityLevel = "priority_level"
	KeySound         = "sound"
	KeyStatus        = "status"
)

// Alarm ...
type Alarm struct {
	ID            int64   `json:"id"`
	UnitID        int64   `json:"unit_id"`
	Name          string  `json:"name"`
	Alias         string  `json:"alias"`
	Color         string  `json:"color"`
	Expression    string  `json:"expression"`
	Message       string  `json:"message"`
	Setpoint      float64 `json:"setpoint"`
	Timeout       int     `json:"timeout"`
	IsTimeout     bool    `json:"is_timeout"`
	PriorityLevel int16   `json:"priority_level"`
	Sound         int8    `json:"sound,omitempty"`
	Status        bool    `json:"status"`

	SendEmail bool `json:"send_email"`
	SendSMS   bool `json:"send_sms"`

	UserID    int64 `json:"-"`
	IsCreator bool  `json:"-"`

	UnitName       string `json:"-"`
	UnitExpression string `json:"-"`
	UnitDisplay    string `json:"-"`

	unitID         sql.NullInt64
	unitName       sql.NullString
	unitExpression sql.NullString
	unitDisplay    sql.NullString
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
