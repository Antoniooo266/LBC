const mysql = require('mysql');

//----PARAMETROS PARA LA CONEXION A LA BASE DE DATOS----

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
    password: 'Mcedtpm1203',
=======
    password: 'Angel2001Mario2003',
>>>>>>> 248827c337682b4754b0eec257d55448f9b073e9
    database: 'lbc'
});

//---- END PARAMETROS PARA LA CONEXION A LA BASE DE DATOS----

//----CONEXION A LA BASE DE DATOS----

connection.connect(error =>{
   if (error) throw error;
   console.log('Conexion aceptada :3') 
})

//----END CONEXION A LA BASE DE DATOS----

module.exports = connection;