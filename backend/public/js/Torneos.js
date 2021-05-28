
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
                var id= 1;
                
                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                student += '<tr>';
                student += '<td><a href="VerTorneo.html" value="'+id+'">' + value.NombreTorneo + '</td></a>';

                student += '<td><a href="VerTorneo.html">' + Fecha + '</td></a>';

                student += '<td><a href="VerTorneo.html">' + value.Premio + '</td></a>';

                student += '<td><a href="VerTorneo.html">' +value.NombreEquipo + '</td></a>';
                student += '</tr>';
                id += 1;
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(student);
        });
});

