DROP DATABASE IF EXISTS LBC;
CREATE DATABASE IF NOT EXISTS LBC;
USE LBC;


CREATE TABLE USUARIO(
    ID_Usuario INT AUTO_INCREMENT,
    Nickname VARCHAR(255) NOT NULL UNIQUE,
    Contraseña VARCHAR(255),
    Fecha_Nac DATE,
    Correo VARCHAR(255),
    País VARCHAR(255),
    Rango INT,
    PRIMARY KEY (ID_Usuario)
);

CREATE TABLE EQUIPO(
    ID_Equipo INT AUTO_INCREMENT,
    NombreEquipo VARCHAR(255) NOT NULL UNIQUE,
    Fecha DATE,
    Victorias INT,
    Derrotas INT,
    PRIMARY KEY (ID_Equipo)
);

CREATE TABLE JUEGO(
    ID_Juego INT AUTO_INCREMENT,
    NombreJuego VARCHAR(255),
    Descripcion VARCHAR(500),
    Tipo INT,
    PRIMARY KEY (ID_Juego)
);

CREATE TABLE TORNEO(
    ID_Torneo INT AUTO_INCREMENT,
    NombreTorneo VARCHAR(255),
    ID_Juego INT,
    Cantidad INT,
    Fecha DATE,
    Premio VARCHAR(255),
    Ganador INT,
    PRIMARY KEY (ID_Torneo)
);

CREATE TABLE PARTIDO(
    ID_Partido INT AUTO_INCREMENT,
    ID_Visitante INT,
    ID_Local INT,
    ID_Torneo INT,
    ID_Ronda INT,
    Resultado_Visitante INT,
    Resultado_Local INT,
    Fecha DATE,
    PRIMARY KEY (ID_Partido)
);

CREATE TABLE RANGO(
    ID_Rango INT AUTO_INCREMENT,
    NombreRango VARCHAR(255),
    Descripcion VARCHAR(500),
    PRIMARY KEY (ID_Rango)
);

CREATE TABLE RONDA(
    ID_Ronda INT AUTO_INCREMENT,
    NombreRonda VARCHAR(255),
    PRIMARY KEY (ID_Ronda)
);

CREATE TABLE BANEO(
    ID_Usuario INT,
    Motivos VARCHAR(255),
    Fecha_DesBan DATETIME
);

CREATE TABLE EQUIPO_TORNEO(
    ID_Equipo INT,
    ID_Torneo INT
);

CREATE TABLE USUARIO_EQUIPO(
    ID_Equipo INT,
    ID_Usuario INT
);

CREATE TABLE TIPO(
    ID_Tipo INT AUTO_INCREMENT,
    NombreTipo VARCHAR(255),
    PRIMARY KEY (ID_Tipo)
);

CREATE TABLE PAGINA_WEB(
    ID_Web INT AUTO_INCREMENT,
    NombrePag VARCHAR(255),
    URL VARCHAR(255),
    PRIMARY KEY (ID_Web)
);

ALTER TABLE TORNEO
ADD FOREIGN KEY (ID_Juego) REFERENCES JUEGO(ID_Juego);

ALTER TABLE TORNEO
ADD FOREIGN KEY (Ganador) REFERENCES EQUIPO(ID_Equipo);

ALTER TABLE PARTIDO
ADD FOREIGN KEY (ID_Visitante) REFERENCES EQUIPO(ID_Equipo);

ALTER TABLE PARTIDO
ADD FOREIGN KEY (ID_Local) REFERENCES EQUIPO(ID_Equipo);

ALTER TABLE PARTIDO
ADD FOREIGN KEY (ID_Torneo) REFERENCES TORNEO(ID_Torneo);

ALTER TABLE PARTIDO
ADD FOREIGN KEY (ID_Ronda) REFERENCES RONDA(ID_Ronda);

ALTER TABLE BANEO
ADD FOREIGN KEY (ID_Usuario) REFERENCES USUARIO(ID_Usuario);

ALTER TABLE USUARIO
ADD FOREIGN KEY (Rango) REFERENCES RANGO(ID_Rango);

ALTER TABLE EQUIPO_TORNEO
ADD FOREIGN KEY (ID_Torneo) REFERENCES TORNEO(ID_Torneo);

ALTER TABLE EQUIPO_TORNEO
ADD FOREIGN KEY (ID_Equipo) REFERENCES EQUIPO(ID_Equipo);

ALTER TABLE USUARIO_EQUIPO
ADD FOREIGN KEY (ID_Equipo) REFERENCES EQUIPO(ID_Equipo);

ALTER TABLE USUARIO_EQUIPO
ADD FOREIGN KEY (ID_Usuario) REFERENCES USUARIO(ID_Usuario);

ALTER TABLE JUEGO
ADD FOREIGN KEY (Tipo) REFERENCES TIPO(ID_Tipo);

CREATE USER IF NOT EXISTS 'master'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

GRANT ALL PRIVILEGES ON * . * TO 'master'@'localhost';

FLUSH PRIVILEGES;

create definer = root@localhost view view_tabla_perfil as
select `lbc`.`usuario`.`ID_Usuario` AS `ID_Usuario`,
       `lbc`.`usuario`.`Nickname`   AS `Nickname`,
       `lbc`.`usuario`.`Fecha_Nac`  AS `Fecha_Nac`,
       `lbc`.`usuario`.`Correo`     AS `Correo`,
       `lbc`.`usuario`.`País`       AS `País`,
       `lbc`.`rango`.`NombreRango`  AS `NombreRango`,
       `e`.`NombreEquipo`           AS `NombreEquipo`,
       `e`.`Victorias`              AS `Victorias`,
       `e`.`Derrotas`               AS `Derrotas`
from ((`lbc`.`usuario` left join (`lbc`.`usuario_equipo` left join `lbc`.`equipo` `e` on ((`lbc`.`usuario_equipo`.`ID_Equipo` = `e`.`ID_Equipo`))) on ((`lbc`.`usuario`.`ID_Usuario` = `lbc`.`usuario_equipo`.`ID_Usuario`)))
         left join `lbc`.`rango` on ((`lbc`.`usuario`.`Rango` = `lbc`.`rango`.`ID_Rango`)));

create definer = root@localhost view view_tabla_torneo as
select `lbc`.`torneo`.`ID_Torneo` AS `ID_Torneo`,
        `lbc`.`torneo`.`NombreTorneo` AS `NombreTorneo`,
       `lbc`.`torneo`.`Fecha`        AS `Fecha`,
       `lbc`.`torneo`.`Premio`       AS `Premio`,
       `e`.`NombreEquipo`            AS `NombreEquipo`
from (`lbc`.`torneo`
         left join `lbc`.`equipo` `e` on ((`e`.`ID_Equipo` = `lbc`.`torneo`.`Ganador`)));

create view view_tabla_usuarios_equipo as
select `lbc`.`usuario`.`Nickname` AS `Nickname`,
       `e`.`NombreEquipo`         AS `NombreEquipo`,
       `r`.`NombreRango`          AS `NombreRango`
from (((`lbc`.`usuario` left join `lbc`.`usuario_equipo` `ue` on ((`lbc`.`usuario`.`ID_Usuario` = `ue`.`ID_Usuario`))) left join `lbc`.`equipo` `e` on ((`e`.`ID_Equipo` = `ue`.`ID_Equipo`)))
         left join `lbc`.`rango` `r` on ((`r`.`ID_Rango` = `lbc`.`usuario`.`Rango`)))
where (`r`.`ID_Rango` = 2);

create definer = root@localhost view view_tabla_usuario as
select `lbc`.`usuario`.`Nickname`  AS `Nickname`,
       `lbc`.`usuario`.`Correo`    AS `Correo`,
       `e`.`NombreEquipo`          AS `NombreEquipo`,
       `lbc`.`usuario`.`Fecha_Nac` AS `Fecha_Nac`,
       `r`.`NombreRango`           AS `NombreRango`
from (((`lbc`.`usuario` left join `lbc`.`rango` `r` on ((`r`.`ID_Rango` = `lbc`.`usuario`.`Rango`))) left join `lbc`.`usuario_equipo` `ue` on ((`lbc`.`usuario`.`ID_Usuario` = `ue`.`ID_Usuario`)))
         left join `lbc`.`equipo` `e` on ((`e`.`ID_Equipo` = `ue`.`ID_Equipo`)));

create definer = root@localhost view view_partido_torneo as
select `t`.`NombreTorneo`                    AS `NombreTorneo`,
       `e`.`NombreEquipo`                    AS `NombreLocal`,
       `e2`.`NombreEquipo`                   AS `NombreVisitante`,
       `lbc`.`partido`.`Fecha`               AS `Fecha`,
       `lbc`.`partido`.`Resultado_Local`     AS `Resultado_Local`,
       `lbc`.`partido`.`Resultado_Visitante` AS `Resultado_Visitante`
from (((`lbc`.`partido` left join `lbc`.`equipo` `e` on ((`e`.`ID_Equipo` = `lbc`.`partido`.`ID_Local`))) left join `lbc`.`equipo` `e2` on ((`e2`.`ID_Equipo` = `lbc`.`partido`.`ID_Visitante`)))
         left join `lbc`.`torneo` `t` on ((`t`.`ID_Torneo` = `lbc`.`partido`.`ID_Torneo`)));


create definer = root@localhost view view_tabla_jugadores_equipo as
select `lbc`.`usuario`.`Nickname` AS `Nickname`,
       `e`.`NombreEquipo`         AS `NombreEquipo`,
       `r`.`NombreRango`          AS `NombreRango`
from (((`lbc`.`usuario` left join `lbc`.`usuario_equipo` `ue` on ((`lbc`.`usuario`.`ID_Usuario` = `ue`.`ID_Usuario`))) left join `lbc`.`equipo` `e` on ((`e`.`ID_Equipo` = `ue`.`ID_Equipo`)))
         left join `lbc`.`rango` `r` on ((`r`.`ID_Rango` = `lbc`.`usuario`.`Rango`)))
where (`r`.`ID_Rango` = 4);