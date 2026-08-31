package tcp

import (
	"fmt"
	"net"

	"github.com/JamsMendez/SION-ws/ws"
)

const connType = "tcp"

// Server ... Estructura del servidor TCP
type Server struct {
	server  net.Listener
	clients map[*client]bool

	Hub *ws.Hub

	Port              string
	SecretAccessToken string
}

// Run ... Se inicia el servidor TCP
func (s *Server) Run() {
	address := fmt.Sprintf(":%s", s.Port)

	var err error
	s.server, err = net.Listen(connType, address)
	if err != nil {
		fmt.Println("Server.New.Listen.error: ", err)
	}

	defer s.close()

	// Se inicia el mapa de clientes
	s.clients = map[*client]bool{}

	fmt.Printf("Servidor TCP escuchando, puerto %s ...\n", s.Port)

	for {
		conn, err := s.server.Accept()
		if err != nil {
			fmt.Println("Server.New.Accept.error: ", err)

		} else {
			// Se crean nuevos clientes y se agregan al map
			clientOne := client{conn: conn, server: s}
			s.clients[&clientOne] = true
			go clientOne.listen()

			fmt.Println("Cliente TCP conectado ...")
		}
	}
}

// Le dice al Hub que mande un mensaje a todos los clientes
func (s *Server) hubBroadcast(msg string) {
	buffer := []byte(msg)
	s.Hub.Broadcas(buffer)
}

// Elimina del map un cliente registrado
func (s *Server) removeConnection(c *client) {
	delete(s.clients, c)

	fmt.Println("Cliente TCP desconectado ...")
}

func (s *Server) close() {
	for client := range s.clients {
		client.close()
	}

	err := s.server.Close()
	if err != nil {
		fmt.Println("Server.close.error: ", err)
	}
}
