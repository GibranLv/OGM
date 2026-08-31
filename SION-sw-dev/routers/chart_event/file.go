package chartevent

import (
	"fmt"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	chartEventDB "github.com/JamsMendez/SION-sw/models/chart_event"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/labstack/echo/v4"
)

func getFile(c echo.Context) error {
	_, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(chartEventDB.KeyID)
	if id == "" {
		return c.NoContent(http.StatusBadRequest)
	}

	fileName := c.Param(constants.KeyFile)
	if fileName == "" {
		return c.NoContent(http.StatusBadRequest)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	chartEvent := chartEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{
		chartEventDB.KeyID: iID,
	}

	chartEventOne, err := chartEvent.FindOne(where)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	var isOk bool
	var file chartEventDB.File

	files := chartEventOne.Files
	size := len(files)
	for i := 0; i < size; i++ {
		file = files[i]
		if file.Name == fileName {
			isOk = true
			break
		}
	}

	if !isOk {
		return c.NoContent(http.StatusNotFound)
	}

	src := fmt.Sprintf("%s%s", constants.ChartEventsSRC, fileName)
	return c.Attachment(src, file.Alias)
}
