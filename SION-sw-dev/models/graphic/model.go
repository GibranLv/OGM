package graphic

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// Claves de la tabla
const (
	KeyID         = "id"
	KeyUserID     = "user_id"
	KeyMatrixID   = "matrix_id"
	KeyGroupID    = "group_id"
	KeyJSON       = "json"
	KeyBackground = "background"
	KeyCreatedAt  = "created_at"
	KeyUpdatedAt  = "updated_at"
)

// Graphic ... Operación
type Graphic struct {
	ID         int64     `json:"id"`
	UserID     int64     `json:"user_id"`
	MatrixID   int64     `json:"matrix_id"`
	GroupID    int64     `json:"group_id"`
	JSON       string    `json:"-"`
	Background string    `json:"background"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`

	Variables []V `json:"variables"`

	createdAt mysql.NullTime
	updatedAt mysql.NullTime
}

// V ... Elemento de Variables
type V struct {
	VariableID int64   `json:"variable_id"`
	IsCustom   bool    `json:"is_custom"`
	X          float64 `json:"x"`
	Y          float64 `json:"y"`
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
