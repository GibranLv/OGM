module github.com/JamsMendez/SION-com

go 1.19

replace github.com/JamsMendez/SION-sw/constants => ../SION-sw/constants

replace github.com/JamsMendez/SION-sw/models/last_record => ../SION-sw/models/last_record

replace github.com/JamsMendez/SION-sw/models/record => ../SION-sw/models/record

replace github.com/JamsMendez/SION-sw/models/variable => ../SION-sw/models/variable

replace github.com/JamsMendez/SION-sw/models => ../SION-sw/models

require (
	github.com/JamsMendez/SION-orbcomm/models v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/factor v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/group_factor v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/last_record v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/orbcomm v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/orbcomm_mail v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/orbcomm_timeout v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/orbcomm_variable v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-orbcomm/models/variable_timeout v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/constants v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/last_record v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/record v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/variable v0.0.0-00010101000000-000000000000
)

require (
	github.com/JamsMendez/SION-sw/models v0.0.0-00010101000000-000000000000 // indirect
	github.com/go-sql-driver/mysql v1.7.0 // indirect
)

replace github.com/JamsMendez/SION-orbcomm/models/orbcomm_variable => ../SION-orbcomm/models/orbcomm_variable

replace github.com/JamsMendez/SION-orbcomm/models/orbcomm_timeout => ../SION-orbcomm/models/orbcomm_timeout

replace github.com/JamsMendez/SION-orbcomm/models/variable_incremental => ../SION-orbcomm/models/variable_incremental

replace github.com/JamsMendez/SION-orbcomm/models/last_record => ../SION-orbcomm/models/last_record

replace github.com/JamsMendez/SION-orbcomm/models/orbcomm => ../SION-orbcomm/models/orbcomm

replace github.com/JamsMendez/SION-orbcomm/models/variable_timeout => ../SION-orbcomm/models/variable_timeout

replace github.com/JamsMendez/SION-orbcomm/models => ../SION-orbcomm/models

replace github.com/JamsMendez/SION-orbcomm/models/orbcomm_mail => ../SION-orbcomm/models/orbcomm_mail

replace github.com/JamsMendez/SION-orbcomm/models/factor => ../SION-orbcomm/models/factor

replace github.com/JamsMendez/SION-orbcomm/models/group_factor => ../SION-orbcomm/models/group_factor
