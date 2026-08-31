package service

import (
	"encoding/json"
	"fmt"
	"os/exec"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

// sendMailOrbcomm ...
func sendMailOrbcomm(nodePath, nodeExecPath, note, system string) string {
	var res string

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	now := time.Now().In(location).Format(constants.DateTimeFormat)

	content := constants.EmailContent{
		From:    "support_ogm@technotex.com",
		To:      "jamsmendez02@gmail.com, majestyunic@gmail.com",
		Subject: "OGM: ORBCOMM DISCONNECTION",
		HTML:    fmt.Sprintf("DISCONNECTION ORBCOMM ID: %s  %s", note, now),
	}

	if system == "SEPEC" {
		content.To = fmt.Sprintf("%s, scada@technotex.com", content.To)
	}

	buffer, err := json.Marshal(content)
	if err != nil {
		msg := "Ocurrió un error al obtener la información para notificar estado del Orbcomm"
		return msg
	}

	oJSON := string(buffer)
	cmd := exec.Command(nodePath, "mail", oJSON)
	cmd.Dir = nodeExecPath
	buffer, err = cmd.CombinedOutput()
	if err != nil {
		fmt.Println("SendMail.cmd.CombinedOutput: ", err)

		msg := "Ocurrió un error al enviar el correo electrónico para notificar estado del Orbcomm"
		return msg
	}

	res = string(buffer)
	res = strings.ReplaceAll(res, " ", "")
	res = strings.ReplaceAll(res, "\n", "")

	fmt.Println("SendMail.CombinedOutput: ", res)

	if res != "" {
		msg := "Algo salió mal al enviar el correo electrónico para notificar estado del Orbcomm"
		return msg
	}

	return res
}
