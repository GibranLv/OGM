@JamsMendez

SION VARS (SION-vars)

Servicio para crear y actualizar los valores de variables.

Cuenta con un Cliente TCP para enviar las actualizaciones
de las variables al SION WS (SION-ws)

CREATE SCHEMA IF NOT EXISTS `sion_records` DEFAULT CHARACTER SET utf8 ;

USE `sion_records`;

0.1362

1.9809

var v = 0.9272;
for (var i = 0; i < 9; i ++) {
	v = v + 0.0062444;
	console.log(v);
}


supervisorctl stop SION-orbcomm
supervisorctl start SION-orbcomm

|  30 | FLUJO GAS DIA ANTERIOR | COAPECHACA 24 MTC I    | ae    |
|  86 | FLUJO GAS DIA ANTERIOR | RAUDAL MTC I           | cc    |
| 111 | FLUJO GAS DIA ANTERIOR | AGUA FRIA MTC I        | db    |
| 136 | FLUJO GAS DIA ANTERIOR | COYULA MTC I           | ea    |
| 161 | FLUJO GAS DIA ANTERIOR | CORRALILLO 624 MTC 1   | ez    |
| 165 | FLUJO GAS DIA ANTERIOR | FURBERO MTC I          | fd    |
| 207 | FLUJO GAS DIA ANTERIOR | CORRALILLO 786 MTC 4   | gt    |
| 232 | FLUJO GAS DIA ANTERIOR | AGUA FRIA II MTC 4     | hs    |
| 257 | FLUJO GAS DIA ANTERIOR | AGUA FRIA II MTC 2     | ir    |
| 287 | FLUJO GAS DIA ANTERIOR | CORRALILLO 624 MTC 2   | jv    |
| 312 | FLUJO GAS DIA ANTERIOR | CORRALILLO 607 MTC 1   | ku    |
| 337 | FLUJO GAS DIA ANTERIOR | PRESIDENTE ALEMAN 1614 | lt    |
| 362 | FLUJO GAS DIA ANTERIOR | PRESIDENTE ALEMAN 1365 | ms    |
| 413 | FLUJO GAS DIA ANTERIOR | COAPECHACA 24 MTC II   | or    |
| 442 | FLUJO GAS DIA ANTERIOR | COYULA MTC II          | pu    |
| 469 | FLUJO GAS DIA ANTERIOR | CORRALILLO 786 MTC 2   | qv    |
| 496 | FLUJO GAS DIA ANTERIOR | CORRALILLO 786 MTC 3   | rw    |
| 523 | FLUJO GAS DIA ANTERIOR | AGUA FRIA II MTC 3     | sx    |
| 550 | FLUJO GAS DIA ANTERIOR | AGUA FRIA I MTC 2      | ty    |
| 577 | FLUJO GAS DIA ANTERIOR | CORRALILLO 874 MTC 1   | uz    |
| 604 | FLUJO GAS DIA ANTERIOR | AGUA FRIA 892 MTC 1    | wa    |
| 631 | FLUJO GAS DIA ANTERIOR | AGUA FRIA II MTC I     | xb    |
| 658 | FLUJO GAS DIA ANTERIOR | CORRALILLO 786 MTC I   | yc    |

supervisorctl stop SION-vars && mv SION-vars SION-vars-18-06 && mv SION-vars2 SION-vars && supervisorctl start SION-vars

SELECT
	ua.alarm_id, a.name, a.alias, a.color, a.setpoint, a.sound, a.is_timeout, a.priority_level,
	ucv.custom_variable_id
FROM users_custom_variables AS ucv
LEFT JOIN users_custom_variables_alarms AS uva ON uva.user_custom_variable_id = ucv.id
LEFT JOIN users_alarms AS ua ON uva.user_alarm_id = ua.id
LEFT JOIN alarms AS a ON ua.alarm_id = a.id
WHERE ucv.user_id = 1
ORDER BY a.priority_level;

CREATE TABLE IF NOT EXISTS `short_day_befores` (
`id` INT NOT NULL AUTO_INCREMENT,
`variable_id` INT NOT NULL,
`is_custom` TINYINT NOT NULL,
`value` DECIMAL(10,4) NOT NULL,
`is_updated` TINYINT NOT NULL,
`accumulated_alias` VARCHAR(3) NOT NULL,
PRIMARY KEY (`id`))
ENGINE = InnoDB;
