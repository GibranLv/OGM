package extravariable

// Claves de la tabla
const (
	KeyID            = "id"
	KeyVariableID    = "variable_id"
	KeyIsCustom      = "is_custom"
	KeyOutVariableID = "out_variable_id"
	KeyOutIsCustom   = "out_is_custom"
	KeyStatus        = "status"
)

// ExtraVariable ... Variables Extras
type ExtraVariable struct {
	ID            int64
	VariableID    int64
	IsCustom      bool
	OutVariableID int64
	OutIsCustom   bool
	Status        bool
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
