package tcp

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-ws/authentication"
)

// Tipos de clientes
const (
	carReturn = 13
	newLine   = 10

	keyClient = "client"
)

// client ... Cliente TCP
type client struct {
	conn   net.Conn
	server *Server

	isReadOpen bool
	read       chan []byte

	value   string
	address string
}

// listen ... Inicia la lectura de mensajes de cliente
func (c *client) listen() {
	c.read = make(chan []byte)
	c.isReadOpen = true

	go c.reading()
	go c.getMessages()
}

func (c *client) send(msg string) {
	buffer := []byte(msg)
	size := len(buffer)

	if size == 0 {
		return
	}

	_, err := c.conn.Write(buffer)
	if err != nil {
		fmt.Println("client.write.error: ", err)
	}
}

// reading ... Recibe los mensajes si estos existen
func (c *client) reading() {
	var pkg []byte

	for {
		buffer := make([]byte, 64)
		size, err := c.conn.Read(buffer)
		if err != nil {
			break
		}

		for i := 0; i < size; i++ {
			b := buffer[i]
			if b == newLine {
				if c.isReadOpen {
					c.read <- pkg
				}

				pkg = []byte{}

			} else {
				if b != carReturn {
					pkg = append(pkg, buffer[i])
				}
			}
		}
	}

	// Si llego a perder la conexión se cierra el canal del lectura
	c.close()
}

func (c *client) close() {
	if c.isReadOpen {
		c.isReadOpen = false
		close(c.read)
	}

	err := c.conn.Close()
	if err != nil {
		fmt.Println("client.close.error: ", err)
	}

	c.server.removeConnection(c)
}

func (c *client) getMessages() {
	for buffer := range c.read {
		if c.isAuth(buffer) {
			// go c.processMessage(buffer)
			c.processMessage(buffer)
		} else {
			c.close()
		}
	}
}

func (c *client) processMessage(buffer []byte) {
	// Se obtiene el ContentJSON
	cJSON := constants.ContentJSON{}
	err := json.Unmarshal(buffer, &cJSON)
	if err != nil {
		fmt.Printf("Solicitud invalida, Cliente tipo: %s\n", c.value)
	}

	// Eventos del servicio de variables
	if c.value == constants.VarsClient {
		// Actualización de variables
		if cJSON.Event == constants.EventUpdateVars {
			cJSONOut := constants.ContentJSON{
				Event:   constants.EventUpdateVarsValue,
				Content: cJSON.Content,
			}

			buffer, err := json.Marshal(cJSONOut)
			if err != nil {
				fmt.Println("tcp.processMessage.EventUpdateVars.Marshal: ", err)
				return
			}

			c.server.Hub.Broadcas(buffer)

		} else if cJSON.Event == constants.EventEmptyUpdateVars {
			cJSONOut := constants.ContentJSON{
				Event:   constants.EventEmptyUpdateVarsValue,
				Content: cJSON.Content,
			}

			buffer, err := json.Marshal(cJSONOut)
			if err != nil {
				fmt.Println("tcp.processMessage.EventEmptyUpdateVars.Marshal: ", err)
				return
			}

			c.server.Hub.Broadcas(buffer)

		} else {
			fmt.Println("Client: Not Found ", cJSON.Event)
		}

	} else {
		fmt.Println("Client isn't VarsClient")
	}

	/*if c.value == constants.VarsClient {
		// Eventos del servicio de variables

		// Actualización de variables
		if cJSON.Event == constants.EventUpdateVars {
			buffer, err := json.Marshal(cJSON.Content)
			if err != nil {
				fmt.Println("tcp.processMessage.EventUpdateVars.Marshal: ", err)
				return
			}

			c.server.Hub.Broadcas(buffer)
		}

	} else if c.auth == 5 {
		if cJSON.Event == constants.EventTimeoutVars {
			buffer, err := json.Marshal(cJSON.Content)
			if err != nil {
				fmt.Println("tcp.processMessage.EventUpdateVars.Marshal: ", err)
				return
			}

			c.server.Hub.Broadcas(buffer)
		}

	} else if c.auth == 10 {
		// Eventos del servicio de GPS

		// Actualización de vehiculo
		if cJSON.Event == constants.EventUpdateVehicle {
			buffer, err := json.Marshal(cJSON.Content)
			if err != nil {
				fmt.Println("tcp.processMessage.EventUpdateVehicle.Marshal: ", err)
				return
			}

			c.server.Hub.Broadcas(buffer)
		}
	}*/

}

func (c *client) isAuth(buffer []byte) bool {
	var isAuth bool

	if c.value == constants.VarsClient {
		isAuth = true

		return isAuth
	}

	login := constants.LogInTCP{}
	err := json.Unmarshal(buffer, &login)
	if err != nil {
		fmt.Println("tcp.Client.isAuth.LogInTCP.Unmarshal: ", err)

		return isAuth
	}

	if login.Client == constants.VarsClient {
		var values map[string]interface{}
		values, isAuth = authentication.LogInOfService(login.AccessToken, c.server.SecretAccessToken)
		if isAuth {
			if value, isOk := values[keyClient]; isOk {
				if v, isString := value.(string); isString {
					c.value = v

					cJSON := constants.ContentJSON{
						Event:   constants.EventAuth,
						Content: http.StatusOK,
					}

					buffer, err := json.Marshal(cJSON)
					if err == nil {
						buffer = append(buffer, carReturn, newLine)
						msg := string(buffer)
						c.send(msg)

					} else {
						fmt.Println("tcp.Client.isAuth.LogInTCP.EventAuth.Marshal: ", err)
					}

				}
			}
		} else {
			fmt.Println("tcp.Client.isAuth.LogInOfService: ", values, isAuth)
		}
	}

	return isAuth
}
