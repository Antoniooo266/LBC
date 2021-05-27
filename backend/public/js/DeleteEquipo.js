$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/equipo/get",
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
                student += '<td id='+id+' name="ID_Torneo">' + value.ID_Equipo + '</td>';
                student += '<td>' + value.NombreEquipo + '</td>';
                student += '<td>' + res + '</td>';
                student += '<td><a href="ModificarTorneo.html"><button type="submit" style="background-color: #515468;" name="Editar" value="'+value.ID_Equipo+'"><img src="/public/Images/Edit.png" id="Trash2"></button></a>'
                student += '<td><form action="/torneo/delete" method="post"><button type="submit" style="background-color: #515468;" name="Eliminar" value="'+value.ID_Equipo+'"><img src="/public/Images/Trash.png" id="Trash"></button></form></td>';

                student += '</tr>';
                id+=1;

                
            });
                
            //INSERTING ROWS INTO TABLE
            $('#table').append(student);
        });

});