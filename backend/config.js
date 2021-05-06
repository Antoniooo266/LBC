const mysql = require('mysql');

//BD
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mcedtpm1203',
    database: 'lbc'
});

//Check conexion BD
connection.connect(error =>{
   if (error) throw error;
   console.log('Conexion aceptada :3') 
})

module.exports = connection;