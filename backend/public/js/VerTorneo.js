$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("http://localhost:3000/resultado/VerPartidos",
        function (data) {
            let student = '';


            // ITERATING THROUGH OBJECTS
            $.each(data, function (key, value) {


                var Fecha = value.Fecha;
                var Fecha = Fecha.substr(0, 10);
                var Visitante = " ";
                var Local = " ";

                if(value.Resultado_Local > value.Resultado_Visitante){
                    Local = "W"
                    Visitante = "L"

                }else if( value.Resultado_Visitante > value.Resultado_Local){
                    Visitante = "W"
                    Local = "L";
                }
                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                student += '<tr>';

                student += '<td value="'+value.ID_Torneo+'" id="Local" name="Torneo">' + value.NombreLocal + '</td></a>';

                student += '<td id="Resultado">' + Local + '</td></a>';
                student += '<td id="Resultado">' + Visitante + '</td></a>';

                student += '<td id="Visitante">' + value.NombreVisitante + '</td></a>';

                
                student += '</tr>';
            });

            //INSERTING ROWS INTO TABLE
            $('#table2').append(student);
        });
});