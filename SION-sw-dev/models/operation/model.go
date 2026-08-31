package operation

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// Claves de la tabla
const (
	KeyID          = "id"
	KeyUserID      = "user_id"
	KeyMatrixID    = "matrix_id"
	KeyGroupID     = "group_id"
	KeyTitle       = "title"
	KeyDescription = "description"
	KeyCreatedAt   = "created_at"
	KeyUpdatedAt   = "updated_at"
)

// Operation ... Operación
type Operation struct {
	ID          int64     `json:"id"`
	UserID      int64     `json:"user_id"`
	MatrixID    int64     `json:"matrix_id"`
	GroupID     int64     `json:"group_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	User         string `json:"user,omitempty"`
	Matrix       string `json:"matrix,omitempty"`
	Group        string `json:"group,omitempty"`
	CreatedAtIn  string `json:"created_at_in,omitempty"`
	CreatedAtOut string `json:"created_at_out,omitempty"`

	createdAt mysql.NullTime
	updatedAt mysql.NullTime
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
