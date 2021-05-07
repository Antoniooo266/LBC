const mysql = require('mysql');
var fs = require('fs');
var readline = require('readline');

//----PARAMETROS PARA LA CONEXION A LA BASE DE DATOS----

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Mcedtpm1203',
    database: '',
    multipleStatements: true
});

//---- END PARAMETROS PARA LA CONEXION A LA BASE DE DATOS----

//----CONEXION A LA BASE DE DATOS----

connection.connect(error =>{
   if (error) throw error;
   console.log('Conexion aceptada :3') 
})

//----END CONEXION A LA BASE DE DATOS----

//----EXECUTE SQL BD----

var rl = readline.createInterface({
    input: fs.createReadStream('./scripts/Crear_BD.sql'),
    terminal: false
   });
  rl.on('line', function(chunk){
      connection.query(chunk.toString('ascii'), function(err, sets, fields){
       if(err) console.log(err);
      });
  });
  rl.on('close', function(){
    console.log("finished");
    connection.end();
});

module.exports = connection;