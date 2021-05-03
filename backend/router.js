const connection = require('./config');
var express = require('express');
const encriptar = require('./encriptar');
var router = express.Router();

//Add User
router.post('/adduser', async (req, res) =>{
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
router.get('/getuser', (req, res) =>{
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

//Add Torneo

router.post('/addtorneo', (req, res) =>{
    const torneoObj = {
        Nombre: req.body.name,
        ID_Juego: req.body.joggo,
        Cantidad: req.body.teams,
        Fecha: req.body.fecha,
        Premio: req.body.premio
    }
    console.log(torneoObj);
    connection.query('INSERT INTO torneo SET ?', torneoObj, error=>{
        if(error){
            throw error;
        }
    })
});

//Get Torneo
router.get('/torneos', (req, res) =>{
    const sql = 'SELECT * FROM torneo';
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