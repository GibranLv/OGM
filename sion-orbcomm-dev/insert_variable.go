package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/JamsMendez/SION-orbcomm/request"
	sw "github.com/JamsMendez/SION-sw/constants"
)

// Insert ...
func Insert() {
	reqOne := sw.InsertJSONReq{
		AccessToken: "",
		Variables: []sw.InsertJSON{
			{
				Name:             "PRESION CABEZAL",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "PRESION SUCCION",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "PRESION INTERETAPA",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "PRESION DESC FINAL",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "PRESION ANTICONGELANTE",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "PRES ACEITE COMPRESOR",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TEMP CILINDRO 1",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "°F",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TEMP CILINDRO 2",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "°F",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TEMP ESCAPE CIL 1",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "°F",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TEMP ESCAPE CIL 2",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "°F",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TEMP AGUA COMPRESOR",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "°F",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TEMP AGUA CIL POTENCIA",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "°F",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "VELOCIDAD MOTOR",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "RPM",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "CODIGO DE PARO",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "CP",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "I HRS DE OPERACION",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "HRS",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "LEL 1",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "%",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "LEL 2",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "%",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "DETEC FUEGO 1",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "BOOL",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "DETEC FUEGO 2",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "BOOL",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "H₂S 1",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "PPM",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "H₂S 2",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "PPM",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "FLUJO GAS COMBUSTIBLE",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "MMPCD",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "FLUJO GAS COMB. ACUM",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "MMPCD",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "FLUJO GAS COMB. DIA ANTERIOR",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "MMPCD",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "FLUJO GAS MANEJADO",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "MMPCD",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "FLUJO GAS ACUMULADO",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "MMPCD",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "FLUJO GAS DIA ANTERIOR",
				Device:           "CENIT MTC 1",
				ReadingUnit:      "MMPCD",
				ExpressionInsert: "N/A",
				Status:           true,
			},
		},
	}

	request.InsertVariables(reqOne, "http://134.209.3.69:3003")

	fmt.Println("Finish Insert")
}

// EvalueBool ...
type EvalueBool struct {
	Doc bool `json:"doc"`
}

// EvalueNumber ...
type EvalueNumber struct {
	Doc float64 `json:"doc"`
}

func mainInsert() {
	// Insert3()

	// updates := []sw.UpdateJSON{
	// 	{
	// 		Alias:     "et",
	// 		Value:     316.4010,
	//      Timestamp: "2022-02-21 18:10:07",
	// 	},
	// }
	//
	// r := sw.UpdateJSONReq{
	// 	AccessToken: "",
	// 	Variables:   updates,
	// }
	//
	// request.UpdateVariables(r, "http://138.68.28.188:3003")
	//request.UpdateVariables(r, "http://134.209.3.69:3003")
}

// EvalueExpression ...
func EvalueExpression() bool {
	// Expression ...
	type Expression struct {
		Expression string  `json:"expression"`
		Value      float64 `json:"value"`
	}

	eJSON := Expression{
		Expression: "5 == 5",
	}

	buffer, err := json.Marshal(eJSON)
	if err != nil {
		fmt.Println("EvalueExpression.Marshal: ", err)

		return false
	}

	s := string(buffer)
	body := strings.NewReader(s)
	u := fmt.Sprintf("%s/expression", "http://134.209.3.69:3015")
	res, err := http.Post(u, "application/json", body)
	if err != nil {
		fmt.Println("EvalueExpression.request: ", err)

		return false
	}

	defer res.Body.Close()
	buffer, err = io.ReadAll(res.Body)
	if err != nil {
		fmt.Println("EvalueExpression.ReadAll: ", err)
	}

	fmt.Println(string(buffer))

	response := EvalueBool{}
	err = json.Unmarshal(buffer, &response)
	if err != nil {
		fmt.Println("EvalueExpression.Unmarshal: ", err)

		return false
	}

	return response.Doc
}

// EvalueExpressionValue ...
func EvalueExpressionValue() (float64, bool) {
	// Expression ...
	type Expression struct {
		Expression string  `json:"expression"`
		Value      float64 `json:"value"`
	}

	var value float64

	eJSON := Expression{
		Expression: "((0.0000 != 0 or 0.0000 == 0) or (38.0000 != 0 or 38.0000 == 0) or (173.0000 != 0 or 173.0000 == 0) or (215.0000 != 0 or 215.0000 == 0) or (1326.0000 != 0 or 1326.0000 == 0) or (0.0000 != 0 or 0.0000 == 0) or (0.0000 != 0 or 0.0000 == 0)) * 1",
	}

	buffer, err := json.Marshal(eJSON)
	if err != nil {
		fmt.Println("EvalueExpression.Marshal: ", err)

		return value, false
	}

	s := string(buffer)
	body := strings.NewReader(s)
	//u := fmt.Sprintf("%s/expression", "http://138.68.28.188:3015")
	u := fmt.Sprintf("%s/expression-value", "http://134.209.3.69:3015")
	res, err := http.Post(u, "application/json", body)
	if err != nil {
		fmt.Println("EvalueExpression.request: ", err)

		return value, false
	}

	defer res.Body.Close()
	buffer, err = io.ReadAll(res.Body)
	if err != nil {
		fmt.Println("EvalueExpression.ReadAll: ", err)
	}

	fmt.Println(string(buffer))

	response := EvalueNumber{}
	err = json.Unmarshal(buffer, &response)
	if err != nil {
		fmt.Println("EvalueExpression.Unmarshal: ", err)

		return value, false
	}

	return response.Doc, true
}

// Insert2 ...
func Insert2() {
	reqOne := sw.InsertJSONReq{
		AccessToken: "",
		Variables: []sw.InsertJSON{
			{
				Name:             "VOLTAJE I",
				Device:           "COAPECHACA 24 MTC I",
				ReadingUnit:      "V",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "PRESION ESTATICA FLUJO COMBUSTIBLE",
				Device:           "COAPECHACA 24 MTC I",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "VOLTAJE I",
				Device:           "COAPECHACA 24 MTC II",
				ReadingUnit:      "V",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "PRESION ESTATICA FLUJO COMBUSTIBLE",
				Device:           "COAPECHACA 24 MTC II",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
		},
	}

	//request.InsertVariables(reqOne, "http://138.68.224.153:3003")
	request.InsertVariables(reqOne, "http://134.209.3.69:3003")

	fmt.Println("Finish Insert")
}

// Insert3 ...
func Insert3() {
	reqOne := sw.InsertJSONReq{
		AccessToken: "",
		Variables: []sw.InsertJSON{
			/* {
				Name:   "IV ACUMULADO",
				Device: "GIRALDA PATIN MED ACEITE",
				//ReadingUnit:      "kg/cm²",
				ReadingUnit:      "BLS",
				ExpressionInsert: "N/A",
				Status:           true,
			}, */
			{
				Name:             "LDD",
				Device:           "SAN RAMON 1620",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TP",
				Device:           "SAN RAMON 1620",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TR",
				Device:           "SAN RAMON 1620",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "LDD",
				Device:           "SAN RAMON 525",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TP",
				Device:           "SAN RAMON 525",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TR",
				Device:           "SAN RAMON 525",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "LDD",
				Device:           "SAN RAMON 1619",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TP",
				Device:           "SAN RAMON 1619",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TR",
				Device:           "SAN RAMON 1619",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			/*
				{
					Name:             "LDD",
					Device:           "BLASILLO 537",
					ReadingUnit:      "PSI",
					ExpressionInsert: "N/A",
					Status:           true,
				},
				{
					Name:             "TP",
					Device:           "BLASILLO 537",
					ReadingUnit:      "PSI",
					ExpressionInsert: "N/A",
					Status:           true,
				},
				{
					Name:             "TR",
					Device:           "BLASILLO 537",
					ReadingUnit:      "PSI",
					ExpressionInsert: "N/A",
					Status:           true,
				},
				{
					Name:             "LDD",
					Device:           "BLASILLO 513",
					ReadingUnit:      "PSI",
					ExpressionInsert: "N/A",
					Status:           true,
				},
				{
					Name:             "TP",
					Device:           "BLASILLO 513",
					ReadingUnit:      "PSI",
					ExpressionInsert: "N/A",
					Status:           true,
				},
				{
					Name:             "TR",
					Device:           "BLASILLO 513",
					ReadingUnit:      "PSI",
					ExpressionInsert: "N/A",
					Status:           true,
				},
				{
					Name:             "LDD",
					Device:           "BLASILLO 529",
					ReadingUnit:      "PSI",
					ExpressionInsert: "N/A",
					Status:           true,
				},
				{
					Name:             "TP",
					Device:           "BLASILLO 529",
					ReadingUnit:      "PSI",
					ExpressionInsert: "N/A",
					Status:           true,
				},
				{
					Name:             "TR",
					Device:           "BLASILLO 529",
					ReadingUnit:      "PSI",
					ExpressionInsert: "N/A",
					Status:           true,
				}, */
			/*
				            {
								Name:             "LDD",
								Device:           "SUNUSPA 306",
								ReadingUnit:      "kg/cm²",
								ExpressionInsert: "N/A",
								Status:           true,
							},
							{
								Name:             "TEMP-LDD",
								Device:           "SUNUSPA 306",
								ReadingUnit:      "°C",
								ExpressionInsert: "N/A",
								Status:           true,
							},
			*/
		},
	}

	//request.InsertVariables(reqOne, "http://138.68.28.188:3003")
	// request.InsertVariables(reqOne, "http://138.68.224.153:3003")
	request.InsertVariables(reqOne, "http://137.184.184.187:3003")

	fmt.Println("Finish Insert")
}

// Insert4 ...
func Insert4() {
	reqOne := sw.InsertJSONReq{
		AccessToken: "",
		Variables: []sw.InsertJSON{
			{
				Name:             "LDD",
				Device:           "TOKAL 3",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TP",
				Device:           "TOKAL 3",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TR",
				Device:           "TOKAL 3",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "LDD",
				Device:           "TOKAL 6",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TP",
				Device:           "TOKAL 6",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TR",
				Device:           "TOKAL 6",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "LDD",
				Device:           "TOKAL 23",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TP",
				Device:           "TOKAL 23",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
			{
				Name:             "TR",
				Device:           "TOKAL 23",
				ReadingUnit:      "PSI",
				ExpressionInsert: "N/A",
				Status:           true,
			},
		},
	}

	request.InsertVariables(reqOne, "http://138.68.28.188:3003")

	fmt.Println("Finish Insert")
}
