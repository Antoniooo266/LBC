use lbc;
create definer = root@localhost view view_tabla_usuario as
select `lbc`.`usuario`.`Nickname`  AS `Nickname`,
       `lbc`.`usuario`.`Correo`    AS `Correo`,
       `e`.`NombreEquipo`          AS `NombreEquipo`,
       `lbc`.`usuario`.`Fecha_Nac` AS `Fecha_Nac`,
       `r`.`NombreRango`           AS `NombreRango`
from (((`lbc`.`usuario` left join `lbc`.`rango` `r` on ((`r`.`ID_Rango` = `lbc`.`usuario`.`Rango`))) left join `lbc`.`usuario_equipo` `ue` on ((`lbc`.`usuario`.`ID_Usuario` = `ue`.`ID_Usuario`)))
         left join `lbc`.`equipo` `e` on ((`e`.`ID_Equipo` = `ue`.`ID_Equipo`)));