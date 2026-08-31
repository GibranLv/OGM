package alarmnotification

// constants of Model
const (
	KeyID          = "id"
	KeyUserAlarmID = "user_alarm_id"
	KeySendEmail   = "send_email"
	KeySendSMS     = "send_sms"
)

// UserAlarmNotification ...
type UserAlarmNotification struct {
	ID          int64
	UserAlarmID int64
	SendEmail   bool
	SendSMS     bool
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
