package variableoverwrite

// constants of Model
const (
	KeyID         = "id"
	KeyVariableID = "variable_id"
	KeyValueI     = "value_i"
	KeyValueF     = "value_f"
	KeyOperator   = "operator"
	KeyStatus     = "status"
)

// VariableOverwrite ...
type VariableOverwrite struct {
	ID         int64   `json:"id"`
	VariableID int64   `json:"variable_id"`
	ValueI     float64 `json:"value_i"`
	ValueF     float64 `json:"value_f"`
	Operator   string  `json:"operator"`
	Status     bool    `json:"status"`
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
