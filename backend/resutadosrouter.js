const connection = require("./config");
var express = require("express");
var router = express.Router();

//----Añadir Resultados----

router.post("/addresult", async (req, res) => {
    var equipoLocal;
    var equipoVisitante;
    var Ganador;
  
    GetIdEquipo(req.body.Visitante, function (err, data) {
      if (err) {
        console.log("ERROR : ", err);
      } else {
        equipoVisitante = data;
      }
    });
  
    GetIdEquipo(req.body.Local, function (err, data) {
      if (err) {
        console.log("ERROR : ", err);
      } else {
        equipoLocal = data;
      }
    });

    GetGanador(req.body.Ganador, function (err, data) {
      if (err) {
        console.log("ERROR : ", err);
      } else {
        Ganador = data;
      }
    });

    setTimeout(()=>{console.log(equipoLocal);
      const resultObj = {
        ID_Visitante: equipoVisitante,
        ID_Local: equipoLocal,
        Resultado_Local: req.body.ResultLocal,
        Resultado_Visitante: req.body.ResultVisitante,
        Fecha: req.body.Date,
      };
      const GanadorObj = {
        Nombre: req.body.NombreTorneo,
        Ganador: Ganador
      }
      console.log(resultObj);
      console.log(GanadorObj);
      connection.query("INSERT INTO partido SET ? ", resultObj, "UPDATE torneo SET Ganador = ? WHERE Nombre = ?", GanadorObj, (error) => {
        if (error) {
          throw error;
        } else {
          res.redirect("/public/Mensaje.html");
        }
      });
  }, 3000);
});
  
  function GetIdEquipo(nombre, callback) {
    connection.query(
      "SELECT ID_Equipo FROM equipo WHERE Nombre = ?",
      [nombre],
      function (err, result) {
        if (err) callback(err, null);
        else callback(null, result[0].ID_Equipo);
      }
    );
}

function GetGanador(nombre, callback) {
  connection.query(
    "SELECT Nombre FROM equipo WHERE ID_Equipo = ?",
    [nombre],
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result[0].ID_Equipo);
    }
  );
}
//---- Fin Añadir Resultado----
  module.exports = router;