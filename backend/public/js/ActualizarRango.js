const connection = require("../../config");

function Actualizar(id_usuario){
    var valorLista = [id_usuario.selectedIndex].value

    connection.query("UPDATE usuario SET Rango = ? WHERE ID_usuario = ?",[valorLista,id_usuario],function (err,res){
if(err) throw err;

console.log("niceee")

    });
}