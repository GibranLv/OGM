# SION-orbcomm

Servicio para la obtención de datos a través del API Orbcomm

DROP TABLE logs;

CREATE TABLE IF NOT EXISTS `sion_orbcomm`.`logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `variable_id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `ts` VARCHAR(25) NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `is_timeout` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sion_orbcomm`.`orbcomm_mails` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orbcomm_id` INT NOT NULL,
  `mail` TINYINT NOT NULL DEFAULT 0,
  `timestamp` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

supervisorctl stop SION-orbcomm && mv SION-orbcomm SION-orbcomm-25-06 && mv SION-orbcomm2 SION-orbcomm && supervisorctl start SION-orbcomm

=== DIAVAZ ===

786

MTC 4 195

MTC 1 644

INSERT INTO orbcomm_timeouts SET id = 8, orbcomm_id = 9, is_timeout = 0, variable_id = 195, is_zero = 0;

UPDATE orbcomms_variables SET name = 'parameter01' WHERE id = 154;
UPDATE orbcomms_variables SET name = 'parameter02' WHERE id = 155;
UPDATE orbcomms_variables SET name = 'parameter03' WHERE id = 156;
UPDATE orbcomms_variables SET name = 'parameter04' WHERE id = 157;
UPDATE orbcomms_variables SET name = 'parameter05' WHERE id = 158;
UPDATE orbcomms_variables SET name = 'parameter06' WHERE id = 159;
UPDATE orbcomms_variables SET name = 'parameter07' WHERE id = 160;
UPDATE orbcomms_variables SET name = 'parameter08' WHERE id = 161;
UPDATE orbcomms_variables SET name = 'parameter09' WHERE id = 162;
UPDATE orbcomms_variables SET name = 'parameter10' WHERE id = 163;
UPDATE orbcomms_variables SET name = 'parameter11' WHERE id = 164;
UPDATE orbcomms_variables SET name = 'parameter12' WHERE id = 165;
UPDATE orbcomms_variables SET name = 'parameter13' WHERE id = 166;
UPDATE orbcomms_variables SET name = 'parameter14' WHERE id = 167;
UPDATE orbcomms_variables SET name = 'parameter15' WHERE id = 168;
UPDATE orbcomms_variables SET name = 'parameter16' WHERE id = 169;
UPDATE orbcomms_variables SET name = 'parameter17' WHERE id = 170;
UPDATE orbcomms_variables SET name = 'parameter18' WHERE id = 171;
UPDATE orbcomms_variables SET name = 'parameter19' WHERE id = 172;

UPDATE orbcomms_variables SET name = 'parameter01' WHERE id = 574;
UPDATE orbcomms_variables SET name = 'parameter02' WHERE id = 575;
UPDATE orbcomms_variables SET name = 'parameter03' WHERE id = 576;
UPDATE orbcomms_variables SET name = 'parameter04' WHERE id = 577;
UPDATE orbcomms_variables SET name = 'parameter05' WHERE id = 578;
UPDATE orbcomms_variables SET name = 'parameter06' WHERE id = 579;
UPDATE orbcomms_variables SET name = 'parameter07' WHERE id = 580;
UPDATE orbcomms_variables SET name = 'parameter08' WHERE id = 581;
UPDATE orbcomms_variables SET name = 'parameter09' WHERE id = 582;
UPDATE orbcomms_variables SET name = 'parameter10' WHERE id = 583;
UPDATE orbcomms_variables SET name = 'parameter11' WHERE id = 584;
UPDATE orbcomms_variables SET name = 'parameter12' WHERE id = 585;
UPDATE orbcomms_variables SET name = 'parameter13' WHERE id = 586;
UPDATE orbcomms_variables SET name = 'parameter14' WHERE id = 587;
UPDATE orbcomms_variables SET name = 'parameter15' WHERE id = 588;
UPDATE orbcomms_variables SET name = 'parameter16' WHERE id = 589;
UPDATE orbcomms_variables SET name = 'parameter17' WHERE id = 590;
UPDATE orbcomms_variables SET name = 'parameter18' WHERE id = 591;
UPDATE orbcomms_variables SET name = 'parameter19' WHERE id = 592;

UPDATE orbcomms_variables SET name = 'parameter20' WHERE id = 620;
UPDATE orbcomms_variables SET name = 'parameter21' WHERE id = 621;
UPDATE orbcomms_variables SET name = 'parameter22' WHERE id = 622;


DELETE FROM na_variables WHERE id = 60;
DELETE FROM na_variables WHERE id = 62;
DELETE FROM na_variables WHERE id = 63;

+----+------------+------------+-------------+---------+
| id | orbcomm_id | is_timeout | variable_id | is_zero |
+----+------------+------------+-------------+---------+
| 10 |         11 |          0 |         245 |       0 |
| 22 |         21 |          0 |         509 |       0 |
+----+------------+------------+-------------+---------+

INSERT INTO orbcomm_timeouts SET id = 10, orbcomm_id = 11, is_timeout = 0, variable_id = 245, is_zero = 0;
INSERT INTO orbcomm_timeouts SET id = 22, orbcomm_id = 21, is_timeout = 0, variable_id = 509, is_zero = 0;

+----+------------+------------+-------------+---------+
| id | orbcomm_id | is_timeout | variable_id | is_zero |
+----+------------+------------+-------------+---------+
|  7 |          7 |          1 |          99 |       0 |
| 23 |         22 |          1 |         536 |       0 |
+----+------------+------------+-------------+---------+

INSERT INTO orbcomm_timeouts SET id = 7, orbcomm_id = 7, is_timeout = 0, variable_id = 99, is_zero = 0;
INSERT INTO orbcomm_timeouts SET id = 23, orbcomm_id = 22, is_timeout = 0, variable_id = 536, is_zero = 0;

+----+------------+------------+-------------+---------+
| id | orbcomm_id | is_timeout | variable_id | is_zero |
+----+------------+------------+-------------+---------+
|  2 |          3 |          0 |          12 |       0 |
| 13 |         17 |          0 |         401 |       0 |
+----+------------+------------+-------------+---------+

INSERT INTO orbcomm_timeouts SET id = 2, orbcomm_id = 3, is_timeout = 0, variable_id = 12, is_zero = 0;
INSERT INTO orbcomm_timeouts SET id = 13, orbcomm_id = 17, is_timeout = 0, variable_id = 401, is_zero = 0;

+----+------------+------------+-------------+---------+
| id | orbcomm_id | is_timeout | variable_id | is_zero |
+----+------------+------------+-------------+---------+
| 11 |         12 |          0 |         149 |       0 |
| 12 |         13 |          0 |         275 |       0 |
+----+------------+------------+-------------+---------+

INSERT INTO orbcomm_timeouts SET id = 11, orbcomm_id = 12, is_timeout = 0, variable_id = 149, is_zero = 0;
INSERT INTO orbcomm_timeouts SET id = 12, orbcomm_id = 13, is_timeout = 0, variable_id = 275, is_zero = 0;

select * from logs where name like '%AGUA FRIA II MTC 2%';

| 233 | PRESION CABEZAL              | AGUA FRIA II MTC 2 | ht    |
| 234 | PRESION SUCCION              | AGUA FRIA II MTC 2 | hu    |
| 235 | PRES DESC 1º ETAPA           | AGUA FRIA II MTC 2 | hv    |
| 236 | PRES DESC 2º ETAPA           | AGUA FRIA II MTC 2 | hw    |
| 237 | PRES DESC 3º ETAPA           | AGUA FRIA II MTC 2 | hx    |
| 238 | PRES ACEITE COMPRESOR        | AGUA FRIA II MTC 2 | hy    |
| 239 | TEMP CILINDRO 1              | AGUA FRIA II MTC 2 | hz    |
| 240 | TEMP CILINDRO 2              | AGUA FRIA II MTC 2 | ia    |
| 241 | TEMP CILINDRO 3              | AGUA FRIA II MTC 2 | ib    |
| 242 | TEMP CILINDRO 4              | AGUA FRIA II MTC 2 | ic    |
| 243 | TEMP ACEITE COMPRESOR        | AGUA FRIA II MTC 2 | id    |
| 244 | TEMP ACEITE MOTOR            | AGUA FRIA II MTC 2 | ie    |
| 245 | VELOCIDAD MOTOR              | AGUA FRIA II MTC 2 | if    |
| 246 | CODIGO DE PARO               | AGUA FRIA II MTC 2 | ig    |
| 247 | I HRS DE OPERACION           | AGUA FRIA II MTC 2 | ih    |
| 248 | LEL 1                        | AGUA FRIA II MTC 2 | ii    |
| 249 | LEL 2                        | AGUA FRIA II MTC 2 | ij    |
| 250 | DETEC FUEGO 1                | AGUA FRIA II MTC 2 | ik    |
| 251 | DETEC FUEGO 2                | AGUA FRIA II MTC 2 | il    |
| 252 | FLUJO GAS COMBUSTIBLE        | AGUA FRIA II MTC 2 | im    |
| 253 | FLUJO GAS COMB. ACUM         | AGUA FRIA II MTC 2 | in    |
| 254 | FLUJO GAS COMB. DIA ANTERIOR | AGUA FRIA II MTC 2 | io    |
| 255 | FLUJO GAS MANEJADO           | AGUA FRIA II MTC 2 | ip    |
| 256 | FLUJO GAS ACUMULADO          | AGUA FRIA II MTC 2 | iq    |
| 257 | FLUJO GAS DIA ANTERIOR       | AGUA FRIA II MTC 2 | ir    |
| 383 | H₂S 1                        | AGUA FRIA II MTC 2 | nn    |
| 384 | H₂S 2                        | AGUA FRIA II MTC 2 | no    |

UPDATE orbcomms_variables SET name = 'Integer1'  WHERE id = 204;
UPDATE orbcomms_variables SET name = 'Integer2'  WHERE id = 205;
UPDATE orbcomms_variables SET name = 'Integer3'  WHERE id = 206;
UPDATE orbcomms_variables SET name = 'Integer4'  WHERE id = 207;
UPDATE orbcomms_variables SET name = 'Integer5'  WHERE id = 208;
UPDATE orbcomms_variables SET name = 'Integer6'  WHERE id = 209;
UPDATE orbcomms_variables SET name = 'Integer7'  WHERE id = 210;
UPDATE orbcomms_variables SET name = 'Integer8'  WHERE id = 211;
UPDATE orbcomms_variables SET name = 'Integer9'  WHERE id = 212;
UPDATE orbcomms_variables SET name = 'Integer10' WHERE id = 213;
UPDATE orbcomms_variables SET name = 'Integer11' WHERE id = 214;
UPDATE orbcomms_variables SET name = 'Integer12' WHERE id = 215;
UPDATE orbcomms_variables SET name = 'Integer13' WHERE id = 216;
UPDATE orbcomms_variables SET name = 'Integer14' WHERE id = 217;
UPDATE orbcomms_variables SET name = 'Integer15' WHERE id = 219;
UPDATE orbcomms_variables SET name = 'Integer16' WHERE id = 220;
UPDATE orbcomms_variables SET name = 'Integer17' WHERE id = 221;
UPDATE orbcomms_variables SET name = 'Integer18' WHERE id = 222;
UPDATE orbcomms_variables SET name = 'Float1' WHERE id = 218;
UPDATE orbcomms_variables SET name = 'Float2' WHERE id = 223;
UPDATE orbcomms_variables SET name = 'Float3' WHERE id = 224;
UPDATE orbcomms_variables SET name = 'Float4' WHERE id = 225;
UPDATE orbcomms_variables SET name = 'Float5' WHERE id = 226;
UPDATE orbcomms_variables SET name = 'Float6' WHERE id = 227;
UPDATE orbcomms_variables SET name = 'Float7' WHERE id = 228;


| 497 | PRESION CABEZAL              | AGUA FRIA II MTC 3 | rx    |
| 498 | PRESION SUCCION              | AGUA FRIA II MTC 3 | ry    |
| 499 | PRES DESC 1º ETAPA           | AGUA FRIA II MTC 3 | rz    |
| 500 | PRES DESC 2º ETAPA           | AGUA FRIA II MTC 3 | sa    |
| 501 | PRES DESC 3º ETAPA           | AGUA FRIA II MTC 3 | sb    |
| 502 | PRES ACEITE COMPRESOR        | AGUA FRIA II MTC 3 | sc    |
| 503 | TEMP CILINDRO 1              | AGUA FRIA II MTC 3 | sd    |
| 504 | TEMP CILINDRO 2              | AGUA FRIA II MTC 3 | se    |
| 505 | TEMP CILINDRO 3              | AGUA FRIA II MTC 3 | sf    |
| 506 | TEMP CILINDRO 4              | AGUA FRIA II MTC 3 | sg    |
| 507 | TEMP ACEITE COMPRESOR        | AGUA FRIA II MTC 3 | sh    |
| 508 | TEMP ACEITE MOTOR            | AGUA FRIA II MTC 3 | si    |
| 509 | VELOCIDAD MOTOR              | AGUA FRIA II MTC 3 | sj    |
| 510 | CODIGO DE PARO               | AGUA FRIA II MTC 3 | sk    |
| 511 | I HRS DE OPERACION           | AGUA FRIA II MTC 3 | sl    |
| 512 | LEL 1                        | AGUA FRIA II MTC 3 | sm    |
| 513 | LEL 2                        | AGUA FRIA II MTC 3 | sn    |
| 514 | DETEC FUEGO 1                | AGUA FRIA II MTC 3 | so    |
| 515 | DETEC FUEGO 2                | AGUA FRIA II MTC 3 | sp    |
| 516 | H₂S 1                        | AGUA FRIA II MTC 3 | sq    |
| 517 | H₂S 2                        | AGUA FRIA II MTC 3 | sr    |
| 518 | FLUJO GAS COMBUSTIBLE        | AGUA FRIA II MTC 3 | ss    |
| 519 | FLUJO GAS COMB. ACUM         | AGUA FRIA II MTC 3 | st    |
| 520 | FLUJO GAS COMB. DIA ANTERIOR | AGUA FRIA II MTC 3 | su    |
| 521 | FLUJO GAS MANEJADO           | AGUA FRIA II MTC 3 | sv    |
| 522 | FLUJO GAS ACUMULADO          | AGUA FRIA II MTC 3 | sw    |
| 523 | FLUJO GAS DIA ANTERIOR       | AGUA FRIA II MTC 3 | sx    |

UPDATE orbcomms_variables SET name = 'Integer1'  WHERE id = 455;
UPDATE orbcomms_variables SET name = 'Integer2'  WHERE id = 456;
UPDATE orbcomms_variables SET name = 'Integer3'  WHERE id = 457;
UPDATE orbcomms_variables SET name = 'Integer4'  WHERE id = 458;
UPDATE orbcomms_variables SET name = 'Integer5'  WHERE id = 459;
UPDATE orbcomms_variables SET name = 'Integer6'  WHERE id = 460;
UPDATE orbcomms_variables SET name = 'Integer7'  WHERE id = 461;
UPDATE orbcomms_variables SET name = 'Integer8'  WHERE id = 462;
UPDATE orbcomms_variables SET name = 'Integer9'  WHERE id = 463;
UPDATE orbcomms_variables SET name = 'Integer10' WHERE id = 464;
UPDATE orbcomms_variables SET name = 'Integer11' WHERE id = 465;
UPDATE orbcomms_variables SET name = 'Integer12' WHERE id = 466;
UPDATE orbcomms_variables SET name = 'Integer13' WHERE id = 467;
UPDATE orbcomms_variables SET name = 'Integer14' WHERE id = 468;
UPDATE orbcomms_variables SET name = 'Integer15' WHERE id = 470;
UPDATE orbcomms_variables SET name = 'Integer16' WHERE id = 471;
UPDATE orbcomms_variables SET name = 'Integer17' WHERE id = 472;
UPDATE orbcomms_variables SET name = 'Integer18' WHERE id = 473;
UPDATE orbcomms_variables SET name = 'Float1'    WHERE id = 469;
UPDATE orbcomms_variables SET name = 'Float2'    WHERE id = 474;
UPDATE orbcomms_variables SET name = 'Float3'    WHERE id = 475;
UPDATE orbcomms_variables SET name = 'Float4'    WHERE id = 476;

|  87 | PRESION CABEZAL              | AGUA FRIA MTC I | cd    |
|  88 | PRESION SUCCION              | AGUA FRIA MTC I | ce    |
|  89 | PRES DESC 1º ETAPA           | AGUA FRIA MTC I | cf    |
|  90 | PRES DESC 2º ETAPA           | AGUA FRIA MTC I | cg    |
|  91 | PRES DESC 3º ETAPA           | AGUA FRIA MTC I | ch    |
|  92 | PRES ACEITE COMPRESOR        | AGUA FRIA MTC I | ci    |
|  93 | TEMP CILINDRO 1              | AGUA FRIA MTC I | cj    |
|  94 | TEMP CILINDRO 2              | AGUA FRIA MTC I | ck    |
|  95 | TEMP CILINDRO 3              | AGUA FRIA MTC I | cl    |
|  96 | TEMP CILINDRO 4              | AGUA FRIA MTC I | cm    |
|  97 | TEMP ACEITE COMPRESOR        | AGUA FRIA MTC I | cn    |
|  98 | TEMP ACEITE MOTOR            | AGUA FRIA MTC I | co    |
|  99 | VELOCIDAD MOTOR              | AGUA FRIA MTC I | cp    |
| 100 | CODIGO DE PARO               | AGUA FRIA MTC I | cq    |
| 101 | I HRS DE OPERACION           | AGUA FRIA MTC I | cr    |
| 102 | LEL 1                        | AGUA FRIA MTC I | cs    |
| 103 | LEL 2                        | AGUA FRIA MTC I | ct    |
| 104 | DETEC FUEGO 1                | AGUA FRIA MTC I | cu    |
| 105 | DETEC FUEGO 2                | AGUA FRIA MTC I | cv    |
| 106 | PRES DIF 1                   | AGUA FRIA MTC I | cw    |
| 107 | PRES DIF 2                   | AGUA FRIA MTC I | cx    |
| 108 | RTD 1                        | AGUA FRIA MTC I | cy    |
| 109 | RTD 2                        | AGUA FRIA MTC I | cz    |
| 110 | FLUJO GAS ACUMULADO          | AGUA FRIA MTC I | da    |
| 111 | FLUJO GAS DIA ANTERIOR       | AGUA FRIA MTC I | db    |
| 179 | FLUJO GAS COMBUSTIBLE        | AGUA FRIA MTC I | fr    |
| 180 | FLUJO GAS COMB. ACUM         | AGUA FRIA MTC I | fs    |
| 181 | FLUJO GAS COMB. DIA ANTERIOR | AGUA FRIA MTC I | ft    |
| 182 | FLUJO GAS MANEJADO           | AGUA FRIA MTC I | fu    |
| 373 | H₂S 1                        | AGUA FRIA MTC I | nd    |
| 374 | H₂S 2                        | AGUA FRIA MTC I | ne    |


UPDATE orbcomms_variables SET name = 'Integer1'  WHERE id = 125;
UPDATE orbcomms_variables SET name = 'Integer2'  WHERE id = 126;
UPDATE orbcomms_variables SET name = 'Integer3'  WHERE id = 127;
UPDATE orbcomms_variables SET name = 'Integer4'  WHERE id = 128;
UPDATE orbcomms_variables SET name = 'Integer5'  WHERE id = 129;
UPDATE orbcomms_variables SET name = 'Integer6'  WHERE id = 130;
UPDATE orbcomms_variables SET name = 'Integer7'  WHERE id = 131;
UPDATE orbcomms_variables SET name = 'Integer8'  WHERE id = 132;
UPDATE orbcomms_variables SET name = 'Integer9'  WHERE id = 133;
UPDATE orbcomms_variables SET name = 'Integer10' WHERE id = 134;
UPDATE orbcomms_variables SET name = 'Integer11' WHERE id = 135;
UPDATE orbcomms_variables SET name = 'Integer12' WHERE id = 136;
UPDATE orbcomms_variables SET name = 'Integer13' WHERE id = 137;
UPDATE orbcomms_variables SET name = 'Integer14' WHERE id = 138;
UPDATE orbcomms_variables SET name = 'Integer15' WHERE id = 140;
UPDATE orbcomms_variables SET name = 'Integer16' WHERE id = 141;
UPDATE orbcomms_variables SET name = 'Integer17' WHERE id = 142;
UPDATE orbcomms_variables SET name = 'Integer18' WHERE id = 143;
UPDATE orbcomms_variables SET name = 'Float1'    WHERE id = 139;
UPDATE orbcomms_variables SET name = 'Float2'    WHERE id = 144;
UPDATE orbcomms_variables SET name = 'Float3'    WHERE id = 145;
UPDATE orbcomms_variables SET name = 'Float4'    WHERE id = 146;
UPDATE orbcomms_variables SET name = 'Float5'    WHERE id = 147;
UPDATE orbcomms_variables SET name = 'Float6'    WHERE id = 148;
UPDATE orbcomms_variables SET name = 'Float7'    WHERE id = 149;


| 524 | PRESION CABEZAL              | AGUA FRIA I MTC 2 | sy    |
| 525 | PRESION SUCCION              | AGUA FRIA I MTC 2 | sz    |
| 526 | PRES DESC 1º ETAPA           | AGUA FRIA I MTC 2 | ta    |
| 527 | PRES DESC 2º ETAPA           | AGUA FRIA I MTC 2 | tb    |
| 528 | PRES DESC 3º ETAPA           | AGUA FRIA I MTC 2 | tc    |
| 529 | PRES ACEITE COMPRESOR        | AGUA FRIA I MTC 2 | td    |
| 530 | TEMP CILINDRO 1              | AGUA FRIA I MTC 2 | te    |
| 531 | TEMP CILINDRO 2              | AGUA FRIA I MTC 2 | tf    |
| 532 | TEMP CILINDRO 3              | AGUA FRIA I MTC 2 | tg    |
| 533 | TEMP CILINDRO 4              | AGUA FRIA I MTC 2 | th    |
| 534 | TEMP ACEITE COMPRESOR        | AGUA FRIA I MTC 2 | ti    |
| 535 | TEMP ACEITE MOTOR            | AGUA FRIA I MTC 2 | tj    |
| 536 | VELOCIDAD MOTOR              | AGUA FRIA I MTC 2 | tk    |
| 537 | CODIGO DE PARO               | AGUA FRIA I MTC 2 | tl    |
| 538 | I HRS DE OPERACION           | AGUA FRIA I MTC 2 | tm    |
| 539 | LEL 1                        | AGUA FRIA I MTC 2 | tn    |
| 540 | LEL 2                        | AGUA FRIA I MTC 2 | to    |
| 541 | DETEC FUEGO 1                | AGUA FRIA I MTC 2 | tp    |
| 542 | DETEC FUEGO 2                | AGUA FRIA I MTC 2 | tq    |
| 543 | H₂S 1                        | AGUA FRIA I MTC 2 | tr    |
| 544 | H₂S 2                        | AGUA FRIA I MTC 2 | ts    |
| 545 | FLUJO GAS COMBUSTIBLE        | AGUA FRIA I MTC 2 | tt    |
| 546 | FLUJO GAS COMB. ACUM         | AGUA FRIA I MTC 2 | tu    |
| 547 | FLUJO GAS COMB. DIA ANTERIOR | AGUA FRIA I MTC 2 | tv    |
| 548 | FLUJO GAS MANEJADO           | AGUA FRIA I MTC 2 | tw    |
| 549 | FLUJO GAS ACUMULADO          | AGUA FRIA I MTC 2 | tx    |
| 550 | FLUJO GAS DIA ANTERIOR       | AGUA FRIA I MTC 2 | ty    |


UPDATE orbcomms_variables SET name = 'Integer1'  WHERE id = 477;
UPDATE orbcomms_variables SET name = 'Integer2'  WHERE id = 478;
UPDATE orbcomms_variables SET name = 'Integer3'  WHERE id = 479;
UPDATE orbcomms_variables SET name = 'Integer4'  WHERE id = 480;
UPDATE orbcomms_variables SET name = 'Integer5'  WHERE id = 481;
UPDATE orbcomms_variables SET name = 'Integer6'  WHERE id = 482;
UPDATE orbcomms_variables SET name = 'Integer7'  WHERE id = 483;
UPDATE orbcomms_variables SET name = 'Integer8'  WHERE id = 484;
UPDATE orbcomms_variables SET name = 'Integer9'  WHERE id = 485;
UPDATE orbcomms_variables SET name = 'Integer10' WHERE id = 486;
UPDATE orbcomms_variables SET name = 'Integer11' WHERE id = 487;
UPDATE orbcomms_variables SET name = 'Integer12' WHERE id = 488;
UPDATE orbcomms_variables SET name = 'Integer13' WHERE id = 489;
UPDATE orbcomms_variables SET name = 'Integer14' WHERE id = 490;
UPDATE orbcomms_variables SET name = 'Integer15' WHERE id = 492;
UPDATE orbcomms_variables SET name = 'Integer16' WHERE id = 493;
UPDATE orbcomms_variables SET name = 'Integer17' WHERE id = 494;
UPDATE orbcomms_variables SET name = 'Integer18' WHERE id = 495;
UPDATE orbcomms_variables SET name = 'Float1'    WHERE id = 491;
UPDATE orbcomms_variables SET name = 'Float2'    WHERE id = 499;
UPDATE orbcomms_variables SET name = 'Float3'    WHERE id = 500;
UPDATE orbcomms_variables SET name = 'Float4'    WHERE id = 501;


| 632 | PRESION CABEZAL              | CORRALILLO 786 MTC I | xc    |
| 633 | PRESION SUCCION              | CORRALILLO 786 MTC I | xd    |
| 634 | PRES DESC 1º ETAPA           | CORRALILLO 786 MTC I | xe    |
| 635 | PRES DESC 2º ETAPA           | CORRALILLO 786 MTC I | xf    |
| 636 | PRES DESC 3º ETAPA           | CORRALILLO 786 MTC I | xg    |
| 637 | PRES ACEITE COMPRESOR        | CORRALILLO 786 MTC I | xh    |
| 638 | TEMP CILINDRO 1              | CORRALILLO 786 MTC I | xi    |
| 639 | TEMP CILINDRO 2              | CORRALILLO 786 MTC I | xj    |
| 640 | TEMP CILINDRO 3              | CORRALILLO 786 MTC I | xk    |
| 641 | TEMP CILINDRO 4              | CORRALILLO 786 MTC I | xl    |
| 642 | TEMP ACEITE COMPRESOR        | CORRALILLO 786 MTC I | xm    |
| 643 | TEMP ACEITE MOTOR            | CORRALILLO 786 MTC I | xn    |
| 644 | VELOCIDAD MOTOR              | CORRALILLO 786 MTC I | xo    |
| 645 | CODIGO DE PARO               | CORRALILLO 786 MTC I | xp    |
| 646 | I HRS DE OPERACION           | CORRALILLO 786 MTC I | xq    |
| 647 | LEL 1                        | CORRALILLO 786 MTC I | xr    |
| 648 | LEL 2                        | CORRALILLO 786 MTC I | xs    |
| 649 | DETEC FUEGO 1                | CORRALILLO 786 MTC I | xt    |
| 650 | DETEC FUEGO 2                | CORRALILLO 786 MTC I | xu    |
| 651 | H₂S 1                        | CORRALILLO 786 MTC I | xv    |
| 652 | H₂S 2                        | CORRALILLO 786 MTC I | xw    |
| 653 | FLUJO GAS COMBUSTIBLE        | CORRALILLO 786 MTC I | xx    |
| 654 | FLUJO GAS COMB. ACUM         | CORRALILLO 786 MTC I | xy    |
| 655 | FLUJO GAS COMB. DIA ANTERIOR | CORRALILLO 786 MTC I | xz    |
| 656 | FLUJO GAS MANEJADO           | CORRALILLO 786 MTC I | ya    |
| 657 | FLUJO GAS ACUMULADO          | CORRALILLO 786 MTC I | yb    |
| 658 | FLUJO GAS DIA ANTERIOR       | CORRALILLO 786 MTC I | yc    |

| 443 | PRESION CABEZAL              | CORRALILLO 786 MTC 2 | pv    |
| 444 | PRESION SUCCION              | CORRALILLO 786 MTC 2 | pw    |
| 445 | PRES DESC 1º ETAPA           | CORRALILLO 786 MTC 2 | px    |
| 446 | PRES DESC 2º ETAPA           | CORRALILLO 786 MTC 2 | py    |
| 447 | PRES DESC 3º ETAPA           | CORRALILLO 786 MTC 2 | pz    |
| 448 | PRES ACEITE COMPRESOR        | CORRALILLO 786 MTC 2 | qa    |
| 449 | TEMP CILINDRO 1              | CORRALILLO 786 MTC 2 | qb    |
| 450 | TEMP CILINDRO 2              | CORRALILLO 786 MTC 2 | qc    |
| 451 | TEMP CILINDRO 3              | CORRALILLO 786 MTC 2 | qd    |
| 452 | TEMP CILINDRO 4              | CORRALILLO 786 MTC 2 | qe    |
| 453 | TEMP ACEITE COMPRESOR        | CORRALILLO 786 MTC 2 | qf    |
| 454 | TEMP ACEITE MOTOR            | CORRALILLO 786 MTC 2 | qg    |
| 455 | VELOCIDAD MOTOR              | CORRALILLO 786 MTC 2 | qh    |
| 456 | CODIGO DE PARO               | CORRALILLO 786 MTC 2 | qi    |
| 457 | I HRS DE OPERACION           | CORRALILLO 786 MTC 2 | qj    |
| 458 | LEL 1                        | CORRALILLO 786 MTC 2 | qk    |
| 459 | LEL 2                        | CORRALILLO 786 MTC 2 | ql    |
| 460 | DETEC FUEGO 1                | CORRALILLO 786 MTC 2 | qm    |
| 461 | DETEC FUEGO 2                | CORRALILLO 786 MTC 2 | qn    |
| 462 | H₂S 1                        | CORRALILLO 786 MTC 2 | qo    |
| 463 | H₂S 2                        | CORRALILLO 786 MTC 2 | qp    |
| 464 | FLUJO GAS COMBUSTIBLE        | CORRALILLO 786 MTC 2 | qq    |
| 465 | FLUJO GAS COMB. ACUM         | CORRALILLO 786 MTC 2 | qr    |
| 466 | FLUJO GAS COMB. DIA ANTERIOR | CORRALILLO 786 MTC 2 | qs    |
| 467 | FLUJO GAS MANEJADO           | CORRALILLO 786 MTC 2 | qt    |
| 468 | FLUJO GAS ACUMULADO          | CORRALILLO 786 MTC 2 | qu    |
| 469 | FLUJO GAS DIA ANTERIOR       | CORRALILLO 786 MTC 2 | qv    |

| 470 | PRESION CABEZAL              | CORRALILLO 786 MTC 3 | qw    |
| 471 | PRESION SUCCION              | CORRALILLO 786 MTC 3 | qx    |
| 472 | PRES DESC 1º ETAPA           | CORRALILLO 786 MTC 3 | qy    |
| 473 | PRES DESC 2º ETAPA           | CORRALILLO 786 MTC 3 | qz    |
| 474 | PRES DESC 3º ETAPA           | CORRALILLO 786 MTC 3 | ra    |
| 475 | PRES ACEITE COMPRESOR        | CORRALILLO 786 MTC 3 | rb    |
| 476 | TEMP CILINDRO 1              | CORRALILLO 786 MTC 3 | rc    |
| 477 | TEMP CILINDRO 2              | CORRALILLO 786 MTC 3 | rd    |
| 478 | TEMP CILINDRO 3              | CORRALILLO 786 MTC 3 | re    |
| 479 | TEMP CILINDRO 4              | CORRALILLO 786 MTC 3 | rf    |
| 480 | TEMP ACEITE COMPRESOR        | CORRALILLO 786 MTC 3 | rg    |
| 481 | TEMP ACEITE MOTOR            | CORRALILLO 786 MTC 3 | rh    |
| 482 | VELOCIDAD MOTOR              | CORRALILLO 786 MTC 3 | ri    |
| 483 | CODIGO DE PARO               | CORRALILLO 786 MTC 3 | rj    |
| 484 | I HRS DE OPERACION           | CORRALILLO 786 MTC 3 | rk    |
| 485 | LEL 1                        | CORRALILLO 786 MTC 3 | rl    |
| 486 | LEL 2                        | CORRALILLO 786 MTC 3 | rm    |
| 487 | DETEC FUEGO 1                | CORRALILLO 786 MTC 3 | rn    |
| 488 | DETEC FUEGO 2                | CORRALILLO 786 MTC 3 | ro    |
| 489 | H₂S 1                        | CORRALILLO 786 MTC 3 | rp    |
| 490 | H₂S 2                        | CORRALILLO 786 MTC 3 | rq    |
| 491 | FLUJO GAS COMBUSTIBLE        | CORRALILLO 786 MTC 3 | rr    |
| 492 | FLUJO GAS COMB. ACUM         | CORRALILLO 786 MTC 3 | rs    |
| 493 | FLUJO GAS COMB. DIA ANTERIOR | CORRALILLO 786 MTC 3 | rt    |
| 494 | FLUJO GAS MANEJADO           | CORRALILLO 786 MTC 3 | ru    |
| 495 | FLUJO GAS ACUMULADO          | CORRALILLO 786 MTC 3 | rv    |
| 496 | FLUJO GAS DIA ANTERIOR       | CORRALILLO 786 MTC 3 | rw    |

| 183 | PRESION CABEZAL              | CORRALILLO 786 MTC 4 | fv    |
| 184 | PRESION SUCCION              | CORRALILLO 786 MTC 4 | fw    |
| 185 | PRES DESC 1º ETAPA           | CORRALILLO 786 MTC 4 | fx    |
| 186 | PRES DESC 2º ETAPA           | CORRALILLO 786 MTC 4 | fy    |
| 187 | PRES DESC 3º ETAPA           | CORRALILLO 786 MTC 4 | fz    |
| 188 | PRES ACEITE COMPRESOR        | CORRALILLO 786 MTC 4 | ga    |
| 189 | TEMP CILINDRO 1              | CORRALILLO 786 MTC 4 | gb    |
| 190 | TEMP CILINDRO 2              | CORRALILLO 786 MTC 4 | gc    |
| 191 | TEMP CILINDRO 3              | CORRALILLO 786 MTC 4 | gd    |
| 192 | TEMP CILINDRO 4              | CORRALILLO 786 MTC 4 | ge    |
| 193 | TEMP ACEITE COMPRESOR        | CORRALILLO 786 MTC 4 | gf    |
| 194 | TEMP ACEITE MOTOR            | CORRALILLO 786 MTC 4 | gg    |
| 195 | VELOCIDAD MOTOR              | CORRALILLO 786 MTC 4 | gh    |
| 196 | CODIGO DE PARO               | CORRALILLO 786 MTC 4 | gi    |
| 197 | I HRS DE OPERACION           | CORRALILLO 786 MTC 4 | gj    |
| 198 | LEL 1                        | CORRALILLO 786 MTC 4 | gk    |
| 199 | LEL 2                        | CORRALILLO 786 MTC 4 | gl    |
| 200 | DETEC FUEGO 1                | CORRALILLO 786 MTC 4 | gm    |
| 201 | DETEC FUEGO 2                | CORRALILLO 786 MTC 4 | gn    |
| 202 | FLUJO GAS COMBUSTIBLE        | CORRALILLO 786 MTC 4 | go    |
| 203 | FLUJO GAS COMB. ACUM         | CORRALILLO 786 MTC 4 | gp    |
| 204 | FLUJO GAS COMB. DIA ANTERIOR | CORRALILLO 786 MTC 4 | gq    |
| 205 | FLUJO GAS MANEJADO           | CORRALILLO 786 MTC 4 | gr    |
| 206 | FLUJO GAS ACUMULADO          | CORRALILLO 786 MTC 4 | gs    |
| 207 | FLUJO GAS DIA ANTERIOR       | CORRALILLO 786 MTC 4 | gt    |
| 379 | H₂S 1                        | CORRALILLO 786 MTC 4 | nj    |
| 380 | H₂S 2                        | CORRALILLO 786 MTC 4 | nk    |

1)

|   1 | PRESION CABEZAL              | COAPECHACA 24 MTC I | a     |
|   2 | PRESION SUCCION              | COAPECHACA 24 MTC I | b     |
|   3 | PRES DESC 1º ETAPA           | COAPECHACA 24 MTC I | c     |
|   4 | PRES DESC 2º ETAPA           | COAPECHACA 24 MTC I | d     |
|   5 | PRES DESC 3º ETAPA           | COAPECHACA 24 MTC I | e     |
|   6 | TEMP CILINDRO 1              | COAPECHACA 24 MTC I | f     |
|   7 | TEMP CILINDRO 2              | COAPECHACA 24 MTC I | g     |
|   8 | TEMP CILINDRO 3              | COAPECHACA 24 MTC I | h     |
|   9 | TEMP CILINDRO 4              | COAPECHACA 24 MTC I | i     |
|  10 | TEMP ACEITE COMPRESOR        | COAPECHACA 24 MTC I | j     |
|  11 | TEMP ACEITE MOTOR            | COAPECHACA 24 MTC I | k     |
|  12 | VELOCIDAD MOTOR              | COAPECHACA 24 MTC I | l     |
|  13 | CODIGO DE PARO               | COAPECHACA 24 MTC I | m     |
|  17 | PRES ACEITE COMPRESOR        | COAPECHACA 24 MTC I | r     |
|  18 | I HRS DE OPERACION           | COAPECHACA 24 MTC I | s     |
|  19 | LEL 1                        | COAPECHACA 24 MTC I | t     |
|  20 | LEL 2                        | COAPECHACA 24 MTC I | u     |
|  21 | DETEC FUEGO 1                | COAPECHACA 24 MTC I | v     |
|  22 | DETEC FUEGO 2                | COAPECHACA 24 MTC I | w     |
|  23 | PRES DIF 1                   | COAPECHACA 24 MTC I | x     |
|  24 | PRES DIF 2                   | COAPECHACA 24 MTC I | y     |
|  25 | RTD 1                        | COAPECHACA 24 MTC I | z     |
|  26 | RTD 2                        | COAPECHACA 24 MTC I | aa    |
|  28 | FLUJO GAS ACUMULADO          | COAPECHACA 24 MTC I | ac    |
|  29 | FLUJO GAS MANEJADO           | COAPECHACA 24 MTC I | ad    |
|  30 | FLUJO GAS DIA ANTERIOR       | COAPECHACA 24 MTC I | ae    |
| 166 | FLUJO GAS COMBUSTIBLE        | COAPECHACA 24 MTC I | fe    |
| 175 | FLUJO GAS COMB. ACUM         | COAPECHACA 24 MTC I | fn    |
| 176 | FLUJO GAS COMB. DIA ANTERIOR | COAPECHACA 24 MTC I | fo    |
| 367 | H₂S 1                        | COAPECHACA 24 MTC I | mx    |
| 368 | H₂S 2                        | COAPECHACA 24 MTC I | my    |

UPDATE orbcomms_variables SET name = 'Integer1'   WHERE id =  16;
UPDATE orbcomms_variables SET name = 'Integer2'   WHERE id =  17;
UPDATE orbcomms_variables SET name = 'Integer3'   WHERE id =  18;
UPDATE orbcomms_variables SET name = 'Integer4'   WHERE id =  19;
UPDATE orbcomms_variables SET name = 'Integer5'   WHERE id =  20;
UPDATE orbcomms_variables SET name = 'Integer6'   WHERE id =  21;
UPDATE orbcomms_variables SET name = 'Integer7'   WHERE id =  22;
UPDATE orbcomms_variables SET name = 'Integer8'   WHERE id =  23;
UPDATE orbcomms_variables SET name = 'Integer9'   WHERE id =  24;
UPDATE orbcomms_variables SET name = 'Integer10'  WHERE id =  25;
UPDATE orbcomms_variables SET name = 'Integer11'  WHERE id =  26;
UPDATE orbcomms_variables SET name = 'Integer12'  WHERE id =  27;
UPDATE orbcomms_variables SET name = 'Integer13'  WHERE id =  28;
UPDATE orbcomms_variables SET name = 'Integer14'  WHERE id =  29;
UPDATE orbcomms_variables SET name = 'Integer16'  WHERE id =  31;
UPDATE orbcomms_variables SET name = 'Integer17'  WHERE id =  32;
UPDATE orbcomms_variables SET name = 'Integer18'  WHERE id =  33;
UPDATE orbcomms_variables SET name = 'Integer19'  WHERE id =  34;
UPDATE orbcomms_variables SET name = 'Float1'     WHERE id =  30;
UPDATE orbcomms_variables SET name = 'Float2'     WHERE id =  66;
UPDATE orbcomms_variables SET name = 'Float3'     WHERE id = 123;
UPDATE orbcomms_variables SET name = 'Float4'     WHERE id = 124;
UPDATE orbcomms_variables SET name = 'Flaot5'     WHERE id =  68;
UPDATE orbcomms_variables SET name = 'Flaot6'     WHERE id =  67;
UPDATE orbcomms_variables SET name = 'Flaot7'     WHERE id =  69;


2)

| 389 | PRESION CABEZAL              | COAPECHACA 24 MTC II | nt    |
| 390 | PRESION SUCCION              | COAPECHACA 24 MTC II | nu    |
| 391 | PRES DESC 1º ETAPA           | COAPECHACA 24 MTC II | nv    |
| 392 | PRES DESC 2º ETAPA           | COAPECHACA 24 MTC II | nw    |
| 393 | PRES DESC 3º ETAPA           | COAPECHACA 24 MTC II | nx    |
| 394 | PRES ACEITE COMPRESOR        | COAPECHACA 24 MTC II | ny    |
| 395 | TEMP CILINDRO 1              | COAPECHACA 24 MTC II | nz    |
| 396 | TEMP CILINDRO 2              | COAPECHACA 24 MTC II | oa    |
| 397 | TEMP CILINDRO 3              | COAPECHACA 24 MTC II | ob    |
| 398 | TEMP CILINDRO 4              | COAPECHACA 24 MTC II | oc    |
| 399 | TEMP ACEITE COMPRESOR        | COAPECHACA 24 MTC II | od    |
| 400 | TEMP ACEITE MOTOR            | COAPECHACA 24 MTC II | oe    |
| 401 | VELOCIDAD MOTOR              | COAPECHACA 24 MTC II | of    |
| 402 | CODIGO DE PARO               | COAPECHACA 24 MTC II | og    |
| 403 | I HRS DE OPERACION           | COAPECHACA 24 MTC II | oh    |
| 404 | LEL 1                        | COAPECHACA 24 MTC II | oi    |
| 405 | LEL 2                        | COAPECHACA 24 MTC II | oj    |
| 406 | DETEC FUEGO 1                | COAPECHACA 24 MTC II | ok    |
| 407 | DETEC FUEGO 2                | COAPECHACA 24 MTC II | ol    |
| 408 | FLUJO GAS COMBUSTIBLE        | COAPECHACA 24 MTC II | om    |
| 409 | FLUJO GAS COMB. ACUM         | COAPECHACA 24 MTC II | on    |
| 410 | FLUJO GAS COMB. DIA ANTERIOR | COAPECHACA 24 MTC II | oo    |
| 411 | FLUJO GAS MANEJADO           | COAPECHACA 24 MTC II | op    |
| 412 | FLUJO GAS ACUMULADO          | COAPECHACA 24 MTC II | oq    |
| 413 | FLUJO GAS DIA ANTERIOR       | COAPECHACA 24 MTC II | or    |
| 414 | H₂S 1                        | COAPECHACA 24 MTC II | os    |
| 415 | H₂S 2                        | COAPECHACA 24 MTC II | ot    |


UPDATE orbcomms_variables SET name = 'Integer1'  WHERE id = 358;
UPDATE orbcomms_variables SET name = 'Integer2'  WHERE id = 359;
UPDATE orbcomms_variables SET name = 'Integer3'  WHERE id = 360;
UPDATE orbcomms_variables SET name = 'Integer4'  WHERE id = 361;
UPDATE orbcomms_variables SET name = 'Integer5'  WHERE id = 362;
UPDATE orbcomms_variables SET name = 'Integer6'  WHERE id = 363;
UPDATE orbcomms_variables SET name = 'Integer7'  WHERE id = 364;
UPDATE orbcomms_variables SET name = 'Integer8'  WHERE id = 365;
UPDATE orbcomms_variables SET name = 'Integer9'  WHERE id = 366;
UPDATE orbcomms_variables SET name = 'Integer10' WHERE id = 367;
UPDATE orbcomms_variables SET name = 'Integer11' WHERE id = 368;
UPDATE orbcomms_variables SET name = 'Integer12' WHERE id = 369;
UPDATE orbcomms_variables SET name = 'Integer13' WHERE id = 370;
UPDATE orbcomms_variables SET name = 'Integer14' WHERE id = 371;
UPDATE orbcomms_variables SET name = 'Integer15' WHERE id = 373;
UPDATE orbcomms_variables SET name = 'Integer16' WHERE id = 374;
UPDATE orbcomms_variables SET name = 'Integer17' WHERE id = 375;
UPDATE orbcomms_variables SET name = 'Integer18' WHERE id = 376;
UPDATE orbcomms_variables SET name = 'Float1'    WHERE id = 372;
UPDATE orbcomms_variables SET name = 'Float2'    WHERE id = 377;
UPDATE orbcomms_variables SET name = 'Float3'    WHERE id = 378;
UPDATE orbcomms_variables SET name = 'Float4'    WHERE id = 379;


12
| 137 | PRESION CABEZAL              | CORRALILLO 624 MTC 1 | eb    |
| 138 | PRESION SUCCION              | CORRALILLO 624 MTC 1 | ec    |
| 139 | PRES DESC 1º ETAPA           | CORRALILLO 624 MTC 1 | ed    |
| 140 | PRES DESC 2º ETAPA           | CORRALILLO 624 MTC 1 | ee    |
| 141 | PRES DESC 3º ETAPA           | CORRALILLO 624 MTC 1 | ef    |
| 142 | PRES ACEITE COMPRESOR        | CORRALILLO 624 MTC 1 | eg    |
| 143 | TEMP CILINDRO 1              | CORRALILLO 624 MTC 1 | eh    |
| 144 | TEMP CILINDRO 2              | CORRALILLO 624 MTC 1 | ei    |
| 145 | TEMP CILINDRO 3              | CORRALILLO 624 MTC 1 | ej    |
| 146 | TEMP CILINDRO 4              | CORRALILLO 624 MTC 1 | ek    |
| 147 | TEMP ACEITE COMPRESOR        | CORRALILLO 624 MTC 1 | el    |
| 148 | TEMP ACEITE MOTOR            | CORRALILLO 624 MTC 1 | em    |
| 149 | VELOCIDAD MOTOR              | CORRALILLO 624 MTC 1 | en    |
| 150 | CODIGO DE PARO               | CORRALILLO 624 MTC 1 | eo    |
| 151 | I HRS DE OPERACION           | CORRALILLO 624 MTC 1 | ep    |
| 152 | LEL 1                        | CORRALILLO 624 MTC 1 | eq    |
| 153 | LEL 2                        | CORRALILLO 624 MTC 1 | er    |
| 154 | DETEC FUEGO 1                | CORRALILLO 624 MTC 1 | es    |
| 155 | DETEC FUEGO 2                | CORRALILLO 624 MTC 1 | et    |
| 156 | PRES DIF 1                   | CORRALILLO 624 MTC 1 | eu    |
| 157 | PRES DIF 2                   | CORRALILLO 624 MTC 1 | ev    |
| 158 | RTD 1                        | CORRALILLO 624 MTC 1 | ew    |
| 159 | RTD 2                        | CORRALILLO 624 MTC 1 | ex    |
| 160 | FLUJO GAS ACUMULADO          | CORRALILLO 624 MTC 1 | ey    |
| 161 | FLUJO GAS DIA ANTERIOR       | CORRALILLO 624 MTC 1 | ez    |
| 259 | FLUJO GAS COMBUSTIBLE        | CORRALILLO 624 MTC 1 | it    |
| 260 | FLUJO GAS COMB. ACUM         | CORRALILLO 624 MTC 1 | iu    |
| 261 | FLUJO GAS COMB. DIA ANTERIOR | CORRALILLO 624 MTC 1 | iv    |
| 262 | FLUJO GAS MANEJADO           | CORRALILLO 624 MTC 1 | iw    |
| 377 | H₂S 1                        | CORRALILLO 624 MTC 1 | nh    |
| 378 | H₂S 2                        | CORRALILLO 624 MTC 1 | ni    |

UPDATE orbcomms_varialbes SET name = 'Integer1'  WHERE id = 229;
UPDATE orbcomms_varialbes SET name = 'Integer2'  WHERE id = 230;
UPDATE orbcomms_varialbes SET name = 'Integer3'  WHERE id = 231;
UPDATE orbcomms_varialbes SET name = 'Integer4'  WHERE id = 232;
UPDATE orbcomms_varialbes SET name = 'Integer5'  WHERE id = 233;
UPDATE orbcomms_varialbes SET name = 'Integer6'  WHERE id = 234;
UPDATE orbcomms_varialbes SET name = 'Integer7'  WHERE id = 235;
UPDATE orbcomms_varialbes SET name = 'Integer8'  WHERE id = 236;
UPDATE orbcomms_varialbes SET name = 'Integer9'  WHERE id = 237;
UPDATE orbcomms_varialbes SET name = 'Integer10' WHERE id = 238;
UPDATE orbcomms_varialbes SET name = 'Integer11' WHERE id = 239;
UPDATE orbcomms_varialbes SET name = 'Integer12' WHERE id = 240;
UPDATE orbcomms_varialbes SET name = 'Integer13' WHERE id = 241;
UPDATE orbcomms_varialbes SET name = 'Integer14' WHERE id = 242;
UPDATE orbcomms_varialbes SET name = 'Integer15' WHERE id = 244;
UPDATE orbcomms_varialbes SET name = 'Integer16' WHERE id = 245;
UPDATE orbcomms_varialbes SET name = 'Integer17' WHERE id = 246;
UPDATE orbcomms_varialbes SET name = 'Integer18' WHERE id = 247;
UPDATE orbcomms_variables SET name = 'Float1'    WHERE id = 243;
UPDATE orbcomms_variables SET name = 'Float2'    WHERE id = 251;
UPDATE orbcomms_variables SET name = 'Float3'    WHERE id = 252;
UPDATE orbcomms_variables SET name = 'Float4'    WHERE id = 253;

13
| 263 | PRESION CABEZAL              | CORRALILLO 624 MTC 2 | ix    |
| 264 | PRESION SUCCION              | CORRALILLO 624 MTC 2 | iy    |
| 265 | PRES DESC 1º ETAPA           | CORRALILLO 624 MTC 2 | iz    |
| 266 | PRES DESC 2º ETAPA           | CORRALILLO 624 MTC 2 | ja    |
| 267 | PRES DESC 3º ETAPA           | CORRALILLO 624 MTC 2 | jb    |
| 268 | PRES ACEITE COMPRESOR        | CORRALILLO 624 MTC 2 | jc    |
| 269 | TEMP CILINDRO 1              | CORRALILLO 624 MTC 2 | jd    |
| 270 | TEMP CILINDRO 2              | CORRALILLO 624 MTC 2 | je    |
| 271 | TEMP CILINDRO 3              | CORRALILLO 624 MTC 2 | jf    |
| 272 | TEMP CILINDRO 4              | CORRALILLO 624 MTC 2 | jg    |
| 273 | TEMP ACEITE COMPRESOR        | CORRALILLO 624 MTC 2 | jh    |
| 274 | TEMP ACEITE MOTOR            | CORRALILLO 624 MTC 2 | ji    |
| 275 | VELOCIDAD MOTOR              | CORRALILLO 624 MTC 2 | jj    |
| 276 | CODIGO DE PARO               | CORRALILLO 624 MTC 2 | jk    |
| 277 | I HRS DE OPERACION           | CORRALILLO 624 MTC 2 | jl    |
| 278 | LEL 1                        | CORRALILLO 624 MTC 2 | jm    |
| 279 | LEL 2                        | CORRALILLO 624 MTC 2 | jn    |
| 280 | DETEC FUEGO 1                | CORRALILLO 624 MTC 2 | jo    |
| 281 | DETEC FUEGO 2                | CORRALILLO 624 MTC 2 | jp    |
| 282 | FLUJO GAS COMBUSTIBLE        | CORRALILLO 624 MTC 2 | jq    |
| 283 | FLUJO GAS COMB. ACUM         | CORRALILLO 624 MTC 2 | jr    |
| 284 | FLUJO GAS COMB. DIA ANTERIOR | CORRALILLO 624 MTC 2 | js    |
| 285 | FLUJO GAS MANEJADO           | CORRALILLO 624 MTC 2 | jt    |
| 286 | FLUJO GAS ACUMULADO          | CORRALILLO 624 MTC 2 | ju    |
| 287 | FLUJO GAS DIA ANTERIOR       | CORRALILLO 624 MTC 2 | jv    |
| 385 | H₂S 1                        | CORRALILLO 624 MTC 2 | np    |
| 386 | H₂S 2                        | CORRALILLO 624 MTC 2 | nq    |

UPDATE orbcomms_variables SET name = 'Integer1'  WHERE id = 254;
UPDATE orbcomms_variables SET name = 'Integer2'  WHERE id = 255;
UPDATE orbcomms_variables SET name = 'Integer3'  WHERE id = 256;
UPDATE orbcomms_variables SET name = 'Integer4'  WHERE id = 257;
UPDATE orbcomms_variables SET name = 'Integer5'  WHERE id = 258;
UPDATE orbcomms_variables SET name = 'Integer6'  WHERE id = 259;
UPDATE orbcomms_variables SET name = 'Integer7'  WHERE id = 260;
UPDATE orbcomms_variables SET name = 'Integer8'  WHERE id = 261;
UPDATE orbcomms_variables SET name = 'Integer9'  WHERE id = 262;
UPDATE orbcomms_variables SET name = 'Integer10' WHERE id = 263;
UPDATE orbcomms_variables SET name = 'Integer11' WHERE id = 264;
UPDATE orbcomms_variables SET name = 'Integer12' WHERE id = 265;
UPDATE orbcomms_variables SET name = 'Integer13' WHERE id = 266;
UPDATE orbcomms_variables SET name = 'Integer14' WHERE id = 267;
UPDATE orbcomms_variables SET name = 'Integer15' WHERE id = 269;
UPDATE orbcomms_variables SET name = 'Integer16' WHERE id = 270;
UPDATE orbcomms_variables SET name = 'Integer17' WHERE id = 271;
UPDATE orbcomms_variables SET name = 'Integer18' WHERE id = 272;
UPDATE orbcomms_variables SET name = 'Float1'    WHERE id = 268;
UPDATE orbcomms_variables SET name = 'Float2'    WHERE id = 273;
UPDATE orbcomms_variables SET name = 'Float3'    WHERE id = 274;
UPDATE orbcomms_variables SET name = 'Float4'    WHERE id = 275;
UPDATE orbcomms_variables SET name = 'Float5'    WHERE id = 276;
UPDATE orbcomms_variables SET name = 'Float6'    WHERE id = 277;
UPDATE orbcomms_variables SET name = 'Float7'    WHERE id = 278;


| 551 | PRESION CABEZAL              | CORRALILLO 874 MTC 1 | tz    |
| 552 | PRESION SUCCION              | CORRALILLO 874 MTC 1 | ua    |
| 553 | PRESION INTERETAPA           | CORRALILLO 874 MTC 1 | ub    |
| 554 | PRESION DESC FINAL           | CORRALILLO 874 MTC 1 | uc    |
| 555 | PRESION ANTICONGELANTE       | CORRALILLO 874 MTC 1 | ud    |
| 556 | PRES ACEITE COMPRESOR        | CORRALILLO 874 MTC 1 | ue    |
| 557 | TEMP CILINDRO 1              | CORRALILLO 874 MTC 1 | uf    |
| 558 | TEMP CILINDRO 2              | CORRALILLO 874 MTC 1 | ug    |
| 559 | TEMP ESCAPE CIL 1            | CORRALILLO 874 MTC 1 | uh    |
| 560 | TEMP ESCAPE CIL 2            | CORRALILLO 874 MTC 1 | ui    |
| 561 | TEMP AGUA COMPRESOR          | CORRALILLO 874 MTC 1 | uj    |
| 562 | TEMP AGUA CIL POTENCIA       | CORRALILLO 874 MTC 1 | uk    |
| 563 | VELOCIDAD MOTOR              | CORRALILLO 874 MTC 1 | ul    |
| 564 | CODIGO DE PARO               | CORRALILLO 874 MTC 1 | um    |
| 565 | I HRS DE OPERACION           | CORRALILLO 874 MTC 1 | un    |
| 566 | LEL 1                        | CORRALILLO 874 MTC 1 | uo    |
| 567 | LEL 2                        | CORRALILLO 874 MTC 1 | up    |
| 568 | DETEC FUEGO 1                | CORRALILLO 874 MTC 1 | uq    |
| 569 | DETEC FUEGO 2                | CORRALILLO 874 MTC 1 | ur    |
| 570 | H₂S 1                        | CORRALILLO 874 MTC 1 | us    |
| 571 | H₂S 2                        | CORRALILLO 874 MTC 1 | ut    |
| 572 | FLUJO GAS COMBUSTIBLE        | CORRALILLO 874 MTC 1 | uu    |
| 573 | FLUJO GAS COMB. ACUM         | CORRALILLO 874 MTC 1 | uv    |
| 574 | FLUJO GAS COMB. DIA ANTERIOR | CORRALILLO 874 MTC 1 | uw    |
| 575 | FLUJO GAS MANEJADO           | CORRALILLO 874 MTC 1 | ux    |
| 576 | FLUJO GAS ACUMULADO          | CORRALILLO 874 MTC 1 | uy    |
| 577 | FLUJO GAS DIA ANTERIOR       | CORRALILLO 874 MTC 1 | uz    |


UPDATE orbcomms_variables SET name = 'Integer1'  WHERE id = 504;
UPDATE orbcomms_variables SET name = 'Integer2'  WHERE id = 505;
UPDATE orbcomms_variables SET name = 'Integer3'  WHERE id = 506;
UPDATE orbcomms_variables SET name = 'Integer4'  WHERE id = 507;
UPDATE orbcomms_variables SET name = 'Integer5'  WHERE id = 508;
UPDATE orbcomms_variables SET name = 'Integer7'  WHERE id = 509;
UPDATE orbcomms_variables SET name = 'Integer8'  WHERE id = 510;
UPDATE orbcomms_variables SET name = 'Integer9'  WHERE id = 511;
UPDATE orbcomms_variables SET name = 'Integer10' WHERE id = 512;
UPDATE orbcomms_variables SET name = 'Integer11' WHERE id = 513;
UPDATE orbcomms_variables SET name = 'Integer12' WHERE id = 514;
UPDATE orbcomms_variables SET name = 'Integer13' WHERE id = 515;
UPDATE orbcomms_variables SET name = 'Integer14' WHERE id = 516;
UPDATE orbcomms_variables SET name = 'Integer15' WHERE id = 518;
UPDATE orbcomms_variables SET name = 'Integer16' WHERE id = 519;
UPDATE orbcomms_variables SET name = 'Integer17' WHERE id = 520;
UPDATE orbcomms_variables SET name = 'Integer18' WHERE id = 521;
UPDATE orbcomms_variables SET name = 'Float1'    WHERE id = 517;
UPDATE orbcomms_variables SET name = 'Float2'    WHERE id = 522;
UPDATE orbcomms_variables SET name = 'Float3'    WHERE id = 523;
UPDATE orbcomms_variables SET name = 'Float4'    WHERE id = 524;
UPDATE orbcomms_variables SET name = 'Float5'    WHERE id = 525;
UPDATE orbcomms_variables SET name = 'Float6'    WHERE id = 526;
UPDATE orbcomms_variables SET name = 'Float7'    WHERE id = 527;


=== SEPEC ===

908
908D
910

| 123 | LDD                  | CINCO PRESIDENTES 908  | dm    |
| 124 | TP                   | CINCO PRESIDENTES 908  | dn    |
| 125 | TR                   | CINCO PRESIDENTES 908  | do    |
| 126 | LDD                  | CINCO PRESIDENTES 908D | dp    |
| 127 | TP                   | CINCO PRESIDENTES 908D | dq    |
| 128 | TR                   | CINCO PRESIDENTES 908D | dr    |
| 129 | LDD                  | CINCO PRESIDENTES 910  | ds    |
| 130 | TP                   | CINCO PRESIDENTES 910  | dt    |
| 131 | TR                   | CINCO PRESIDENTES 910  | du    |
|  61 | LDD                  | CINCO PRESIDENTES 904  | bg    |
|  62 | TP                   | CINCO PRESIDENTES 904  | bh    |
|  63 | TR                   | CINCO PRESIDENTES 904  | bi    |
| 132 | LDD                  | CINCO PRESIDENTES 917  | dv    |
| 133 | TP                   | CINCO PRESIDENTES 917  | dw    |
| 134 | TR                   | CINCO PRESIDENTES 917  | dx    |

INSERT INTO orbcomms_variables SET variable_id = 123, orbcomm_id = 6, name = 'parameter10';
INSERT INTO orbcomms_variables SET variable_id = 124, orbcomm_id = 6, name = 'parameter11';
INSERT INTO orbcomms_variables SET variable_id = 125, orbcomm_id = 6, name = 'parameter12';

INSERT INTO orbcomms_variables SET variable_id = 126, orbcomm_id = 6, name = 'parameter13';
INSERT INTO orbcomms_variables SET variable_id = 127, orbcomm_id = 6, name = 'parameter14';
INSERT INTO orbcomms_variables SET variable_id = 128, orbcomm_id = 6, name = 'parameter15';

INSERT INTO orbcomms_variables SET variable_id = 129, orbcomm_id = 6, name = 'parameter16';
INSERT INTO orbcomms_variables SET variable_id = 130, orbcomm_id = 6, name = 'parameter17';
INSERT INTO orbcomms_variables SET variable_id = 131, orbcomm_id = 6, name = 'parameter18';

INSERT INTO orbcomms_variables SET variable_id = 61, orbcomm_id = 6, name = 'parameter19';
INSERT INTO orbcomms_variables SET variable_id = 62, orbcomm_id = 6, name = 'parameter20';
INSERT INTO orbcomms_variables SET variable_id = 63, orbcomm_id = 6, name = 'parameter21';

INSERT INTO orbcomms_variables SET variable_id = 132, orbcomm_id = 6, name = 'parameter22';
INSERT INTO orbcomms_variables SET variable_id = 133, orbcomm_id = 6, name = 'parameter23';
INSERT INTO orbcomms_variables SET variable_id = 134, orbcomm_id = 6, name = 'parameter24';

var v = 1.9010;
for (var i = 0; i < 269; i ++) {
	v = v + 0.004042;
	console.log(v);
}

var v = 1.3124;
for (var i = 0; i < 43; i ++) {
	v = v + 0.0322697;
	console.log(v);
}

UPDATE di_07_2020 SET value = 584.4777  WHERE id = 8038;


var v = 0.6564;
for (var i = 0; i < 71; i ++) {
	v = v + 0.015;
	console.log(v);
}

https://www.facebook.com/watch/?v=733805127540526

+----+-------------+-----------+-----------+----------------+----------------+--------+---------+
| id | variable_id | value_min | value_max | value_zero_min | value_zero_max | is_int | is_bool |
+----+-------------+-----------+-----------+----------------+----------------+--------+---------+
| 97 |         113 |   84.2700 |   85.2400 |         0.0000 |         0.0000 |      0 |       0 |
+----+-------------+-----------+-----------+----------------+----------------+--------+---------+

+----+-------------+-----------+-----------+----------------+----------------+--------+---------+
| id | variable_id | value_min | value_max | value_zero_min | value_zero_max | is_int | is_bool |
+----+-------------+-----------+-----------+----------------+----------------+--------+---------+
| 34 |          65 |  313.3000 |  325.7000 |         0.0000 |         0.0000 |      0 |       0 |
+----+-------------+-----------+-----------+----------------+----------------+--------+---------+


| 10 |          62 | CINCO PRESIDENTES 904.TP  | 2021-01-07 09:25:08 | 2021-01-07 15:25:08 |          0 |
| 12 |          63 | CINCO PRESIDENTES 904.TR  | 2021-01-07 09:25:08 | 2021-01-07 15:25:08 |          0 |
| 11 |          65 | CINCO PRESIDENTES 911.TP  | 2021-01-07 09:25:08 | 2021-01-07 15:25:08 |          0 |
| 80 |          68 | CINCO PRESIDENTES 913.TP  | 2021-01-07 09:25:08 | 2021-01-07 15:25:08 |          0 |
| 72 |          74 | RODADOR 505.TP            | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |
| 77 |          75 | RODADOR 505.TR            | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |
| 30 |          77 | RODADOR 609D.TP           | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |
| 76 |          78 | RODADOR 609D.TR           | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |
| 26 |          80 | RODADOR 703.TP            | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |
| 27 |          81 | RODADOR 703.TR            | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |
| 73 |          83 | RODADOR 713.TP            | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |
| 71 |          84 | RODADOR 713.TR            | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |
|  1 |          86 | GUARICHO 24D.TP           | 2021-01-07 09:25:25 | 2021-01-07 15:25:25 |          0 |
|  2 |          89 | GUARICHO 204.TP           | 2021-01-07 09:25:25 | 2021-01-07 15:25:25 |          0 |
| 74 |         113 | RODADOR 601.TP            | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |
| 75 |         114 | RODADOR 601.TR            | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |
| 43 |         127 | CINCO PRESIDENTES 908D.TP | 2021-01-07 09:25:08 | 2021-01-07 15:25:08 |          0 |
| 81 |         128 | CINCO PRESIDENTES 908D.TR | 2021-01-07 09:25:08 | 2021-01-07 15:25:08 |          0 |
| 78 |         180 | RODADOR 605.TP            | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |
| 79 |         181 | RODADOR 605.TR            | 2021-01-07 09:25:30 | 2021-01-07 15:25:30 |          0 |




mysql> select * from ov_10_2021 where timestamp > '2021-10-16 00:00:00';
+-----+-----------+---------------------+
| id  | value     | timestamp           |
+-----+-----------+---------------------+
|   1 |  585.1934 | 2021-10-16 18:53:12 |
|   2 |  585.1934 | 2021-10-16 18:54:24 |
|   3 |  587.0825 | 2021-10-16 18:55:09 |
|   4 |  587.0825 | 2021-10-16 18:56:25 |
|   5 |  588.8497 | 2021-10-16 18:57:10 |
|   6 |  592.8973 | 2021-10-16 19:01:10 |
|   7 |  594.5838 | 2021-10-16 19:02:48 |
|   8 |  594.5838 | 2021-10-16 19:03:51 |
|   9 |  596.2432 | 2021-10-16 19:04:44 |
|  10 |  597.8917 | 2021-10-16 19:05:29 |
|  11 |  597.8917 | 2021-10-16 19:06:11 |
|  12 |  599.5690 | 2021-10-16 19:07:13 |
|  13 |  601.1467 | 2021-10-16 19:08:51 |
|  14 |  601.1467 | 2021-10-16 19:09:33 |
|  15 |  602.6615 | 2021-10-16 19:10:12 |
|  16 |  604.1946 | 2021-10-16 19:11:44 |
|  17 |  604.1946 | 2021-10-16 19:12:12 |
|  18 |  605.6927 | 2021-10-16 19:13:11 |
|  19 |  607.1942 | 2021-10-16 19:14:13 |
|  20 |  607.1942 | 2021-10-16 19:15:26 |
|  21 |  608.7074 | 2021-10-16 19:16:44 |
|  22 |  610.2194 | 2021-10-16 19:17:25 |
|  23 |  610.2194 | 2021-10-16 19:18:10 |
|  24 |  611.7292 | 2021-10-16 19:19:30 |
|  25 |  613.2326 | 2021-10-16 19:20:10 |
|  26 |  614.7436 | 2021-10-16 19:21:13 |
|  27 |  614.7436 | 2021-10-16 19:22:39 |
|  28 |  616.2598 | 2021-10-16 19:24:04 |
|  29 |  617.7874 | 2021-10-16 19:24:13 |
|  30 |  617.7874 | 2021-10-16 19:25:13 |
|  31 |  619.3055 | 2021-10-16 19:26:10 |
|  32 |  620.8277 | 2021-10-16 19:27:11 |
|  33 |  620.8277 | 2021-10-16 19:28:30 |
|  34 |  622.3656 | 2021-10-16 19:29:54 |
|  35 |  623.8809 | 2021-10-16 19:30:41 |
|  36 |  623.8809 | 2021-10-16 19:31:30 |
|  37 |  625.3986 | 2021-10-16 19:32:11 |
|  38 |  626.8991 | 2021-10-16 19:33:25 |
|  39 |  626.8991 | 2021-10-16 19:34:26 |
|  40 |  628.4301 | 2021-10-16 19:35:12 |
|  41 |  629.9294 | 2021-10-16 19:36:49 |
|  42 |  631.4551 | 2021-10-16 19:37:25 |
|  43 |  631.4551 | 2021-10-16 19:38:10 |
|  44 |  632.9498 | 2021-10-16 19:39:45 |
|  45 |  634.4673 | 2021-10-16 19:40:55 |
|  46 |  634.4673 | 2021-10-16 19:42:03 |
|  47 |  634.4673 | 2021-10-16 19:42:13 |
|  48 |  636.9023 | 2021-10-16 19:43:10 |
|  49 |  636.9023 | 2021-10-16 19:44:13 |
|  50 |  639.2272 | 2021-10-16 19:45:28 |
|  51 |  640.7513 | 2021-10-16 19:46:25 |
|  52 |  640.7513 | 2021-10-16 19:47:13 |
|  53 |  642.2751 | 2021-10-16 19:48:45 |
|  54 |  643.7795 | 2021-10-16 19:49:39 |
|  55 |  643.7795 | 2021-10-16 19:50:30 |
|  56 |  645.3279 | 2021-10-16 19:51:13 |
|  57 |  646.8592 | 2021-10-16 19:52:30 |
|  58 |  646.8592 | 2021-10-16 19:53:11 |
|  59 |  648.4052 | 2021-10-16 19:54:50 |
|  60 |  649.9259 | 2021-10-16 19:55:44 |
|  61 |  651.4635 | 2021-10-16 19:56:25 |
|  62 |  651.4635 | 2021-10-16 19:57:12 |
|  63 |  652.9904 | 2021-10-16 19:58:48 |
|  64 |  654.5023 | 2021-10-16 19:59:13 |
|  65 |  654.5023 | 2021-10-16 20:00:33 |
|  66 |  656.0093 | 2021-10-16 20:01:29 |
|  67 |  657.5539 | 2021-10-16 20:02:26 |
|  68 |  657.5539 | 2021-10-16 20:03:26 |
|  69 |  659.0493 | 2021-10-16 20:04:11 |
|  70 |  660.5541 | 2021-10-16 20:05:28 |
|  71 |  662.0391 | 2021-10-16 20:06:29 |
|  72 |  662.0391 | 2021-10-16 20:07:26 |
|  73 |  663.5392 | 2021-10-16 20:09:45 |
|  74 |  665.0631 | 2021-10-16 20:09:54 |
|  75 |  665.0631 | 2021-10-16 20:10:11 |
|  76 |  666.5492 | 2021-10-16 20:11:29 |
|  77 |  668.0394 | 2021-10-16 20:13:00 |
|  78 |  668.0394 | 2021-10-16 20:13:20 |
|  79 |  669.5148 | 2021-10-16 20:14:30 |
|  80 |  672.2899 | 2021-10-16 20:17:13 |
|  81 |  673.8122 | 2021-10-16 20:18:11 |
|  82 |  675.3310 | 2021-10-16 20:19:41 |
|  83 |  675.3310 | 2021-10-16 20:21:19 |
|  84 |  676.8410 | 2021-10-16 20:21:33 |
|  85 |  678.3683 | 2021-10-16 20:22:24 |
|  86 |  678.3683 | 2021-10-16 20:23:13 |
|  87 |  679.8714 | 2021-10-16 20:24:27 |
|  88 |  681.3917 | 2021-10-16 20:25:48 |
|  89 |  681.3917 | 2021-10-16 20:26:34 |
|  90 |  682.8939 | 2021-10-16 20:27:31 |
|  91 |  684.4197 | 2021-10-16 20:28:11 |
|  92 |  685.9279 | 2021-10-16 20:30:10 |
|  93 |  685.9279 | 2021-10-16 20:31:14 |
|  94 |  687.4485 | 2021-10-16 20:31:50 |
|  95 |  688.9749 | 2021-10-16 20:32:33 |
|  96 |  688.9749 | 2021-10-16 20:33:39 |
|  97 |  690.5187 | 2021-10-16 20:34:28 |
|  98 |  692.0416 | 2021-10-16 20:39:35 |
|  99 |  693.9911 | 2021-10-16 20:39:43 |
| 100 |  693.9911 | 2021-10-16 20:40:13 |
| 101 |  695.5307 | 2021-10-16 20:40:36 |
| 102 |  695.5307 | 2021-10-16 20:40:51 |
| 103 |  697.0684 | 2021-10-16 20:41:01 |
| 104 |  698.5676 | 2021-10-16 20:42:12 |
| 105 |  698.5676 | 2021-10-16 20:42:13 |
| 106 |  700.0861 | 2021-10-16 20:43:24 |
| 107 |  701.6124 | 2021-10-16 20:44:59 |
| 108 |  701.6124 | 2021-10-16 20:45:10 |
| 109 |  703.0916 | 2021-10-16 20:46:39 |
| 110 |  704.6519 | 2021-10-16 20:47:26 |
| 111 |  704.6519 | 2021-10-16 20:48:45 |
| 112 |  706.1966 | 2021-10-16 20:49:11 |
| 113 |  707.7274 | 2021-10-16 20:50:26 |
| 114 |  707.7274 | 2021-10-16 20:51:13 |
| 115 |  709.2587 | 2021-10-16 20:52:12 |
| 116 |  710.7705 | 2021-10-16 20:54:03 |
| 117 |  710.7705 | 2021-10-16 20:58:37 |
| 118 |  713.9747 | 2021-10-16 20:58:38 |
| 119 |  716.9969 | 2021-10-16 20:59:13 |
| 120 |  715.4895 | 2021-10-16 20:59:34 |
| 121 |  716.9969 | 2021-10-16 20:59:40 |
| 122 |  716.9969 | 2021-10-16 21:01:10 |
| 123 |  718.4941 | 2021-10-16 21:02:06 |
| 124 |  720.0074 | 2021-10-16 21:02:26 |
| 125 |  720.0074 | 2021-10-16 21:03:25 |
| 126 |  721.5140 | 2021-10-16 21:04:53 |
| 127 |  723.0211 | 2021-10-16 21:05:49 |
| 128 |  724.5433 | 2021-10-16 21:07:00 |
| 129 |  724.5433 | 2021-10-16 21:07:30 |
| 130 |  726.0443 | 2021-10-16 21:08:48 |
| 131 |  727.5490 | 2021-10-16 21:09:36 |
| 132 |  727.5490 | 2021-10-16 21:10:40 |
| 133 |  729.0405 | 2021-10-16 21:11:48 |
| 134 |  730.5290 | 2021-10-16 21:12:28 |
| 135 |  730.5290 | 2021-10-16 21:13:14 |
| 136 |  732.0439 | 2021-10-16 21:14:11 |
| 137 |  733.5362 | 2021-10-16 21:15:40 |
| 138 |  733.5362 | 2021-10-16 21:16:09 |
| 139 |  735.0658 | 2021-10-16 21:17:24 |
| 140 |  736.6082 | 2021-10-16 21:18:11 |
| 141 |  738.1300 | 2021-10-16 21:19:41 |
| 142 |  738.1300 | 2021-10-16 21:20:48 |
| 143 |  739.6625 | 2021-10-16 21:21:41 |
| 144 |  741.1735 | 2021-10-16 21:22:32 |
| 145 |  744.9218 | 2021-10-16 21:28:39 |
| 146 |  746.4459 | 2021-10-16 21:28:51 |
| 147 |  743.3951 | 2021-10-16 21:28:54 |
| 148 |  746.4459 | 2021-10-16 21:29:15 |
| 149 |  749.4847 | 2021-10-16 21:30:14 |
| 150 |  747.9494 | 2021-10-16 21:30:21 |
| 151 |  749.4847 | 2021-10-16 21:31:11 |
| 152 |  751.0106 | 2021-10-16 21:32:44 |
| 153 |  752.5014 | 2021-10-16 21:33:14 |
| 154 |  752.5014 | 2021-10-16 21:34:29 |
| 155 |  754.0446 | 2021-10-16 21:35:11 |
| 156 |  755.7094 | 2021-10-16 21:36:28 |
| 157 |  755.7094 | 2021-10-16 21:37:33 |
| 158 |  755.7094 | 2021-10-16 21:39:06 |
| 159 |  814.4707 | 2021-10-16 22:33:09 |
| 160 |  816.1618 | 2021-10-16 22:35:00 |
| 161 |  816.1618 | 2021-10-16 22:36:20 |
| 162 |  817.6767 | 2021-10-16 22:36:26 |
| 163 |  819.1783 | 2021-10-16 22:37:11 |
| 164 |  819.1783 | 2021-10-16 22:38:26 |
| 165 |  820.6793 | 2021-10-16 22:41:44 |
| 166 |  823.6974 | 2021-10-16 22:42:28 |
| 167 |  825.1891 | 2021-10-16 22:43:49 |
| 168 |  826.6815 | 2021-10-16 22:44:11 |
| 169 |  826.6815 | 2021-10-16 22:45:28 |
| 170 |  828.1967 | 2021-10-16 22:46:35 |
| 171 |  829.6904 | 2021-10-16 22:47:09 |
| 172 |  829.6904 | 2021-10-16 22:48:30 |
| 173 |  831.2122 | 2021-10-16 22:49:26 |
| 174 |  832.6909 | 2021-10-16 22:50:54 |
| 175 |  832.6909 | 2021-10-16 22:51:24 |
| 176 |  834.1741 | 2021-10-16 22:52:11 |
| 177 |  836.7574 | 2021-10-16 22:55:13 |
| 178 |  836.7574 | 2021-10-16 22:55:36 |
| 179 |  836.7574 | 2021-10-16 22:55:54 |
| 180 |  838.2996 | 2021-10-16 22:56:30 |
| 181 |  839.8124 | 2021-10-16 22:57:24 |
| 182 |  839.8124 | 2021-10-16 22:58:48 |
| 183 |  841.3398 | 2021-10-16 22:59:45 |
| 184 |  842.8960 | 2021-10-16 23:00:46 |
| 185 |  844.4199 | 2021-10-16 23:01:25 |
| 186 |  844.4199 | 2021-10-16 23:02:11 |
| 187 |  845.9211 | 2021-10-16 23:03:13 |
| 188 |  847.4264 | 2021-10-16 23:04:47 |
| 189 |  847.4264 | 2021-10-16 23:05:29 |
| 190 |  848.9730 | 2021-10-16 23:06:55 |
| 191 |  850.5083 | 2021-10-16 23:07:10 |
| 192 |  854.1066 | 2021-10-16 23:12:36 |
| 193 |  855.6506 | 2021-10-16 23:12:48 |
| 194 |  852.5617 | 2021-10-16 23:12:51 |
| 195 |  855.6506 | 2021-10-16 23:13:26 |
| 196 |  855.6506 | 2021-10-16 23:13:49 |
| 197 |  857.1951 | 2021-10-16 23:14:36 |
| 198 |  858.7770 | 2021-10-16 23:15:28 |
| 199 |  858.7770 | 2021-10-16 23:16:24 |
| 200 |  860.2961 | 2021-10-16 23:17:14 |
| 201 | 1328.4268 | 2021-10-16 23:18:24 |
| 202 | 1328.4268 | 2021-10-16 23:19:33 |
| 203 | 1333.3516 | 2021-10-16 23:20:13 |
| 204 | 1338.1508 | 2021-10-16 23:21:28 |
| 205 |  866.4901 | 2021-10-16 23:23:13 |
| 206 |  866.4901 | 2021-10-16 23:23:16 |
| 207 |  868.0739 | 2021-10-16 23:25:08 |
| 208 |  869.6134 | 2021-10-16 23:25:44 |
| 209 |  869.6134 | 2021-10-16 23:26:25 |
| 210 |  871.1887 | 2021-10-16 23:27:40 |
| 211 |  872.7155 | 2021-10-16 23:28:32 |
| 212 |  872.7155 | 2021-10-16 23:29:31 |
| 213 |  874.2892 | 2021-10-16 23:30:30 |
| 214 |  875.8392 | 2021-10-16 23:31:14 |
| 215 |  875.8392 | 2021-10-16 23:32:12 |
| 216 |  877.4044 | 2021-10-16 23:33:33 |
| 217 |  878.9806 | 2021-10-16 23:34:11 |
| 218 |  878.9806 | 2021-10-16 23:35:24 |
| 219 |  880.5405 | 2021-10-16 23:36:16 |
| 220 |  882.0750 | 2021-10-16 23:37:13 |
| 221 |  882.0750 | 2021-10-16 23:38:13 |
| 222 |  883.6537 | 2021-10-16 23:39:33 |
| 223 |  885.1910 | 2021-10-16 23:40:28 |
| 224 |  885.1910 | 2021-10-16 23:41:13 |
| 225 |  886.7769 | 2021-10-16 23:42:13 |
| 226 |  888.3543 | 2021-10-16 23:43:13 |
| 227 |  888.3543 | 2021-10-16 23:44:59 |
| 228 |  889.9016 | 2021-10-16 23:45:25 |
| 229 |  891.4492 | 2021-10-16 23:46:14 |
| 230 |  893.0112 | 2021-10-16 23:47:10 |
| 231 |  893.0112 | 2021-10-16 23:48:14 |
| 232 |  894.5674 | 2021-10-16 23:49:10 |
| 233 |  896.1174 | 2021-10-16 23:50:45 |
| 234 |  896.1174 | 2021-10-16 23:51:45 |
| 235 |  897.6443 | 2021-10-16 23:53:30 |
| 236 |  899.1860 | 2021-10-16 23:53:36 |
| 237 |  899.1860 | 2021-10-16 23:54:25 |
| 238 |  900.7565 | 2021-10-16 23:55:25 |
| 239 |  902.3025 | 2021-10-16 23:56:12 |
| 240 |  902.3025 | 2021-10-16 23:57:45 |
| 241 |  903.8356 | 2021-10-16 23:58:11 |
| 242 |  905.4072 | 2021-10-16 23:59:25 |
| 243 |  905.4072 | 2021-10-17 00:01:23 |
| 244 |  906.9435 | 2021-10-17 00:01:40 |
| 245 |  908.4951 | 2021-10-17 00:02:25 |
| 246 |  908.4951 | 2021-10-17 00:04:08 |
| 247 |  910.0623 | 2021-10-17 00:04:38 |
| 248 |  911.6353 | 2021-10-17 00:05:48 |
| 249 |  911.6353 | 2021-10-17 00:06:30 |
| 250 |  913.1654 | 2021-10-17 00:07:34 |
| 251 |  914.6945 | 2021-10-17 00:08:39 |
| 252 |  914.6945 | 2021-10-17 00:09:13 |
| 253 |  916.2601 | 2021-10-17 00:10:25 |
| 254 |  917.8337 | 2021-10-17 00:11:48 |
| 255 |  919.3626 | 2021-10-17 00:12:45 |
| 256 |  919.3626 | 2021-10-17 00:13:26 |
| 257 |  920.9167 | 2021-10-17 00:15:08 |
| 258 |  922.4777 | 2021-10-17 00:15:51 |
| 259 |  922.4777 | 2021-10-17 00:16:25 |
| 260 |  924.0358 | 2021-10-17 00:17:11 |
| 261 |  925.5826 | 2021-10-17 00:18:10 |
| 262 |  925.5826 | 2021-10-17 00:19:26 |
| 263 |  927.1324 | 2021-10-17 00:20:55 |
| 264 |  928.7322 | 2021-10-17 00:21:40 |
| 265 |  928.7322 | 2021-10-17 00:22:48 |
| 266 |  930.2946 | 2021-10-17 00:23:14 |
| 267 |  931.8148 | 2021-10-17 00:24:24 |
| 268 |  931.8148 | 2021-10-17 00:25:14 |
| 269 |  933.3796 | 2021-10-17 00:26:24 |
| 270 |  934.9467 | 2021-10-17 00:27:13 |
| 271 |  934.9467 | 2021-10-17 00:28:45 |
| 272 |  936.4829 | 2021-10-17 00:29:31 |
| 273 |  938.0466 | 2021-10-17 00:31:28 |
| 274 |  938.0466 | 2021-10-17 00:32:04 |
| 275 |  939.5883 | 2021-10-17 00:32:13 |
