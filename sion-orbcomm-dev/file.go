package main

import (
	"bufio"
	"encoding/binary"
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func mainFile() {
	fileOne, err := os.Open("parameters2.txt")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer fileOne.Close()

	fmt.Println("File Ok")

	scanner := bufio.NewScanner(fileOne)
	for scanner.Scan() {
		line := scanner.Text()

		columns := strings.Split(line, "---")

		size := len(columns)
		if size > 0 {
			dateStr := strings.TrimSpace(columns[0])
			parameter01 := getBuffer(strings.TrimSpace(columns[1]))
			parameter02 := getBuffer(strings.TrimSpace(columns[2]))
			parameter03 := getBuffer(strings.TrimSpace(columns[3]))
			parameter04 := getBuffer(strings.TrimSpace(columns[4]))
			parameter05 := getBuffer(strings.TrimSpace(columns[5]))
			parameter06 := getBuffer(strings.TrimSpace(columns[6]))
			parameter09 := getBuffer(strings.TrimSpace(columns[9]))
			parameter10 := getBuffer(strings.TrimSpace(columns[10]))
			parameter11 := getBuffer(strings.TrimSpace(columns[11]))
			parameter13 := getBuffer(strings.TrimSpace(columns[13]))
			parameter14 := getBuffer(strings.TrimSpace(columns[14]))
			parameter17 := getBuffer(strings.TrimSpace(columns[17]))
			parameter18 := getBuffer(strings.TrimSpace(columns[18]))
			parameter27 := getBuffer(strings.TrimSpace(columns[27]))
			parameter28 := getBuffer(strings.TrimSpace(columns[28]))

			fmt.Printf("INSERT INTO bt_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter01))
			fmt.Printf("INSERT INTO bu_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter02))
			fmt.Printf("INSERT INTO bw_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter03))
			fmt.Printf("INSERT INTO bx_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter04))
			fmt.Printf("INSERT INTO bz_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter05))
			fmt.Printf("INSERT INTO ca_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter06))
			fmt.Printf("INSERT INTO dg_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter09))
			fmt.Printf("INSERT INTO dh_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter10))
			fmt.Printf("INSERT INTO fr_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter11))
			fmt.Printf("INSERT INTO hh_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter13))
			fmt.Printf("INSERT INTO hi_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter14))
			fmt.Printf("INSERT INTO gv_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter17))
			fmt.Printf("INSERT INTO gw_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter18))
			fmt.Printf("INSERT INTO gg_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter27))
			fmt.Printf("INSERT INTO gh_10_2021 SET timestamp = '%s', value = %v;\n", dateStr, bufferRTUToFloat32(parameter28))
		}
	}

	fmt.Println("Finish...")
}

func getBuffer(str string) []byte {
	values := strings.Split(str, " ")

	buffer := []byte{}

	for _, s := range values {
		vInt, err := strconv.Atoi(s)
		if err != nil {
			fmt.Println(err)

		} else {
			b := uint8(vInt)
			buffer = append(buffer, b)
		}
	}

	return buffer
}

func bufferRTUToFloat32(b []byte) (value float32) {
	if len(b) < 4 {
		return 0
	}

	first := binary.BigEndian.Uint16(b[0:2])
	last := binary.BigEndian.Uint16(b[2:4])

	value = getFloat32fromInts16(first, last)

	return value
}

func getFloat32fromInts16(high, low uint16) (value float32) {
	bytes := make([]byte, 4)
	bs := make([]byte, 2)

	binary.BigEndian.PutUint16(bs, low)
	bytes[0] = bs[0]
	bytes[1] = bs[1]

	binary.BigEndian.PutUint16(bs, high)
	bytes[2] = bs[0]
	bytes[3] = bs[1]

	i32 := binary.BigEndian.Uint32(bytes)
	f32 := math.Float32frombits(i32)
	return f32
}

func bufferToUInt32(buffer []byte, div float64) float32 {
	uInt32 := binary.BigEndian.Uint32(buffer)
	f32 := float32(float64(uInt32) * div)
	return f32
}

//TP 25
//TR 35
//1
