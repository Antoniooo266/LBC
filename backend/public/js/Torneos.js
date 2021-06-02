
$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/torneo/get",
        function (data) {
            let Torneo = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {


                var Fecha = value.Fecha;
                var Fecha = Fecha.substr(0, 10);

        
                if(value.NombreEquipo == null){
                    value.NombreEquipo = "No finalizado"
                }
                
                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                Torneo += '<tr>';
                Torneo += '<td><form action="/resultado/pacopartidos" method="post"><button type="submit" name="Torneo" value="'+value.ID_Torneo+'">' + value.NombreTorneo + '</td></form></button>';

                Torneo += '<td><form action="/resultado/pacopartidos" method="post"><button type="submit" name="Torneo" value="'+value.ID_Torneo+'">' + Fecha + '</td></form></button>';

                Torneo += '<td><form action="/resultado/pacopartidos" method="post"><button type="submit" name="Torneo" value="'+value.ID_Torneo+'">' + value.Premio + '</td></form></button>';

                Torneo += '<td><form action="/resultado/pacopartidos" method="post"><button type="submit" name="Torneo" value="'+value.ID_Torneo+'">' +value.NombreEquipo + '</td></form></button>';
                Torneo += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(Torneo);
        });
});

