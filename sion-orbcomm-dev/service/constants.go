package service

import "encoding/xml"

const (
	orbcommURL = "http://isatdatapro.skywave.com/GLGW/GWServices_v1/RestMessages.svc/get_return_messages.xml/?access_id=%s&password=%s&from_id=%d"
)

// getReturnMessagesResult ...
type getReturnMessagesResult struct {
	XMLName      xml.Name `xml:"GetReturnMessagesResult"`
	Text         string   `xml:",chardata"`
	Xsd          string   `xml:"xsd,attr"`
	Xsi          string   `xml:"xsi,attr"`
	ErrorID      int      `xml:"ErrorID"`
	More         string   `xml:"More"`
	NextStartUTC string   `xml:"NextStartUTC"`
	Messages     struct {
		Text          string `xml:",chardata"`
		ReturnMessage []struct {
			Text       string `xml:",chardata"`
			ID         string `xml:"ID"`
			MessageUTC string `xml:"MessageUTC"`
			ReceiveUTC string `xml:"ReceiveUTC"`
			SIN        string `xml:"SIN"`
			MobileID   string `xml:"MobileID"`
			Payload    struct {
				Text   string `xml:",chardata"`
				Name   string `xml:"Name,attr"`
				SIN    string `xml:"SIN,attr"`
				MIN    string `xml:"MIN,attr"`
				Fields struct {
					Text  string `xml:",chardata"`
					Field []struct {
						Text  string `xml:",chardata"`
						Name  string `xml:"Name,attr"`
						Value string `xml:"Value,attr"`
					} `xml:"Field"`
				} `xml:"Fields"`
			} `xml:"Payload"`
			RegionName     string `xml:"RegionName"`
			OTAMessageSize string `xml:"OTAMessageSize"`
		} `xml:"ReturnMessage"`
	} `xml:"Messages"`
	NextStartID int64 `xml:"NextStartID"`
}
