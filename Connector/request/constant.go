package request

const contentType = "application/json"

// ReqInsertJSON ... Contenido de la solicitud para insertar una variable
type ReqInsertJSON struct {
	Token     string       `json:"tk"`
	Variables []InsertJSON `json:"vr"`
}

// ReqUpdateJSON ... Contenido de la solicitud para actualizar una variable
type ReqUpdateJSON struct {
	Token     string       `json:"tk"`
	Variables []UpdateJSON `json:"vr"`
}

// InsertJSON ... Estructura del JSON para crear variables
type InsertJSON struct {
	Name   string `json:"v"`
	Zone   string `json:"b"`
	Device string `json:"d"`
	Unit   string `json:"u"`
	Status bool   `json:"s"`
}

// UpdateJSON ... Estructura del JSON para guardar los valores de las variables
type UpdateJSON struct {
	Mask      string  `json:"n"`
	Timestamp string  `json:"t"`
	Value     float32 `json:"v"`
	//Value     int32  `json:"v"`
}

type resInsertJSON struct {
	ID     int64  `json:"i"`
	Name   string `json:"v"`
	Zone   string `json:"b"`
	Device string `json:"d"`
	Mask   string `json:"a"`
}

type resInsert struct {
	Status    bool            `json:"s"`
	Token     string          `json:"t"`
	Variables []resInsertJSON `json:"vr"`
}

type resUpdate struct {
	Status  bool   `json:"s"`
	Token   string `json:"t"`
	Updated int    `json:"n"`
}
