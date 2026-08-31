package dynamometercardvariable

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// Claves de la tabla
const (
	KeyID                = "id"
	KeyDynamometerCardID = "dynamometer_card_id"
	KeyVariableID        = "variable_id"
	KeyCreatedAt         = "created_at"
	KeyUpdatedAt         = "updated_at"
)

// DynamometerCardVariable ... Variable relacionada con una carta dinamometrica
type DynamometerCardVariable struct {
	ID                int64     `json:"id"`
	DynamometerCardID int64     `json:"dynamometer_card_id"`
	KeyVariableID     int64     `json:"variable_id"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`

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
