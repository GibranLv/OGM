package service

import (
	"encoding/base64"
	"encoding/binary"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"math"
	"math/rand"
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
	incrementalDB "github.com/JamsMendez/SION-orbcomm/models/variable_incremental"
	overwriteDB "github.com/JamsMendez/SION-orbcomm/models/variable_overwrite"
	"github.com/JamsMendez/SION-orbcomm/request"
	"github.com/JamsMendez/SION-sw/constants"

	//lastRecordSWDB "github.com/JamsMendez/SION-sw/models/last_record"

	variableDB "github.com/JamsMendez/SION-sw/models/variable"
)

// KeyInteger ... Es el name de los campos de las variables
const KeyInteger = "Integer"

/* var varsCostero = []string{
	"nz",
	"oa",
	"ob",
	"od",
	"oe",
	"of",
	"og",
	"oh",
	"oi",
	"oj",
	"ok",
	"ol",
	"om",
	"on",
	"oo",
	"or",
	"os",
	"ot",
	"ou",
	"ov",
	"ow",
	"ox",
	"oy",
	"oz",
	"pa",
	"pb",
	"pc",
	"pd",
	"pe",
	"pf",
	"pg",
	"ph",
	"pi",
	"pj",
	"pk",
	"qu",
	"rb",
	"rc",
	"rd",
	"re",
	"rf",
	"rg",
	"rh",
	"ri",
	"rj",
	"rk",
	"rl",
	"rm",
}

var isRepeater = true
*/

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

		/* 		go func(nodePath, nodeExecPath, system string) {
		   			msgOut := sendMailWarning(nodePath, nodeExecPath, system)
		   			fmt.Println("SendMailWarning.Out: ", msgOut)
		   		}(config.NodePath, config.NodeExecPath, config.System)
		*/
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

	} else {
		fmt.Println("Req.Update.NextStartID: IS ZERO ", time.Now())
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
					//name := field.Name
					//isInteger := strings.Contains(name, KeyInteger)
					//isParameter := isParameterPanel(name)

					//if isInteger || isParameter {
					isEmpty = false
					//}
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

/*func isParameterPanel(name string) bool {
	hasParameter := strings.Contains(name, "parameter")
	if hasParameter {
		nName := strings.ReplaceAll(name, "parameter", "")
		vInt, err := strconv.Atoi(nName)
		if err == nil {
			if vInt >= 1 && vInt <= 19 {
				return true
			}

			if vInt >= 101 && vInt <= 118 {
				return true
			}
		}
	}

	return false
}*/

func updateOrbcomm(orbcomm orbcommDB.Model, orbcommTimeout orbcommTimeoutDB.Model, system systemDB.Model, mobileID, timestamp string, isEmpty bool, variables map[string]string, config constants.ConfigServer) {
	where := map[string]interface{}{orbcommDB.KeyMobileID: mobileID}
	orbcomms, err := orbcomm.Find(where)
	if err != nil {
		fmt.Println("Orbcomm.FindOne.ERROR: ", err)

		return
	}

	if len(orbcomms) == 0 {
		fmt.Println("Orbcomm.FindOne: ", mobileID, " Not found")

		return
	}

	for _, orbcommOne := range orbcomms {

		if !orbcommOne.Status {
			fmt.Println("Orbcomm.FindOne: ", mobileID, " Inactive")

			return
		}

		insertOrbcommMail(orbcommOne, config)

		/* Timeout */
		where = map[string]interface{}{
			orbcommTimeoutDB.KeyOrbcommID: orbcommOne.ID,
		}

		orbcommTimeoutOne, err := orbcommTimeout.FindOne(where)
		if err != nil {
			fmt.Println("OrbcommTimeout.FindOne: ", err)
		}

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

	overwrite := overwriteDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	/*lastRecordSW := lastRecordSWDB.Model{
		UserDB: systemOne.User,
		PwdDB:  systemOne.Password,
		NameDB: systemOne.Name,
		Host:   systemOne.Host,
		Port:   systemOne.Port,
		Debug:  true,
	}*/

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

	incremental := incrementalDB.Model{
		UserDB: constants.DB.UserO,
		PwdDB:  constants.DB.PwdO,
		NameDB: constants.DB.NameO,
		Host:   constants.DB.HostO,
		Port:   constants.DB.PortO,
		Debug:  true,
	}

	updates := []constants.UpdateJSON{}
	// updates2 := []constants.UpdateJSON{}

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
	/*isV2 := false

	for key := range variables {
		hasInteger := strings.Contains(key, "Integer")
		hasFloat := strings.Contains(key, "Float")

		if hasInteger || hasFloat {
			isV2 = true
			break
		}
	}*/

	/*orbcommVars, err := orbcommVar.FindVariables(orbcommOne.MobileID)
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
	}*/

	fmt.Println("Reload XML ", variables)

	orbcommVars, err := orbcommVar.FindVariables(orbcommOne.MobileID)
	if err != nil {
		fmt.Println("OrbcommVariable.FindVariables.ERROR: ", err)
	}

	sizeVars := len(orbcommVars)

	// Actualizaciones de overwrites
	where := map[string]interface{}{overwriteDB.KeyStatus: true}
	overwrites, err := overwrite.Find(where)
	if err != nil {
		fmt.Println("VariableOverwrite.Find.ERROR: ", err)
	}

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

						/*if variableOne.ReadingUnit == "MMPCD" || variableOne.ReadingUnit == "PSI" {
							f32 = bufferTCPToFloat32(buffer)
						}*/

						/*
							if variableOne.Device == "PATIN_MED_GAS" {
								if variableOne.ID == 1421 || variableOne.ID == 1422 {
									uInt32 := binary.BigEndian.Uint32(buffer)
									f32 = float32(float64(uInt32) * 0.01)
								}

								if variableOne.ID == 1423 || variableOne.ID == 1468 {
									uInt32 := binary.BigEndian.Uint32(buffer)
									f32 = float32(float64(uInt32) * 0.00001)
								}

								if variableOne.ID == 1417 || variableOne.ID == 1432 {
									uInt32 := binary.BigEndian.Uint32(buffer)
									f32 = float32(float64(uInt32) * 0.0001)
								}
							}

							if variableOne.Device == "GIRALDAS MODULO 1" || variableOne.Device == "GIRALDAS MODULO 2" {
								if variableOne.ID == 1484 || variableOne.ID == 1485 || variableOne.ID == 1486 || variableOne.ID == 1478 || variableOne.ID == 1479 || variableOne.ID == 1480 {
									f32 = f32 * 0.001
								}
							}
						*/

						// GAMICO SEPEC
						// if variableOne.Device == "CINCO PRESIDENTES 12" {
						// 	if variableOne.ID == 254 || variableOne.ID == 255 {
						// 		f32 = bufferTCPToFloat32(buffer)
						// 	}
						// }

						fmt.Printf("#SION_ORBCOMM.LOG,%s.%s,%.4f,%s,%v,%s\n", variableOne.Name, variableOne.Device, f32, timestampUTC.Format(constants.DateTimeFormat), buffer, b64)

						f64 := float64(f32)
						if !math.IsNaN(f64) {

							for _, overwriteOne := range overwrites {
								if overwriteOne.Status && overwriteOne.VariableID == variableOne.ID {
									// Sumar a la lectura
									if overwriteOne.Operator == "+" {
										f32 = f32 + float32(overwriteOne.ValueI)

										// Restar a la lectura
									} else if overwriteOne.Operator == "-" {
										f32 = f32 - float32(overwriteOne.ValueI)

										// Reescribir la lectura
									} else if overwriteOne.Operator == "=" {
										f32 = float32(overwriteOne.ValueI)

										// Generar valores
									} else if overwriteOne.Operator == "xf" {
										rand.Seed(time.Now().UnixNano())

										var valueMax = overwriteOne.ValueF
										var valueMin = overwriteOne.ValueI

										valueInsert := valueMin + rand.Float64()*(valueMax-valueMin)
										f32 = float32(ToFixed(valueInsert, 4))
									}
								}
							}

							tsTZ := timestampUTC.In(location).Format(constants.DateTimeFormat)

							update := constants.UpdateJSON{
								Alias:     variableOne.Alias,
								Value:     f32,
								Timestamp: tsTZ,
							}

							updates = append(updates, update)

							// REPLIQUE
							/*
								for _, alias := range varsCostero {
									if alias == update.Alias {
										updates2 = append(updates2, update)
										break
									}
								}
							*/

							// InsertLog
							insertLog(logM, incremental, variableOne, timestampUTC, f32, tsTZ)
							// Update variable timeout inactives
							updateTimeoutActive(variableOne.ID, false)
						}

					} else if err == nil && size == 2 {
						var f32 float32

						uInt16 := binary.BigEndian.Uint16(buffer)

						for _, overwriteOne := range overwrites {
							if overwriteOne.Status && overwriteOne.VariableID == variableOne.ID {
								// Sumar a la lectura
								if overwriteOne.Operator == "+" {
									uInt16 = uInt16 + uint16(overwriteOne.ValueI)

									// Restar a la lectura
								} else if overwriteOne.Operator == "-" {
									uInt16 = uInt16 - uint16(overwriteOne.ValueI)

									// Reescribir la lectura
								} else if overwriteOne.Operator == "=" {
									uInt16 = uint16(overwriteOne.ValueI)

									// Generar valores
								} else if overwriteOne.Operator == "xf" {
									rand.Seed(time.Now().UnixNano())

									var valueMax = overwriteOne.ValueF
									var valueMin = overwriteOne.ValueI

									valueInsert := valueMin + rand.Float64()*(valueMax-valueMin)
									uInt16 = uint16(valueInsert)
								}
							}
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
							insertLog(logM, incremental, variableOne, timestampUTC, f32, tsTZ)
							// Update variable timeout inactives
							updateTimeoutActive(variableOne.ID, false)

							update := constants.UpdateJSON{
								Alias:     variableOne.Alias,
								Value:     f32,
								Timestamp: tsTZ,
							}

							updates = append(updates, update)

							/*
								// REPLIQUE
								if isRepeater {
									for _, alias := range varsCostero {
										if alias == update.Alias {
											updates2 = append(updates2, update)
											break
										}
									}
								}
							*/
						}

					}
					/*else if err == nil && size == 0 {
						var f32 float32
						var isEmpty = true

						tsTZ := timestampUTC.In(location).Format(constants.DateTimeFormat)

						update := constants.UpdateJSON{
							Alias:     variableOne.Alias,
							Value:     f32,
							Timestamp: tsTZ,
							IsEmpty:   isEmpty,
						}

						updates = append(updates, update)

						// REPLIQUE
						for _, alias := range varsCostero {
							if alias == update.Alias {
								updates2 = append(updates2, update)
								break
							}
						}
					} */

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

		/*
			r2 := constants.UpdateJSONReq{
				AccessToken: "",
				Variables:   updates2,
			}
		*/

		go request.UpdateVariables(r, systemOne.URL)

		/*
			if isRepeater {
				go request.UpdateVariables(r2, "http://138.68.28.188:3003")
			}
		*/
	}
}
