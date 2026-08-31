package chart

import (
	"database/sql"
)

// Claves de la tabla
const (
	KeyID         = "id"
	KeyUserID     = "user_id"
	KeyVariableID = "variable_id"
	KeyIsCustom   = "is_custom"
	KeyName       = "name"
	KeyUnitID     = "unit_id"
	KeyColor      = "color"
)

// Chart ... Estructura de una Variable para la Grafica
type Chart struct {
	ID         int64  `json:"id"`
	UserID     int64  `json:"user_id"`
	VariableID int64  `json:"variable_id"`
	IsCustom   bool   `json:"is_custom,omitempty"`
	Name       string `json:"name,omitempty"`
	UnitID     int64  `json:"unit_id,omitempty"`
	Color      string `json:"color,omitempty"`

	unitID sql.NullInt64
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
