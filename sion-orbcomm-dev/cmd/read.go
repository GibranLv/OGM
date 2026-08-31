package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

//const chunk = "SION_ORBCOMM.LOG VELOCIDAD MOTOR AGUA FRIA 892 MTC 1"
const chunk = "SION_ORBCOMM.LOG,TR.CINCO PRESIDENTES 921"

func main() {
	f, err := os.Open("SION-orbcomm-TR-921.txt")
	if err != nil {
		fmt.Println(err)
	}

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Text()
		isOK := strings.Contains(line, chunk)
		if isOK {
			fmt.Println(line)
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
	}
}
