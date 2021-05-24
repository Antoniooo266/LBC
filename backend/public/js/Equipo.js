$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/equipo/get",
        function (data) {
            let student = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {


                var Fecha = value.Fecha;
                var Fecha = Fecha.substr(0, 10);


                var Total =  value.Victorias + value.Derrotas
                var WinRate = value.Victorias/Total

                WinRate = WinRate.substr(2, 4);

                

                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                student += '<tr>';
                student += '<td>' + value.NombreEquipo + '</td>';

                student += '<td>' + Fecha + '</td>';

                student += '<td>' + value.Victorias + '</td>';

                student += '<td>' +value.Derrotas + '</td>';

                student += '<td>' + WinRate + '%</td>';
                student += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(student);
        });
});