package header

// constants of Model
const (
	KeyID           = "id"
	KeyTitleOne     = "title_one"
	KeyTitleTwo     = "title_two"
	KeyTitleOneLeft = "title_one_left"
	KeyTitleTwoLeft = "title_two_left"
	KeyLogoLeft     = "logo_left"
)

// Header ...
type Header struct {
	ID           int64  `json:"id"`
	TitleOne     string `json:"title_one"`
	TitleTwo     string `json:"title_two"`
	TitleOneLeft string `json:"title_one_left"`
	TitleTwoLeft string `json:"title_two_left"`
	LogoLeft     string `json:"logo_left"`
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
