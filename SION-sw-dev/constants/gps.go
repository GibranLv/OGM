package constants

import "time"

// Constantes de paquetes
const (
	Comma = ","

	SOSInSecond = 10

	PanicButton = 1

	IMEIIndex  = 1
	LatIndex   = 4
	LngIndex   = 5
	SpeedIndex = 10
)

// Geolocation ...
type Geolocation struct {
	IMEI            string  `json:"IMEI,omitempty"`
	VehicleID       int64   `json:"vehicle_id"`
	Latitude        float64 `json:"latitude"`
	Longitude       float64 `json:"longitude"`
	Speed           float64 `json:"speed"`
	TimestampString string  `json:"timestamp"`
	PanicButton     bool    `json:"panic_button,omitempty"`

	Timestamp time.Time `json:"_"`
}
