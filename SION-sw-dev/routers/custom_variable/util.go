package customvariable

import (
	"fmt"
	"time"
)

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
