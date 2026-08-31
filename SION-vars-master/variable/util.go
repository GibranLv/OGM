package variable

import (
	"fmt"
	"math"
	"os/exec"
	"strconv"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

// a-z minusculas
const dOfA = 97
const dOfZ = 122

// Obtiene el alias de la variable ha agregar
func getAliasOfVariable(last string) string {
	var res string

	bsRes := []byte{}

	bsLast := []byte(last)
	lenLast := len(bsLast)

	if lenLast == 0 {
		//return string(dOfA)
		return fmt.Sprintf("%c", dOfA)
	}

	if lenLast == 1 {
		if bsLast[0] == dOfZ {
			bsRes = append(bsRes, dOfA, dOfA)
		} else {
			next := bsLast[0] + 1
			bsRes = []byte{next}
		}

		res = string(bsRes)
		return res
	}

	index := getIndexToIncrease(bsLast, lenLast-1)

	if index == -1 {
		bsRes := []byte{}
		for i := 0; i <= lenLast; i++ {
			bsRes = append(bsRes, dOfA)
		}

		res = string(bsRes)
		return res
	}

	for i := 0; i < lenLast; i++ {
		if i == index {
			bsRes = append(bsRes, bsLast[i]+1)

		} else if i > index {
			bsRes = append(bsRes, dOfA)

		} else {
			bsRes = append(bsRes, bsLast[i])
		}
	}

	res = string(bsRes)

	return res
}

func getIndexToIncrease(bs []byte, position int) int {
	if position == -1 {
		return position
	}

	value := bs[position]
	if value == dOfZ {
		position = getIndexToIncrease(bs, position-1)
		return position
	}

	return position
}

// EvaluateExpressionInsertDeprecated ...
func EvaluateExpressionInsertDeprecated(expressionIn string, value float64, configServer constants.ConfigServer) bool {
	expressionIn = strings.TrimSpace(expressionIn)
	if expressionIn == "" {
		return false
	}

	if expressionIn == constants.NA {
		return true
	}

	s := fmt.Sprintf("%.4f", value)
	expressionIn = strings.ReplaceAll(expressionIn, "${value}", s)

	cmd := exec.Command(configServer.NodePath, "expression", expressionIn)
	cmd.Dir = configServer.NodeExecPath
	buffer, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("cmd.CombinedOutput: ", err)

		return false
	}

	_ = cmd.Process.Kill()

	result := string(buffer)
	result = strings.ReplaceAll(result, "\n", "")

	if result == constants.TrueValue {
		return true
	}

	return false
}

// EvaluateExpressionValueDeprecated ...
func EvaluateExpressionValueDeprecated(expressionIn string, configServer constants.ConfigServer) (float64, bool) {
	var value float64

	expressionIn = strings.TrimSpace(expressionIn)
	if expressionIn == "" {
		return value, false
	}

	cmd := exec.Command(configServer.NodePath, "expression-values", expressionIn)
	cmd.Dir = configServer.NodeExecPath
	buffer, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("cmd.CombinedOutput: ", err)

		return value, false
	}

	_ = cmd.Process.Kill()

	result := string(buffer)
	result = strings.ReplaceAll(result, "\n", "")

	f, err := strconv.ParseFloat(result, 64)
	if err != nil {
		fmt.Println("strconv.ParseFloat: ", err)

		return value, false
	}

	return f, true
}

// GetTable ...
func GetTable(alias string, timestamp time.Time) string {
	utc := timestamp.UTC()

	year := utc.Year()
	var m string
	month := utc.Month()
	if month < 10 {
		m = fmt.Sprintf("0%d", month)
	} else {
		m = fmt.Sprintf("%d", month)
	}

	table := fmt.Sprintf("%s_%s_%d", alias, m, year)

	return table
}

// Se obtiene el nombre de la tabla apartir del alias de variable y las fechas
func getTablesByDates(alias string, start, final time.Time) []string {
	tables := []string{}

	date := start
	before := date.Before(final)

	//fmt.Println("PRE: ", date, final)

	for before {
		year := date.Year()
		var m string
		month := date.Month()
		if month < 10 {
			m = fmt.Sprintf("0%d", month)
		} else {
			m = fmt.Sprintf("%d", month)
		}

		s := fmt.Sprintf("%s_%s_%d", alias, m, year)
		tables = append(tables, s)

		dateMonth := time.Date(year, month, 0, 0, 0, 0, 0, date.Location())
		dateMonth = dateMonth.AddDate(0, 1, 0)
		before = dateMonth.Before(final) || dateMonth.Equal(final)

		date = date.AddDate(0, 1, 0)

		//fmt.Println("FOR: ", date, final)
	}

	return tables
}

// ToFixed ...
func ToFixed(num float64, precision int) float64 {
	output := math.Pow(10, float64(precision))
	return float64(round(num*output)) / output
}

func round(num float64) int {
	return int(num + math.Copysign(0.5, num))
}
