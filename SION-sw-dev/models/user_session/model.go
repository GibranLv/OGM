package usersession

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID               = "id"
	KeyUserID           = "user_id"
	KeyAccessTokenHash  = "access_token_hash"
	KeyRefreshTokenHash = "refresh_token_hash"
	KeyValue            = "value"
	KeyCreatedAt        = "created_at"
	KeyUpdatedAt        = "updated_at"
)

// constants to user_sessions.value
const (
	SessionUsername = 1
)

// UserSession ...
type UserSession struct {
	ID               int64     `json:"id"`
	UserID           int64     `json:"user_id"`
	AccessTokenHash  string    `json:"access_token_hash"`
	RefreshTokenHash string    `json:"refresh_token_hash"`
	Value            int32     `json:"value"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
	createdAt        mysql.NullTime
	updatedAt        mysql.NullTime
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
