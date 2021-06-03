const connection = require('./config');
var express = require('express');
const encript = require('./encriptar');
const bcrypt = require('bcrypt');
const  passport  = require('passport');
const encriptar = encript.encriptar;
var router = express.Router();
var rango;
var ID;
module.exports = {ID, rango}

    //----ADD USER----

    //---Funcion que crea un Objeto User y lo añade en la Base de Datos
    router.post('/add', async (req, res) =>{
    const hashedPassword = await encriptar(req.body.password);  //Se encripta la contraseña mediante el bcrypt
    const userObj = {       //Se almacenan todos los datos introducidos en los input de la pagina Registar
        Nickname: req.body.name,    //Recoge el nombre del usuario
        Contraseña: hashedPassword, //Recoge la contraseña encriptada
        Fecha_Nac: req.body.date,   //Recoge la fecha de nacimiento del usuario
        Correo: req.body.email, //Recoge el email del usuario
        País: req.body.paistext,    //Almacena el pais del usuario
        Rango: 2    //Se le introduce el rango base en este caso usuario
    }
    connection.query('SELECT * FROM usuario WHERE Nickname = ?',[userObj.Nickname],(err,sol)=>{
        if (err)throw err;
        if(sol.length>0){
            res.redirect('/public/MensajeErrorRegistro.html')
        }else{
    connection.query('INSERT INTO usuario SET ?', userObj, error=>{ //Introduce los datos a la BD
        if(error){
            throw error;
        }else{
            res.redirect('/public/Home.html')   //Redirige a la pagina principal
        }
        connection.query('SELECT ID_Usuario FROM usuario WHERE Nickname = ?',req.body.name,(err,res)=>{
            if (err) {throw err;   
            }
            ID=res[0].ID_Usuario;
            
        })
    })}
})
    });

    //---- END ADD USER----

    //----LOGGING USER----

    //Posible refactor en este metodo(separar toda la query a una funcion)

    router.post('/logging', async(req,res)=>{
    const pass=req.body.password;
    const user=req.body.firstname

    connection.query('SELECT ID_Usuario ,Contraseña ,Rango FROM usuario WHERE Nickname = ?', [user], async (error, result) => {
        //Se realiza la consulta para saber si el usuario existe
        if (result.length<0 || result=='') {
        //si alguno de los campos es incorrecto se le devuelve de nuevo a la pagina de loging
            res.redirect('../public/Login.html');
        } else {
          
           var resultado = await bcrypt.compare(pass, result[0].Contraseña);    //Revisa la contraseña con la de la BD 
           rango=result[0].Rango; //se guarda el rango del usuario para moverse por la pagina
           ID=result[0].ID_Usuario; //se guarda el id del usuario para poder saber quien es
           
          if (resultado==true) {
              if (rango==1) {
                  //Si el usuario es admin se le redirige a la pagina de admin
                  res.redirect('../public/Admin.html')
              }else{
            res.redirect('../public/Home.html')   //Todo bien entra a HOME
              }
          }else{
            res.redirect('../public/Login.html')  //Algun dato mal vuelve al Login
          }
        }
      })  
    })

    //-----END LOGGING USER----

    //----GET USER----

    router.get('/get', (req, res) =>{
    const sql = 'SELECT * FROM view_tabla_usuario';    //Muestra todos los datos de la taba usuario
    connection.query(sql, (error, results)=> {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);  //Devuelve los resultados como json
        }else{
            res.send('No hay resultados :(')
        }
    });
    });

    //----END GET USER----

    //----GET USER ID----

    router.get('/getid', (req, res) =>{
        connection.query('SELECT * FROM view_tabla_perfil WHERE ID_Usuario = ?',[ID], (error, results)=> {
            if(error) throw error;
            if(results.length > 0){
                res.json(results);  //Devuelve los resultados como json
            }else{
                res.send('No hay resultados :(')
            }
        });
    });

    //----END GET USER ID----

    //----PRIVILEGIOS USUARIO----
    
    router.post("/updatepriv", (req, res) => {
        //se crea un objeto donde se guarda el rango del usuario y el nombre del usuario
        const RangoObj = {
          Rango: req.body.Rango,
          Nickname: req.body.Name
        };
        connection.query("Select * FROM usuario Where Nickname = ?",[RangoObj.Nickname],(err,result)=>{
            if(err)throw err;
            if(result.length<0 || result==''){
                //si introduce un usuairo que no existe se le vuelve a la misma pagina
                res.redirect('/public/Jugadores.html')
            }else{
        //si el usuario existe se le actualizan los datos
        connection.query("UPDATE usuario SET Rango = ? WHERE Nickname = ?", [RangoObj.Rango, RangoObj.Nickname], (error) => {
            if (error) {
              throw error;
            }else{
                    res.redirect("/public/Mensaje.html");
                    //si todo ha salido correctamente se le lleva a mensaje.html
                }
            }
        );
        }
        });
    });

    //----END PRIVILEGIOS USUARIO----

    //----GET PERFIL USER----

    router.get('/getperfil', (req, res) =>{
        const sql = 'SELECT * FROM view_tabla_perfil';    //Muestra todos los datos de la vista usuario
        connection.query(sql, (error, results)=> {
            if(error) throw error;
            if(results.length > 0){
                res.json(results);  //Devuelve los resultados como json
            }else{
                res.send('No hay resultados :(')
            }
        });
        });
    
    //----END PERFIL USER----


module.exports = router;

