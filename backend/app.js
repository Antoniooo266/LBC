const express = require('express'); 
const bodyParser = require('body-parser');
var logger = require('morgan');
const path = require('path');
const { connect } = require('http2');
const PORT = process.env.PORT || 3000;
const passport =require('passport');

//---- MIDLEWARE ----

const usersrouter = require('./usersrouter.js');
const torneosrouter = require('./torneosrouter.js')
const resultadorouter=require('./resutadosrouter.js')
const equiporouter=require('./equiporouter.js')
const traspasosrouter = require('./traspasosrouter.js')
const app = express();

//---- END MIDLEWARE ----

//---- APP ----

app.use(bodyParser.json());

app.use(logger('dev'));

app.use("/public", express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', usersrouter);

app.use('/torneo', torneosrouter);

app.use('/resultado',resultadorouter);

app.use('/equipo',equiporouter);

app.use('/traspasos',traspasosrouter);

//--- END APP ----

//---- USO DE CCS ----

app.get('*', (req, res)=> {
    const index = path.join(__dirname, '/', './css', 'index.html' );
    res.sendFile(index);
});

//---- END USO DE CSS ---

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

