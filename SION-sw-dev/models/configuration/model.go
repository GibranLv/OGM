package configuration

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

// Claves de la tabla
const (
	KeyID                = "id"
	KeyMatrixID          = "matrix_id"
	KeyUserID            = "user_id"
	KeyMainModule        = "main_module"
	KeyMainMatrix        = "main_matrix"
	KeyJSONMatrixSounds  = "json_matrix_sounds"
	KeyJSONGraphicSounds = "json_graphic_sounds"
	KeyChartTheme        = "chart_theme"
	KeyRT                = "rt"
	KeyCommentColumn     = "comment_column"
	KeyCreatedAt         = "created_at"
	KeyUpdatedAt         = "updated_at"
)

// Configuration ... Configuraciónes de usuario
type Configuration struct {
	ID                int64     `json:"id"`
	UserID            int64     `json:"user_id"`
	MainModule        int16     `json:"main_module"`
	MainMatrix        int64     `json:"main_matrix"`
	JSONMatrixSounds  []Matrix  `json:"json_matrix_sounds"`
	JSONGraphicSounds []Graphic `json:"json_graphic_sounds"`
	RT                uint8     `json:"rt"`
	ChartTheme        uint8     `json:"chart_theme"`
	CommentColumn     bool      `json:"comment_column"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`

	JSONMatrixSoundsIn  string `json:"json_matrix_sounds_in,omitempty"`
	JSONGraphicSoundsIn string `json:"json_graphic_sounds_in,omitempty"`

	JSONMainMatrix string `json:"json_main_matrix,omitempty"`

	jsonMainMatrix    sql.NullString
	jsonMatrixSounds  sql.NullString
	jsonGraphicSounds sql.NullString
	createdAt         mysql.NullTime
	updatedAt         mysql.NullTime
}

// Matrix ... Configuración de sonidos de la Matriz
type Matrix struct {
	MatrixID        int64            `json:"matrix_id"`
	ActiveVariables []ActiveVariable `json:"active_vars"`
}

// Graphic ... Configuración de sonidos de un Gráfico Dinámico
type Graphic struct {
	GraphicID       int64            `json:"graphic_id"`
	ActiveVariables []ActiveVariable `json:"active_vars"`
}

// ActiveVariable ... Estado de sonidos de variables
type ActiveVariable struct {
	ID            int64 `json:"id"`
	IsCustom      bool  `json:"is_custom"`
	Sound         int8  `json:"sound"`
	PrioriryLevel uint8 `json:"priority_level"`
	Mute          bool  `json:"mute"`
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
