package service

import (
	"encoding/base64"
	"encoding/binary"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"math"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	lastRecordDB "github.com/JamsMendez/SION-orbcomm/models/last_record"
	logDB "github.com/JamsMendez/SION-orbcomm/models/log"
	orbcommDB "github.com/JamsMendez/SION-orbcomm/models/orbcomm"
	orbcommTimeoutDB "github.com/JamsMendez/SION-orbcomm/models/orbcomm_timeout"
	orbcommVarDB "github.com/JamsMendez/SION-orbcomm/models/orbcomm_variable"
	reqDB "github.com/JamsMendez/SION-orbcomm/models/req"
	systemDB "github.com/JamsMendez/SION-orbcomm/models/system"
	"github.com/JamsMendez/SION-orbcomm/request"
	"github.com/JamsMendez/SION-sw/constants"
	lastRecordSWDB "github.com/JamsMendez/SION-sw/models/last_record"
	variableDB "github.com/JamsMendez/SION-sw/models/variable"
)

// DFs ... Variables de detección de fuego
var DFs = []string{"v", "w", "aw", "ax", "bv", "bw", "cu", "cv", "dt", "du", "es", "et", "gm", "gn", "hl", "hm"}

// DFOthers ... Variables de detección de fuego AF II MTC 2
var DFOthers = []string{"ik", "il"}

//KeyInteger ... Es el name de los campos de las variables
const KeyInteger = "Integer"

// StartService ... Servicio General
func StartService(config constants.ConfigServer) {
	for {
		getUpdateOrbcomm(config)

		fmt.Println("Finish ...")

		time.Sleep(time.Second * time.Duration(config.DelayORBCOMM))
	}
}

func getUpdateOrbcomm(config constants.ConfigServer) {
	req := reqDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	where := map[string]interface{}{}
	reqs, err := req.Find(where)
	if err != nil {
		return
	}

	for _, reqOne := range reqs {
		getReq(req, reqOne, config)
	}
}

func getReq(req reqDB.Model, reqOne reqDB.Req, config constants.ConfigServer) {
	u := fmt.Sprintf(orbcommURL, reqOne.AccessID, reqOne.Password, reqOne.NextStartID)
	u = strings.TrimSpace(u)
	rURL, err := url.Parse(u)
	if err != nil {
		fmt.Println("ORBCOMM.URL.Parse.ERROR: ", err)

		return
	}

	response, err := http.Get(rURL.String())
	if err != nil {
		fmt.Println("ORBCOMM.HTTP.GET.ERROR: ", err)

		go func(nodePath, nodeExecPath, system string) {
			msgOut := sendMailWarning(nodePath, nodeExecPath, system)
			fmt.Println("SendMailWarning.Out: ", msgOut)
		}(config.NodePath, config.NodeExecPath, config.System)

		return
	}

	buffer, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println("ORGCOMM.ReadAll: ", err)

		return
	}

	err = response.Body.Close()
	if err != nil {
		fmt.Println("ORGCOMM.Body.Close: ", err)

		return
	}

	var msgsResult getReturnMessagesResult
	err = xml.Unmarshal(buffer, &msgsResult)
	if err != nil {
		fmt.Println("ORGCOMM.XML.Unmarshal: ", err)

		return
	}

	if msgsResult.ErrorID != 0 {
		fmt.Println("ORGCOMM.GetReturnMessagesResult.ErrorID: ", msgsResult.ErrorID)

		return
	}

	updateOrbcomms(msgsResult, config)

	if msgsResult.NextStartID > 0 {
		values := map[string]interface{}{
			reqDB.KeyID:          reqOne.ID,
			reqDB.KeyNextStartID: msgsResult.NextStartID,
		}

		beforeNextStartID := reqOne.NextStartID
		reqOne, err = req.Update(values)
		if err != nil {
			fmt.Println("Req.Update.NextStartID: ", err)
		}

		if reqOne.ID > 0 {
			if reqOne.NextStartID != beforeNextStartID {
				fmt.Println("Req.Update.NextStartID: OK, ", reqOne.NextStartID)
			}
		}
	}
}

func updateOrbcomms(msgsResult getReturnMessagesResult, config constants.ConfigServer) {
	messages := msgsResult.Messages.ReturnMessage

	orbcomm := orbcommDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	orbcommTimeout := orbcommTimeoutDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	system := systemDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	for _, message := range messages {
		fields := message.Payload.Fields.Field
		size := len(fields)
		if size > 0 {
			variables := map[string]string{}
			mobileID := message.MobileID
			timestamp := message.MessageUTC

			isEmpty := true

			for _, field := range fields {
				if field.Value != "" {
					name := field.Name
					isInteger := strings.Contains(name, KeyInteger)
					isParameter := isParameterPanel(name)

					if isInteger || isParameter {
						isEmpty = false
					}
				}

				variables[field.Name] = field.Value
			}

			size := len(variables)
			if size > 0 {
				updateOrbcomm(orbcomm, orbcommTimeout, system, mobileID, timestamp, isEmpty, variables, config)
			}
		}
	}
}

func isParameterPanel(name string) bool {
	hasParameter := strings.Contains(name, "parameter")
	if hasParameter {
		nName := strings.ReplaceAll(name, "parameter", "")
		vInt, err := strconv.Atoi(nName)
		if err == nil {
			if vInt >= 1 && vInt <= 19 {
				return true
			}
		}
	}

	return false
}

func updateOrbcomm(orbcomm orbcommDB.Model, orbcommTimeout orbcommTimeoutDB.Model, system systemDB.Model, mobileID, timestamp string, isEmpty bool, variables map[string]string, config constants.ConfigServer) {
	where := map[string]interface{}{orbcommDB.KeyMobileID: mobileID}
	orbcommOne, err := orbcomm.FindOne(where)
	if err != nil {
		fmt.Println("Orbcomm.FindOne.ERROR: ", err)

		return
	}

	if orbcommOne.ID == 0 {
		fmt.Println("Orbcomm.FindOne: ", mobileID, " Not found")

		return
	}

	if !orbcommOne.Status {
		fmt.Println("Orbcomm.FindOne: ", mobileID, " Inactive")

		return
	}

	insertOrbcommMail(orbcommOne, config)

	/* Timeout */
	where = map[string]interface{}{
		orbcommTimeoutDB.KeyOrbcommID: orbcommOne.ID,
	}

	orbcommTimeouts, err := orbcommTimeout.Find(where)
	if err != nil {
		fmt.Println("OrbcommTimeout.Find: ", err)
	}

	for _, orbcommTimeoutOne := range orbcommTimeouts {
		if orbcommTimeoutOne.ID > 0 {

			values := map[string]interface{}{
				orbcommTimeoutDB.KeyID:        orbcommTimeoutOne.ID,
				orbcommTimeoutDB.KeyIsTimeout: false,
			}

			orbcommTimeoutOne, err = orbcommTimeout.Update(values)
			if err != nil {
				fmt.Println("OrbcommTimeout.Update: ", err)
			}

			if orbcommTimeoutOne.ID > 0 {
				lastRecord := lastRecordDB.Model{
					UserDB: constants.DB.UserO,
					PwdDB:  constants.DB.PwdO,
					NameDB: constants.DB.NameO,
					Host:   constants.DB.HostO,
					Port:   constants.DB.PortO,
					Debug:  true,
				}

				numAffected, err := lastRecord.RemoveByOrbcomm(orbcommOne.ID)
				if err != nil {
					fmt.Println("LastRecord.Remove: ", err)
				}

				fmt.Println("OrbcommTimeout.LastRecord.Removed: ", numAffected)
			}
		}
	}
	/* Timeout */

	where = map[string]interface{}{systemDB.KeyID: orbcommOne.SystemID}
	systemOne, err := system.FindOne(where)
	if err != nil {
		fmt.Println("Orbcomm.FindOne.ERROR: ", err)

		return
	}

	if systemOne.ID == 0 {
		fmt.Println("System.FindOne.NotFound: ", orbcommOne.SystemID)

		return
	}

	insertVarsRecord(systemOne, orbcommOne, isEmpty, variables, timestamp)
}

func insertVarsRecord(systemOne systemDB.System, orbcommOne orbcommDB.Orbcomm, isEmptyXML bool, variables map[string]string, timestamp string) {
	variable := variableDB.Model{
		UserDB: systemOne.User,
		PwdDB:  systemOne.Password,
		NameDB: systemOne.Name,
		Host:   systemOne.Host,
		Port:   systemOne.Port,
		Debug:  true,
	}

	lastRecordSW := lastRecordSWDB.Model{
		UserDB: systemOne.User,
		PwdDB:  systemOne.Password,
		NameDB: systemOne.Name,
		Host:   systemOne.Host,
		Port:   systemOne.Port,
		Debug:  true,
	}

	orbcommVar := orbcommVarDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	logM := logDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	updates := []constants.UpdateJSON{}

	location, err := time.LoadLocation(constants.TZ)
	if err != nil {
		location = time.Local
	}

	timestampUTC, err := time.ParseInLocation(constants.DateTimeFormat, timestamp, time.UTC)
	if err != nil {
		fmt.Println("Orbcomm.InserVarsRecord.ParseInLocation.ERROR: ", err)

		return
	}

	fmt.Println("Input XML", variables)

	// Implementacion de vacios para Orbcomm v2
	isV2 := false

	for key := range variables {
		hasInteger := strings.Contains(key, "Integer")
		hasFloat := strings.Contains(key, "Float")

		if hasInteger || hasFloat {
			isV2 = true
			break
		}
	}

	orbcommVars, err := orbcommVar.FindVariables(orbcommOne.MobileID)
	if err == nil && isV2 {
		for _, orbcommVarOne := range orbcommVars {
			name := orbcommVarOne.Name
			b64, isOK := variables[name]

			hasInteger := strings.Contains(name, "Integer")
			hasFloat := strings.Contains(name, "Float")

			if !isOK {
				// Set value empty for field not send
				if hasInteger || hasFloat {
					variables[name] = b64
				}

			} else {
				if b64 != "" {
					// Parse Int16 to string base64
					if hasInteger {
						vInt, err := strconv.Atoi(b64)
						if err == nil {
							vInt16 := uint16(vInt)

							bInt16 := make([]byte, 2)
							binary.BigEndian.PutUint16(bInt16, vInt16)
							b64 = base64.StdEncoding.EncodeToString(bInt16)

						} else {
							b64 = ""
						}

						variables[name] = b64
					}

					// Parse base64 to buffer length 2 and convert again base64
					if hasFloat {
						if name == "Float1" {
							buffer, err := base64.StdEncoding.DecodeString(b64)
							if err == nil {
								size := len(buffer)
								if size == 4 {
									bInt16 := []byte{buffer[0], buffer[1]}
									b64 = base64.StdEncoding.EncodeToString(bInt16)
								}

							} else {
								b64 = ""
							}

							variables[name] = b64
						}
					}

				}

			}

		}

	} else {
		fmt.Println("SION-orbcomm.OrbcommVar.FindVariables: ", err)
	}

	fmt.Println("Reload XML ", variables)

	sizeVars := len(orbcommVars)

	for name, b64 := range variables {
		var orbcommVarOne orbcommVarDB.OrbcommVariable

		for i := 0; i < sizeVars; i++ {
			vOne := orbcommVars[i]
			if vOne.Name == name {
				orbcommVarOne = vOne
				break
			}
		}

		if orbcommVarOne.ID != 0 {
			where := map[string]interface{}{variableDB.KeyID: orbcommVarOne.VariableID}
			variableOne, err := variable.FindOne(where)
			if err == nil {
				if variableOne.ID != 0 {

					buffer, err := base64.StdEncoding.DecodeString(b64)
					size := len(buffer)

					if err == nil && size == 8 {
						fmt.Println("SION_ORBCOMM.LOG", variableOne.Name, variableOne.Device, "¿¿??", timestampUTC.Format(constants.DateTimeFormat), buffer)

					} else if err == nil && size == 4 {

						var f32 float32

						if orbcommOne.Modbus == "RTU" {
							f32 = bufferRTUToFloat32(buffer)

						} else if orbcommOne.Modbus == "TCP" {
							f32 = bufferTCPToFloat32(buffer)
						}

						if variableOne.ReadingUnit == "MMPCD" {
							f32 = bufferTCPToFloat32(buffer)
						}

						// GAMICO SEPEC
						if variableOne.Device == "GUARICHO 202" {
							if variableOne.ID == 121 || variableOne.ID == 122 {
								f32 = bufferTCPToFloat32(buffer)
							}
						}

						fmt.Printf("#SION_ORBCOMM.LOG,%s.%s,%.4f,%s,%v,%s\n", variableOne.Name, variableOne.Device, f32, timestampUTC.Format(constants.DateTimeFormat), buffer, b64)

						f64 := float64(f32)
						if !math.IsNaN(f64) {

							// PRESIDENTE ALEMAN 1614 FLUJO GAS DIA ANTERIOR
							/*if variableOne.ID == 337 {
								f32 = 0.230
							}*/

							// PRESIDENTE ALEMAN 1365
							/*if variableOne.ID == 362 {
								f32 = 0.443
							}*/

							// CORRALILLO 607 MTC 1 FLUJO GAS COMB. DIA ANTERIOR
							/*if variableOne.ID == 309 {
								f32 = 0.0491
							}*/

							// AGUA FRIA II MTC 3 FLUJO GAS DIA ANTERIOR
							/*if variableOne.ID == 523 {
								f32 = 5.3639
							}*/

							// 1365 FLUJO GAS DIA ANTERIOR
							/*if variableOne.ID == 362 {
								f32 = 0.126
							}*/

							tsTZ := timestampUTC.In(location).Format(constants.DateTimeFormat)

							update := constants.UpdateJSON{
								Alias:     variableOne.Alias,
								Value:     f32,
								Timestamp: tsTZ,
							}

							updates = append(updates, update)

							// InsertLog
							insertLog(logM, variableOne, timestampUTC, tsTZ)
						}

					} else if err == nil && size == 2 {
						var f32 float32

						uInt16 := binary.BigEndian.Uint16(buffer)

						if uInt16 == 65535 {
							uInt16 = 0
						}

						if variableOne.Name == "LEL 1" || variableOne.Name == "LEL 2" {
							if uInt16 < 10 {
								uInt16 = 0
							}
						}

						// PRESIDENTE ALEMAN 1614
						if variableOne.ID == 328 || variableOne.ID == 329 {
							if variableOne.Name == "LEL 1" || variableOne.Name == "LEL 2" {
								if uInt16 < 20 {
									uInt16 = 0
								}
							}
						}

						if variableOne.ID == 200 {
							uInt16 = 0
						}

						// COAPECHACA 24 MTC I
						if variableOne.ID == 19 {
							uInt16 = 0
						}

						// FURBERO MTC I LEL 2
						if variableOne.ID == 52 {
							uInt16 = 0
						}

						// PRESIDENTE ALEMAN 1365 LEL 1
						if variableOne.ID == 353 {
							uInt16 = 0
						}

						// CORRALILLO 624 MTC 2
						if variableOne.ID == 279 {
							uInt16 = 0
						}

						// CORRALILLO 786 MTC 4 LEL 1
						if variableOne.ID == 198 {
							uInt16 = 0
						}

						// PRESIDENTE ALEMAN 1614 LEL 1
						if variableOne.ID == 328 {
							uInt16 = 0
						}

						sInt16 := fmt.Sprintf("%d", uInt16)
						vF64, err := strconv.ParseFloat(sInt16, 32)
						if err != nil {
							fmt.Println("ORBCOMM.InsertVariablesRecord.Buffer.2.Float32: ", err)
						}

						if !math.IsNaN(vF64) {
							f32 = float32(vF64)

							fmt.Println("SION_ORBCOMM.LOG", variableOne.Name, variableOne.Device, f32, timestampUTC.Format(constants.DateTimeFormat), buffer, vF64, f32)

							tsTZ := timestampUTC.In(location).Format(constants.DateTimeFormat)

							// InsertLog
							insertLog(logM, variableOne, timestampUTC, tsTZ)

							// INTERVENSION
							var isDFs bool
							for _, alias := range DFs {
								if variableOne.Alias == alias {
									isDFs = true
									break
								}
							}

							if isDFs {
								if f32 <= 40 {
									f32 = 0
								}

							} else {
								var isDFOthers bool
								for _, alias := range DFOthers {
									if variableOne.Alias == alias {
										isDFOthers = true
										break
									}
								}

								if isDFOthers {
									if f32 > 2 {
										f32 = 2
									}
								}
							}
							// INTERVENSION

							update := constants.UpdateJSON{
								Alias:     variableOne.Alias,
								Value:     f32,
								Timestamp: tsTZ,
							}

							updates = append(updates, update)
						}

					} else if err == nil && size == 0 {
						var f32 float32
						var isEmpty = true

						tsTZ := timestampUTC.In(location).Format(constants.DateTimeFormat)

						if !isEmptyXML {

							if variableOne.Name == "VELOCIDAD MOTOR" {
								fmt.Println(variableOne.Device, variableOne.Name, isEmptyXML, variables)
							}

							if variableOne.Name == "VELOCIDAD MOTOR" {
								where := map[string]interface{}{
									lastRecordSWDB.KeyVariableID: variableOne.ID,
									lastRecordSWDB.KeyIsCustom:   false,
								}

								recordOne, err := lastRecordSW.FindOne(where)
								if err != nil {
									fmt.Printf("%s.VELOCIDAD MOTOR ERROR: %s\n", variableOne.Device, err.Error())
								}

								if recordOne.ID > 0 {
									f64 := recordOne.Value
									f32 = float32(f64)
								}
							}
						}

						update := constants.UpdateJSON{
							Alias:     variableOne.Alias,
							Value:     f32,
							Timestamp: tsTZ,
							IsEmpty:   isEmpty,
						}

						updates = append(updates, update)
					}

				} else {
					fmt.Println("Orbcomm.InserVarsRecord.Variable.FindOne.NotFound: ", err)
				}

			} else {
				fmt.Println("Orbcomm.InserVarsRecord.Variable.FindOne.ERROR: ", err)
			}

		} else {
			fmt.Println("Orbcomm.InserVarsRecord.FindOneVariable.NotFound: ", err)
		}

		/* /////w== */
	}

	if len(updates) > 0 {
		r := constants.UpdateJSONReq{
			AccessToken: "",
			Variables:   updates,
		}

		go request.UpdateVariables(r, systemOne.URL)
	}
}
