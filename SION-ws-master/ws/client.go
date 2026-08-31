package ws

import (
	"encoding/json"
	"fmt"

	"github.com/gorilla/websocket"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-ws/util"
)

// Client ...
type Client struct {
	Conn *websocket.Conn
	Hub  *Hub

	isOpenRead bool
	read       chan []byte

	ID int64
}

// Listen ...
func (c *Client) Listen() {
	c.read = make(chan []byte)
	c.isOpenRead = true

	go c.reading()
	go c.getMessages()
}

func (c *Client) close() {
	if c.isOpenRead {
		c.isOpenRead = false
		close(c.read)
	}

	err := c.Conn.Close()
	if err != nil {
		fmt.Println("Client.close.error: ", err)
	}
}

func (c *Client) sendMessage(mType int, buffer []byte) {
	err := c.Conn.WriteMessage(mType, buffer)
	if err != nil {
		fmt.Println("Client.sendMessage.error: ", err)
	}
}

func (c *Client) reading() {
	var buffer []byte
	var mType int
	var err error

	for {
		mType, buffer, err = c.Conn.ReadMessage()
		if err != nil {
			break
		}

		hasContent := mType == websocket.BinaryMessage || mType == websocket.TextMessage
		if hasContent && c.isOpenRead {
			c.read <- buffer
		}
	}

	c.Hub.Unregister <- c
}

func (c *Client) getMessages() {
	for buffer := range c.read {
		c.processMessage(buffer)
	}
}

func (c *Client) processMessage(buffer []byte) {
	cJSON := constants.ContentJSON{}
	err := json.Unmarshal(buffer, &cJSON)
	if err != nil {

		resJSON := constants.ContentJSON{
			Err:     true,
			Content: constants.MsgBadRequest,
		}

		bs, err := json.Marshal(resJSON)
		if err == nil {
			c.sendMessage(websocket.TextMessage, bs)
		}

	} else {
		if cJSON.Event == constants.EventUpdateCommenGroup {
			bufferIn, err := json.Marshal(cJSON.Content)
			if err == nil {
				var commentOne constants.CommentJSON
				err := json.Unmarshal(bufferIn, &commentOne)
				if err == nil {
					if commentOne.GroupID > 0 {
						users := util.GetUpdateCommentUsers(c.ID, commentOne.GroupID)
						size := len(users)
						if size > 0 {
							resJSON := constants.ContentJSON{
								Event:   constants.EventUpdateCommenGroup,
								Content: commentOne,
							}

							bs, err := json.Marshal(resJSON)
							if err == nil {
								c.Hub.EmitToClients(bs, users)
							}
						}
					}
				}
			}
		}
	}
}
