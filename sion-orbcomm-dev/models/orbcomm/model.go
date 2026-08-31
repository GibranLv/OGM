package orbcomm

// Claves de la tabla
const (
	KeyID       = "id"
	KeySystemID = "system_id"
	KeyMobileID = "mobile_id"
	KeyModbus   = "modbus"
	KeyStatus   = "status"
)

// Orbcomm ... Estructura de un Orbcomm
type Orbcomm struct {
	ID       int64  `json:"id"`
	SystemID int64  `json:"system_id"`
	MobileID string `json:"mobile_id"`
	Modbus   string `json:"modbus"`
	Status   bool   `json:"status"`
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
