$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/traspasos/getu",
        function (data) {
            let UserTeam = '';
            
            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {
                
                if(value.NombreEquipo == null){
                    value.NombreEquipo = "Sin Equipo"
                }
                

                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                UserTeam += '<tr>';
                UserTeam += '<td>' + value.Nickname + '</td>';

                UserTeam += '<td>' + value.NombreEquipo + '</td>';

                UserTeam += '<td>' +value.NombreRango + '</td>';

                UserTeam += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(UserTeam);
        });

    });