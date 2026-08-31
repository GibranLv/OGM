package variable

import (
	"fmt"
	"math"
	"time"

	"github.com/JamsMendez/SION-sw/constants"
	chartDB "github.com/JamsMendez/SION-sw/models/chart"
	chartEventDB "github.com/JamsMendez/SION-sw/models/chart_event"
	lastRecordDB "github.com/JamsMendez/SION-sw/models/last_record"
	userVariableDB "github.com/JamsMendez/SION-sw/models/user/variable"
	userVariableAlarmDB "github.com/JamsMendez/SION-sw/models/user/variable_alarm"
	variableCommentDB "github.com/JamsMendez/SION-sw/models/variable/comment"
	variableActiveAlarmDB "github.com/JamsMendez/SION-sw/models/variable_active_alarm"
	variableAlarmEventDB "github.com/JamsMendez/SION-sw/models/variable_alarm_event"
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

func removeRelationsOfVariable(variableID int64) {
	var where map[string]interface{}

	/*
		Se elimina la configuración de la variable
		para las graficas
	*/
	chart := chartDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{
		chartDB.KeyVariableID: variableID,
		chartDB.KeyIsCustom:   false,
	}

	numAffected, err := chart.Remove(where)
	if err != nil {
		fmt.Println("removeRelationsOfVariable.Chart.Remove")
	}

	fmt.Println("removeRelationsOfVariable.Chart.Remove: ", numAffected)

	/*
		Se elimina la configuración de la variable
		para las graficas
	*/
	chartEvent := chartEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{
		chartEventDB.KeyVariableID: variableID,
		chartEventDB.KeyIsCustom:   false,
	}

	numAffected, err = chartEvent.Remove(where)
	if err != nil {
		fmt.Println("removeRelationsOfVariable.ChartEvent.Remove")
	}

	fmt.Println("removeRelationsOfVariable.ChartEvent.Remove: ", numAffected)

	// Eliminar la variable de los JSON(json) de la tabla "graphics"

	//Se elimina la variable de last_records
	lastRecord := lastRecordDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{
		lastRecordDB.KeyVariableID: variableID,
		lastRecordDB.KeyIsCustom:   false,
	}

	numAffected, err = lastRecord.Remove(where)
	if err != nil {
		fmt.Println("removeRelationsOfVariable.LastRecord.Remove")
	}

	fmt.Println("removeRelationsOfVariable.LastRecord.Remove: ", numAffected)

	// Eliminar la variable de los JSON(structure_json) de la tabla "matrices"

	// Eliminar la variable de los JSON(structure_json) de la tabla "reports"

	//Se obtienen las relaciones usuario y variable
	userVariable := userVariableDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{
		userVariableDB.KeyVariableID: variableID,
	}

	// Se obtiene las relaciones de usuario-variable y alarm
	usersVariablesRows, err := userVariable.Find(where)
	if err != nil {
		fmt.Println("removeRelationsOfVariable.UserVariable.Find")
	}

	if len(usersVariablesRows) > 0 {
		userVariableAlarm := userVariableAlarmDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		variableComment := variableCommentDB.Model{
			UserDB: constants.DB.UserSW,
			PwdDB:  constants.DB.PwdSW,
			NameDB: constants.DB.NameSW,
			Host:   constants.DB.HostSW,
			Port:   constants.DB.PortSW,
			Debug:  true,
		}

		for _, usersVariablesRow := range usersVariablesRows {
			// Se eliminan las relaciones de usuario-variable y alarm
			ID := usersVariablesRow.ID
			where = map[string]interface{}{userVariableAlarmDB.KeyUserVariableID: ID}

			numAffected, err := userVariableAlarm.Remove(where)
			if err != nil {
				fmt.Println("removeRelationsOfVariable.UserVariableAlarm.Remove")
			}

			fmt.Println("removeRelationsOfVariable.UserVariableAlarm.Remove: ", numAffected)

			// Se eliminan las relaciones de usuario-variable y comentario
			where = map[string]interface{}{variableCommentDB.KeyUserVariableID: ID}

			numAffected, err = variableComment.Remove(where)
			if err != nil {
				fmt.Println("removeRelationsOfVariable.VariableComment.Remove")
			}

			fmt.Println("removeRelationsOfVariable.VariableComment.Remove: ", numAffected)
		}
	}

	// Se eliminan las variables con alarmas activas
	variableActiveAlarm := variableActiveAlarmDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{
		variableActiveAlarmDB.KeyVariableID: variableID,
		variableActiveAlarmDB.KeyIsCustom:   false,
	}

	numAffected, err = variableActiveAlarm.Remove(where)
	if err != nil {
		fmt.Println("removeRelationsOfVariable.VariableActiveAlarm.Remove")
	}

	fmt.Println("removeRelationsOfVariable.VariableActiveAlarm.Remove: ", numAffected)

	// Se eliminan los eventos de alarma de las variables
	variableAlarmEvent := variableAlarmEventDB.Model{
		UserDB: constants.DB.UserSW,
		PwdDB:  constants.DB.PwdSW,
		NameDB: constants.DB.NameSW,
		Host:   constants.DB.HostSW,
		Port:   constants.DB.PortSW,
		Debug:  true,
	}

	where = map[string]interface{}{
		variableAlarmEventDB.KeyVariableID: variableID,
		variableAlarmEventDB.KeyIsCustom:   false,
	}

	numAffected, err = variableAlarmEvent.Remove(where)
	if err != nil {
		fmt.Println("removeRelationsOfVariable.VariableAlarmEvent.Remove")
	}

	fmt.Println("removeRelationsOfVariable.VariableAlarmEvent.Remove: ", numAffected)

	//Se eliminan las relaciones usuario y variable
	where = map[string]interface{}{
		userVariableDB.KeyVariableID: variableID,
	}

	numAffected, err = userVariable.Remove(where)
	if err != nil {
		fmt.Println("removeRelationsOfVariable.UserVariable.Remove")
	}

	fmt.Println("removeRelationsOfVariable.UserVariable.Remove: ", numAffected)
}

// toFixed ...
func toFixed(num float64, precision int) float64 {
	output := math.Pow(10, float64(precision))
	return float64(round(num*output)) / output
}

func round(num float64) int {
	return int(num + math.Copysign(0.5, num))
}
