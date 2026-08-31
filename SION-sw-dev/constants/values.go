package constants

// Tipos de Eventos, Módulo de Eventos
const (
	TypeValueAlarm       = 1
	TypeTimeoutAlarm     = 2
	TypeComment          = 3
	TypeChartEvent       = 4
	TypeGenerateReporte  = 5
	TypeMuteAudibleAlarm = 6

	TypeInsertMatrix = 10
	TypeUpdateMatrix = 11
	TypeDeleteMatrix = 12

	TypeInsertGroup = 15
	TypeUpdateGroup = 16
	TypeDeleteGroup = 17

	TypeInsertCustomVariable = 20
	TypeUpdateCustomVariable = 21
	TypeDeleteCustomVariable = 22

	TypeInsertAlarm = 25
	TypeUpdateAlarm = 26
	TypeDeleteAlarm = 27

	TypeInsertUnit = 30
	TypeUpdateUnit = 31
	TypeDeleteUnit = 32

	TypeInsertDynamicGraphic = 35
	TypeUpdateDynamicGraphic = 36
	TypeDeleteDynamicGraphic = 37

	TypeInsertDirectory = 40
	TypeDeleteDirectory = 41

	TypeInsertFile = 45
	TypeDeleteFile = 46

	TypeInsertOperation = 50
	TypeUpdateOperation = 51
	TypeDeleteOperation = 52

	TypeInsertReport   = 55
	TypeUpdateReport   = 56
	TypeDeleteReport   = 57
	TypeGenerateReport = 58

	TypeInsertUser = 60
	TypeUpdateUser = 61
	TypeDeleteUser = 62

	TypeLogIn          = 100
	TypeLogOut         = 101
	TypeChangePassword = 102

	TypeInsertVariable = 110
	TypeUpdateVariable = 111
	TypeDeleteVariable = 112
)

// Valor de dias en Horas
const (
	D15InHours  = 24 * 15
	D31InHours  = 24 * 31
	D61InHours  = 24 * 61
	D181InHours = 24 * 181
	D366InHours = 24 * 366
	D730InHours = 24 * 730
)

// Valor de sonidos de Alarmas
const (
	TimeoutSound = 1
	WarningSound = 2
	DangerSound  = 3
)

// Valor de modulos del sistema
const (
	MatricesModule       = 1
	ChartsModule         = 2
	ReportsModule        = 3
	EventsModule         = 4
	LocationModule       = 5
	LocatorModule        = 6
	ExplorerModule       = 7
	ConfigurationModule  = 8
	OperationsModule     = 9
	ProfileModule        = 10
	ShutdownRemoteModule = 11
)

// Valores de los Clientes TCP para WS y WSA
const (
	VarsClient   = "vars"
	UserClient   = "user"
	ReportClient = "report"
	GPSClient    = "gps"
	WSAClient    = "wsa"
	WebClient    = "web"
	SPClient     = "smartphone"

	StatusOk = 200
)

// Issues
const (
	IssuerAPI = "ogm.at"
	IssuerWS  = "sion_ws.at"
	IssuerWSA = "sion_wsa.at"
	IssuerWSR = "sion_wsr.at"
)

// TTXProtocol Es el protocolo de WS
const TTXProtocol = "ttx-protocol"

// Mode for record of variables
const (
	Normal = "normal"
	Day    = "day"
	Minute = "minute"
	Hour   = "hour"
	Month  = "month"
)

// Type of reports
const (
	Daily   = "daily"
	Monthly = "monthly"
	Annual  = "annual"
	Custom  = "custom"
)

// Constants of Date
const (
	TZ                = "America/Mexico_City"
	DateTimeFormat    = "2006-01-02 15:04:05"
	DateTimeUTCFormat = "2006-01-02T15:04:05Z"
	DateFormat        = "2006-01-02"
)

// Keys of sessions
const (
	KeySystemUserSession = "system_user_session"
	KeyAPIUserSession    = "api_user_session"

	KeyAccessToken  = "access_token"
	KeyRefreshToken = "refresh_token"

	KeyAccessTokenWS  = "access_token_ws"
	KeyAccessTokenWSA = "access_token_wsa"
	KeyAccessTokenWSE = "access_token_wse"
	KeyAccessTokenWSR = "access_token_wsr"
)

// Constanttes de Solicitudes HTTP FormData
const (
	KeyJSON = "json"
	KeySize = "size"
	KeyFile = "file"

	KeyContentType = "Content-Type"

	KeyContentTypePNG  = "image/png"
	KeyContentTypeJPEG = "image/jpeg"

	KeyPNG  = ".png"
	KeyJPEG = ".jpg"

	ChartEventsSRC = "./files/chart_events/"
	TemplatesSRC   = "./files/template/"
	ImageAvatarSRC = "./public/images/avatars/"
)

// NameConfigFile ... Archivo de configuración del sistema
const NameConfigFile = "app.config"

// Values
const (
	NA            = "N/A"
	SelfValue     = "self"
	TrueValue     = "true"
	FalseValue    = "false"
	AvatarDefault = "default.png"
)

// Params to URLs
const (
	IDParam   = "id"
	ListParam = "list"

	MatrixIDParam = "matrix_id"
	GroupIDParam  = "group_id"

	IsCustomParam = "is_custom"
)

// Queries to URL
const (
	UserIDQuery = "user_id"
	AllQuery    = "all"
	LimitQuery  = "limit"
	SearchQuery = "search"
)

// TmpCustomVariable ... Template Table Custom Variable
const TmpCustomVariable = "cv_%d"

// RT
const (
	HTTP = 1
	WS   = 2
)

// Theme Chart
const (
	DarkTheme  = 1
	WhiteTheme = 2
)
