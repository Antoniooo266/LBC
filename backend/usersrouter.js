const connection = require('./config');
var express = require('express');
const encript = require('./encriptar');
const bcrypt = require('bcrypt');
const  passport  = require('passport');
const encriptar = encript.encriptar;
var router = express.Router();
var rango=null;
var ID=null;
    //----ADD USER----
    //---Funcion que crea un Objeto User y lo añade en la Base de Datos

    router.post('/add', async (req, res) =>{
    const hashedPassword = await encriptar(req.body.password);  //se encripta la contraseña mediante el bcrypt
    const userObj = {       //se almacenan todos los datos introducidos en los input de la pagina Registar
        Nickname: req.body.name,//recoge el nombre del usuario
        Contraseña: hashedPassword,
        Fecha_Nac: req.body.date,//recoge la fecha de nacimiento del usuario
        Correo: req.body.email,//recoge el email del usuario
        País: req.body.paistext,//almacena el pais del usuario
        Rango: 2// se le introduce el rango base en este caso usuario
    }
    console.log(userObj);
    connection.query('INSERT INTO usuario SET ?', userObj, error=>{ //introduce los datos a la BD
        if(error){
            throw error;
        }else{
            res.redirect('/public/Home.html')   //redirige a la pagina principal
        }
        
    })
    });

    //---- END ADD USER----

    //----LOGGING USER----
    //Posible refactor en este metodo(separar toda la query a una funcion)

    router.post('/logging', async(req,res)=>{
    const pass=req.body.password;
    const user=req.body.firstname

    connection.query('SELECT ID_Usuario,Contraseña,Rango FROM usuario WHERE Nickname = ?', [user], async (error, result) => {
        //se realiza la consulta para saber si el usuario existe
        if (result.length<0) {
            res.redirect('../public/Login.html');
        } else {
           var resultado = await bcrypt.compare(pass, result[0].Contraseña);    //revisa la contraseña con la de la BD 
           rango=result[0].Rango;
           ID=result[0].ID_Usuario;
           console.log(ID);
           console.log(rango);
          if (resultado==true) {
              if (user=="admin") {
                  //si el usuario es admin se le redirige a la pagina de admin
                  res.redirect('../public/Admin.html')
              }else{
            res.redirect('../public/Home.html')   //todo bien entra a HOME
              }
          }else{
            res.redirect('../public/Login.html')  //algun dato mal vuelve al Login
          }
        }
      })  
    })

    //-----END LOGGING USER----

    //----GET USER----

    router.get('/get', (req, res) =>{
    const sql = 'SELECT * FROM usuario';    //muestra todos los datos de la taba usuario
    connection.query(sql, (error, results)=> {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);  //devuelve los resultados como json
        }else{
            res.send('No hay resultados :(')
        }
    });
    });

    //----END GET USER----

    //----PRIVILEGIOS USUARIO----
    
    router.post("/updatepriv", (req, res) => {
        const RangoObj = {
          Rango: req.body.Rango,
          Nickname: req.body.Name
        };
        console.log(RangoObj);
        connection.query("UPDATE usuario SET Rango = ? WHERE Nickname = ?", [RangoObj.Rango, RangoObj.Nickname], (error) => {
            if (error) {
              throw error;
            }else{
                if(RangoObj.Nickname == ''){
                    res.redirect("/public/Jugadores.html")
                }else{
                    res.redirect("/public/Mensaje.html");
                }
            }
          });
    });

    //----END PRIVILEGIOS USUARIO----

    //----GET PERFIL USER----

    router.get('/getperfil', (req, res) =>{
        const sql = 'SELECT * FROM view_tabla_perfil';    //muestra todos los datos de la taba usuario
        connection.query(sql, (error, results)=> {
            if(error) throw error;
            if(results.length > 0){
                res.json(results);  //devuelve los resultados como json
            }else{
                res.send('No hay resultados :(')
            }
        });
        });

module.exports = router;
module.exports = rango;
module.exports= ID;