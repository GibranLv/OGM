package profile

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID        = "id"
	KeyUserID    = "user_id"
	KeyAvatar    = "avatar"
	KeyCompany   = "company"
	KeyJob       = "job"
	KeyPhone     = "phone"
	KeyCreatedAt = "created_at"
	KeyUpdatedAt = "updated_at"
)

// Profile ...
type Profile struct {
	ID        int64     `json:"id"`
	UserID    int64     `json:"user_id"`
	Avatar    string    `json:"avatar"`
	Company   string    `json:"company"`
	Job       string    `json:"job"`
	Phone     string    `json:"phone"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`

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
