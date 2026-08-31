package gpsdevice

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID          = "id"
	KeyIMEI        = "imei"
	KeyPhoneNumber = "phone_number"
	KeyLatitude    = "latitude"
	KeyLongitude   = "longitude"
	KeySpeed       = "speed"
	KeyStatus      = "status"
	KeyCreatedAt   = "created_at"
	KeyUpdatedAt   = "updated_at"
)

// GPSDevice ...
type GPSDevice struct {
	ID          int64     `json:"id"`
	IMEI        string    `json:"imei"`
	PhoneNumber string    `json:"phone_number"`
	Latitude    float64   `json:"latitude"`
	Longitude   float64   `json:"longitude"`
	Speed       float64   `json:"speed"`
	Status      bool      `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

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
