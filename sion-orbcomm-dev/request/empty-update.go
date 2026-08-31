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

// EmptyUpdateVariables ... Solicitud para actualizar una variable
func EmptyUpdateVariables(req constants.EmptyUpdateJSONReq, sURL string) {
	fmt.Println("EmptyUpdateVariables.REQ: ", req)

	buffer, err := json.Marshal(req)
	if err != nil {
		fmt.Println("EmptyUpdateVariables.Marshal: ", err)

		return
	}

	s := string(buffer)
	body := strings.NewReader(s)
	u := fmt.Sprintf("%s/api/update/empty", sURL)
	u = strings.TrimSpace(u)
	rURL, err := url.Parse(u)
	if err != nil {
		fmt.Println("EmptyUpdateVariables.URL.Parse: ", err)

		return
	}

	res, err := http.Post(rURL.String(), contentType, body)
	if err != nil {
		fmt.Println("EmptyUpdateVariables.HTTP.POST: ", err)

		return
	}

	defer res.Body.Close()
	buffer, err = ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("EmptyUpdateVariables.ReadAll: ", err)
	}

	fmt.Println("UpdateEmpty.RES.JSON: ", string(buffer))

	var update constants.UpdateRes
	err = json.Unmarshal(buffer, &update)
	if err != nil {
		fmt.Println("EmptyUpdateVariables.Unmarshal: ", err)
		return
	}

	if !update.Status {
		fmt.Println("EmptyUpdateVariables.Status: false")
		return
	}

	now := time.Now()
	ts := now.Format(constants.DateTimeFormat)
	fmt.Printf("%d Empty Actualizaciones ...%s\n", update.Updated, ts)
}
