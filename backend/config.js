const mysql = require('mysql');

//----PARAMETROS PARA LA CONEXION A LA BASE DE DATOS----

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'master',
    password: '1234',
    database: 'lbc',
    multipleStatements: true
});

//---- END PARAMETROS PARA LA CONEXION A LA BASE DE DATOS----

//----CONEXION A LA BASE DE DATOS----

connection.connect(error =>{
   if (error) throw error;
   console.log('Conexion aceptada :3') 
})

//----END CONEXION A LA BASE DE DATOS----

module.exports = connection;