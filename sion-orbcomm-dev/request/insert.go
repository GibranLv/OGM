package request

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	sw "github.com/JamsMendez/SION-sw/constants"
)

// InsertVariables ... Solicitud para insertar una variable
func InsertVariables(req sw.InsertJSONReq, url string) {
	buffer, err := json.Marshal(req)
	if err != nil {
		fmt.Println("InsertVariables.Marshal: ", err)

		return
	}

	s := string(buffer)
	body := strings.NewReader(s)
	u := fmt.Sprintf("%s/api/insert", url)
	res, err := http.Post(u, "application/json", body)
	if err != nil {
		fmt.Println("InsertVariables.request: ", err)

		return
	}

	defer res.Body.Close()
	buffer, err = ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("InsertVariables.ReadAll: ", err)
	}

	fmt.Println("Insert.RES.JSON: ", string(buffer))
}
