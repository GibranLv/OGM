package tcp

import (
	"fmt"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/encrypted"
)

func getAccessToken(key, issuer string) string {
	var token string
	var err error

	values := map[string]interface{}{
		encrypted.KeyClient: constants.VarsClient,
	}

	token, err = encrypted.GetTokenTCP(key, values, issuer)
	if err != nil {
		fmt.Println("TCP.getAccessToken.GetTokenTCP: ", err)

		return ""
	}

	return token
}
