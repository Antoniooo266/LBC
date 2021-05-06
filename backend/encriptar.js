const bcrypt = require('bcrypt');
const connection = require('./config');

exports.encriptar = async function encriptar(contraseña) {
  const salt = 10;
  const password = await bcrypt.hash(contraseña, salt);

  return password;
}

/*exports.revisar = async function revisar(contraseña, usuario) {
  
  const prueba = connection.query('SELECT Contraseña FROM usuario WHERE Nickname = ?', [usuario], async (error, result) => {
    
    if (error) {
      throw error;
    } else {
       var resultado = bcrypt.compare(contraseña, result[0].Contraseña);
      return resultado
    }
  })
  console.log(prueba)
}*/
