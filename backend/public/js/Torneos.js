
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
                student += '<td><form action="/resultado/pacopartidos" method="post"><button type="submit" name="Torneo" value="'+value.ID_Torneo+'">' + value.NombreTorneo + '</td></form></button>';

                student += '<td><form action="/resultado/pacopartidos" method="post"><button type="submit" name="Torneo" value="'+value.ID_Torneo+'">' + Fecha + '</td></form></button>';

                student += '<td><form action="/resultado/pacopartidos" method="post"><button type="submit" name="Torneo" value="'+value.ID_Torneo+'">' + value.Premio + '</td></form></button>';

                student += '<td><form action="/resultado/pacopartidos" method="post"><button type="submit" name="Torneo" value="'+value.ID_Torneo+'">' +value.NombreEquipo + '</td></form></button>';
                student += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(student);
        });
});

