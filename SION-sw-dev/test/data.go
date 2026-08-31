package main

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

// Row ...
type Row struct {
	ID    int
	Value float64
}

func getRandomData() {
	var rows []Row

	rows = []Row{}

	//

	var current float64
	var last float64
	var variant float64

	var probability = []string{"1", "-1", "1", "-1", "1", "-1", "1", "-1"}

	for _, row := range rows {
		if last == 0 {
			last = row.Value
			variant = row.Value

		} else {
			current = row.Value

			if last == current || current == 279.8644 || current == 279.8325 || current == 279.6278 {
				length := len(probability)
				if length == 0 {
					length = 1
				}

				s := rand.NewSource(time.Now().Unix())
				r := rand.New(s)
				index := r.Intn(length)

				v := probability[index]
				v = strings.TrimSpace(v)

				var nValue float64

				valueInsert := float64(r.Intn(100)) * 0.0001

				if v == "1" {
					nValue = variant + (0.1087 + valueInsert)

				} else if v == "-1" {
					nValue = variant - (0.1087 + valueInsert)
				}

				s2 := fmt.Sprintf("UPDATE bn_12_2020  SET value = %.4f WHERE id = %d;", nValue, row.ID)
				fmt.Println(s2)

				variant = nValue

				time.Sleep(time.Millisecond * 211)

			} else {
				last = current
				variant = current
				//fmt.Println(last)
			}
		}
	}
}
