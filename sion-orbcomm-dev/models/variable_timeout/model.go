package variabletimeout

// Claves de la tabla
const (
	KeyID         = "id"
	KeyVariableID = "variable_id"
	KeyValueMin   = "value_min"
	KeyValueMax   = "value_max"
)

// VariableTimeout ... Estructura de un Orbcomm Timeout
type VariableTimeout struct {
	ID           int64   `json:"id"`
	VariableID   int64   `json:"variable_id"`
	ValueMin     float64 `json:"value_min"`
	ValueMax     float64 `json:"value_max"`
	ValueZeroMin float64 `json:"value_zero_min"`
	ValueZeroMax float64 `json:"value_zero_max"`
	IsInt        bool    `json:"is_int"`
	IsBool       bool    `json:"is_bool"`
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
