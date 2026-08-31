package service

import (
	"encoding/binary"
	"math"
)

/* func bufferToUInt32(buffer []byte, div float64) float32 {
	uInt32 := binary.BigEndian.Uint32(buffer)
	f32 := float32(float64(uInt32) * div)
	return f32
} */

func bufferRTUToFloat32(b []byte) (value float32) {
	if len(b) < 4 {
		return 0
	}

	first := binary.BigEndian.Uint16(b[0:2])
	last := binary.BigEndian.Uint16(b[2:4])

	value = getFloat32fromInts16(first, last)

	return value
}

func bufferTCPToFloat32(b []byte) (value float32) {
	if len(b) < 4 {
		return 0
	}

	first := binary.BigEndian.Uint16(b[0:2])
	last := binary.BigEndian.Uint16(b[2:4])

	value = getFloat32fromInts16(last, first)

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

/* func getTable(alias string, timestamp time.Time) string {
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
} */

// Round ...
func Round(num float64) int {
	return int(num + math.Copysign(0.5, num))
}

// ToFixed ...
func ToFixed(num float64, precision int) float64 {
	output := math.Pow(10, float64(precision))
	return float64(Round(num*output)) / output
}
