$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/router/torneos",
        function (data) {
            let student = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {

            var Fecha=  value.Fecha;
            Fecha.in

                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                student += '<tr>';
                student += '<td>' + value.Nombre + '</td>';

                student += '<td>' + Date + '</td>';

                student += '<td>' + value.Premio + '</td>';

                student += '<td>' +value.Ganador + '</td>';
                if (value.Ganador == null){
                    value.Ganador = " "
                }
                student += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(student);
        });
});