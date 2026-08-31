package view

import (
	"fmt"
	"html/template"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	headerDB "github.com/JamsMendez/SION-sw/models/header"
)

// Template ...
type Template struct {
	templates map[string]*template.Template
}

// Extra ...
type Extra struct {
	AccessTokenWS  string
	AccessTokenWSA string
	AccessTokenWSE string

	URLWS  string
	URLWSA string
	URLWSE string
	URLWSR string

	RT             int
	ChartTheme     int
	IsDashboardMin bool

	VariableID int
	MatrixID   int
	GroupID    int

	IsCustom      bool
	CommentColumn bool

	UserName   string
	UserRole   string
	UserJob    string
	UserAvatar string

	TitleOne     string
	TitleTwo     string
	TitleOneLeft string
	TitleTwoLeft string
	LogoLeft     string
}

// Render ...
func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	if template, ok := t.templates[name]; ok {
		if name == "login" {
			return template.ExecuteTemplate(w, name, data)
		}

		return template.ExecuteTemplate(w, "base", data)
	}

	return c.NoContent(http.StatusInternalServerError)
}

func getHeaderUser(userID int64) headerDB.Header {
	header := headerDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	headerOne, err := header.FindOneByUser(userID)
	if err != nil {
		fmt.Println("View.getHeaderUser.ERROR: ", err)
	}

	return headerOne
}
