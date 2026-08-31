package vehicle

// constants of Model
const (
	KeyID        = "id"
	KeyUserID    = "user_id"
	KeyVehicleID = "vehicle_id"
	KeyVisible   = "visible"
)

// UserVehicle ...
type UserVehicle struct {
	ID        int64 `json:"id"`
	UserID    int64 `json:"user_id"`
	VehicleID int64 `json:"vehicle_id"`
	Visible   bool  `json:"visible"`
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
