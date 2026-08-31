package group

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	broadcastDB "github.com/JamsMendez/SION-sw/models/broadcast_comment"
	groupDB "github.com/JamsMendez/SION-sw/models/group"
	commentDB "github.com/JamsMendez/SION-sw/models/group/comment"
	userGroupDB "github.com/JamsMendez/SION-sw/models/user/group"
	"github.com/JamsMendez/SION-sw/routers"
	"github.com/JamsMendez/SION-sw/routers/util"
)

// SION ... !OK
func updateServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	isGuest := userSession.Role == constants.GuestUser
	if isGuest {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	id := c.Param(groupDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	group := groupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var groupOne groupDB.Group

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser

	if isRoot || isSystemAdmin {
		where := map[string]interface{}{groupDB.KeyID: iID}
		groupOne, err = group.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isAdmin {
		/*
			Acceso a los grupos de los usuarios con menor valor a la
			sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		groupOne, err = group.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if isOperator {
		// Acceso a los grupos de la sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID

		groupOne, err := group.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if groupOne.ID == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		isCreator := userID == groupOne.UserID && groupOne.IsCreator
		if !isCreator {
			msg := fmt.Sprintf("No tienes permisos sobre el grupo %s", groupOne.Name)
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if groupOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "del grupo")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	gJSON := groupDB.Group{}

	sJSON := c.FormValue(constants.KeyJSON)
	b := []byte(sJSON)

	if err := json.Unmarshal(b, &gJSON); err != nil {
		fmt.Println("group.updateServer.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if gJSON.Name != "" {
		values[groupDB.KeyName] = gJSON.Name
	}

	if gJSON.Type != "" {
		values[groupDB.KeyType] = gJSON.Type
	}

	values[groupDB.KeyLatitude] = gJSON.Latitude
	values[groupDB.KeyLongitude] = gJSON.Longitude

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

			name := fmt.Sprintf("marker_%d%s", iID, ext)
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
					values[groupDB.KeyMarkerIcon] = name
				}
			}
		}
	}

	if len(values) == 0 {
		msg := "No se detectaron cambios ha realizar en el grupo"
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values[groupDB.KeyID] = iID

	groupOne, err = group.Update(values)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	// Registro del Evento
	typeIn := constants.TypeUpdateGroup
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se actualizó el grupo %s", groupOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	resJSON := constants.ResJSON{Doc: groupOne}
	return c.JSON(http.StatusOK, resJSON)
}

// SION ... !OK
func updateComment(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(groupDB.KeyID)
	if id == "" {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	userGroup := userGroupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	group := groupDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var userGroupOne userGroupDB.UserGroup
	var groupOne groupDB.Group

	isRoot := userSession.Role == constants.RootUser
	isSystemAdmin := userSession.Role == constants.SystemAdminUser
	isAdmin := userSession.Role == constants.AdminUser
	isOperator := userSession.Role == constants.OperatorUser
	isGuest := userSession.Role == constants.GuestUser

	if isRoot || isSystemAdmin {
		// Acceso a cualquier grupo
		where := map[string]interface{}{groupDB.KeyID: iID}
		groupOne, err = group.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if groupOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "del grupo")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		where = map[string]interface{}{
			userGroupDB.KeyGroupID: iID,
			userGroupDB.KeyUserID:  userSession.ID,
		}

		userGroups, err := userGroup.Find(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if len(userGroups) == 0 {
			values := map[string]interface{}{
				userGroupDB.KeyUserID:    userSession.ID,
				userGroupDB.KeyGroupID:   groupOne.ID,
				userGroupDB.KeyIsCreator: false,
			}

			userGroupOne, err = userGroup.Create(values)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			userGroups = append(userGroups, userGroupOne)
		}

		userGroupOne = userGroups[0]

	} else if isAdmin {
		/*
			Acceso a cualquier grupo de un usuario con menos valor
			a la sesión del usuario
		*/
		i64 := int64(iID)
		userID := userSession.ID
		value := userSession.Value

		groupOne, err = group.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if groupOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "del grupo")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		where := map[string]interface{}{
			userGroupDB.KeyGroupID: groupOne.ID,
			userGroupDB.KeyUserID:  userSession.ID,
		}

		userGroups, err := userGroup.Find(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if len(userGroups) == 0 {
			values := map[string]interface{}{
				userGroupDB.KeyUserID:    userSession.ID,
				userGroupDB.KeyGroupID:   groupOne.ID,
				userGroupDB.KeyIsCreator: false,
			}

			userGroupOne, err = userGroup.Create(values)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			userGroups = append(userGroups, userGroupOne)
		}

		userGroupOne = userGroups[0]

	} else if isOperator || isGuest {
		// Acceso a los grupos de la sesión del usuario
		i64 := int64(iID)
		userID := userSession.ID

		groupOne, err = group.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if groupOne.ID == 0 {
			msg := fmt.Sprintf(constants.MsgNotFoundData, "del grupo")
			msgJSON := constants.MsgError{Message: msg}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		where := map[string]interface{}{
			userGroupDB.KeyGroupID: groupOne.ID,
			userGroupDB.KeyUserID:  userSession.ID,
		}

		userGroups, err := userGroup.Find(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		if len(userGroups) == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		userGroupOne = userGroups[0]

	} else {
		msgJSON := constants.MsgError{Message: constants.MsgPermissionDenied}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	req := constants.CommentJSON{}

	b, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		fmt.Println("group.updateComment.ReadAll: ", err)
	}

	err = c.Request().Body.Close()
	if err != nil {
		fmt.Println("group.updateComment.c.Request().Body.Close(): ", err)
	}

	if err := json.Unmarshal(b, &req); err != nil {
		fmt.Println("group.updateComment.Unmarshal: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	comment := commentDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{
		commentDB.KeyUserGroupID: userGroupOne.ID,
	}

	commentOne, err := comment.FindOne(where)
	if err != nil {
		fmt.Println("group.updateComment.comment.FindOne: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgErr}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	now := time.Now()

	values := map[string]interface{}{
		commentDB.KeyComment:   req.Comment,
		commentDB.KeyCreatedAt: now.UTC(),
	}

	if commentOne.ID == 0 {
		values[commentDB.KeyUserGroupID] = userGroupOne.ID
		values[commentDB.KeyCreatedAt] = now.UTC()

		commentOne, err = comment.Create(values)
		if err != nil || commentOne.ID == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		values[commentDB.KeyID] = commentOne.ID

		commentOne, err = comment.Update(values)
		if err != nil || commentOne.ID == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	broadcast := broadcastDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{broadcastDB.KeyUserID: userSession.ID}
	broadcastOne, err := broadcast.FindOne(where)
	if err != nil {
		fmt.Println("Group.UpdateComment.Broadcast.FindOne: ", err)
	}

	// Broadcast Comments
	if broadcastOne.ID > 0 {
		users := broadcastOne.Users
		size := len(users)
		if size > 0 {
			for _, userID := range users {
				where := map[string]interface{}{
					userGroupDB.KeyGroupID: groupOne.ID,
					userGroupDB.KeyUserID:  userID,
				}

				userGroups, err := userGroup.Find(where)
				if err != nil {
					fmt.Println("Group.UpdateComment.Broadcast.UserGroup.Find: ", err)
				}

				if err == nil {
					size = len(userGroups)
					if size > 0 {
						for _, userGroupOne := range userGroups {

							where := map[string]interface{}{
								commentDB.KeyUserGroupID: userGroupOne.ID,
							}

							commentOne, err := comment.FindOne(where)
							if err != nil {
								fmt.Println("Group.UpdateComment.Broadcast.Comment.FindOne: ", err)
							}

							if err == nil {
								values := map[string]interface{}{
									commentDB.KeyComment:   req.Comment,
									commentDB.KeyCreatedAt: now.UTC(),
								}

								if commentOne.ID == 0 {
									values[commentDB.KeyUserGroupID] = userGroupOne.ID
									values[commentDB.KeyCreatedAt] = now.UTC()

									commentOne, err = comment.Create(values)
									if err != nil {
										fmt.Println("Group.UpdateComment.Broadcast.Comment.Create: ", err)
									}

								} else {
									values[commentDB.KeyID] = commentOne.ID

									commentOne, err = comment.Update(values)
									if err != nil {
										fmt.Println("Group.UpdateComment.Broadcast.Comment.Update: ", err)
									}
								}
							}
						}
					}
				}
			}
		}
	}

	// Registro del Evento
	typeIn := constants.TypeComment
	ui8 := uint8(typeIn)
	message := fmt.Sprintf("Se actualizó comentario del grupo %s", groupOne.Name)
	util.InsertLogEvent(userSession.ID, ui8, message)

	return c.NoContent(http.StatusOK)
}
