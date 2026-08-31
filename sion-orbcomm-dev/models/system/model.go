package system

// Claves de la tabla
const (
	KeyID       = "id"
	KeyUser     = "user"
	KeyPassword = "password"
	KeyName     = "name"
	KeyHost     = "host"
	KeyPort     = "port"
)

// System ...
type System struct {
	ID       int64  `json:"id"`
	User     string `json:"user"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Host     string `json:"host"`
	Port     string `json:"port"`
	URL      string `json:"url"`
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
