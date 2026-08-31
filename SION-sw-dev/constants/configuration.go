package constants

import (
	"encoding/json"
	"fmt"
	"os"
)

// ConfigServer ... Es la configuración del servidor
type ConfigServer struct {
	PortSW          string `json:"PORT_SW"`
	ReadTimeoutSW   int32  `json:"READ_TIMEOUT_SW"`
	WriteTimeoutSW  int32  `json:"WRITE_TIMEOUT_SW"`
	KeySessionSW    string `json:"KEY_SESSION_SW"`
	SecretSessionSW string `json:"SECRET_SESSION_SW"`
	PrivateAPISW    string `json:"PRIVATE_API_SW"`
	PublicAPISW     string `json:"PUBLIC_API_SW"`

	// Service VARS
	PortVars          string `json:"PORT_VARS"`
	ReadTimeoutVars   int32  `json:"READ_TIMEOUT_VARS"`
	WriteTimeoutVars  int32  `json:"WRITE_TIMEOUT_VARS"`
	KeySessionVars    string `json:"KEY_SESSION_VARS"`
	SecretSessionVars string `json:"SECRET_SESSION_VARS"`
	PublicAPIVars     string `json:"PUBLIC_API_VARS"`

	URLTCPWS  string `json:"URL_TCP_WS"`
	URLTCPWSA string `json:"URL_TCP_WSA"`

	// Service WSA
	PortTCPWSA              string `json:"PORT_TCP_WSA"`
	DelayTimeoutWSA         int32  `json:"DELAY_TIMEOUT_WSA"`
	SecretAccessTokenWSATCP string `json:"SECRET_ACCESS_TOKEN_WSA_TCP"`

	// Service WS
	SecretAccessTokenWSTCP string `json:"SECRET_ACCESS_TOKEN_WS_TCP"`

	SecretAccessTokenWS  string `json:"SECRET_ACCESS_TOKEN_WS"`
	SecretAccessTokenWSA string `json:"SECRET_ACCESS_TOKEN_WSA"`
	SecretAccessTokenWSE string `json:"SECRET_ACCESS_TOKEN_WSE"`
	SecretAccessTokenWSR string `json:"SECRET_ACCESS_TOKEN_WSR"`

	URLWS  string `json:"URL_WS"`
	URLWSA string `json:"URL_WSA"`
	URLWSE string `json:"URL_WSE"`
	URLWSR string `json:"URL_WSR"`

	PathWSE string `json:"PATH_WSE"`

	NodePath     string `json:"NODE_PATH"`
	NodeExecPath string `json:"NODE_EXEC_PATH"`

	System string `json:"SYSTEM"`

	DelayORBCOMM  int32  `json:"DELAY_ORBCOMM"`
	ModbusORBCOMM string `json:"MODBUS_ORBCOMM"`
}

// ConfigDB ... Es la configuración de la DBs
type ConfigDB struct {
	PortSW string `json:"DB_PORT_SW"`
	HostSW string `json:"DB_HOST_SW"`
	NameSW string `json:"DB_NAME_SW"`
	UserSW string `json:"DB_USER_SW"`
	PwdSW  string `json:"DB_PWD_SW"`

	PortRecords string `json:"DB_PORT_RECODS"`
	HostRecords string `json:"DB_HOST_RECODS"`
	NameRecords string `json:"DB_NAME_RECODS"`
	UserRecords string `json:"DB_USER_RECODS"`
	PwdRecords  string `json:"DB_PWD_RECODS"`

	PortGPSRecords string `json:"DB_PORT_GPS_RECODS"`
	HostGPSRecords string `json:"DB_HOST_GPS_RECODS"`
	NameGPSRecords string `json:"DB_NAME_GPS_RECODS"`
	UserGPSRecords string `json:"DB_USER_GPS_RECODS"`
	PwdGPSRecords  string `json:"DB_PWD_GPS_RECODS"`

	PortO string `json:"DB_PORT_O"`
	HostO string `json:"DB_HOST_O"`
	NameO string `json:"DB_NAME_O"`
	UserO string `json:"DB_USER_O"`
	PwdO  string `json:"DB_PWD_O"`
}

// DB ...
var DB = func() ConfigDB {
	db := ConfigDB{}

	buffer, err := os.ReadFile(NameConfigFile)
	if err != nil {
		fmt.Println("ConfigDB: ", err)

		return db
	}

	err = json.Unmarshal(buffer, &db)
	if err != nil {
		fmt.Println("ConfigDB: ", err)
		return db
	}

	return db
}()
