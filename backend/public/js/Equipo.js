$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/equipo/get",
        function (data) {
            let Equipo = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {


                var Fecha = value.Fecha;
                var Fecha = Fecha.substr(0, 10);


                var Total =  value.Victorias + value.Derrotas

               var  WR = (value.Victorias * 100) / Total;
               var WinRate = WR.toFixed(2);
                

                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                Equipo += '<tr>';
                Equipo += '<td>' + value.NombreEquipo + '</td>';

                Equipo += '<td>' + Fecha + '</td>';

                Equipo += '<td>' + value.Victorias + '</td>';

                Equipo += '<td>' +value.Derrotas + '</td>';

                Equipo += '<td>' + WinRate + '%</td>';

                Equipo += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(Equipo);
        });
});