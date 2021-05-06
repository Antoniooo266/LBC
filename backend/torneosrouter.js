const connection = require('./config');
var express = require('express');
var router = express.Router();
const resultado = require('./resultados');

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
        }else{
            res.redirect('/public/Mensaje.html');
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

//Add Resultados
router.post('/addresult', async (req, res) =>{
    const Visitante = await resultado(req.body.Visitante);
    const Local = await resultado(req.body.Local);
    const resultObj = {
        ID_Visitante: Visitante,
        ID_Local: Local,
        Resultado_Local: req.body.ResultLocal,
        Resultado_Visitante: req.body.ResultVisitante,
        Fecha: req.body.Date
    }
    console.log(resultObj);
    connection.query('INSERT INTO partido SET ? ', resultObj, error=>{
        if(error){
            throw error;
        }else{
            res.redirect('/public/Mensaje.html');
        }
    });
});

module.exports = router;