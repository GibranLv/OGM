package user

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/JamsMendez/SION-sw/constants"
	configurationDB "github.com/JamsMendez/SION-sw/models/configuration"
	"github.com/JamsMendez/SION-sw/routers/api/middlewares"
)

// UpdateSoundsServer ... Ok!
func UpdateSoundsServer(c echo.Context) error {
	userSession, isAuth := middlewares.HasUserSession(c)
	if !isAuth {
		return c.NoContent(http.StatusUnauthorized)
	}

	configuration := configurationDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	cJSON := configurationDB.Configuration{}

	body, isString := c.Get(constants.KeyBody).(string)
	if !isString {
		fmt.Println("Body is not string")

		msg := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusBadRequest, msg)
	}

	b := []byte(body)

	if err := json.Unmarshal(b, &cJSON); err != nil {
		fmt.Println("configuration.updateSoundsServer.Unmarshal: ", err)

		fmt.Println("JSON: ", string(b))

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	values := map[string]interface{}{}

	if cJSON.MainModule != 0 {
		values[configurationDB.KeyMainModule] = cJSON.MainModule
	}

	where := map[string]interface{}{configurationDB.KeyUserID: userSession.ID}
	configOne, err := configuration.FindOne(where)
	if err != nil {
		fmt.Println("configuration.updateSoundsServer.Configuration.FindOne: ", err)

		msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
		return c.JSON(http.StatusAccepted, msgJSON)
	}

	if configOne.ID == 0 {
		if cJSON.JSONMatrixSoundsIn != "" {
			values[configurationDB.KeyJSONMatrixSounds] = fmt.Sprintf("[%s]", cJSON.JSONMatrixSoundsIn)
		}

		if cJSON.JSONGraphicSoundsIn != "" {
			values[configurationDB.KeyJSONGraphicSounds] = fmt.Sprintf("[%s]", cJSON.JSONGraphicSoundsIn)
		}

		now := time.Now().UTC()

		values[configurationDB.KeyUserID] = userSession.ID
		values[configurationDB.KeyCreatedAt] = now
		values[configurationDB.KeyUpdatedAt] = now

		if _, isOk := values[configurationDB.KeyMainModule]; !isOk {
			values[configurationDB.KeyMainModule] = 0
		}

		if _, isOk := values[configurationDB.KeyJSONMatrixSounds]; !isOk {
			values[configurationDB.KeyJSONMatrixSounds] = "[]"
		}

		if _, isOk := values[configurationDB.KeyJSONGraphicSounds]; !isOk {
			values[configurationDB.KeyJSONGraphicSounds] = "[]"
		}

		configOne, err = configuration.Create(values)
		if err != nil {
			fmt.Println("configuration.updateSoundsServer.Configuration.Create: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

	} else {
		if cJSON.JSONMatrixSoundsIn != "" {
			buffer := []byte(cJSON.JSONMatrixSoundsIn)

			matrixIn := configurationDB.Matrix{}
			err := json.Unmarshal(buffer, &matrixIn)
			if err != nil {
				fmt.Println("configuration.updateSoundsServer.Matrix.Unmarshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			insert := true
			matrices := configOne.JSONMatrixSounds
			size := len(matrices)

			for i := 0; i < size; i++ {
				matrix := matrices[i]
				if matrix.MatrixID == matrixIn.MatrixID {
					matrices[i] = matrixIn
					insert = false
					break
				}
			}

			if insert {
				matrices = append(matrices, matrixIn)
			}

			buffer, err = json.Marshal(matrices)
			if err != nil {
				fmt.Println("configuration.updateSoundsServer.Matrix.Marshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			values[configurationDB.KeyJSONMatrixSounds] = string(buffer)
		}

		if cJSON.JSONGraphicSoundsIn != "" {
			buffer := []byte(cJSON.JSONGraphicSoundsIn)

			graphicIn := configurationDB.Graphic{}
			err := json.Unmarshal(buffer, &graphicIn)
			if err != nil {
				fmt.Println("configuration.updateSoundsServer.Graphic.Unmarshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			insert := true
			graphics := configOne.JSONGraphicSounds
			size := len(graphics)

			for i := 0; i < size; i++ {
				graphic := graphics[i]
				if graphic.GraphicID == graphicIn.GraphicID {
					graphics[i] = graphicIn
					insert = false
					break
				}
			}

			if insert {
				graphics = append(graphics, graphicIn)
			}

			buffer, err = json.Marshal(graphics)
			if err != nil {
				fmt.Println("configuration.updateSoundsServer.Graphic.Marshal: ", err)

				msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
				return c.JSON(http.StatusAccepted, msgJSON)
			}

			values[configurationDB.KeyJSONGraphicSounds] = string(buffer)
		}

		size := len(values)
		if size == 0 {
			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}

		now := time.Now().UTC()

		values[configurationDB.KeyID] = configOne.ID
		values[configurationDB.KeyUpdatedAt] = now

		configOne, err = configuration.Update(values)
		if err != nil {
			fmt.Println("configuration.updateSoundsServer.Configuration.Update: ", err)

			msgJSON := constants.MsgError{Message: constants.MsgBadRequest}
			return c.JSON(http.StatusAccepted, msgJSON)
		}
	}

	resJSON := constants.ResJSON{Doc: configOne}
	return c.JSON(http.StatusOK, resJSON)
}
