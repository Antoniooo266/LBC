$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/torneo/get",
        function (data) {
            let student = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {


                var Fecha = value.Fecha;
                var Fecha = Fecha.substr(0, 10);

        
                if(value.NombreEquipo == null){
                    value.NombreEquipo = "No finalizado"
                }

                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                student += '<tr>';
                student += '<td>' + value.NombreTorneo + '</td>';

                student += '<td>' + Fecha + '</td>';

                student += '<td>' + value.Premio + '</td>';

                student += '<td>' +value.NombreEquipo + '</td>';
                student += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(student);
        });
});