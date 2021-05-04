const connection = require('./config');
var express = require('express');
var router = express.Router();

//Add Torneo
router.post('/add', (req, res) =>{
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
router.get('/get', (req, res) =>{
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