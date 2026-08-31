package util

import (
	"fmt"

	"github.com/JamsMendez/SION-sw/constants"
	broadcastDB "github.com/JamsMendez/SION-sw/models/broadcast_comment"
	userGroupDB "github.com/JamsMendez/SION-sw/models/user/group"
)

// GetUpdateCommentUsers ...
func GetUpdateCommentUsers(userID, groupID int64) []int64 {
	var users []int64

	broadcast := broadcastDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where := map[string]interface{}{broadcastDB.KeyUserID: userID}
	broadcastOne, err := broadcast.FindOne(where)
	if err != nil {
		fmt.Println("Group.UpdateComment.Broadcast.FindOne: ", err)
	}

	// Broadcast Comments
	if broadcastOne.ID > 0 {
		usersIn := broadcastOne.Users
		size := len(usersIn)
		if size == 0 {
			return users
		}

		userGroup := userGroupDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		for _, bUserID := range usersIn {
			where := map[string]interface{}{
				userGroupDB.KeyGroupID: groupID,
				userGroupDB.KeyUserID:  bUserID,
			}

			userGroups, err := userGroup.Find(where)
			if err != nil {
				fmt.Println("Group.UpdateComment.Broadcast.UserGroup.Find: ", err)
			}

			size = len(userGroups)
			if size > 0 {
				users = append(users, bUserID)
			}
		}
	}

	return users
}
