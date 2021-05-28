use lbc;
create definer = root@localhost view view_partido_torneo as
select `t`.`NombreTorneo`                    AS `NombreTorneo`,
`lbc`.`partido`.`ID_Torneo` AS `ID_Torneo`, 
       `e`.`NombreEquipo`                    AS `NombreLocal`,
       `e2`.`NombreEquipo`                   AS `NombreVisitante`,
       `lbc`.`partido`.`Fecha`               AS `Fecha`,
       `lbc`.`partido`.`Resultado_Local`     AS `Resultado_Local`,
       `lbc`.`partido`.`Resultado_Visitante` AS `Resultado_Visitante`
from (((`lbc`.`partido` left join `lbc`.`equipo` `e` on ((`e`.`ID_Equipo` = `lbc`.`partido`.`ID_Local`))) left join `lbc`.`equipo` `e2` on ((`e2`.`ID_Equipo` = `lbc`.`partido`.`ID_Visitante`)))
         left join `lbc`.`torneo` `t` on ((`t`.`ID_Torneo` = `lbc`.`partido`.`ID_Torneo`)));

