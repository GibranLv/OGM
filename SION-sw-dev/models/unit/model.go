package unit

// constants of Model
const (
	KeyID         = "id"
	KeyName       = "name"
	KeyExpression = "expression"
	KeyDisplay    = "display"
)

// Unit ...
type Unit struct {
	ID         int64  `json:"id"`
	Name       string `json:"name"`
	Expression string `json:"expression"`
	Display    string `json:"display"`

	UserID    int64 `json:"-"`
	IsCreator bool  `json:"-"`
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
