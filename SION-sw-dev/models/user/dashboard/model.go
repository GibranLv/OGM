package dashboard

// Claves de la tabla
const (
	KeyID     = "id"
	KeyUserID = "user_id"
)

// UserDashboard ... Variables de pie de página
type UserDashboard struct {
	ID     int64
	UserID int64
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
