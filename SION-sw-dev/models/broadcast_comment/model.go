package broadcastcomment

import "database/sql"

// Claves de la tabla
const (
	KeyID     = "id"
	KeyUserID = "user_id"
	KeyUsers  = "users"
)

// BroadcastComment ...
type BroadcastComment struct {
	ID     int64
	UserID int64
	Users  []int64

	usersJSON sql.NullString
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
