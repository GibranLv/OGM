package orbcommvariable

// Claves de la tabla
const (
	KeyID         = "id"
	KeyOrbcommID  = "orbcomm_id"
	KeyVariableID = "variable_id"
	KeyName       = "name"
)

// OrbcommVariable ... Estructura de un Orbcomm y una Variable
type OrbcommVariable struct {
	ID         int64  `json:"id"`
	OrbcommID  int64  `json:"orbcomm_id"`
	VariableID int64  `json:"variable_id"`
	Name       string `json:"name"`
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
