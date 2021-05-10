const bcrypt = require('bcrypt'); 


//---- ENCRIPTAR LA CONTRASEÑA ----

exports.encriptar = async function encriptar(contraseña) {
  const salt = 10; //Genera el tipo de algortimo para la encriptación
  const password = await bcrypt.hash(contraseña, salt); //Se encarga de encriptar la contraseña

  return password;
}

//---FIN DE ENCRIPTAR LA CONTRASEÑA----
