package variablefactor

// constants of Model
const (
	KeyID            = "id"
	KeyVariableID    = "variable_id"
	KeyIsCustom      = "is_custom"
	KeyValue         = "value"
	KeyProbability   = "probability"
	KeyIsIncremental = "is_incremental"
	KeyIsRandom      = "is_random"
)

// VariableFactor ...
type VariableFactor struct {
	ID            int64   `json:"id"`
	VariableID    int64   `json:"variable_id"`
	IsCustom      bool    `json:"is_custom"`
	Value         float64 `json:"value"`
	Probability   string  `json:"probability"`
	IsIncremental bool    `json:"is_incremental"`
	IsRandom      bool    `json:"is_random"`
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
