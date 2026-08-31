package explorer

import (
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	fileDB "github.com/JamsMendez/SION-sw/models/file"
	"github.com/JamsMendez/SION-sw/routers"
)

// ID ... Parametro de ID
const ID = "id"

func viewServer(c echo.Context, pathWSE string) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	value := c.Param(ID)

	fileID, err := routers.ParseInt(value)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	file := fileDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{
		fileDB.KeyID:     fileID,
		fileDB.KeyUserID: userSession.ID,
	}

	fileOne, err := file.FindOne(where)
	if err != nil {
		fmt.Println("explorer.GetFile.FindOne: ", err)

		return c.File("./views/404.html")
	}

	if fileOne.ID == 0 {
		return c.File("./views/404.html")
	}

	path := filepath.Join(pathWSE, fileOne.Path, fileOne.Name)
	name := fileOne.NameVirtual

	return c.Inline(path, name)
}

func downloadServer(c echo.Context, pathWSE string) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	value := c.Param(ID)

	fileID, err := routers.ParseInt(value)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	file := fileDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{
		fileDB.KeyID:     fileID,
		fileDB.KeyUserID: userSession.ID,
	}

	fileOne, err := file.FindOne(where)
	if err != nil {
		fmt.Println("explorer.GetFile.FindOne: ", err)

		return c.File("./views/404.html")
	}

	if fileOne.ID == 0 {
		return c.File("./views/404.html")
	}

	path := filepath.Join(pathWSE, fileOne.Path, fileOne.Name)
	name := fileOne.NameVirtual

	return c.Attachment(path, name)
}
