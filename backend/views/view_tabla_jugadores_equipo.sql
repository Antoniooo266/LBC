use lbc;
create definer = root@localhost view view_tabla_jugadores_equipo as
select `lbc`.`usuario`.`Nickname` AS `Nickname`,
       `e`.`NombreEquipo`         AS `NombreEquipo`,
       `r`.`NombreRango`          AS `NombreRango`
from (((`lbc`.`usuario` left join `lbc`.`usuario_equipo` `ue` on ((`lbc`.`usuario`.`ID_Usuario` = `ue`.`ID_Usuario`))) left join `lbc`.`equipo` `e` on ((`e`.`ID_Equipo` = `ue`.`ID_Equipo`)))
         left join `lbc`.`rango` `r` on ((`r`.`ID_Rango` = `lbc`.`usuario`.`Rango`)))
where (`r`.`ID_Rango` = 4);