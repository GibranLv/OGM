package reportemail

const (
	KeyID                = "id"
	KeyAutomaticReportID = "automatic_report_id"
	KeyEmail             = "email"
)

type ReportEmail struct {
	ID                uint64
	AutomaticReportID uint64
	Email             string
}

type Model struct {
	UserDB string
	PwdDB  string
	NameDB string
	Host   string
	Port   string
	Debug  bool
}
