package util

import (
	"fmt"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	eventDB "github.com/JamsMendez/SION-sw/models/event"
	userEventDB "github.com/JamsMendez/SION-sw/models/user/event"
)

// InsertLogEvent ...
func InsertLogEvent(userID int64, typeIn uint8, message string) {
	event := eventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	userEvent := userEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	// Se crear el Evento
	now := time.Now().UTC()

	values := map[string]interface{}{
		eventDB.KeyType:        typeIn,
		eventDB.KeyDescription: message,
		eventDB.KeyCreatedAt:   now,
		eventDB.KeyUpdatedAt:   now,
	}

	eventOne, err := event.Create(values)
	if err != nil {
		fmt.Println("util.InsertLogEvent.event.Create: ", err)

		return
	}

	if eventOne.ID == 0 {
		return
	}

	// Se relaciona el Evento con el Usuario
	values = map[string]interface{}{
		userEventDB.KeyUserID:  userID,
		userEventDB.KeyEventID: eventOne.ID,
		userEventDB.KeyIsSeen:  false,
	}

	userEventOne, err := userEvent.Create(values)
	if err != nil {
		fmt.Println("util.InsertLogEvent.userEvent.Create: ", err)

		return
	}

	if userEventOne.ID == 0 {
		// Se elimina el Evento por no poder relacionarlo con el Usuario
		where := map[string]interface{}{
			eventDB.KeyID: eventOne.ID,
		}

		_, err := event.Remove(where)
		if err != nil {
			fmt.Println("util.InsertLogEvent.event.Remove: ", err)
		}
	}
}
