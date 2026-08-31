module github.com/JamsMendez/SION-vars

go 1.19

replace github.com/JamsMendez/SION-sw/node => ../SION-sw/node

replace github.com/JamsMendez/SION-sw/models/record => ../SION-sw/models/record

replace github.com/JamsMendez/SION-sw/models/custom_variable => ../SION-sw/models/custom_variable

replace github.com/JamsMendez/SION-sw/models/active_record => ../SION-sw/models/active_record

replace github.com/JamsMendez/SION-sw/models/variable => ../SION-sw/models/variable

replace github.com/JamsMendez/SION-sw/models/last_record => ../SION-sw/models/last_record

replace github.com/JamsMendez/SION-sw/constants => ../SION-sw/constants

replace github.com/JamsMendez/SION-sw/encrypted => ../SION-sw/encrypted

replace github.com/JamsMendez/SION-sw/models => ../SION-sw/models

replace github.com/JamsMendez/SION-vars/tcp => ./tcp

require (
	github.com/JamsMendez/SION-sw/constants v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/active_record v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/custom_variable v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/last_record v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/record v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/variable v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/node v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-vars/tcp v0.0.0-00010101000000-000000000000
	github.com/labstack/echo/v4 v4.9.1
)

require (
	github.com/JamsMendez/SION-sw/encrypted v0.0.0-00010101000000-000000000000 // indirect
	github.com/JamsMendez/SION-sw/models v0.0.0-00010101000000-000000000000 // indirect
	github.com/dgrijalva/jwt-go v3.2.0+incompatible // indirect
	github.com/go-sql-driver/mysql v1.5.0 // indirect
	github.com/labstack/gommon v0.4.0 // indirect
	github.com/mattn/go-colorable v0.1.11 // indirect
	github.com/mattn/go-isatty v0.0.14 // indirect
	github.com/valyala/bytebufferpool v1.0.0 // indirect
	github.com/valyala/fasttemplate v1.2.1 // indirect
	golang.org/x/crypto v0.0.0-20210817164053-32db794688a5 // indirect
	golang.org/x/net v0.0.0-20211015210444-4f30a5c0130f // indirect
	golang.org/x/sys v0.0.0-20211103235746-7861aae1554b // indirect
	golang.org/x/text v0.3.7 // indirect
)
