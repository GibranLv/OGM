package timeout

// Claves de la tabla
const (
	KeyID        = "id"
	KeyOrbcommID = "orbcomm_id"
	KeyTimeout   = "timeout"
	KeyDelay     = "delay"
)

// Timeout ... Estructura de un Timeout
type Timeout struct {
	ID        int64   `json:"id"`
	OrbcommID int64   `json:"orbcomm_id"`
	Timeout   float64 `json:"timeout"`
	Delay     float64 `json:"delay"`
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
