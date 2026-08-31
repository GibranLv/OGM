package dynamometercard

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// Claves de la tabla
const (
	KeyID        = "id"
	InitialDate  = "initial_date"
	FinalDate    = "final_date"
	KeyCreatedAt = "created_at"
	KeyUpdatedAt = "updated_at"
)

// DynamometerCard ... Carta dinamometrica
type DynamometerCard struct {
	ID          int64     `json:"id"`
	InitialDate time.Time `json:"initial_date"`
	FinalDate   time.Time `json:"final_date"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	initialDate mysql.NullTime
	finalDate   mysql.NullTime
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
