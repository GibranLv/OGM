package comment

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID          = "id"
	KeyUserGroupID = "user_group_id"
	KeyComment     = "comment"
	KeyCreatedAt   = "created_at"
)

// Comment ...
type Comment struct {
	ID          int64     `json:"id"`
	UserGroupID string    `json:"user_group_id"`
	Comment     string    `json:"comment"`
	CreatedAt   time.Time `json:"created_at,omitempty"`
	createdAt   mysql.NullTime

	Users []int64 `json:"users,omitempty"`
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
