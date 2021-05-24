use lbc;
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
