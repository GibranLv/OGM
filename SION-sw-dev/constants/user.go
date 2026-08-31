package constants

// Roles de Usuarios
const (
	KeyUserID = "user_id"

	RootUser        = "root"
	SystemAdminUser = "system_admin" // Revisando ... puede todo menos los ROOTs
	AdminUser       = "admin"
	OperatorUser    = "operator"
	GuestUser       = "guest"

	/*
		Valores por defecto de usuario.
		Entre mas cerca del 0 tiene mayores
		privilegios
	*/

	RootValue        = 0   // 0 - 9
	SystemAdminValue = 10  // 10 - 99
	AdminValue       = 100 // 100 - 149
	OperatorValue    = 150 // 150 - 199
	GuestValue       = 200 // 200 - ...

	RootUserLabel        = "Administrador General"
	SystemAdminUserLabel = "Administrador de Sistema"
	AdminUserLabel       = "Administrador"
	OperatorUserLabel    = "Operador"
	GuestUserLabel       = "Invitado"
)
