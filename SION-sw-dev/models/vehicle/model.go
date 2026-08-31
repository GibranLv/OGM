package vehicle

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// constants of Model
const (
	KeyID            = "id"
	KeyGPSDeviceID   = "gps_device_id"
	KeyAlias         = "alias"
	KeyLicensePlates = "license_plates"
	KeyDescription   = "description"
	KeyResponsible   = "responsible"
	KeyNote          = "note"
	KeyStatus        = "status"
	KeyCreatedAt     = "created_at"
	KeyUpdatedAt     = "updated_at"
)

// Vehicle ...
type Vehicle struct {
	ID            int64     `json:"id"`
	GPSDeviceID   int64     `json:"gps_device_id"`
	Alias         string    `json:"alias"`
	LicensePlates string    `json:"license_plates"`
	Description   string    `json:"description"`
	Responsible   string    `json:"responsible"`
	Note          string    `json:"note"`
	Status        bool      `json:"status"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`

	GPSDevice string `json:"gps_device"`

	Visible   bool    `json:"visible,omitempty"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Speed     float64 `json:"speed"`
	Timestamp string  `json:"timestamp"`

	gpsDeviceID sql.NullInt64
	gpsDevice   sql.NullString
	visible     sql.NullBool
	createdAt   mysql.NullTime
	updatedAt   mysql.NullTime

	latitude  sql.NullFloat64
	longitude sql.NullFloat64
	speed     sql.NullFloat64
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
