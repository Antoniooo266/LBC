USE lbc;

INSERT INTO equipo (ID_Equipo, NombreEquipo,Fecha,Victorias, Derrotas) VALUES (1,'Elver Team','2020-12-12',3,7), (2,'Keko Team','2021-02-14',4,6),(3,'Tito Team','2019-12-31',10,0),(4,'Abeja Team','2021-06-07',0,10),(5,'Antonio Team','2021-06-06',1,9),(6,'Nikolay Team','2020-03-13',0,0);

INSERT INTO torneo (ID_Torneo, NombreTorneo,ID_Juego,Cantidad, Fecha, Premio) VALUES (1,'World Cup',1,12,'2020-12-12','Un aplauso'), (2,'Dream Hack',2,16,'2021-02-14','2€'),(3,'LATAM CUP',3,4,'2019-12-31','Nada'),(4,'Murcia Cup',2,12,'2021-06-07','Una hectarea de tierras'),(5,'Grefg Cup',1,12,'2021-06-06','Un contador de grefg'),(6,'Ivan Cup',1,10,'2020-03-13','Un 10 en programacion');

INSERT INTO usuario (ID_Usuario, Nickname,Contraseña,Fecha_Nac, Correo, País, Rango) VALUES (1,'TitoFrost','LA LEYENDA','2002-08-22','TitoFrost@gmail.com','España',1), (2,'Angel Beltran','Angel tonto','2001-02-12','Angel@gmail.com','Españita',3),(3,'Antonio','Cabesita','2019-12-31','Antonio@gmail.com','Andorra',2),(4,'Nico','El tonto','2021-06-07','Nikolay@gmail.com','Francia',3);