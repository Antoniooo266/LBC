$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/traspasos/getu",
        function (data) {
            let student = '';
            
            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {
                

                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                student += '<tr>';
                student += '<td>' + value.Nickname + '</td>';

                student += '<td>' + value.NombreEquipo + '</td>';

                student += '<td>' +value.NombreRango + '</td>';

                student += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(student);
        });

    });