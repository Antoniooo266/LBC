$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/torneo/get",
        function (data) {
            let student = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {


                var Fecha = value.Fecha;
                var res = Fecha.substr(0, 10);

        
                if(value.Ganador == null){
                    value.Ganador = "No finalizado"
                }

                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                student += '<tr>';
                student += '<td>' + value.Nombre + '</td>';

                student += '<td>' + res + '</td>';

                student += '<td>' + value.Premio + '</td>';

                student += '<td>' +value.Ganador + '</td>';
                student += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(student);
        });
});