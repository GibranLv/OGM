package ws

import (
	"github.com/gorilla/websocket"
)

// Hub ...
type Hub struct {
	clients    map[*Client]bool
	Register   chan *Client
	Unregister chan *Client
}

// NewHub ...
func NewHub() *Hub {
	hub := &Hub{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}

	return hub
}

// Run ...
func (hub *Hub) Run() {
	for {
		select {
		case client := <-hub.Register:
			hub.clients[client] = true

		case client := <-hub.Unregister:
			if _, ok := hub.clients[client]; ok {
				client.close()
				delete(hub.clients, client)
			}
		}
	}
}

// Broadcas ...
func (hub *Hub) Broadcas(buffer []byte) {
	for client := range hub.clients {
		client.sendMessage(websocket.TextMessage, buffer)
	}
}

// EmitToClient ...
func (hub *Hub) EmitToClient(buffer []byte, ID int64) {
	for client := range hub.clients {
		if client.ID == ID {
			client.sendMessage(websocket.TextMessage, buffer)
		}
	}
}

// EmitToClients ...
func (hub *Hub) EmitToClients(buffer []byte, IDs []int64) {
	for _, ID := range IDs {
		for client := range hub.clients {
			if client.ID == ID {
				client.sendMessage(websocket.TextMessage, buffer)
			}
		}
	}
}
