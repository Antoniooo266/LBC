const connection = require('./config');
var express = require('express');
const encript = require('./encriptar');
const bcrypt = require('bcrypt');
const encriptar = encript.encriptar;
var router = express.Router();

    //----ADD USER----
    
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

    connection.query('SELECT Contraseña FROM usuario WHERE Nickname = ?', [user], async (error, result) => {
        //se realiza la consulta para saber si el usuario existe
        if (error) {
          throw error;
        } else {
           var resultado = await bcrypt.compare(pass, result[0].Contraseña);    //revisa la contraseña con la de la BD 
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
    const sql = 'SELECT * FROM usuario LEFT JOIN usuario_equipo ON usuario.ID_Usuario = usuario_equipo.ID_Usuario';    //muestra todos los datos de la taba usuario
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
    router.put('/putpriv',(req,res)=>{

    })


    //----END PRIVILEGIOS USUARIO----
module.exports = router;