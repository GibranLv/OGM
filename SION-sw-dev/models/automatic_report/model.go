package automaticreport

const (
	KeyID          = "id"
	KeyReportID    = "report_id"
	KeyName        = "name"
	KeyTriggerDate = "trigger_date"
	KeyDateTo      = "date_to"
	KeyMinutes     = "minutes"
	KeyCreated     = "created"
)

type AutomaticReport struct {
	ID          uint64
	ReportID    uint64
	Name        string
	TriggerDate string
	DateTo      string
	Minutes     int64
	Created     bool
}

type Model struct {
	UserDB string
	PwdDB  string
	NameDB string
	Host   string
	Port   string
	Debug  bool
}
