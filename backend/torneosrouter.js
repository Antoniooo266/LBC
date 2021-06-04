const connection = require("./config");
var express = require("express");
var router = express.Router();


//---- ADD TORNEO----

//Recoge los datos de la pagina AddTorneo.html y los almacena en un objeto despues de eso se envian a la base de datos donde son almacenados y redirige a Mensaje.html para confirmar de que se ha enviado correctamente 

router.post("/add", (req, res) => {

  const torneoObj = {
    NombreTorneo: req.body.name,  //Nombre
    ID_Juego: req.body.joggo, //ID_Juego
    Cantidad: req.body.teams, //Cantidad de jugadores
    Fecha: req.body.fecha,  //Fecha del torneo
    Premio: req.body.premio,  //Premio del torneo
  };
 
  connection.query('INSERT INTO torneo SET ?', torneoObj, (error) => {  //Se insertan los datos para crear el torneo
    if (error) {
      throw error;
    } else {
      res.redirect('/public/Mensaje.html')
    }
     });
  
});

//----END ADD TORNEO----

//----GET TORNEO----
//Muestra todos los torneos que hay en la base de datos 

router.get("/get", (req, res) => {
  const sql = 'SELECT * FROM view_tabla_torneo';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);//devuelve los torneos en formato json
    } else {
      res.send("No hay resultados :(");
    }
  });
});

//----END GET TORNEO----

//----DELETE TORNEO----

//Permite borrar un torneo seleccionado mediante el id (falta comprobarlo) y redirige a Mensaje.html para dar feedback

router.post('/delete',(req,res)=>{ 
connection.query('DELETE FROM torneo WHERE ID_Torneo = ?',[req.body.Eliminar],function (err,solution){
  if(err) throw err;
  res.redirect('/public/Mensaje.html')
})
});

//----END DELETE TORNEO----

//----UPDATE TORNEO----

//Recoge los datos introducidos en los campos de texto de la pagina Addtorneo.html y modifica los datos del torneo previamente seleccionado (falta testeo)
router.post('/update',(req,res)=>{
  //se comprueba si el torneo existe, si no existe se le redirige a un mensaje de operacion denegada
  connection.query('SELECT * FROM torneo WHERE ID_Torneo= ?',[req.body.id],(errur,sol)=>{
    if (errur) throw errur;
    if(sol.length<0 || sol==''){
      res.redirect('/public/MensajeError.html')
    }
    else{
  const NewTorneo = {
    ID_Torneo: req.body.id,//ID del torneo
    NombreTorneo: req.body.name,//nombre
    ID_Juego: req.body.joggo,//id del juegp
    Cantidad: req.body.teams,//cantidad de jugadores
    Fecha: req.body.fecha,//fecha del torneo
    Premio: req.body.premio,//premio del torneo
  }
  connection.query('UPDATE torneo SET NombreTorneo = ?, ID_Juego = ?, Cantidad = ?, Fecha = ?, Premio = ? WHERE ID_Torneo = ?',[NewTorneo.NombreTorneo, NewTorneo.ID_Juego, NewTorneo.Cantidad, NewTorneo.Fecha, NewTorneo.Premio, NewTorneo.ID_Torneo
    //se actualiza los datos de un torneo
  ],function (err,solution){
    if(err) throw err;
    res.redirect('/public/Mensaje.html');
  })
}
})
  });


//----END UPDATE TORNEO----

module.exports = router;