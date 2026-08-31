package node

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/JamsMendez/SION-sw/constants"
)

// EvalueBool ...
type EvalueBool struct {
	Doc bool `json:"doc"`
}

// EvalueNumber ...
type EvalueNumber struct {
	Doc float64 `json:"doc"`
}

// Expression ...
type Expression struct {
	Expression string `json:"expression"`
}

// EvalueExpression ...
func EvalueExpression(expressionIn string, value float64) bool {

	expressionIn = strings.TrimSpace(expressionIn)
	if expressionIn == "" {
		return false
	}

	sf := fmt.Sprintf("%.4f", value)
	expressionIn = strings.ReplaceAll(expressionIn, "${value}", sf)

	// Expression ...
	eJSON := Expression{
		Expression: expressionIn,
	}

	buffer, err := json.Marshal(eJSON)
	if err != nil {
		fmt.Println("EvalueExpression.Marshal: ", err, expressionIn)

		return false
	}

	s := string(buffer)
	body := strings.NewReader(s)
	u := fmt.Sprintf("%s/expression", "http://127.0.0.1:3015")
	res, err := http.Post(u, "application/json", body)
	if err != nil {
		fmt.Println("EvalueExpression.request: ", err)

		return false
	}

	defer res.Body.Close()
	buffer, err = ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("EvalueExpression.ReadAll: ", err)
	}

	response := EvalueBool{}
	err = json.Unmarshal(buffer, &response)
	if err != nil {
		fmt.Println("EvalueExpression.Unmarshal: ", err, string(buffer), expressionIn)

		return false
	}

	return response.Doc
}

// EvalueExpressionUnit ...
func EvalueExpressionUnit(expressionIn string, value float64) (float64, bool) {

	expressionIn = strings.TrimSpace(expressionIn)
	if expressionIn == "" {
		return value, false
	}

	sf := fmt.Sprintf("%.4f", value)
	expressionIn = strings.ReplaceAll(expressionIn, "${value}", sf)

	// Expression ...
	eJSON := Expression{
		Expression: expressionIn,
	}

	buffer, err := json.Marshal(eJSON)
	if err != nil {
		fmt.Println("EvalueExpressionUnit.Marshal: ", err, expressionIn)

		return value, false
	}

	s := string(buffer)
	body := strings.NewReader(s)
	u := fmt.Sprintf("%s/expression-value", "http://127.0.0.1:3015")
	res, err := http.Post(u, "application/json", body)
	if err != nil {
		fmt.Println("EvalueExpressionUnit.request: ", err)

		return value, false
	}

	defer res.Body.Close()
	buffer, err = ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("EvalueExpressionUnit.ReadAll: ", err)
	}

	response := EvalueNumber{}
	err = json.Unmarshal(buffer, &response)
	if err != nil {
		fmt.Println("EvalueExpressionUnit.Unmarshal: ", err, string(buffer), expressionIn)

		return value, false
	}

	return response.Doc, true
}

// EvalueExpressionInsert ...
func EvalueExpressionInsert(expressionIn string, value float64) bool {

	expressionIn = strings.TrimSpace(expressionIn)
	if expressionIn == "" {
		return false
	}

	if expressionIn == constants.NA {
		return true
	}

	sf := fmt.Sprintf("%.4f", value)
	expressionIn = strings.ReplaceAll(expressionIn, "${value}", sf)

	// Expression ...
	eJSON := Expression{
		Expression: expressionIn,
	}

	buffer, err := json.Marshal(eJSON)
	if err != nil {
		fmt.Println("EvalueExpressionInsert.Marshal: ", err, expressionIn)

		return false
	}

	s := string(buffer)
	body := strings.NewReader(s)
	u := fmt.Sprintf("%s/expression", "http://127.0.0.1:3015")
	res, err := http.Post(u, "application/json", body)
	if err != nil {
		fmt.Println("EvalueExpressionInsert.request: ", err)

		return false
	}

	defer res.Body.Close()
	buffer, err = ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("EvalueExpressionInsert.ReadAll: ", err)
	}

	response := EvalueBool{}
	err = json.Unmarshal(buffer, &response)
	if err != nil {
		fmt.Println("EvalueExpressionInsert.Unmarshal: ", err, string(buffer), expressionIn)

		return false
	}

	return response.Doc
}

// EvalueExpressionValue ...
func EvalueExpressionValue(expressionIn string) (float64, bool) {
	var value float64

	expressionIn = strings.TrimSpace(expressionIn)
	if expressionIn == "" {
		return value, false
	}

	// Expression ...
	eJSON := Expression{
		Expression: expressionIn,
	}

	buffer, err := json.Marshal(eJSON)
	if err != nil {
		fmt.Println("EvalueExpressionValue.Marshal: ", err, expressionIn)

		return value, false
	}

	s := string(buffer)
	body := strings.NewReader(s)
	u := fmt.Sprintf("%s/expression-value", "http://127.0.0.1:3015")
	res, err := http.Post(u, "application/json", body)
	if err != nil {
		fmt.Println("EvalueExpressionValue.request: ", err)

		return value, false
	}

	defer res.Body.Close()
	buffer, err = ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("EvalueExpressionValue.ReadAll: ", err)
	}

	response := EvalueNumber{}
	err = json.Unmarshal(buffer, &response)
	if err != nil {
		fmt.Println("EvalueExpressionValue.Unmarshal: ", err, string(buffer), expressionIn)

		return value, false
	}

	return response.Doc, true
}
