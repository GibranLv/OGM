package comment

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID             = "id"
	KeyUserVariableID = "user_variable_id"
	KeyComment        = "comment"
	KeyCreatedAt      = "created_at"
)

// Comment ...
type Comment struct {
	ID             int64     `json:"id"`
	UserVariableID string    `json:"user_variable_id"`
	Comment        string    `json:"comment"`
	CreatedAt      time.Time `json:"created_at,omitempty"`
	createdAt      mysql.NullTime
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
