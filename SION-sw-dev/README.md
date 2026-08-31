CREATE SCHEMA IF NOT EXISTS `sion_records` DEFAULT CHARACTER SET utf8 ;
USE `sion_records` ;

ALTER TABLE `charts` ADD `name` VARCHAR(100) NOT NULL DEFAULT '' AFTER `unit_id`;

ALTER TABLE `configurations` ADD `chart_theme` INT(1) NOT NULL DEFAULT '1' AFTER `rt`;
ALTER TABLE `configurations` ADD `comment_column` TINYINT NOT NULL DEFAULT '0' AFTER `chart_theme`;
ALTER TABLE `reports` ADD `template` VARCHAR(40) NOT NULL DEFAULT 'custom_report_generic.xlsx' AFTER `name`;

 CREATE TABLE `configurations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `main_module` int(2) NOT NULL,
  `main_matrix` int(11) NOT NULL DEFAULT '0',
  `json_matrix_sounds` json NOT NULL,
  `json_graphic_sounds` json NOT NULL,
  `rt` int(2) NOT NULL DEFAULT '2',
  `chart_theme` int(1) NOT NULL DEFAULT '2',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_configurations_users1_idx` (`user_id`),
  CONSTRAINT `fk_configurations_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


CREATE TABLE `active_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `variable_id` int(11) NOT NULL,
  `is_custom` tinyint(1) NOT NULL DEFAULT '0',
  `default_value` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8

CREATE TABLE IF NOT EXISTS `sion_system`.`na_variables` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `variable_id` INT NOT NULL,
  `is_custom` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sion_system`.`accumulated_flows` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `variable_id` INT NOT NULL,
  `is_custom` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sion_system`.`previous_day_flows` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `variable_id` INT NOT NULL,
  `is_custom` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `sion_system`.`headers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title_one` VARCHAR(150) NOT NULL DEFAULT '',
  `title_two` VARCHAR(150) NOT NULL DEFAULT '',
  `title_one_left` VARCHAR(150) NOT NULL DEFAULT 'Servicio de Monitoreo de Variables Operativas',
  `title_two_left` VARCHAR(150) NOT NULL DEFAULT 'Technotex S.A. de C.V.',
  `logo_left` VARCHAR(100) NOT NULL DEFAULT '/static/images/logo_ttx.png',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sion_system`.`users_headers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sion_system`.`users_headers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `header_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sion_system`.`users_alarms_notifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_alarm_id` INT NOT NULL,
  `send_email` TINYINT(1) NOT NULL DEFAULT 0,
  `send_sms` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sion_system`.`previous_day_variables`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sion_system`.`previous_day_variables` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `variable_id` INT NOT NULL,
  `is_custom` TINYINT(1) NOT NULL,
  `acc_variable_id` INT NOT NULL,
  `acc_is_custom` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sion_system`.`broadcast_comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `users` JSON NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sion_system`.`footer_variables` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `variable_id` INT NOT NULL,
  `is_custom` TINYINT(1) NOT NULL,
  `position` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_footer_variables_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_footer_variables_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sion_system`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `sion_system`.`dashboard_variables` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `variable_id` INT NOT NULL,
  `is_custom` TINYINT(1) NOT NULL,
  `position` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_dashboard_variables_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_dashboard_variables_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sion_system`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sion_system`.`api` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `access_token_key` VARCHAR(40) NOT NULL,
  `refresh_token_key` VARCHAR(40) NOT NULL,
  `activation_token_key` VARCHAR(40) NOT NULL,
  `session_key` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `sion_system`.`user_sessions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `access_token_hash` VARCHAR(40) NOT NULL,
  `refresh_token_hash` VARCHAR(40) NOT NULL,
  `value` INT(3) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sion_system`.`users_dashboard` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sion_system`.`log_alarms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sion_system`.`log_alarms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `alarm_id` INT NOT NULL,
  `variable_id` INT NOT NULL,
  `is_custom` TINYINT(1) NOT NULL DEFAULT 0,
  `variable_name` VARCHAR(100) NOT NULL,
  `variable_device` VARCHAR(100) NOT NULL,
  `value` DECIMAL(10,4) NOT NULL,
  `is_timeout` TINYINT(1) NOT NULL DEFAULT 0,
  `message` VARCHAR(500) NOT NULL,
  `comment` VARCHAR(500) NOT NULL DEFAULT '',
  `checked` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sion_system`.`users_log_alarms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users_log_alarms (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `log_alarm_id` INT NOT NULL,
  `viewed` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sion_system`.`api_variables`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sion_system`.`api_variables` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `variable_id` INT NOT NULL,
  `is_custom` TINYINT NOT NULL,
  `active` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

supervisorctl stop SION-wsa && mv SION-wsa SION-wsa-12-03 && mv SION-wsa2 SION-wsa && supervisorctl start SION-wsa

git pull && supervisorctl stop SION-sw && mv SION-sw SION-sw-12-04 && mv SION-sw2 SION-sw && supervisorctl start SION-sw


ALTER TABLE `orbcomms` ADD `modbus` VARCHAR(6) NOT NULL DEFAULT 'RTU' AFTER `next_start_id`;
ALTER TABLE `orbcomms` DROP `modbus`;

mv SION-sw SION-sw-20-03 && mv SION-sw2 SION-sw && supervisorctl start SION-sw

supervisorctl start SION-sw

ALTER TABLE `orbcomms` ADD `modbus` VARCHAR(6) NOT NULL DEFAULT 'RTU';


SELECT
 	DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:00') AS n_timestamp,
	AVG(value) AS n_value,
	COUNT(value) AS number_rows
FROM io_02_2023
WHERE timestamp >= '2023-02-14 06:00:00' and timestamp < '2023-02-15 06:00:00'
GROUP BY n_timestamp;

SELECT
	CONCAT(
		DATE(timestamp),
		" ",
		HOUR(timestamp),
    ":",
    MINUTE(timestamp),
    ":00"
	) AS n_timestamp,
	AVG(value) AS n_value,
	COUNT(value) AS number_rows
FROM gj_02_2023
WHERE timestamp >= '2023-02-26 06:00:00' and timestamp < '2023-02-27 06:00:00'
GROUP BY n_timestamp;

SELECT
	CONCAT(
		DATE(timestamp),
		" ",
		HOUR(timestamp),
		":",
		MINUTE(timestamp),
		":",
		"00"
	) AS n_timestamp,
	AVG(value) AS n_value,
	COUNT(value) AS number_rows
FROM gj_02_2023
WHERE timestamp >= '2023-02-26 06:00:00' and timestamp < '2023-02-27 06:00:00'
GROUP BY n_timestamp;