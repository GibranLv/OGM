package group

import (
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	groupDB "github.com/JamsMendez/SION-sw/models/group"
	userGroupDB "github.com/JamsMendez/SION-sw/models/user/group"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
)

// SION ... !OK
func createServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	gJSON := groupDB.Group{}

	sJSON := c.FormValue(constants.KeyJSON)
	b := []byte(sJSON)

	if err := json.Unmarshal(b, &gJSON); err != nil {
		fmt.Println("group.createServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	isntAdmins := !isRoot && !isSystemAdmin && !isAdmin
	if isntAdmins && !isOperator {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if gJSON.Name == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "nombre")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if gJSON.Type == "" {
		msg := fmt.Sprintf(constants.MsgFieldRequired, "tipo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	now := time.Now().UTC()

	values[groupDB.KeyName] = gJSON.Name
	values[groupDB.KeyType] = gJSON.Type
	values[groupDB.KeyLatitude] = gJSON.Latitude
	values[groupDB.KeyLongitude] = gJSON.Longitude
	values[groupDB.KeyCreatedAt] = now
	values[groupDB.KeyUpdatedAt] = now

	group := groupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userGroup := userGroupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se crea el Grupo
	groupOne, err := group.Create(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values = map[string]interface{}{
		userGroupDB.KeyUserID:    userSession.ID,
		userGroupDB.KeyGroupID:   groupOne.ID,
		userGroupDB.KeyIsCreator: true,
	}

	// Se relaciona el Grupo con el usuario
	_, err = userGroup.Create(values)
	if err != nil {
		fmt.Println("group.createServer.userGroup.Create: ", err)

		// Si ocurrió un error al crear la relación de elimina el Grupo
		// que fue creada.
		where := map[string]interface{}{groupDB.KeyID: groupOne.ID}
		_, err := group.Remove(where)
		if err != nil {
			fmt.Println("group.createServer.group.Remove: ", err)
		}

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Actualizar el Marker Icon del Grupo
	var updateMarkerIcon bool

	values = map[string]interface{}{groupDB.KeyID: groupOne.ID}

	image, err := c.FormFile(groupDB.KeyMarkerIcon)
	if err == nil {
		src, err := image.Open()
		if err == nil {

			defer func(r multipart.File) {
				err := r.Close()
				if err != nil {
					fmt.Println("src.Error: ", err)
				}
			}(src)

			ext := constants.KeyPNG
			img := image.Header.Get(constants.KeyContentType)
			if img == constants.KeyContentTypePNG {
				ext = constants.KeyPNG
			}

			groupID := int(groupOne.ID)
			name := fmt.Sprintf("marker_%d%s", groupID, ext)
			filename := ImageGroupsSRC + name
			dst, err := os.Create(filename)
			if err == nil {

				defer func(r *os.File) {
					err := r.Close()
					if err != nil {
						fmt.Println("src.Error: ", err)
					}
				}(dst)

				if _, err = io.Copy(dst, src); err == nil {
					updateMarkerIcon = true
					values[groupDB.KeyMarkerIcon] = name
				}
			}
		}
	}

	if updateMarkerIcon {
		groupOne, err = group.Update(values)
		if err != nil {
			fmt.Println("group.createServer.group.Update: ", err)
		}
	}

	// Registro del Evento
	typeIn := constants.TypeInsertGroup
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se creó el grupo %s", groupOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: groupOne}
	return c.JSON(http.StatusCreated, resJSON)
}
