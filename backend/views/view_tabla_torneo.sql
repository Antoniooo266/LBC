use lbc;
create definer = root@localhost view view_tabla_torneo as
select `lbc`.`torneo`.`ID_Torneo` AS `ID_Torneo`,
        `lbc`.`torneo`.`NombreTorneo` AS `NombreTorneo`,
       `lbc`.`torneo`.`Fecha`        AS `Fecha`,
       `lbc`.`torneo`.`Premio`       AS `Premio`,
       `e`.`NombreEquipo`            AS `NombreEquipo`
from (`lbc`.`torneo`
         left join `lbc`.`equipo` `e` on ((`e`.`ID_Equipo` = `lbc`.`torneo`.`Ganador`)));