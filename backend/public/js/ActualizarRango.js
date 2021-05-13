const connection = require("../../config");

function actualizar(id_usuario){
    var valorLista=Rango.textContent;

    connection.query("UPDATE Rango FROM usuario WHERE ID_usuario = ? SET ?",[id_usuario,valorLista],function (err,res){
if(err) throw err;

console.log("niceee")

    });
}