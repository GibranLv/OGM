package operation

import (
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	operationDB "github.com/JamsMendez/SION-sw/models/operation"
	"github.com/JamsMendez/SION-sw/routers"
)

func getOrListServer(c echo.Context) error {
	userSession, isAuth := routers.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	id := c.Param(operationDB.KeyID)

	if id == constants.ListParam {
		operation := operationDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		var operations []operationDB.Operation
		var err error

		matrixIDValue := c.QueryParam(matrixIDQuery)
		groupIDValue := c.QueryParam(groupIDQuery)
		startDateValue := c.QueryParam(startDateQuery)
		finalDateValue := c.QueryParam(finalDateQuery)

		var startDate, finalDate string
		var matrixID, groupID int64

		location, err := time.LoadLocation(constants.TZ)
		if err != nil {
			location = time.Local
		}

		if matrixIDValue != "" {
			ID, err := routers.ParseInt(matrixIDValue)
			if err != nil {
				return c.NoContent(http.StatusBadRequest)
			}

			matrixID = int64(ID)
		}

		if groupIDValue != "" {
			ID, err := routers.ParseInt(groupIDValue)
			if err != nil {
				return c.NoContent(http.StatusBadRequest)
			}

			groupID = int64(ID)
		}

		if startDateValue != "" {
			t, err := time.ParseInLocation(constants.DateTimeFormat, startDateValue, location)
			if err != nil {
				return c.NoContent(http.StatusBadRequest)
			}

			startDate = t.UTC().Format(constants.DateTimeFormat)
		}

		if finalDateValue != "" {
			t, err := time.ParseInLocation(constants.DateTimeFormat, finalDateValue, location)
			if err != nil {
				return c.NoContent(http.StatusBadRequest)
			}

			finalDate = t.UTC().Format(constants.DateTimeFormat)
		}

		if startDate == "" && finalDate == "" {
			nD := time.Now().UTC()
			fD := time.Date(nD.Year(), nD.Month(), nD.Day(), 0, 0, 0, 0, time.UTC)
			fD = fD.AddDate(0, 0, 1)

			sD := fD.AddDate(0, 0, -30)

			startDate = sD.Format(constants.DateTimeFormat)
			finalDate = fD.Format(constants.DateTimeFormat)
		}

		if startDate == "" && finalDate == "" {
			return c.NoContent(http.StatusBadRequest)
		}

		if userSession.Role == constants.RootUser || userSession.Role == constants.SystemAdminUser {
			userIDValue := c.QueryParam(constants.UserIDQuery)

			if userIDValue != "" {
				// Usuario usuario
				// Acceso a todas las Operaciones de todos los usuarios
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					return c.NoContent(http.StatusBadRequest)
				}

				i64 := int64(userID)
				where := map[string]interface{}{
					operationDB.KeyUserID: i64,
				}

				if matrixID != 0 {
					where[operationDB.KeyMatrixID] = matrixID
				}

				if groupID != 0 {
					where[operationDB.KeyGroupID] = groupID
				}

				operations, err = operation.Find(where, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Usuario usuario
				// Acceso a todas las Operaciones
				where := map[string]interface{}{
					operationDB.KeyUserID: userSession.ID,
				}

				if matrixID != 0 {
					where[operationDB.KeyMatrixID] = matrixID
				}

				if groupID != 0 {
					where[operationDB.KeyGroupID] = groupID
				}

				operations, err = operation.Find(where, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if userSession.Role == constants.AdminUser {
			allValue := c.QueryParam(constants.AllQuery)
			userIDValue := c.QueryParam(constants.UserIDQuery)

			if allValue == constants.TrueValue {
				// Administrador
				// Acceso a todas las Operaciones de usuarios con roles de valor inferior
				// y de la sesión del usuario
				where := map[string]interface{}{
					operationDB.KeyUserID: userSession.ID,
				}

				operations, err = operation.FindByUserOrLowerValue(where, userSession.Value, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else if userIDValue == constants.TrueValue {
				// Administrador
				// Acceso a todas las Operaciones con el ID del usuario siempre
				// que no tenga un role con valor superior
				userID, err := routers.ParseInt(userIDValue)
				if err != nil {
					return c.NoContent(http.StatusBadRequest)
				}

				i64 := int64(userID)
				where := map[string]interface{}{
					operationDB.KeyUserID: i64,
				}

				operations, err = operation.FindByUserAndLowerValue(where, userSession.Value, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}

			} else {
				// Administrador
				// Acceso a todas las Operaciones de la sesión del usuario
				where := map[string]interface{}{
					operationDB.KeyUserID: userSession.ID,
				}

				if matrixID != 0 {
					where[operationDB.KeyMatrixID] = matrixID
				}

				if groupID != 0 {
					where[operationDB.KeyGroupID] = groupID
				}

				operations, err = operation.Find(where, startDate, finalDate)
				if err != nil {
					msgJSON := constants.MsgError{Message: constants.MsgErr}
					return c.JSON(http.StatusAccepted, msgJSON)
				}
			}

		} else if userSession.Role == constants.OperatorUser {
			// Operador
			// Acceso a todas las Operaciones de la sesión del usuario
			where := map[string]interface{}{
				operationDB.KeyUserID: userSession.ID,
			}

			if matrixID != 0 {
				where[operationDB.KeyMatrixID] = matrixID
			}

			if groupID != 0 {
				where[operationDB.KeyGroupID] = groupID
			}

			operations, err = operation.Find(where, startDate, finalDate)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else if userSession.Role == constants.GuestUser {
			// Invitado
			// Acceso a todas las Operaciones de la sesión del usuario
			where := map[string]interface{}{
				operationDB.KeyUserID: userSession.ID,
			}

			if matrixID != 0 {
				where[operationDB.KeyMatrixID] = matrixID
			}

			if groupID != 0 {
				where[operationDB.KeyGroupID] = groupID
			}

			operations, err = operation.Find(where, startDate, finalDate)
			if err != nil {
				msgJSON := constants.MsgError{Message: constants.MsgErr}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

		} else {
			// El role de usuario es indefinido.
			return c.NoContent(http.StatusNonAuthoritativeInfo)
		}

		size := len(operations)
		for i := 0; i < size; i++ {
			operations[i].CreatedAtOut = operations[i].CreatedAt.In(location).Format(constants.DateTimeFormat)
		}

		resJSON := constants.ResJSONs{Docs: operations}
		return c.JSON(http.StatusOK, resJSON)
	}

	iID, err := routers.ParseInt(id)
	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	operation := operationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	var operationOne operationDB.Operation

	if userSession.Role == constants.RootUser {
		// Super usuario
		// Acceso a cualquier Operación
		where := map[string]interface{}{operationDB.KeyID: iID}
		operationOne, err = operation.FindOne(where)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.AdminUser {
		// Administrador
		// Acceso a cualquier Operación de un usuario con role de valor inferior
		// o la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)
		operationOne, err = operation.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.OperatorUser {
		// Operador
		// Acceso a cualquier Operación de un usuario con role de valor inferior
		// o la sesión del usuario
		userID := userSession.ID
		value := userSession.Value
		i64 := int64(iID)
		operationOne, err = operation.FindOneByUserOrLowerValue(i64, userID, value)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else if userSession.Role == constants.GuestUser {
		// Invitado
		// Acceso a la Operación relacionada a la sesión del usuario
		userID := userSession.ID
		i64 := int64(iID)
		operationOne, err = operation.FindOneByUser(i64, userID)
		if err != nil {
			msgJSON := constants.MsgError{Message: constants.MsgErr}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		return c.NoContent(http.StatusNonAuthoritativeInfo)
	}

	if operationOne.ID == 0 {
		msg := fmt.Sprintf(constants.MsgNotFoundData, "de la operación")
		msgJSON := constants.MsgError{Message: msg}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	operationOne.CreatedAtOut = operationOne.CreatedAt.In(location).Format(constants.DateTimeFormat)

	resJSON := constants.ResJSON{Doc: operationOne}
	return c.JSON(http.StatusOK, resJSON)
}
