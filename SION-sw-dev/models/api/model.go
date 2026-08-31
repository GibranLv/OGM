package api

// constants of Model
const (
	KeyID                 = "id"
	KeyAccessTokenKey     = "access_token_key"
	KeyRefreshTokenKey    = "refresh_token_key"
	KeyActivationTokenKey = "activation_token_key"
	KeySessionKey         = "session_key"
)

// API ...
type API struct {
	ID                 int64  `json:"id"`
	AccessTokenKey     string `json:"access_token_key"`
	RefreshTokenKey    string `json:"refresh_token_key"`
	ActivationTokenKey string `json:"activation_token_key"`
	SessionKey         string `json:"session_key"`
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
