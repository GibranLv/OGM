package previousdayvariable

// Claves de la tabla
const (
	KeyID            = "id"
	KeyVariableID    = "variable_id"
	KeyIsCustom      = "is_custom"
	KeyAccVariableID = "acc_variable_id"
	KeyAccIsCustom   = "acc_is_custom"
)

// PreviousDayVariable ... Variables de corte de un dia anterior
type PreviousDayVariable struct {
	ID            int64
	VariableID    int64
	IsCustom      bool
	AccVariableID int64
	AccIsCustom   bool
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
