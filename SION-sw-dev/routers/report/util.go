package report

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
)

// Estructura para rangos de fechas
type whereDate struct {
	Gte time.Time
	Lt  time.Time
}

func getTablesForDates(alias string, start, final time.Time) []string {
	tables := []string{}

	year := start.Year()
	month := start.Month()
	var m string
	if month < 10 {
		m = fmt.Sprintf("0%d", month)
	} else {
		m = fmt.Sprintf("%d", month)
	}

	s := fmt.Sprintf("%s_%s_%d", alias, m, year)
	tables = append(tables, s)

	for start.Before(final) || start.Equal(final) {
		start = start.Add(time.Hour * 24)
		//nextMonth := start.Month()
		//if nextMonth != month {
		year := start.Year()
		month := start.Month()
		var m string
		if month < 10 {
			m = fmt.Sprintf("0%d", month)
		} else {
			m = fmt.Sprintf("%d", month)
		}

		s := fmt.Sprintf("%s_%s_%d", alias, m, year)
		tables = append(tables, s)
		//}
	}

	tables = unique(tables)

	return tables
}

func unique(intSlice []string) []string {
	keys := make(map[string]bool)
	list := []string{}
	for _, entry := range intSlice {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}

// Obtener las consultas de los reportes por dia
func getWheresForHour(first, last time.Time) []whereDate {
	wheres := []whereDate{}

	for first.Before(last) {
		next := first.Add(time.Hour)

		where := whereDate{Gte: first, Lt: next}
		wheres = append(wheres, where)

		first = next
	}

	return wheres
}

// Obtener las consultas de los reportes por mes
func getWheresForDay(first, last time.Time) []whereDate {
	wheres := []whereDate{}

	for first.Before(last) {
		next := first.AddDate(0, 0, 1)

		where := whereDate{Gte: first, Lt: next}
		wheres = append(wheres, where)

		first = next
	}

	return wheres
}

/*func getWheresForCutDay(first, last time.Time) []whereDate {
	wheres := []whereDate{}

	for first.Before(last) || first.Equal(last) {
		next := first.AddDate(0, 0, 1)

		where := whereDate{Gte: first, Lt: next}
		wheres = append(wheres, where)

		first = next
	}

	return wheres
}*/

// Obtener las consultas de los reportes por año
func getWheresForMonth(first time.Time) []whereDate {
	wheres := []whereDate{}

	last := first.AddDate(1, 0, 0)

	for first.Before(last) {
		next := first.AddDate(0, 1, 0)

		where := whereDate{Gte: first, Lt: next}
		wheres = append(wheres, where)

		first = next
	}

	return wheres
}

// Obtener las consultas de los reportes personalizados
func getWheresForInterval(first, last time.Time, segment string) []whereDate {
	wheres := []whereDate{}

	var addedTime time.Duration
	var isDay bool

	if segment == constants.Day {
		isDay = true

	} else if segment == constants.Hour {
		addedTime = time.Hour

	} else if segment == constants.Minute {
		addedTime = time.Minute

	} else if segment == constants.NA {
		w := whereDate{Gte: first, Lt: last}
		wheres = append(wheres, w)
		return wheres

	} else {
		return wheres
	}

	for first.Before(last) {
		var next time.Time

		if isDay {
			next = first.AddDate(0, 0, 1)
		} else {
			next = first.Add(addedTime)
		}

		where := whereDate{Gte: first, Lt: next}
		wheres = append(wheres, where)

		first = next
	}

	return wheres
}

// Evalua la expression para realizar una operación aritmetica
/*func evaluateExpressionValues(expressionIn string, configServer constants.ConfigServer) ([]float64, bool) {
	var values []float64

	expressionIn = strings.TrimSpace(expressionIn)
	if expressionIn == "" {
		return values, false
	}

	cmd := exec.Command(configServer.NodePath, "expression-values", expressionIn)
	cmd.Dir = configServer.NodeExecPath
	buffer, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("evaluateExpressionValues.cmd.Args: ", expressionIn)
		fmt.Println("evaluateExpressionValues.cmd.CombinedOutput: ", err)

		return values, false
	}

	result := string(buffer)
	result = strings.Replace(result, "\n", "", -1)

	buffer = []byte(result)

	err = json.Unmarshal(buffer, &values)
	if err != nil {
		fmt.Println("evaluateExpressionValues.cmd.Unmarshal: ", err)

		return values, false
	}

	return values, true
}*/

// Se obtiene el nombre de la tabla apartir del alias de variable y las fechas
/*func getTables(alias string, first, last time.Time) []string {
	tables := []string{}

	if first.After(last) {
		return tables
	}

	year, month, _ := first.UTC().Date()
	firstUTC := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
	lastUTC := last.UTC()

	for firstUTC.Before(lastUTC) || firstUTC.Equal(lastUTC) {
		firstMonth := firstUTC.Month()
		firstYear := firstUTC.Year()

		var month string
		if firstMonth < 10 {
			month = fmt.Sprintf("0%d", firstMonth)
		} else {
			month = fmt.Sprintf("%d", firstMonth)
		}

		table := fmt.Sprintf("%s_%s_%d", alias, month, firstYear)
		tables = append(tables, table)

		firstUTC = firstUTC.AddDate(0, 1, 0)
	}

	return tables
}*/

func getCellAndNumber(cell string) (letter string, number int) {
	numbers := []string{"1", "2", "3", "4", "5", "6", "7", "8", "9", "0"}
	size := len(cell)
	for i := 0; i < size; i++ {
		b := cell[i]
		s := string(b)
		for _, v := range numbers {
			if v == s {
				letter = cell[0:i]
				sNum := cell[i:]
				if vInt, err := strconv.Atoi(sNum); err == nil {
					number = vInt
				}

				return letter, number
			}
		}
	}

	return letter, number
}

/*func getPreviousLetter(letter string) string {
	b := []byte(letter)
	before := b[0] - 1
	b[0] = before
	letter = string(b)
	return letter
}*/

func getDateToReport(d string) string {
	parts := strings.Split(d, "-")
	size := len(parts)
	if size == 3 {
		s := fmt.Sprintf("%s-%s-%s", parts[2], parts[1], parts[0])
		return s
	}

	return d
}

func getDateTimeToReport(d string) string {
	ps := strings.Split(d, " ")
	if len(ps) == 2 {
		parts := strings.Split(ps[0], "-")
		size := len(parts)
		if size == 3 {
			s := fmt.Sprintf("%s-%s-%s %s", parts[2], parts[1], parts[0], ps[1])
			return s
		}
	}

	return d
}
