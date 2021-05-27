const connection = require("./config");
var express = require("express");
var router = express.Router();

//----GET EQUIPO----

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

//----END GET EQUIPO----

//----ADD EQUIPO----

var today = new Date();
router.post('/add', (req, res) =>{
  const EquipoObj = {
      NombreEquipo: req.body.name,
      Fecha: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
      Victorias: 0,
      Derrotas: 0,
  };
  connection.query('INSERT INTO equipo SET ?', EquipoObj, (error) =>{
    if (error){
        throw error;
    }else{
        res.redirect('/public/Mensaje.html')
    }
  })
});

//----END ADD EQUIPO----

//----UPDATE EQUIPO----

router.post('/update',(req,res)=>{
  const NewEquipo = {
    ID_Equipo: req.body.id,
    NombreEquipo: req.body.equipo,
  }
  connection.query('UPDATE equipo SET NombreEquipo = ? WHERE ID_Equipo = ?',[NewEquipo.NombreEquipo, NewEquipo.ID_Equipo],function (err,solution){
    if(err) throw err;
    res.redirect('/public/Mensaje.html');
  })
});

//----END UPDATE EQUIPO----

module.exports = router;