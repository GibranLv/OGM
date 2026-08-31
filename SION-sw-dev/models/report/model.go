package report

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID            = "id"
	KeyName          = "name"
	KeyTemplate      = "template"
	KeyStructureJSON = "structure_json"
	KeyCreatedAt     = "created_at"
	KeyUpdatedAt     = "updated_at"
)

// Report ...
type Report struct {
	ID            int64     `json:"id"`
	Name          string    `json:"name"`
	Template      string    `json:"template"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	structureJSON sql.NullString
	createdAt     mysql.NullTime
	updatedAt     mysql.NullTime

	UserID    int64 `json:"-"`
	IsCreator bool  `json:"-"`

	StructureJSON []StructJSON `json:"structure_json,omitempty"`
	Structure     []Struct     `json:"structure,omitempty"`
}

// StructJSON ... StructJSON item in JSON
type StructJSON struct {
	GroupID   int64          `json:"group_id"`
	Cell      string         `json:"cell"`
	Variables []VariableJSON `json:"variables,omitempty"`
	Sons      []StructJSON   `json:"sons,omitempty"`
	Page      int            `json:"page"`
}

// VariableJSON ... Structure variable in JSON
type VariableJSON struct {
	ID       int64  `json:"id"`
	Name     string `json:"name,omitempty"`
	IsCustom bool   `json:"is_custom"`
	UnitID   int64  `json:"unit_id,omitempty"`
	Cell     string `json:"cell"`
	Page     int    `json:"page"`
}

// Struct ... Structure item in JSON
type Struct struct {
	ID        int64      `json:"id"`
	Name      string     `json:"name"`
	Type      string     `json:"type"`
	Cell      string     `json:"cell,omitempty"`
	Variables []Variable `json:"variables,omitempty"`
	Sons      []Struct   `json:"sons,omitempty"`
	Page      int        `json:"page"`
}

// Variable ...
type Variable struct {
	ID       int64  `json:"id"`
	Name     string `json:"name"`
	Alias    string `json:"alias,omitempty"`
	Device   string `json:"device,omitempty"`
	Unit     string `json:"unit"`
	IsCustom bool   `json:"is_custom"`

	UnitID     int64  `json:"unit_id,omitempty"`
	Display    string `json:"display,omitempty"`
	Expression string `json:"expression,omitempty"`

	Rename string `json:"rename,omitempty"`
	Cell   string `json:"cell,omitempty"`
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
