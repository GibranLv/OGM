package service

import (
	"fmt"
	"math"
	"strconv"
	"strings"
	"time"
)

// Tipo de Variables
// const (
// 	accumulatedType uint8 = 1
// 	cutDayType      uint8 = 2
// )

// getTable ...
func getTable(alias string, timestamp time.Time) string {
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

func getBeforeTable(parts []string) string {
	nTable := strings.Join(parts, "_")

	monthStr := parts[1]

	monthInt, err := strconv.Atoi(monthStr)
	if err != nil {
		fmt.Println("getBeforeTable.Atoi: ", err, nTable)

		return nTable
	}

	if monthInt == 1 {
		yearStr := parts[2]
		yearInt, err := strconv.Atoi(yearStr)
		if err != nil {
			fmt.Println("getBeforeTable.Atoi: ", err, yearStr)

			return nTable
		}

		parts[1] = "12"
		parts[2] = fmt.Sprintf("%d", yearInt-1)

	} else {
		m := monthInt - 1
		if m < 10 {
			parts[1] = fmt.Sprintf("0%d", m)
		} else {
			parts[1] = fmt.Sprintf("%d", m)
		}
	}

	nTable = strings.Join(parts, "_")

	return nTable
}

// ToFixed ...
func ToFixed(num float64, precision int) float64 {
	output := math.Pow(10, float64(precision))
	return float64(Round(num*output)) / output
}

// Round ...
func Round(num float64) int {
	return int(num + math.Copysign(0.5, num))
}
