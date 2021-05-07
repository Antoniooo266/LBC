$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/torneo/get",
        function (data) {
            let student = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {


                var Fecha = value.Fecha;
                var res = Fecha.substr(0, 10);


                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                student += '<tr>';
                student += '<td name="ID_Torneo">' + value.ID_Torneo + '</td>';
                student += '<td>' + value.Nombre + '</td>';
                student += '<td>' + res + '</td>';
                student += '<td><button style="background-color: #515468;" id="Trash" oncl><img src="/public/Images/Trash.png" id="Trash2"></button></td>'
                student += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table').append(student);
        });
});