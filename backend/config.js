const mysql = require('mysql');

//BD
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
    password: 'Mcedtpm1203',
=======
    password: 'root',
>>>>>>> bcaa9aaa71cf8d31d3dae07586d5a78dc6370222
    database: 'lbc'
});

//Check conexion BD
connection.connect(error =>{
   if (error) throw error;
   console.log('Conexion aceptada :3') 
})

module.exports = connection;