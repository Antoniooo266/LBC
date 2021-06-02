$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/traspasos/get",
        function (data) {
            let Traspaso = '';
            
            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {
                

                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                Traspaso += '<tr>';
                Traspaso += '<td>' + value.Nickname + '</td>';

                Traspaso += '<td>' + value.NombreEquipo + '</td>';

                Traspaso += '<td>' +value.NombreRango + '</td>';

                Traspaso += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(Traspaso);
        });
    });