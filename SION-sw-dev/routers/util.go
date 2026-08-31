package routers

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/encrypted"
)

// GetAccessToken ...
func GetAccessToken(userID int64, secret string) string {
	values := map[string]interface{}{
		encrypted.KeyUserID: userID,
		encrypted.KeyClient: constants.WebClient,
	}

	var accessToken string
	var err error
	accessToken, err = encrypted.GetTokenWS(secret, values, constants.IssuerWS)
	if err != nil {
		fmt.Println("view.getAccessToken: ", err)
	}

	return accessToken
}

// ParseInt ... Parse string to int
func ParseInt(value string) (int, error) {
	var err error
	var i int

	if value != "" {
		i, err = strconv.Atoi(value)
		if err != nil {
			fmt.Println("strconv.Atoi.ParseInt: ", err)

			return i, err
		}
	}

	return i, err
}

// GetExtension ...
func GetExtension(name string) string {
	var extension string

	position := strings.LastIndex(name, ".")
	if position == -1 {
		return extension
	}

	bufferOut := []byte{}

	buffer := []byte(name)
	size := len(buffer)
	for i := position; i < size; i++ {
		bufferOut = append(bufferOut, buffer[i])
	}

	extension = string(bufferOut)

	return extension
}
