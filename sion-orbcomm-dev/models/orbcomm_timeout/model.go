package orbcommtimeout

// Claves de la tabla
const (
	KeyID         = "id"
	KeyOrbcommID  = "orbcomm_id"
	KeyIsTimeout  = "is_timeout"
	KeyVariableID = "variable_id"
	KeyIsZero     = "is_zero"
)

// OrbcommTimeout ... Estructura de un Orbcomm Timeout
type OrbcommTimeout struct {
	ID         int64 `json:"id"`
	OrbcommID  int64 `json:"orbcomm_id"`
	IsTimeout  bool  `json:"is_timeout"`
	VariableID int64 `json:"variable_id"`
	IsZero     bool  `json:"is_zero"`
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
