module github.com/JamsMendez/SION-sw

go 1.20

require (
	github.com/JamsMendez/SION-sw/constants v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/encrypted v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/accumulated_flow v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/alarm v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/api v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/broadcast_comment v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/chart v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/chart_event v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/configuration v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/custom_variable v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/custom_variable/comment v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/dashboard_variable v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/event v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/file v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/footer_variable v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/gps_device v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/gps_record v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/graphic v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/group v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/group/comment v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/header v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/last_record v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/matrix v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/na_variable v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/operation v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/previous_day_flow v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/profile v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/record v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/records_request v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/report v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/unit v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/alarm v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/alarm_email v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/alarm_notification v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/custom_variable v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/custom_variable_alarm v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/event v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/group v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/header v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/matrix v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/report v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/unit v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/variable v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/variable_alarm v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user/vehicle v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/user_session v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/variable v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/variable/comment v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/variable_active_alarm v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/variable_alarm_event v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/variable_overwrite v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/models/vehicle v0.0.0-00010101000000-000000000000
	github.com/JamsMendez/SION-sw/node v0.0.0-00010101000000-000000000000
	github.com/go-sql-driver/mysql v1.6.0
	github.com/gorilla/sessions v1.2.1
	github.com/labstack/echo-contrib v0.13.0
	github.com/labstack/echo/v4 v4.9.1
	github.com/xuri/excelize/v2 v2.6.1
)

require (
	github.com/dgrijalva/jwt-go v3.2.0+incompatible // indirect
	github.com/golang-jwt/jwt v3.2.2+incompatible // indirect
	github.com/gorilla/context v1.1.1 // indirect
	github.com/gorilla/securecookie v1.1.1 // indirect
	github.com/labstack/gommon v0.4.0 // indirect
	github.com/mattn/go-colorable v0.1.12 // indirect
	github.com/mattn/go-isatty v0.0.14 // indirect
	github.com/mohae/deepcopy v0.0.0-20170929034955-c48cc78d4826 // indirect
	github.com/richardlehane/mscfb v1.0.4 // indirect
	github.com/richardlehane/msoleps v1.0.3 // indirect
	github.com/valyala/bytebufferpool v1.0.0 // indirect
	github.com/valyala/fasttemplate v1.2.1 // indirect
	github.com/xuri/efp v0.0.0-20220603152613-6918739fd470 // indirect
	github.com/xuri/nfp v0.0.0-20220409054826-5e722a1d9e22 // indirect
	golang.org/x/crypto v0.0.0-20220817201139-bc19a97f63c8 // indirect
	golang.org/x/image v0.1.0 // indirect
	golang.org/x/net v0.0.0-20220812174116-3211cb980234 // indirect
	golang.org/x/sys v0.0.0-20220728004956-3c1f35247d10 // indirect
	golang.org/x/text v0.4.0 // indirect
	golang.org/x/time v0.0.0-20220722155302-e5dcc9cfc0b9 // indirect
)

replace github.com/JamsMendez/SION-sw/models/report => ./models/report

replace github.com/JamsMendez/SION-sw/models/chart => ./models/chart

replace github.com/JamsMendez/SION-sw/models/gps_record => ./models/gps_record

replace github.com/JamsMendez/SION-sw/models/operation => ./models/operation

replace github.com/JamsMendez/SION-sw/models/file => ./models/file

replace github.com/JamsMendez/SION-sw/models/custom_variable => ./models/custom_variable

replace github.com/JamsMendez/SION-sw/models/user/alarm => ./models/user/alarm

replace github.com/JamsMendez/SION-sw/models/user/variable => ./models/user/variable

replace github.com/JamsMendez/SION-sw/models/alarm => ./models/alarm

replace github.com/JamsMendez/SION-sw/models/footer_variable => ./models/footer_variable

replace github.com/JamsMendez/SION-sw/models/dashboard_variable => ./models/dashboard_variable

replace github.com/JamsMendez/SION-sw/models/unit => ./models/unit

replace github.com/JamsMendez/SION-sw/models/matrix => ./models/matrix

replace github.com/JamsMendez/SION-sw/models/user/custom_variable => ./models/user/custom_variable

replace github.com/JamsMendez/SION-sw/models/record => ./models/record

replace github.com/JamsMendez/SION-sw/models/user/variable_alarm => ./models/user/variable_alarm

replace github.com/JamsMendez/SION-sw/models/previous_day_flow => ./models/previous_day_flow

replace github.com/JamsMendez/SION-sw/models/user => ./models/user

replace github.com/JamsMendez/SION-sw/models/graphic => ./models/graphic

replace github.com/JamsMendez/SION-sw/models/broadcast_comment => ./models/broadcast_comment

replace github.com/JamsMendez/SION-sw/models/user/unit => ./models/user/unit

replace github.com/JamsMendez/SION-sw/models/accumulated_flow => ./models/accumulated_flow

replace github.com/JamsMendez/SION-sw/models/user/alarm_notification => ./models/user/alarm_notification

replace github.com/JamsMendez/SION-sw/node => ./node

replace github.com/JamsMendez/SION-sw/models/user/group => ./models/user/group

replace github.com/JamsMendez/SION-sw/models/records_request => ./models/records_request

replace github.com/JamsMendez/SION-sw/models/configuration => ./models/configuration

replace github.com/JamsMendez/SION-sw/models/user/report => ./models/user/report

replace github.com/JamsMendez/SION-sw/models/user/custom_variable_alarm => ./models/user/custom_variable_alarm

replace github.com/JamsMendez/SION-sw/models/chart_event => ./models/chart_event

replace github.com/JamsMendez/SION-sw/encrypted => ./encrypted

replace github.com/JamsMendez/SION-sw/models/custom_variable/comment => ./models/custom_variable/comment

replace github.com/JamsMendez/SION-sw/models/group => ./models/group

replace github.com/JamsMendez/SION-sw/models/user/event => ./models/user/event

replace github.com/JamsMendez/SION-sw/models/na_variable => ./models/na_variable

replace github.com/JamsMendez/SION-sw/models/user_session => ./models/user_session

replace github.com/JamsMendez/SION-sw/models/variable => ./models/variable

replace github.com/JamsMendez/SION-sw/models/gps_device => ./models/gps_device

replace github.com/JamsMendez/SION-sw/models/variable/comment => ./models/variable/comment

replace github.com/JamsMendez/SION-sw/models/event => ./models/event

replace github.com/JamsMendez/SION-sw/models/variable_alarm_event => ./models/variable_alarm_event

replace github.com/JamsMendez/SION-sw/models/group/comment => ./models/group/comment

replace github.com/JamsMendez/SION-sw/models/header => ./models/header

replace github.com/JamsMendez/SION-sw/models/user/vehicle => ./models/user/vehicle

replace github.com/JamsMendez/SION-sw/models/variable_active_alarm => ./models/variable_active_alarm

replace github.com/JamsMendez/SION-sw/models/profile => ./models/profile

replace github.com/JamsMendez/SION-sw/models/vehicle => ./models/vehicle

replace github.com/JamsMendez/SION-sw/models/user/matrix => ./models/user/matrix

replace github.com/JamsMendez/SION-sw/models/user/header => ./models/user/header

replace github.com/JamsMendez/SION-sw/models/api => ./models/api

replace github.com/JamsMendez/SION-sw/models/user/alarm_email => ./models/user/alarm_email

replace github.com/JamsMendez/SION-sw/models/last_record => ./models/last_record

replace github.com/JamsMendez/SION-sw/models => ./models

replace github.com/JamsMendez/SION-sw/models/variable_overwrite => ./models/variable_overwrite

replace github.com/JamsMendez/SION-sw/constants => ./constants
