module github.com/JamsMendez/SION-ws

go 1.12

require (
	github.com/JamsMendez/SION-sw/constants v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/encrypted v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models v0.0.0-00010101000000-000000000000 // indirect
	github.com/JamsMendez/SION-sw/models/broadcast_comment v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/group v0.0.0-00010101000000-000000000000
	github.com/gorilla/websocket v1.4.1
	github.com/labstack/echo/v4 v4.1.6
)

replace github.com/JamsMendez/SION-sw/constants => ../SION-sw/constants

replace github.com/JamsMendez/SION-sw/encrypted => ../SION-sw/encrypted

replace github.com/JamsMendez/SION-sw/models/broadcast_comment => ../SION-sw/models/broadcast_comment

replace github.com/JamsMendez/SION-sw/models/user/group => ../SION-sw/models/user/group

replace github.com/JamsMendez/SION-sw/models => ../SION-sw/models
