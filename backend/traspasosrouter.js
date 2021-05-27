const connection = require("./config");
var express = require("express");
var router = express.Router();

router.post("/add", async (req, res) => {
    var usuario;
    var equipo;
  
    GetIdEquipo(req.body.Visitante, function (err, data) {
      if (err) {
        console.log("ERROR : ", err);
      } else {
        equipo = data;
      }
    });

    GetIdUser(req.body.Visitante, function (err, data) {
        if (err) {
          console.log("ERROR : ", err);
        } else {
          usuario = data;
        }
      });
  
    setTimeout(()=>{console.log(equipoLocal);
      const TraspasoObj = {
        Nickname: equipoVisitante,
        NombreEquipo: dewdew
      };
      console.log(resultObj);
      connection.query("INSERT INTO usuario_equipo SET ? ", resultObj, (error) => {
        if (error) {
          throw error;
        } else {
          connection.query("UPDATE torneo SET Ganador = ? WHERE NombreTorneo = ?", [GanadorObj.Ganador, GanadorObj.NombreTorneo], (error) => {
            if (error) {
              throw error;
            }
          });
          res.redirect("/public/Mensaje.html");
        }
      });
  }, 3000);
    
  });
  
  function GetIdEquipo(nombre, callback) {
    connection.query(
      "SELECT ID_Equipo FROM equipo WHERE NombreEquipo = ?",
      [nombre],
      function (err, result) {
        if (err) callback(err, null);
        else callback(null, result[0].ID_Equipo);
      }
    );
  }

  function GetIdUser(nombre, callback) {
    connection.query(
      "SELECT ID_Usuario FROM usuario WHERE Nickname = ?",
      [nombre],
      function (err, result) {
        if (err) callback(err, null);
        else callback(null, result[0].ID_Usuario);
      }
    );
  }

module.exports = router;


