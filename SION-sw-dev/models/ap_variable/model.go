package apvariable

// Claves de la tabla
const (
	KeyID               = "id"
	KeyAccumuID         = "accumulated_id"
	KeyAccumuIsCustom   = "accumulated_is_custom"
	KeyPreviousID       = "previous_id"
	KeyPreviousIsCustom = "previous_is_custom"
)

// APVariable ... Variables de corte de un dia anterior
type APVariable struct {
	ID               int64
	AccumuID         int64
	AccumuIsCustom   bool
	PreviousID       int64
	PreviousIsCustom bool
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
