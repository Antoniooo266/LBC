const connection = require("./config");
var express = require("express");
var router = express.Router();


router.get("/get", (req, res) => {
    const sql = "SELECT * FROM equipo";
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send("No hay resultados :(");
      }
    });
  });

router.post('/add', (req, res) =>{
  const EquipoObj = {
      NombreEquipo: req.body.name,
      Fecha: req.body.date
  };
  connection.query('INSERT INTO equipo SET ?', EquipoObj, (error) =>{
    if (error){
        throw error;
    }else{
        res.redirect('/public/Mensaje.html')
    }
  })
});

router.post('/delete',(req,res)=>{ 
  connection.query('DELETE FROM torneo WHERE ID_Equipo = ?',[req.body.Eliminar],function (err,solution){
    if(err) throw err;
    res.redirect('/public/Mensaje.html')
  })
});

router.post('/update',(req,res)=>{
  const NewEquipo = {
    ID_Equipo: req.body.id,
    NombreEquipo: req.body.name,
    Fecha: req.body.date
  }
  console.log(NewTorneo);
  connection.query('UPDATE torneo SET NombreTorneo = ?, Fecha = ? WHERE ID_Equipo = ?',[NewEquipo.NombreEquipo, NewEquipo.Fecha, NewEquipo.ID_Equipo],function (err,solution){
    if(err) throw err;
    res.redirect('/public/Mensaje.html');
  })
  });



  module.exports = router;