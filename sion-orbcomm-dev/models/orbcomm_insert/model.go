package orbcomminsert

// Claves de la tabla
const (
	KeyID        = "id"
	KeyOrbcommID = "orbcomm_id"
)

// OrbcommInsert ... Estructura de un Orbcomm Insert
type OrbcommInsert struct {
	ID        int64 `json:"id"`
	OrbcommID int64 `json:"orbcomm_id"`
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
