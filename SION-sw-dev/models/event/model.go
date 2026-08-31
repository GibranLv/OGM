package event

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// Claves de la tabla
const (
	KeyID          = "id"
	KeyType        = "type"
	KeyDescription = "description"
	KeyCreatedAt   = "created_at"
	KeyUpdatedAt   = "updated_at"
	KeyUserID      = "user_id"
)

// Valores de tipos de eventos
const ()

// Event ... Operación
type Event struct {
	ID          int64     `json:"id"`
	Type        uint8     `json:"type"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	UserID       int64  `json:"user_id,omitempty"`
	User         string `json:"user,omitempty"`
	CreatedAtIn  string `json:"created_at_in,omitempty"`
	CreatedAtOut string `json:"created_at_out,omitempty"`

	id          sql.NullInt64
	typeIn      sql.NullInt64
	userID      sql.NullInt64
	description sql.NullString
	user        sql.NullString
	createdAt   mysql.NullTime
	updatedAt   mysql.NullTime
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
