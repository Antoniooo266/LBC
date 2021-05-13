const connection = require("../../config");

function Actualizar(id_usuario){
    var valorLista = document.getElementsByName("Rangos")

    connection.query("UPDATE Rango FROM usuario WHERE ID_usuario = ? SET ?",[id_usuario,valorLista],function (err,res){
if(err) throw err;

console.log("niceee")

    });
}