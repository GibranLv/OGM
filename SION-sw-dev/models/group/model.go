package group

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID         = "id"
	KeyName       = "name"
	KeyType       = "type"
	KeyLatitude   = "latitude"
	KeyLongitude  = "longitude"
	KeyMarkerIcon = "marker_icon"
	KeyCreatedAt  = "created_at"
	KeyUpdatedAt  = "updated_at"
)

// Group ...
type Group struct {
	ID         int64     `json:"id"`
	Name       string    `json:"name"`
	Type       string    `json:"type"`
	Latitude   float64   `json:"latitude"`
	Longitude  float64   `json:"longitude"`
	MarkerIcon string    `json:"marker_icon"`
	CreatedAt  time.Time `json:"created_at,omitempty"`
	UpdatedAt  time.Time `json:"updated_at,omitempty"`
	Comment    string    `json:"comment,omitempty"`

	UserID    int64 `json:"-"`
	IsCreator bool  `json:"-"`

	comment   sql.NullString
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
