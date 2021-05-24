USE lbc;

INSERT INTO tipo (ID_Tipo, NombreTipo) VALUES (1000, 'Estrategia');

INSERT INTO tipo (ID_Tipo, NombreTipo) VALUES (2000, 'Battle Royale');

INSERT INTO tipo (ID_Tipo, NombreTipo) VALUES (3000, 'Shooter');

INSERT INTO juego (ID_Juego, NombreJuego, Descripcion, Tipo)
VALUES (1, 'LEAGUE OF LEGENDS', 'Juego de estrategia que te mata por dentro poco a poco', 1000);

INSERT INTO juego (ID_Juego, NombreJuego, Descripcion, Tipo)
VALUES (2, 'WARZONE', 'Juego de battle royale ', 2000);

INSERT INTO juego (ID_Juego, NombreJuego, Descripcion, Tipo)
VALUES (3, 'CSGO', 'Juego de pistolitas PIU PIU', 3000);

INSERT INTO equipo (ID_Equipo, NombreEquipo, Fecha, Victorias, Derrotas)
VALUES (1, 'Elver Team', '2020-2-15', 5, 8);

INSERT INTO equipo (ID_Equipo, NombreEquipo, Fecha, Victorias, Derrotas)
VALUES (2, 'Keko Team', '2020-2-15', 7, 1);

INSERT INTO rango (ID_Rango, NombreRango, Descripcion)
VALUES (1, 'Administrador', 'Usuario maestro que tiene todos los privilegios del sistema');

INSERT INTO rango (ID_Rango, NombreRango, Descripcion)
VALUES (2, 'Usuario', 'Usuario que navega por nuestra pagina web');

INSERT INTO rango (ID_Rango, NombreRango, Descripcion)
VALUES (3, 'Equipo', 'Usuario de un equipo que le permite inscribirte');

INSERT INTO rango (ID_Rango, NombreRango, Descripcion)
VALUES (4, 'Jugador', 'Usuario que pertenece a un equipo y juega rondas');

INSERT INTO ronda (ID_Ronda, NombreRonda)
VALUES (1, 'FINAL');

INSERT INTO ronda (ID_Ronda, NombreRonda)
VALUES (2, 'SEMIFINAL');

INSERT INTO ronda (ID_Ronda, NombreRonda)
VALUES (3, 'CUARTOS');






