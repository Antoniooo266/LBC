const connection = require("./config");
var express = require("express");
var router = express.Router();

//----ADD RESULTS----

router.post("/addresult", async (req, res) => {
    var equipoLocal;
    var equipoVisitante;
  
    GetIdEquipo(req.body.Visitante, function (err, data) { //Realiza la funcion con la req del formulario
      if (err) {
        console.log("ERROR : ", err);
      } else {
        equipoVisitante = data; //Obtiene el dato y lo mete en la variable
      }
    });
  
    GetIdEquipo(req.body.Local, function (err, data) {
      if (err) {
        console.log("ERROR : ", err);
      } else {
        equipoLocal = data;
      }
    });
    if(req.body.ronda == 1){
      GetIdEquipo(req.body.Winner, function (err, data) {
        if (err) {
          console.log("ERROR : ", err);
        } else{
          Ganador = data;
        }
      });
    }
  
    setTimeout(()=>{console.log(equipoLocal);
      const resultObj = {
        ID_Visitante: equipoVisitante,
        ID_Local: equipoLocal,
        Resultado_Local: req.body.ResultLocal,
        Resultado_Visitante: req.body.ResultVisitante,
        Fecha: req.body.Date,
      };
      var GanadorObj
      if (req.body.ronda == 1) { //Si en el formulario selecciona la Final ejecuta el GanadorObj
        GanadorObj = {
          Ganador: Ganador,
          NombreTorneo: req.body.NombreTorneo
        }
      }
      console.log(resultObj);
      connection.query("INSERT INTO partido SET ? ", resultObj, (error) => {
        if (error) {
          throw error;
        }
        if (req.body.ronda == 1) {
          connection.query("UPDATE torneo SET Ganador = ? WHERE NombreTorneo = ?", [GanadorObj.Ganador, GanadorObj.NombreTorneo], (error) => {
            if (error) {
              throw error;
            }
          });
        }
        res.redirect("/public/Mensaje.html");
      });
  }, 3000);
    
  });
  
  function GetIdEquipo(nombre, callback) { //Funcion que realiza una consulta para ontener el ID_Equipo
    connection.query(
      "SELECT ID_Equipo FROM equipo WHERE NombreEquipo = ?",
      [nombre],
      function (err, result) {
        if (err) callback(err, null); 
        else callback(null, result[0].ID_Equipo); //Devuelve solo el numero del ID_Equipo
      }
    );
  }

//----END ADD RESULTS----

  module.exports = router;