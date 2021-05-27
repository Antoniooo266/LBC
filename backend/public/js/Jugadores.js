$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/user/get",
        function (data) {
            let player = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {

                if(value.NombreEquipo == null){
                    value.NombreEquipo = "Sin equipo"
                }
              
                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                player += '<tr>';
                player += '<td>' + value.Nickname + '</td>';

                player += '<td>' + value.Correo + '</td>';

                player += '<td>' +value.NombreEquipo + '</td>';

                player += '<td>' + value.NombreRango + '</td>';
                player += '</tr>';
            });
            
            //INSERTING ROWS INTO TABLE
            $('#table').append(player);
        });
});


