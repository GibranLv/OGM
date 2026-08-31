package recordsrequest

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID        = "id"
	KeyJSON      = "json"
	KeyCreatedAt = "created_at"
)

// RecordsRequest ...
type RecordsRequest struct {
	ID        int64     `json:"id"`
	JSON      string    `json:"json"`
	CreatedAt time.Time `json:"created_at"`

	createdAt mysql.NullTime
	json      sql.NullString
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
