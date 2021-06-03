$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/torneo/get",
        function (data) {
            var id=0;
            let Torneo = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {


                var Fecha = value.Fecha;
                var res = Fecha.substr(0, 10);


                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                
                Torneo += '<tr>';
                Torneo += '<td id='+id+' name="ID_Torneo">' + value.ID_Torneo + '</td>';
                Torneo += '<td>' + value.NombreTorneo + '</td>';
                Torneo += '<td>' + res + '</td>';
                Torneo += '<td><a href="ModificarTorneo.html"><button type="submit" style="background-color: #515468;" name="Editar" value="'+value.ID_Torneo+'"><img src="/public/Images/Edit.png" id="Trash2"></button></a>'
                Torneo += '<td><form action="/torneo/delete" method="post"><button type="submit" style="background-color: #515468;" name="Eliminar" value="'+value.ID_Torneo+'"><img src="/public/Images/Trash.png" id="Trash"></button></form></td>';

                Torneo += '</tr>';
                id+=1;

                
            });
                
            //INSERTING ROWS INTO TABLE
            $('#table').append(Torneo);
        });

});


