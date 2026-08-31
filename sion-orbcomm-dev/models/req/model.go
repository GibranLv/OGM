package req

// Claves de la tabla
const (
	KeyID          = "id"
	KeyAccessID    = "access_id"
	KeyPassword    = "password"
	KeyNextStartID = "next_start_id"
)

// Req ... Estructura de un Req
type Req struct {
	ID          uint64 `json:"id"`
	AccessID    string `json:"access_id"`
	Password    string `json:"password"`
	NextStartID uint64 `json:"next_start_id"`
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
