package matrix

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID            = "id"
	KeyName          = "name"
	KeyStructureJSON = "structure_json"
	KeyCreatedAt     = "created_at"
	KeyUpdatedAt     = "updated_at"
)

// Matrix ...
type Matrix struct {
	ID            int64        `json:"id"`
	Name          string       `json:"name"`
	CreatedAt     time.Time    `json:"created_at"`
	UpdatedAt     time.Time    `json:"updated_at"`
	StructureJSON []StructJSON `json:"structure_json,omitempty"`
	Structure     []Struct     `json:"structure,omitempty"`

	UserID    int64 `json:"-"`
	IsCreator bool  `json:"-"`

	ActiveVariables []ActiveVariable `json:"active_vars,omitempty"`

	structureJSON sql.NullString
	createdAt     mysql.NullTime
	updatedAt     mysql.NullTime
}

// StructJSON ... StructJSON item in JSON
type StructJSON struct {
	GroupID   int64          `json:"group_id"`
	Variables []VariableJSON `json:"variables,omitempty"`
	Sons      []StructJSON   `json:"sons,omitempty"`
}

// VariableJSON ... Structure variable in JSON
type VariableJSON struct {
	ID       int64  `json:"id"`
	Name     string `json:"name,omitempty"`
	IsCustom bool   `json:"is_custom"`
	UnitID   int64  `json:"unit_id,omitempty"`
}

// Struct ... Structure item in JSON
type Struct struct {
	ID         int64      `json:"id"`
	Name       string     `json:"name"`
	Type       string     `json:"type"`
	Latitude   float64    `json:"latitude"`
	Longitude  float64    `json:"longitude"`
	MarkerIcon string     `json:"marker_icon"`
	Comment    string     `json:"comment,omitempty"`
	Variables  []Variable `json:"variables,omitempty"`
	Sons       []Struct   `json:"sons,omitempty"`
}

// Variable ...
type Variable struct {
	ID       int64  `json:"id"`
	Name     string `json:"name"`
	Alias    string `json:"alias,omitempty"`
	Device   string `json:"device,omitempty"`
	Unit     string `json:"unit,omitempty"`
	IsCustom bool   `json:"is_custom"`

	UnitID     int64  `json:"unit_id,omitempty"`
	Display    string `json:"display,omitempty"`
	Expression string `json:"expression,omitempty"`

	Rename  string `json:"rename,omitempty"`
	Comment string `json:"comment,omitempty"`

	IsNA bool `json:"is_na,omitempty"`

	Alarms []Alarm `json:"alarms,omitempty"`
}

// Alarm ...
type Alarm struct {
	ID       int64   `json:"id,omitempty"`
	Name     string  `json:"name,omitempty"`
	Alias    string  `json:"alias,omitempty"`
	Color    string  `json:"color,omitempty"`
	Setpoint float64 `json:"setpoint,omitempty"`
	Status   bool    `json:"status,omitempty"`
}

// ActiveVariable ...
type ActiveVariable struct {
	ID            int64 `json:"id"`
	IsCustom      bool  `json:"is_custom"`
	Sound         int8  `json:"sound"`
	PrioriryLevel uint8 `json:"priority_level"`
	Mute          bool  `json:"mute"`
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
