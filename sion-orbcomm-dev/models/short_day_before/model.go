package shortdaybefore

// constants of Model
const (
	KeyID               = "id"
	KeyVariableID       = "variable_id"
	KeyIsCustom         = "is_custom"
	KeyValue            = "value"
	KeyIsUpdated        = "is_updated"
	KeyAccumulatedAlias = "accumulated_alias"
)

// ShortDayBefore ...
type ShortDayBefore struct {
	ID               int64   `json:"id"`
	VariableID       int64   `json:"variable_id"`
	IsCustom         bool    `json:"is_custom"`
	Value            float64 `json:"value"`
	IsUpdated        bool    `json:"is_updated"`
	AccumulatedAlias string  `json:"accumulated_alias"`
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
