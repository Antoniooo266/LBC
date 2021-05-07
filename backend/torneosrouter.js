const connection = require("./config");
var express = require("express");
var router = express.Router();
const resultado = require("./resultados");

//Add Torneo
router.post("/add", (req, res) => {
  const torneoObj = {
    Nombre: req.body.name,
    ID_Juego: req.body.joggo,
    Cantidad: req.body.teams,
    Fecha: req.body.fecha,
    Premio: req.body.premio,
  };
  console.log(torneoObj);

  connection.query("INSERT INTO torneo SET ?", torneoObj, (error) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/public/Mensaje.html");
    }
  });
});

//Get Torneo
router.get("/get", (req, res) => {
  const sql = "SELECT * FROM torneo";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No hay resultados :(");
    }
  });
});



//----Borrar Torneo----

router.delete('/delete',(req,res)=>{
connection.query('DELETE * FORM torneo WHERE ID_Torneo =?'[req.body.ID_Torneo],function (err,solution){
  if (err) throw err;

  res.redirect('../public/Mensaje.html')
})
});

//----Fin Borrar Torneo----

//----Modificar Torneo----

router.put('/update',(req,res)=>{
  const torneoObj = {
    Nombre: req.body.name,
    ID_Juego: req.body.joggo,
    Cantidad: req.body.teams,
    Fecha: req.body.fecha,
    Premio: req.body.premio,
  };
  
  connection.query('UPDATE torneo SET ? WHERE ID_Torneo')[torneoObj,req.body.ID_Torneo],(err,res)=>{
if (err) throw err;

res.redirect('../public/Mensaje.html')
  


  }
  

  

})

//----Fin Modificar Torneo----

module.exports = router;
