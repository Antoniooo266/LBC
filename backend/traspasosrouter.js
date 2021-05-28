const connection = require("./config");
var express = require("express");
var ID = require("./usersrouter.js")
var router = express.Router();

//----GET JUGADORES DE UN EQUIPO----

router.get("/get", (req, res)=>{
  const sql = "SELECT * FROM view_tabla_jugadores_equipo";
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send("No hay resultados :(");
      }
    });
})

//----END JUGADORES DE UN EQUIPO----

//----GET USUARIOS SIN EQUIPO----

router.get("/getu", (req, res)=>{
  const sql = 'SELECT * FROM view_tabla_usuarios_equipo';
  connection.query(sql, (error, results)=>{
    if (error) throw error;
    if(results.length > 0){
      res.json(results);
    }else{
      res.send('No hay resultados :(')
    }
  })
})

//----END USUARIOS SIN EQUIPO----

//----ADD USUARIO A UN EQUIPO----

router.post("/add", async (req, res) => {
    var usuario;
    var equipo;

    GetIdEquipo(req.body.equipo, function (err, data) {
      if (err) {
        console.log("ERROR : ", err);
      } else {
        equipo = data;
      }
    });

    GetIdUser(req.body.Nickname, function (err, data) {
        if (err) {
          console.log("ERROR : ", err);
        } else {
          usuario = data;
        }
      });
  
    setTimeout(()=>{
      const AddEquipoObj = {
        ID_Equipo: equipo,
        ID_Usuario: usuario
      };
      connection.query("INSERT INTO usuario_equipo SET ? ", AddEquipoObj, (error) => {
        if (error) {
          throw error;
        } else {
          connection.query("UPDATE usuario SET Rango = 4 WHERE ID_Usuario = ?", [AddEquipoObj.ID_Usuario], (error) => {
            if (error) {
              throw error;
            }
          });
          res.redirect("/public/Mensaje.html");
        }
      });
  }, 3000);
    
});

//----END ADD USER A UN EQUIPO----
  
//----UPDATE TRASPASOS----

  router.post("/update", (req,res)=>{
    var usuario;
    var equipo;
  
    GetIdEquipo(req.body.equipo, function (err, data) {
      if (err) {
        console.log("ERROR : ", err);
      } else {
        equipo = data;
      }
    });

    GetIdUser(req.body.Nickname, function (err, data) {
        if (err) {
          console.log("ERROR : ", err);
        } else {
          usuario = data;
        }
      });
  
    setTimeout(()=>{
      const TraspasoObj = {
        ID_Usuario: usuario,
        ID_Equipo: equipo
      };
      console.log(TraspasoObj);
      connection.query("UPDATE usuario_equipo SET ID_Equipo = ? WHERE ID_Usuario = ? ", [TraspasoObj.ID_Equipo, TraspasoObj.ID_Usuario], (error) => {
        if (error) {
          throw error;
        } else {
          res.redirect("/public/Mensaje.html");
        }
      });
  }, 5000);
  })

//----END UPDATE TRASPASOS

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


