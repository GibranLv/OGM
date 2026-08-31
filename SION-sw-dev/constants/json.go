package constants

import "time"

// ResJSON JSON
type ResJSON struct {
	Doc interface{} `json:"doc"`
}

// ResJSONs []JSON
type ResJSONs struct {
	Docs interface{} `json:"docs"`
}

// JSONs ...
type JSONs struct {
	Docs []string `json:"docs"`
}

// ContentJSON ...
type ContentJSON struct {
	Event   string      `json:"evt"`
	Content interface{} `json:"content"`
	Err     bool        `json:"err,omitempty"`
}

// MsgError ...
type MsgError struct {
	Message string `json:"message"`
}

// EmailContent ...
type EmailContent struct {
	From    string `json:"from"`
	To      string `json:"to"`
	Subject string `json:"subject"`
	HTML    string `json:"html"`
}

// UpdateVariableJSON ...
type UpdateVariableJSON struct {
	RecordID   int64   `json:"record_id"`
	VariableID int64   `json:"variable_id"`
	Value      float64 `json:"value"`
	Timestamp  string  `json:"timestamp"`
	IsCustom   bool    `json:"is_custom,omitempty"`
	IsEmpty    bool    `json:"is_empty,omitempty"`

	Device string `json:"-"`
	Name   string `json:"-"`
}

// EmptyUpdateVariableJSON ...
type EmptyUpdateVariableJSON struct {
	VariableID int64  `json:"variable_id"`
	Value      string `json:"value"`
	Timestamp  string `json:"timestamp"`
	IsCustom   bool   `json:"is_custom,omitempty"`

	Device string `json:"-"`
	Name   string `json:"-"`
}

// AlarmJSON ...
type AlarmJSON struct {
	// EventID es el ID de la tabla Eventos
	EventID    int64     `json:"event_id"`
	AlarmID    int64     `json:"alarm_id"`
	RecordID   int64     `json:"record_id,omitempty"`
	VariableID int64     `json:"variable_id"`
	IsCustom   bool      `json:"is_custom"`
	Name       string    `json:"name"`
	Color      string    `json:"color"`
	Setpoint   float64   `json:"setpoint"`
	IsTimeout  bool      `json:"is_timeout,omitempty"`
	Message    string    `json:"message,omitempty"`
	CreatedAt  time.Time `json:"created_at"`

	Expression     string        `json:"-"`
	UnitID         int64         `json:"-"`
	UnitExpression string        `json:"-"`
	Users          []int64       `json:"-"`
	UsersInAlarm   []UserInAlarm `json:"-"`

	VariableName   string  `json:"-"`
	VariableDevice string  `json:"-"`
	VariableValue  float64 `json:"-"`
}

// UserInAlarm ...
type UserInAlarm struct {
	ID      int64
	EventID int64
}

// CommentJSON ...
type CommentJSON struct {
	GroupID int64  `json:"group_id,omitempty"`
	Comment string `json:"comment,omitempty"`
}

// LogInTCP ...
type LogInTCP struct {
	Client      string `json:"client"`
	AccessToken string `json:"access_token"`
}

// === SION-vars SION-Connector ===

// InsertJSONReq ... Body de una solicitud para crear una variable
type InsertJSONReq struct {
	AccessToken string       `json:"access_token"`
	Variables   []InsertJSON `json:"variables"`
}

// UpdateJSONReqBefore ... Body de una solicitud para actuañizar el ultimo valor variable
type UpdateJSONReqBefore struct {
	AccessToken string       `json:"access_token"`
	Variables   []UpdateJSON `json:"variables"`
}

// UpdateJSONReq ... Body de una solicitud para actuañizar el ultimo valor variable
type UpdateJSONReq struct {
	AccessToken string       `json:"a"`
	Variables   []UpdateJSON `json:"v"`
}

// EmptyUpdateJSONReq ... Body de una solicitud para actuañizar el ultimo timestamp variable
type EmptyUpdateJSONReq struct {
	AccessToken string            `json:"a"`
	Variables   []EmptyUpdateJSON `json:"v"`
}

// InsertJSON ... Estructura del JSON para crear nueva variables
type InsertJSON struct {
	Name             string `json:"name"`
	Device           string `json:"device"`
	ReadingUnit      string `json:"reading_unit"`
	ExpressionInsert string `json:"expression_insert"`
	Status           bool   `json:"status"`
}

// UpdateJSONBefore ... Estructura del JSON para actualizar los valores de las variables
type UpdateJSONBefore struct {
	Alias     string  `json:"alias"`
	Timestamp string  `json:"timestamp"`
	Value     float32 `json:"value"`
}

// UpdateJSON ... Estructura del JSON para actualizar los valores de las variables
type UpdateJSON struct {
	Alias     string  `json:"a"`
	Timestamp string  `json:"t"`
	Value     float32 `json:"v"`
	IsEmpty   bool    `json:"e,omitempty"`
}

// EmptyUpdateJSON ... Estructura del JSON para actualizar el timestamp de las variables
type EmptyUpdateJSON struct {
	Alias     string `json:"a"`
	Timestamp string `json:"t"`
	Value     string `json:"v"`
}

// InsertJSONRes ... Estructura del JSON al crear la variable en SION-sw
type InsertJSONRes struct {
	ID     int64  `json:"id"`
	Name   string `json:"name"`
	Device string `json:"device"`
	Alias  string `json:"alias"`
}

// InsertRes ... Estructura de la respuesta al crear la variable en SION-sw
type InsertRes struct {
	Status      bool            `json:"status"`
	AccessToken string          `json:"access_token"`
	Variables   []InsertJSONRes `json:"variables"`
}

// UpdateResBefore ... Estructura del JSON al actualizar el valor de una variable en SION-sw
type UpdateResBefore struct {
	Status      bool   `json:"status"`
	AccessToken string `json:"access_token"`
	Updated     int    `json:"updated"`
}

// UpdateRes ... Estructura del JSON al actualizar el valor de una variable en SION-sw
type UpdateRes struct {
	Status      bool   `json:"s"`
	AccessToken string `json:"a"`
	Updated     int    `json:"u"`
}
