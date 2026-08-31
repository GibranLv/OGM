package constants

// Eventos de TCP y WS
const (
	EventAuth                 = "authentication"
	EventEmptyUpdateVars      = "update-empty-variables"
	EventEmptyUpdateVarsValue = "empty-update-variables-value"
	EventUpdateVars           = "update-variables"
	EventUpdateVarsValue      = "update-variables-value"
	EventUpdateVarsTimeout    = "update-variables-timeout"
	EventUpdateVarsAlarm      = "update-variables-alarm"
	EventUpdateVehicle        = "update-vehicle"
	EventUpdateAlarmsActive   = "update-alarms-active"

	EventUpdateCommenGroup = "update-comment-group"
)

// Eventos de Reportes
const (
	EventRequestReport  = "request-report"
	EventResponseReport = "response-report"
)

// Eventos de Explorador de Archivos
const (
	EvtGetContent = "get-content"
	EvtCreateFile = "create-file"
	EvtCopyFile   = "copy-file"
	EvtRenameFile = "rename-file"
	EvtMoveFile   = "move-file"
	EvtDeleteFile = "delete-file"
)
