$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/user/get",
        function (data) {
            let player = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {

                var Fecha = value.Fecha_Nac;
                Fecha = Fecha.substr(0, 10);
              
                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                player += '<tr>';
                player += '<td>' + value.Nickname + '</td>';

                player += '<td>' + value.Correo + '</td>';

                player += '<td>' +value.ID_Equipo + '</td>';

                player += '<td>' + Fecha + '</td>';

                player += '<td><select name="Rangos" onchange="Actualizar(value.ID_Usuario)"><option value="1">Administrador</option><option value="2">Usuario</option><option value="3">Capitan</option><option value="4">Jugador</option> </select></td><script src="js/ActualizarRango.js"></script>';
                
                player += '</tr>';
            });
            
            //INSERTING ROWS INTO TABLE
            $('#table').append(player);
        });
});


