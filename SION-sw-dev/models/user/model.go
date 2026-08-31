package user

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID        = "id"
	KeyUsername  = "username"
	KeyPassword  = "password"
	KeyPwd       = "pwd"
	KeyEmail     = "email"
	KeyName      = "name"
	KeyRole      = "role"
	KeyValue     = "value"
	KeyCreatedAt = "created_at"
	KeyUpdatedAt = "updated_at"
)

// User ...
type User struct {
	ID        int64     `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
	Role      string    `json:"role"`
	Value     uint8     `json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	Password string `json:"password,omitempty"`
	Pwd      string `json:"pwd,omitempty"`

	Avatar  string `json:"avatar,omitempty"`
	Company string `json:"company,omitempty"`
	Job     string `json:"job,omitempty"`
	Phone   string `json:"phone,omitempty"`

	password  string
	avatar    sql.NullString
	company   sql.NullString
	job       sql.NullString
	phone     sql.NullString
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
