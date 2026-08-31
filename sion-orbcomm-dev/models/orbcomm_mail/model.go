package orbcommmail

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// Constants ...
const (
	KeyID        = "id"
	KeyOrbcommID = "orbcomm_id"
	KeyMail      = "mail"
	KeyTimestamp = "timestamp"
)

// OrbcommMail ...
type OrbcommMail struct {
	ID        int64     `json:"id"`
	OrbcommID int64     `json:"orbcomm_id"`
	Mail      bool      `json:"mail"`
	Timestamp time.Time `json:"timestamp"`

	timestamp mysql.NullTime
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
