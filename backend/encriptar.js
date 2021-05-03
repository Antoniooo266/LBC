const bcrypt=require('bcrypt')

async function encriptar(contraseña) {
    const round=10;
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const password = await bcrypt.hash(contraseña, salt);
    return password;
}

module.exports = encriptar;