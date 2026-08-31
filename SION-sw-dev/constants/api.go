package constants

// Margen de error en el timestamp
const (
	LtSeconds = -1000 * 60 * 5
	GtSeconds = 1000 * 60 * 5
)

// Tamaño de las claves para los tokens de la API
const (
	LenAccessToken  = 25
	LenRefreshToken = 20
)

// Constantes de sesión por API
const (
	KeyUserSession = "user_session"
	KeyHash        = "hash"

	KeyAccessTokenHeader  = "Access-Token"
	KeyRefreshTokenHeader = "Refresh-Token"
	KeyBody               = "body"
	KeyAPI                = "OGM"
	KeyTimestamp          = "Timestamp"
	KeyAuthorization      = "Authorization"
)

// ExpiredMsg ...
const ExpiredMsg = "token is expired by"
