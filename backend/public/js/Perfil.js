import { ID, Rango } from './../../usersrouter.js';

Console.log(ID);
Console.log(Rango);

$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/user/getperfil",
        function (data) {
            let player = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {

                var Fecha = value.Fecha_Nac;
                Fecha = Fecha.substr(0, 10);

                if(value.Nombre == null){
                    value.Nombre = "Sin equipo"
                }
              
                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                player += '<tr>';
                player += '<td>' + value.Nickname + '</td>';

                player += '<td>' + value.Correo + '</td>';

                player += '<td>' +value.ID_Equipo + '</td>';

                player += '<td>' + Fecha + '</td>';

                player += '<td>' + value.Rango + '</td>';
                player += '</tr>';
            });
            
            //INSERTING ROWS INTO TABLE
            $('#table').append(player);
        });
});