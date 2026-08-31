module github.com/JamsMendez/SION-orbcomm

go 1.19

require (
	github.com/JamsMendez/SION-orbcomm/models v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/last_record v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/orbcomm v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/orbcomm_mail v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/orbcomm_timeout v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/orbcomm_variable v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/req v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/system v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/constants v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/variable v0.0.0-00010101000000-000000000000
)

require (
	github.com/JamsMendez/SION-sw/models v0.0.0-00010101000000-000000000000 // indirect
	github.com/go-sql-driver/mysql v1.7.0 // indirect
)

replace github.com/JamsMendez/SION-sw/constants => ../SION-sw/constants

replace github.com/JamsMendez/SION-sw/models => ../SION-sw/models

replace github.com/JamsMendez/SION-sw/models/variable => ../SION-sw/models/variable

replace github.com/JamsMendez/SION-sw/models/last_record => ../SION-sw/models/last_record

replace github.com/JamsMendez/SION-orbcomm/models/orbcomm_variable => ./models/orbcomm_variable

replace github.com/JamsMendez/SION-orbcomm/models/system => ./models/system

replace github.com/JamsMendez/SION-orbcomm/models/orbcomm => ./models/orbcomm

replace github.com/JamsMendez/SION-orbcomm/models/orbcomm_timeout => ./models/orbcomm_timeout

replace github.com/JamsMendez/SION-orbcomm/models/req => ./models/req

replace github.com/JamsMendez/SION-orbcomm/models/last_record => ./models/last_record

replace github.com/JamsMendez/SION-orbcomm/models => ./models

replace github.com/JamsMendez/SION-orbcomm/models/orbcomm_insert => ./models/orbcomm_insert

replace github.com/JamsMendez/SION-orbcomm/models/orbcomm_mail => ./models/orbcomm_mail

replace github.com/JamsMendez/SION-sw/models/record => ../SION-sw/models/record
