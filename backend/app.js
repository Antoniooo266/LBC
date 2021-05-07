const express = require('express'); 
const bodyParser = require('body-parser');
var logger = require('morgan');
const path = require('path');
const { connect } = require('http2');
const PORT = process.env.PORT || 3000;


const usersrouter = require('./usersrouter.js');
const torneosrouter = require('./torneosrouter.js');

const app = express();

app.use(bodyParser.json());

app.use(logger('dev'));

app.use("/public", express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', usersrouter);

app.use('/torneo', torneosrouter);


//CCS
app.get('*', (req, res)=> {
    const index = path.join(__dirname, '/', './css', 'index.html' );
    res.sendFile(index);
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

