package modbus

import (
	"encoding/binary"
	"fmt"
)

const protocoloVersion = 0
const readHoldingRegister = 3
const readInputRegister = 4

const connectionTCP = "tcp"
const dateFormat = "2006-01-02 15:04:05"

// RecordAnalog Struct de los valores de un registro
type RecordAnalog struct {
	Buffer    []byte
	Timestamp string
}

func getPackageRTUReq(address, numberRegisters int, slave, function uint8) (pkg []byte) {
	firstAddress := address - 1

	bsAddress := make([]byte, 2)
	bsRegisters := make([]byte, 2)
	bsCRC16 := make([]byte, 2)

	fmt.Println("RTU: ", address, firstAddress, numberRegisters)

	binary.BigEndian.PutUint16(bsAddress, uint16(firstAddress))
	binary.BigEndian.PutUint16(bsRegisters, uint16(numberRegisters))

	pkg = append(pkg, slave)
	pkg = append(pkg, function)
	pkg = append(pkg, bsAddress...)
	pkg = append(pkg, bsRegisters...)

	crc16 := getCRC16(pkg)
	binary.LittleEndian.PutUint16(bsCRC16, crc16)

	pkg = append(pkg, bsCRC16...)

	return pkg
}

func getCRC16(buffer []byte) (crc uint16) {
	crc = 0xFFFF
	var odd uint16

	for i := 0; i < len(buffer); i++ {
		crc = crc ^ uint16(buffer[i])

		for j := 0; j < 8; j++ {
			odd = crc & 0x0001
			crc = crc >> 1
			if odd > 0 {
				crc = crc ^ 0xA001
			}
		}
	}

	return crc
}
