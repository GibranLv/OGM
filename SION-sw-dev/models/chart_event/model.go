package chartevent

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// Claves de la tabla
const (
	KeyID          = "id"
	KeyUserID      = "user_id"
	KeyRecordID    = "record_id"
	KeyVariableID  = "variable_id"
	KeyIsCustom    = "is_custom"
	KeyName        = "name"
	KeyDescription = "description"
	KeyFiles       = "files"
	KeyCreatedAt   = "created_at"
	KeyUpdatedAt   = "updated_at"
)

// ChartEvent ... Estructura de un Event de punto en una Grafica.
type ChartEvent struct {
	ID          int64     `json:"id"`
	UserID      int64     `json:"user_id"`
	RecordID    int64     `json:"record_id"`
	VariableID  int64     `json:"variable_id"`
	IsCustom    bool      `json:"is_custom,omitempty"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Files       []File    `json:"files"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	CreatedAtIn string `json:"created_at_in,omitempty"`

	CreatedAtOut string `json:"created_at_out,omitempty"`
	UpdatedAtOut string `json:"updated_at_out,omitempty"`

	UserName       string `json:"user_name,omitempty"`
	VariableName   string `json:"variable_name,omitempty"`
	VariableDevice string `json:"variable_device,omitempty"`

	userName       sql.NullString
	variableName   sql.NullString
	variableDevice sql.NullString
	files          sql.NullString
	createdAt      mysql.NullTime
	updatedAt      mysql.NullTime
}

// File ... Estructura de un archivo de un evento
type File struct {
	Alias string `json:"alias"`
	Name  string `json:"name"`
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
