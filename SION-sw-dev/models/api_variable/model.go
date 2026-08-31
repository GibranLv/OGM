package apivariable

const (
	KeyID         = "id"
	KeyVariableID = "variable_id"
	KeyIsCustom   = "is_custom"
	KeyPosition   = "position"
	KeyActive     = "active"
)

type APIVariable struct {
	ID         int64
	VariableID int64
	IsCustom   bool
	Position   int
	Active     bool
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
