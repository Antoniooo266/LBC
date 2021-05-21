$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/torneo/get",
        function (data) {
            var id=0;
            let student = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {


                var Fecha = value.Fecha;
                var res = Fecha.substr(0, 10);


                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                
                student += '<tr>';
                student += '<td id='+id+' name="ID_Torneo">' + value.ID_Torneo + '</td>';
                student += '<td>' + value.NombreTorneo + '</td>';
                student += '<td>' + res + '</td>';
                
                student += '</tr>';
                id+=1;

                
            });
                
            //INSERTING ROWS INTO TABLE
            $('#table').append(student);
        });

});