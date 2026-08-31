package factor

// Constants ...
const (
	KeyID          = "id"
	KeyProbability = "probability"
	KeyLimit       = "limit"
	KeyStatus      = "status"
)

// Factor ...
type Factor struct {
	ID          int64  `json:"id"`
	Probability string `json:"probility"`
	Limit       int    `json:"limit"`
	Status      bool   `json:"status"`

	GroupFactorID int64
	VariableID    int64
	IsCustom      bool
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
