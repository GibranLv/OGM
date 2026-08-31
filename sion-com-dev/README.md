UPDATE timeouts SET timeout = 3.25, delay = 90 WHERE orbcomm_id = 9;
UPDATE timeouts SET timeout = 1.5, delay = 0 WHERE orbcomm_id = 9;


UPDATE ae_03_2020 SET value = 10.83 * 14.2233 WHERE timestamp = '2020-03-12 00:40:16';
UPDATE ad_03_2020 SET value = 10.68 * 14.2233 WHERE timestamp = '2020-03-12 00:40:16';


SELECT * FROM ae_03_2020 WHERE timestamp = '2020-03-12 00:40:16';
SELECT * FROM ad_03_2020 WHERE timestamp = '2020-03-12 00:40:16';

DELETE FROM ae_03_2020 WHERE id = 19431;
DELETE FROM ad_03_2020 WHERE id = 19431;


INSERT INTO variable_factors SET variable_id = 443, is_custom = false, value = 1, probability = "1,-1,1,-1,0,0,1,-1,1,-1", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 444, is_custom = false, value = 1, probability = "1,-1,1,-1,0,0,1,-1,1,-1", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 445, is_custom = false, value = 1, probability = "1,-1,1,-1,0,0,1,-1,1,-1", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 446, is_custom = false, value = 4, probability = "1,-1,1,-1,0,0,1,-1,1,-1", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 447, is_custom = false, value = 5, probability = "1,-1,1,-1,0,0,1,-1,1,-1", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 448, is_custom = false, value = 1, probability = "0,0,0,1,0,-1,0,0,1,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 449, is_custom = false, value = 1, probability = "0,0,0,1,0,-1,0,0,1,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 450, is_custom = false, value = 1, probability = "0,0,0,1,0,-1,0,0,1,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 451, is_custom = false, value = 1, probability = "0,0,0,1,0,-1,0,0,1,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 452, is_custom = false, value = 1, probability = "0,0,0,1,0,-1,0,0,1,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 453, is_custom = false, value = 1, probability = "0,0,0,1,0,-1,0,0,1,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 454, is_custom = false, value = 1, probability = "0,0,0,1,0,-1,0,0,1,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 455, is_custom = false, value = 0, probability = "", is_incremental = false, is_random = true;

INSERT INTO variable_factors SET variable_id = 456, is_custom = false, value = 0, probability = "0,0,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 457, is_custom = false, value = 0, probability = "0,0,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 458, is_custom = false, value = 0, probability = "0,0,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 459, is_custom = false, value = 0, probability = "0,0,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 460, is_custom = false, value = 0, probability = "0,0,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id = 461, is_custom = false, value = 0, probability = "0,0,0", is_incremental = false, is_random = false;



INSERT INTO variable_factors SET variable_id =  464, is_custom = false, value = 0, probability = "", is_incremental = false, is_random = true;

INSERT INTO variable_factors SET variable_id =  465, is_custom = false, value = 0, probability = "", is_incremental = true, is_random = false;

INSERT INTO variable_factors SET variable_id =  466, is_custom = false, value = 0, probability = "0,0,0", is_incremental = false, is_random = false;

INSERT INTO variable_factors SET variable_id =  467, is_custom = false, value = 0, probability = "", is_incremental = false, is_random = true;

INSERT INTO variable_factors SET variable_id = 468, is_custom = false, value = 0, probability = "", is_incremental = true, is_random = false;

INSERT INTO variable_factors SET variable_id = 469, is_custom = false, value = 0, probability = "0,0,0", is_incremental = false, is_random = false;



| 443 | PRESION CABEZAL              | CORRALILLO 786 MTC 2 |
| 444 | PRESION SUCCION              | CORRALILLO 786 MTC 2 |
| 445 | PRES DESC 1º ETAPA           | CORRALILLO 786 MTC 2 |
| 446 | PRES DESC 2º ETAPA           | CORRALILLO 786 MTC 2 |
| 447 | PRES DESC 3º ETAPA           | CORRALILLO 786 MTC 2 |
| 448 | PRES ACEITE COMPRESOR        | CORRALILLO 786 MTC 2 |
| 449 | TEMP CILINDRO 1              | CORRALILLO 786 MTC 2 |
| 450 | TEMP CILINDRO 2              | CORRALILLO 786 MTC 2 |
| 451 | TEMP CILINDRO 3              | CORRALILLO 786 MTC 2 |
| 452 | TEMP CILINDRO 4              | CORRALILLO 786 MTC 2 |
| 453 | TEMP ACEITE COMPRESOR        | CORRALILLO 786 MTC 2 |
| 454 | TEMP ACEITE MOTOR            | CORRALILLO 786 MTC 2 |
| 455 | VELOCIDAD MOTOR              | CORRALILLO 786 MTC 2 |
| 456 | CODIGO DE PARO               | CORRALILLO 786 MTC 2 |
| 457 | I HRS DE OPERACION           | CORRALILLO 786 MTC 2 |
| 458 | LEL 1                        | CORRALILLO 786 MTC 2 |
| 459 | LEL 2                        | CORRALILLO 786 MTC 2 |
| 460 | DETEC FUEGO 1                | CORRALILLO 786 MTC 2 |
| 461 | DETEC FUEGO 2                | CORRALILLO 786 MTC 2 |

| 464 | FLUJO GAS COMBUSTIBLE        | CORRALILLO 786 MTC 2 |
| 465 | FLUJO GAS COMB. ACUM         | CORRALILLO 786 MTC 2 |
| 466 | FLUJO GAS COMB. DIA ANTERIOR | CORRALILLO 786 MTC 2 |
| 467 | FLUJO GAS MANEJADO           | CORRALILLO 786 MTC 2 |
| 468 | FLUJO GAS ACUMULADO          | CORRALILLO 786 MTC 2 |
| 469 | FLUJO GAS DIA ANTERIOR       | CORRALILLO 786 MTC 2 |



UPDATE timeouts SET timeout = 2, delay = 15 WHERE orbcomm_id = 12;
UPDATE timeouts SET timeout = 2, delay = 15 WHERE orbcomm_id = 13;


UPDATE cv_92_06_2020 SET value = value + 1000 WHERE timestamp >= '2020-06-23 03:51:14' AND timestamp <= '2020-06-23 19:06:13';

SELECT * FROM cv_92_06_2020  WHERE timestamp >= '2020-06-23 03:51:14' AND timestamp <= '2020-06-23 19:06:13';


JULIO 14 , 20:40 - 21:26

 921 y 913


 910 tr 