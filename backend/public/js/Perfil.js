$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/user/getid",
        function (data) {
            let player = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {

                var Fecha = value.Fecha_Nac;
                Fecha = Fecha.substr(0, 10);

                if(value.NombreEquipo == null){
                    value.NombreEquipo = "Sin equipo"
                }

                if(value.Victorias == null){
                    value.Victorias = 0
                }
                if(value.Derrotas == null){
                    value.Derrotas = 0
                }
                if(value.Media == null){
                    value.Media = 0
                }
              
                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                player += '<tr>';
                player += '<td id="Fila1">' + value.Nickname + '</td>';

                player += '<td id="Fila2"><img src="Images/Team.png" id="Lose" >' + value.NombreEquipo + '</td>';

                player += '<td id="Fila3"><img src="Images/Correo.png" id="Lose" >' +value.Correo + '</td>';

                player += '</tr>';

                player += '<tr>';

                player += '<td id="Fila1"><img src="Images/Rango.png" id="Rango" >' + value.NombreRango + '</td>';

                player += '<div><td id="Fila2"><img src="Images/corona.png" id="Win" > ' + value.Victorias +'<img src="Images/Perdedor.png" id="Lose" >' +value.Derrotas +'</td></div>';

                player += '<td id="Fila3">' + value.Pais + '</td>';


                player += '</tr>';

                player += '<tr>';

                player += '<td id="Fila1">' + '</td>';



                

                player += '</tr>';
            });
            
            //INSERTING ROWS INTO TABLE
            $('#table').append(player);
        });
});
