package models

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

const nameConfigFile = "app.config"

// Queries
const (
	Search  = "search"
	Limit   = "limit"
	Ini     = "ini"
	OrderBy = "order_by"

	LayoutUTCDate = "2006-01-02T15:04:05Z"
	LayoutDate    = "2006-01-02 15:04:05"

	Timezone = "America/Mexico_City"
)

// DB ...
type DB struct {
	DBPort string `json:"DB_PORT"`
	DBName string `json:"DB_NAME"`
	DBHost string `json:"DB_HOST"`
	DBUser string `json:"DB_USER"`
	DBPwd  string `json:"DB_PWD"`

	DBNameGRDXF string `json:"DB_NAME_GRDXF"`
	DBHostGRDXF string `json:"DB_HOST_GRDXF"`
	DBUserGRDXF string `json:"DB_USER_GRDXF"`
	DBPwdGRDXF  string `json:"DB_PWD_GRDXF"`
}

// Config ...
var Config = func() DB {
	var db DB
	buffer, err := ioutil.ReadFile(nameConfigFile)
	if err != nil {
		fmt.Println("models.constants", err)
		return db
	}

	err = json.Unmarshal(buffer, &db)
	if err != nil {
		fmt.Println("models.constants", err)
		return db
	}

	return db
}()
