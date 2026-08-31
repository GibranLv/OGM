package activerecord

// Claves de la tabla
const (
	KeyID           = "id"
	KeyVariableID   = "variable_id"
	KeyIsCustom     = "is_custom"
	KeyDefaultValue = "default_value"
	KeyIsDefault    = "is_default"
	KeyStatus       = "status"
)

// ActiveRecord ... Variables que registran sus actualizaciones
type ActiveRecord struct {
	ID           int64
	VariableID   int64
	IsCustom     bool
	DefaultValue float64
	IsDefault    bool
	Status       bool
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
