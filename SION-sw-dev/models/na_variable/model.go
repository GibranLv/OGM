package navariable

// Claves de la tabla
const (
	KeyID         = "id"
	KeyVariableID = "variable_id"
	KeyIsCustom   = "is_custom"
)

// NAVariable ... Variables N/A
type NAVariable struct {
	ID         int64
	VariableID int64
	IsCustom   bool
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
