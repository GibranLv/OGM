package footervariable

// Claves de la tabla
const (
	KeyID         = "id"
	KeyUserID     = "user_id"
	KeyVariableID = "variable_id"
	KeyIsCustom   = "is_custom"
	KeyPosition   = "position"
)

// FooterVariable ... Variables de pie de página
type FooterVariable struct {
	ID         int64 `json:"id"`
	UserID     int64 `json:"-"`
	VariableID int64 `json:"variable_id"`
	IsCustom   bool  `json:"is_custom"`
	Position   int16 `json:"position"`

	Unit string `json:"unit,omitempty"`
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
