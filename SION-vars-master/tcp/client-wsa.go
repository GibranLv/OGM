package tcp

import (
	"encoding/json"
	"fmt"
	"net"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

// ClientWSA ... Estructura del Cliente WSA
type ClientWSA struct {
	conn       net.Conn
	read       chan []byte
	isOpenRead bool

	isAuth bool

	URL               string
	SecretAccessToken string
	Connected         bool
}

// Connect ... Realiza la conexión a un servidor TCP
func (client *ClientWSA) Connect() {
	for {
		conn, err := net.DialTimeout(connTCP, client.URL, time.Second*5)
		if err == nil {
			fmt.Printf("ClientWSA TCP running on %s\n", client.URL)

			client.conn = conn
			break
		}

		fmt.Println("ClientWSA.Connect.DialTimeout.error: ", err)

		time.Sleep(time.Second * 10)
	}

	client.listen()
}

// Send ... Envia información al Servidor TCP
func (client *ClientWSA) Send(message string) {
	if !client.isAuth {
		login := constants.LogInTCP{
			Client:      constants.VarsClient,
			AccessToken: getAccessToken(client.SecretAccessToken, constants.IssuerWSA),
		}

		buffer, err := json.Marshal(login)
		if err != nil {
			fmt.Println("ClientWSA.Send.Marshal: ", err)

			return
		}

		buffer = append(buffer, carReturn, newLine)
		_, err = client.conn.Write(buffer)
		if err != nil {
			fmt.Println("ClientWSA.Send.conn.Write.error: ", err)
		}

		return
	}

	buffer := []byte(message)
	buffer = append(buffer, carReturn, newLine)

	_, err := client.conn.Write(buffer)
	if err != nil {
		fmt.Println("ClientWSA.Send.conn.Write.error: ", err)
	}
}

// Close ... Cierra la conexión con el Servidor TCP
func (client *ClientWSA) Close() (err error) {
	if client.isOpenRead {
		client.isOpenRead = false

		close(client.read)
	}

	if client.isAuth {
		client.isAuth = false
	}

	err = client.conn.Close()
	if err != nil {
		fmt.Println("ClientWSA.Close.error: ", err)
	}

	return err
}

// listen ... Iniciar el Cliente TCP
func (client *ClientWSA) listen() {
	client.read = make(chan []byte)
	client.isOpenRead = true
	client.Connected = true

	go client.reading()

	for buffer := range client.read {
		cJSON := constants.ContentJSON{}

		err := json.Unmarshal(buffer, &cJSON)
		if err == nil {
			if cJSON.Event == constants.EventAuth {
				if value, isFloat := cJSON.Content.(float64); isFloat {
					if value == constants.StatusOk {
						client.isAuth = true

						fmt.Println("ClientWSA Autentificado")
					}
				}
			}
		} else {
			fmt.Println("ClientWSA.listen.Unmarshal: ", err)
		}
	}

	client.Connect()
}

// reading ... Recibe los paquetes del Servidor TCP
func (client *ClientWSA) reading() {
	var pkg []byte

	for {
		buffer := make([]byte, sizeRead)
		size, err := client.conn.Read(buffer)
		if err != nil {
			break
		}

		for i := 0; i < size; i++ {
			b := buffer[i]
			if b == newLine {
				if client.isOpenRead {
					client.read <- pkg
				}

				pkg = []byte{}

			} else {
				if b != carReturn {
					pkg = append(pkg, buffer[i])
				}
			}
		}
	}

	client.Connected = false
	client.Close()
}
