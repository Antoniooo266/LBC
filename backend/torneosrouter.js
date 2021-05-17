const connection = require("./config");
var express = require("express");
var router = express.Router();


//---- Añadir Torneo----

//Recoge los datos de la pagina AddTorneo.html y los almacena en un objeto despues de eso se envian a la base de datos donde son almacenados y redirige a Mensaje.html para confirmar de que se ha enviado correctamente 

router.post("/add", (req, res) => {
  const torneoObj = {
    NombreTorneo: req.body.name,//nombre
    ID_Juego: req.body.joggo,//id_juego
    Cantidad: req.body.teams,//cantidad de jugadores
    Fecha: req.body.fecha,//fecha del torneo
    Premio: req.body.premio,//premio del torneo
  };
  

  connection.query("INSERT INTO torneo SET ?", torneoObj, (error) => {// es la consulta donde se inserta los datos
    if (error) {
      throw error;
    } else {
      res.redirect("/public/Mensaje.html");
    }
  });
});

//----Get Torneo----
//Muestra todos los torneos que hay en la base de datos en un json

router.get("/get", (req, res) => {
  const sql = "SELECT * FROM view_tabla_torneo";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No hay resultados :(");
    }
  });
});

//---- Fin Get Torneo ----

//---- Borrar Torneo ----
//Permite borrar un torneo seleccionado mediante el id (falta comprobarlo) y redirige a Mensaje.html para dar feedback

router.post('/delete',(req,res)=>{
  
connection.query('DELETE FROM torneo WHERE ID_Torneo = ?',[req.body.Eliminar],function (err,solution){
  if(err) throw err;
  res.redirect('/public/Mensaje.html')
})
});

//---- Fin Borrar Torneo ----

//---- Modificar Torneo ----
//Recoge los datos introducidos en los campos de texto de la pagina Addtorneo.html y modifica los datos del torneo previamente seleccionado (falta testeo)

router.post('/update',(req,res)=>{
  connection.query('DELETE FROM torneo WHERE ID_Torneo = ?',[req.body.Editar],function (err,solution){
    if(err) throw err;
    res.redirect('/public/AddTorneo.html');

  })
  });


//----Fin Modificar Torneo----

module.exports = router;
