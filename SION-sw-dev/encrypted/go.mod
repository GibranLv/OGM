module github.com/JamsMendez/SION-sw/encrypted

go 1.12

require (
	github.com/JamsMendez/SION-sw/constants v0.0.0-00010101000000-000000000000
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	golang.org/x/crypto v0.0.0-20200820211705-5c72a883971a
)

replace github.com/JamsMendez/SION-sw/constants => ../constants
