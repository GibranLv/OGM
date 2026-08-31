module github.com/JamsMendez/Connector

go 1.19

replace github.com/JamsMendez/SION-sw/constants => ../SION-sw/constants

require (
	github.com/JamsMendez/SION-sw/constants v0.0.0-00010101000000-000000000000
	github.com/go-sql-driver/mysql v1.6.0
)
