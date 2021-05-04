const connection = require('./config');
var express = require('express');
const encriptar = require('./encriptar');
var router = express.Router();

//Add User
router.post('/add', async (req, res) =>{
    const hashedPassword = await encriptar(req.body.password);
    const userObj = {
        Nickname: req.body.name,
        Contraseña: hashedPassword,
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