package service

import (
	"encoding/json"
	"fmt"
	"os/exec"
	"strings"

	"github.com/JamsMendez/SION-sw/constants"
)

// sendMailOrbcomm ...
func sendMailOrbcomm(nodePath, nodeExecPath, note, system string) string {
	var res string

	content := constants.EmailContent{
		From:    "support_ogm@technotex.com",
		To:      "jamsmendez02@gmail.com, majestyunic@gmail.com",
		Subject: "OGM: ORBCOMM RECONNECTION",
		HTML:    fmt.Sprintf("RECONNECTION OK ORBCOMM ID: %s", note),
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

// sendMailWarning ...
func sendMailWarning(nodePath, nodeExecPath, system string) string {
	var res string

	content := constants.EmailContent{
		From:    "support_ogm@technotex.com",
		To:      "jamsmendez02@gmail.com, majestyunic@gmail.com",
		Subject: "OGM: ORBCOMM API WARNING",
		HTML:    "ERROR: En la solicitud de la API Orbcomm",
	}

	if system == "SEPEC" {
		content.To = fmt.Sprintf("%s, scada@technotex.com", content.To)
	}

	buffer, err := json.Marshal(content)
	if err != nil {
		msg := "Ocurrió un error al obtener la información para notificar estado de la API Orbcomm"
		return msg
	}

	oJSON := string(buffer)
	cmd := exec.Command(nodePath, "mail", oJSON)
	cmd.Dir = nodeExecPath
	buffer, err = cmd.CombinedOutput()
	if err != nil {
		fmt.Println("sendMailWarning.cmd.CombinedOutput: ", err)

		msg := "Ocurrió un error al enviar el correo electrónico para notificar estado de la API Orbcomm"
		return msg
	}

	res = string(buffer)
	res = strings.ReplaceAll(res, " ", "")
	res = strings.ReplaceAll(res, "\n", "")

	fmt.Println("sendMailWarning.CombinedOutput: ", res)

	if res != "" {
		msg := "Algo salió mal al enviar el correo electrónico para notificar estado de la API Orbcomm"
		return msg
	}

	return res
}
