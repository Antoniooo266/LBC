const connection = require('./config');

 function resultado(equipo){
     var hola = connection.query('SELECT ID_Equipo FROM equipo WHERE Nombre = ?',[equipo], (error, results) =>{
        if (error) throw error;
        return results.value;
    })
    return hola
}

module.exports = resultado;