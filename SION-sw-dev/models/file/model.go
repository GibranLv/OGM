package file

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

// Claves de la tabla
const (
	KeyID          = "id"
	KeyUserID      = "user_id"
	KeyName        = "name"
	KeyType        = "type"
	KeyPath        = "path"
	KeyIsDir       = "is_dir"
	KeyNameVirtual = "name_virtual"
	KeyPathVirtual = "path_virtual"
	KeyCreatedAt   = "created_at"
	KeyUpdatedAt   = "updated_at"
)

// File ... Documento para representar un archivo
type File struct {
	ID          int64     `json:"id"`
	UserID      int64     `json:"-"`
	Name        string    `json:"-"`
	Type        string    `json:"type"`
	Path        string    `json:"-"`
	NameVirtual string    `json:"name"`
	PathVirtual string    `json:"path"`
	IsDir       bool      `json:"is_dir"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	createdAt mysql.NullTime
	updatedAt mysql.NullTime
}

// Model ...
type Model struct {
	UserDB string
	PwdDB  string
	NameDB string
	Host   string
	Port   string
	Debug  bool
}
