package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/JamsMendez/SION-sw/constants"
	"github.com/JamsMendez/SION-sw/encrypted"
)

// Costants of params
const (
	KeyExpired = "expired"
	KeyUserID  = "user_id"
	KeyClient  = "client"
)

func getAPIVariables() {
	key := "CGiIp4sVWry4Wr4E9qtv1VyuSGMuKuk5Kup"
	values := map[string]interface{}{
		constants.KeyUserID: "51",
	}

	ss, err := encrypted.GetTokenAPIv2(key, values, "api-v2.issue")
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(ss)

	var url string = "https://sepec.technotex.com/api/variables/all/last_record"

	client := http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("HTTP.NewRquest: ", err)
	}

	req.Header = http.Header{
		"Content-Type":  {"application/json"},
		"Authorization": {ss},
	}

	res, err := client.Do(req)
	if err != nil {
		fmt.Println("Client.Do.ERROR: ", err)
	}

	fmt.Println(res.StatusCode)

	defer res.Body.Close()

	buffer, _ := io.ReadAll(res.Body)
	var oJSON map[string]interface{}
	json.Unmarshal(buffer, &oJSON)

	fmt.Println(oJSON)

	// key := "1234567890123456789012345678"
	// ss := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsIm5iZiI6MTY3NTEwNzc4MSwiZXhwIjoxNjc1MTA3ODQxLCJpYXQiOjE2NzUxMDc3ODF9.oo0gCprM-1IESz4ZwatA9o4ANXQTONm5yEYuo2PZ-TI"
	//
	// for {
	// 	values, err := encrypted.ParseAccessTokenAPIv2(key, ss)
	// 	if err != nil {
	// 		fmt.Println(err)
	// 		return
	// 	}
	//
	// 	fmt.Println("values: ", values)
	// 	time.Sleep(time.Second * 1)
	// }

	hash, err := encrypted.HashPassword("$4dmin1910@")
	if err != nil {
		return
	}

	fmt.Println("Hash: ", hash)
}
