package alarmemail

// constants of Model
const (
	KeyID          = "id"
	KeyUserAlarmID = "users_alarms_id"
	KeySendEmail   = "send_email"
)

// UserAlarmEmail ...
type UserAlarmEmail struct {
	ID          int64
	UserAlarmID int64
	SendEmail   bool
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
