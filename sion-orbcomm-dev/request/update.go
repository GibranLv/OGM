package request

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

// UpdateVariables ... Solicitud para actualizar una variable
func UpdateVariables(req constants.UpdateJSONReq, sURL string) {
	fmt.Println("UpdateVariables.REQ: ", req)

	buffer, err := json.Marshal(req)
	if err != nil {
		fmt.Println("UpdateVariables.Marshal: ", err)

		return
	}

	s := string(buffer)
	body := strings.NewReader(s)
	u := fmt.Sprintf("%s/api/update", sURL)
	u = strings.TrimSpace(u)
	rURL, err := url.Parse(u)
	if err != nil {
		fmt.Println("UpdateVariables.URL.Parse: ", err)

		return
	}

	res, err := http.Post(rURL.String(), contentType, body)
	if err != nil {
		fmt.Println("UpdateVariables.HTTP.POST: ", err)

		return
	}

	defer res.Body.Close()
	buffer, err = ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("UpdateVariables.ReadAll: ", err)
	}

	fmt.Println("Update.RES.JSON: ", string(buffer))

	var update constants.UpdateRes
	err = json.Unmarshal(buffer, &update)
	if err != nil {
		fmt.Println("UpdateVariables.Unmarshal: ", err)
		return
	}

	if !update.Status {
		fmt.Println("UpdateVariables.Status: false")
		return
	}

	now := time.Now()
	ts := now.Format(constants.DateTimeFormat)
	fmt.Printf("%d Actualizaciones ...%s\n", update.Updated, ts)
}
