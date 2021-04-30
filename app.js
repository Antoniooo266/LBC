const express = require('express'); 
const connection = require('./config');
const bodyParser = require('body-parser');
var logger = require('morgan');
const path = require('path');
const { connect } = require('http2');
var timeout = require('connect-timeout')
const PORT = process.env.PORT || 3000;

const app = express();

app.use(timeout('100s'))

app.use(bodyParser.json());

app.use(logger('dev'));

app.use("/public", express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//CCS
app.get('*', (req, res)=> {
    const index = path.join(__dirname, '/', './css', 'index.html' );
    res.sendFile(index);
});


//Torneos
app.get('/torneos', (req, res) =>{
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

app.post('/addtorneo', (req, res) =>{
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


//Usuarios
app.get('/user', (req, res) =>{
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

app.post('/adduser', (req, res) =>{
    const userObj = {
        Nickname: req.body.name,
        Contraseña: req.body.password,
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


app.get("/admin",(req,res)=>{
    
})


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

