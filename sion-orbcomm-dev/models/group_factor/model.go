package groupfactor

// Constants ...
const (
	KeyID         = "id"
	KeyFactorID   = "factor_id"
	KeyVariableID = "variable_id"
	KeyIsCustom   = "is_custom"
	KeyStatus     = "status"
)

// GroupFactor ...
type GroupFactor struct {
	ID         int64 `json:"id"`
	FactorID   int64 `json:"factor_id"`
	VariableID int64 `json:"variable_id"`
	IsCustom   bool  `json:"is_custom"`
	Status     bool  `json:"status"`
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
