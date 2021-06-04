const connection = require("./config");
var express = require("express");
const { response } = require("express");
var router = express.Router();

router.get('/get', (req, res)=>{
  // se obtienen todos los datos de la vista view_partido_torneo
    connection.query("SELECT * FROM view_partido_torneo WHERE ID_Torneo = ?",(error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send("No hay resultados :(");
      }
    });
})

//----END RESULTS----

//----ADD RESULTS----

router.post("/addresult", async (req, res) => {
    var equipoLocal;
    var equipoVisitante;
    var torneo;
  
    GetIdEquipo(req.body.Visitante, function (err, data) { //Realiza la funcion con la req del formulario
      if (err) {
        console.log("ERROR : ", err);
      } else {
        equipoVisitante = data; //Obtiene el dato y lo mete en la variable
      }
    });

    GetIdTorneo(req.body.NombreTorneo, function (err, data) {
      if (err) {
        console.log("ERROR : ", err);
      } else {
        torneo = data;
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
        ID_Torneo: torneo,
        ID_Ronda: req.body.ronda,
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
        res.redirect('/public/Mensaje.html')
      });
  }, 3000);
    
  });

  //----END ADD RESULTS----

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

  function GetIdTorneo(nombre, callback) { //Funcion que realiza una consulta para ontener el ID_Equipo
    connection.query(
      "SELECT ID_Torneo FROM torneo WHERE NombreTorneo = ?",
      [nombre],
      function (err, result) {
        if (err) callback(err, null); 
        else callback(null, result[0].ID_Torneo); //Devuelve solo el numero del ID_Equipo
      }
    );
  }

router.get('/VerPartidos', (req,res)=>{
//se muestran todos los partidos de la vista 'view_partido_torneo'
connection.query('SELECT * FROM view_partido_torneo WHERE ID_Torneo = ?',[id_torneo],(err,results)=>{
  if(err){throw err}

  if (results.length > 0) {
    res.json(results);}
})

})
router.post('/pacopartidos',(req,res)=>{
  id_torneo=req.body.Torneo;
  res.redirect('/public/VerTorneo.html')
})

  module.exports = router;