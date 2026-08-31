package modbus

import (
	"fmt"
	"net"
	"time"
)

// ClientTCP Struct de un Cliente Modbus
type ClientTCP struct {
	Port string
	IP   string

	Addresses       []int
	Address         int
	NumberRegisters int
	Slave           uint8

	conn         net.Conn
	read         chan []byte
	isClosedChan bool
}

// Connect Realiza la conexión a un servidor TCP (Modbus)
func (client *ClientTCP) Connect() error {
	url := client.IP + ":" + client.Port

	conn, err := net.DialTimeout(connectionTCP, url, time.Second*5)
	if err == nil {
		client.conn = conn
	}

	client.read = make(chan []byte)

	return err
}

// listen Recibe los paquetes del servidor TCP (Modbus)
func (client *ClientTCP) listen() {
	/*
		3 = Controller Address, Function Code, Number of data bytes returned
		2 = Low, High byte of CRC
		N ... bytes
		4 = Extra ...
	*/

	bSize := 3 + (client.NumberRegisters * 2) + 2 + 4

	buffer := make([]byte, bSize)
	_, err := client.conn.Read(buffer)
	if err != nil {
		fmt.Println("ERROR.CLIENT.READ: ", err)

		if !client.isClosedChan {
			client.isClosedChan = true
			client.read <- []byte{}
			return
		}
	}

	client.read <- buffer
}

// Close Cierra la conexión con el servidor TCP (Modbus)
func (client *ClientTCP) Close() (err error) {
	err = client.conn.Close()
	return err
}

// ReadInputRegister Obtiene los valores de los registros en float 32 bits
func (client *ClientTCP) ReadInputRegister() map[int]RecordAnalog {
	buffer := getPackageRTUReq(client.Address, 2, client.Slave, readHoldingRegister)

	_, err := client.conn.Write(buffer)
	if err != nil {
		fmt.Println("client.conn.Write", err)
	}

	timeout := time.NewTimer(time.Second * 10)
	go func(c *ClientTCP) {
		<-timeout.C

		c.read <- []byte{}
	}(client)

	go client.listen()

	fmt.Println("ReadInputRegister.WRITE: ", buffer)

	buffer = <-client.read

	fmt.Println("ReadInputRegister.READ: ", buffer)

	records := map[int]RecordAnalog{}

	stop := timeout.Stop()
	if !stop {
		fmt.Println("ReadInputRegister.timeout request: ", buffer)

		now := time.Now()
		timestamp := now.Format(dateFormat)
		record := RecordAnalog{Timestamp: timestamp}
		records[client.Address] = record

		return records
	}

	bSize := len(buffer)
	if bSize == 0 {

		now := time.Now()
		timestamp := now.Format(dateFormat)
		record := RecordAnalog{Timestamp: timestamp}
		records[client.Address] = record

		return records
	}

	// 2 = Low, High byte of CRC
	// 4 = Extra ...
	//dSize := bSize - (2 + 4)
	dSize := bSize - 2

	// 3 = Controller Address, Function Code, Number of data bytes returned
	position := 3

	key := client.Address

	res := map[int][]byte{}

	fmt.Println("INIT: ", position, dSize)

	// 2 = High, Low data
	for i := position; i < dSize; i = i + 4 {
		limit := i + 4

		fmt.Println("DATA: ", limit, dSize)

		if limit > dSize {
			break
		}

		res[key] = buffer[i:limit]

		fmt.Println(key, res[key])

		key = key + 1
	}

	now := time.Now()
	timestamp := now.Format(dateFormat)

	if bs, ok := res[client.Address]; ok {
		record := RecordAnalog{Buffer: bs, Timestamp: timestamp}
		records[client.Address] = record
	}

	return records
}

// ReadInputRegister2 ...
func (client *ClientTCP) ReadInputRegister2() map[int]RecordAnalog {
	buffer := getPackageRTUReq(client.Address, client.NumberRegisters, client.Slave, readHoldingRegister)

	_, err := client.conn.Write(buffer)
	if err != nil {
		fmt.Println("client.conn.Write", err)
	}

	timeout := time.NewTimer(time.Second * 5)
	go func(c *ClientTCP) {
		<-timeout.C

		c.read <- []byte{}
	}(client)

	go client.listen()

	fmt.Println("ReadInputRegister.WRITE: ", buffer)

	buffer = <-client.read

	fmt.Println("ReadInputRegister.READ: ", buffer)

	records := map[int]RecordAnalog{}

	stop := timeout.Stop()
	if !stop {
		fmt.Println("ReadInputRegister.timeout request: ", buffer)

		now := time.Now()
		timestamp := now.Format(dateFormat)
		record := RecordAnalog{Timestamp: timestamp}
		records[client.Address] = record

		return records
	}

	bSize := len(buffer)
	if bSize == 0 {

		now := time.Now()
		timestamp := now.Format(dateFormat)
		record := RecordAnalog{Timestamp: timestamp}
		records[client.Address] = record

		return records
	}

	// 2 = Low, High byte of CRC
	// 4 = Extra ...
	dSize := bSize - (2 + 4)

	// 3 = Controller Address, Function Code, Number of data bytes returned
	position := 3

	key := client.Address

	res := map[int][]byte{}

	//fmt.Println("INIT: ", position, dSize)

	// 2 = High, Low data
	for i := position; i < dSize; i = i + 4 {
		limit := i + 4

		//fmt.Println("DATA: ", limit, dSize)

		if limit > dSize {
			break
		}

		res[key] = buffer[i:limit]

		//fmt.Println(key, res[key])

		key = key + 2
	}

	now := time.Now()
	timestamp := now.Format(dateFormat)

	for _, address := range client.Addresses {
		if bs, ok := res[address]; ok {
			record := RecordAnalog{Buffer: bs, Timestamp: timestamp}
			records[address] = record
		}
	}

	return records
}
