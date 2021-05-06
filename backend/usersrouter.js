const connection = require('./config');
var express = require('express');
const encript = require('./encriptar');
const bcrypt = require('bcrypt');
const encriptar = encript.encriptar;
const revisar= encript.revisar;
var router = express.Router();

//Add User
router.post('/add', async (req, res) =>{
    const hashedPassword = await encriptar(req.body.password);
    const userObj = {
        Nickname: req.body.name,
        Contraseña:hashedPassword,
        Fecha_Nac: req.body.date,
        Correo: req.body.email,
        País: req.body.paistext
    }
    console.log(userObj);
    connection.query('INSERT INTO usuario SET ?', userObj, error=>{
        if(error){
            throw error;
        }else{
            res.redirect('/public/Home.html')
        }
        
    })
});

//logging user

router.post('/logging', async(req,res)=>{
    const pass=req.body.contra;
    const user=req.body.username

    connection.query('SELECT Contraseña FROM usuario WHERE Nickname = ?', [user], async (error, result) => {
    
        if (error) {
          throw error;
        } else {
           var resultado = await bcrypt.compare(pass, result[0].Contraseña);
          if (resultado==true) {
            res.redirect('/public/Home.html')
          }else{
            res.redirect('/public/Login.html')
          }
        }
      })


        
    
})

//Get User
router.get('/get', (req, res) =>{
    const sql = 'SELECT * FROM usuario';
    connection.query(sql, (error, results)=> {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('No hay resultados :(')
        }
    });
});

module.exports = router;