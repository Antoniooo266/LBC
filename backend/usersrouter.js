const connection = require('./config');
var express = require('express');
const encriptar = require('./encriptar');
var router = express.Router();

//Add User
router.post('/add', async (req, res) =>{
    const hashedPassword = await encriptar(req.body.password);
    const userObj = {
        Nickname: req.body.name,
        Contraseña: hashedPassword,
        Fecha_Nac: req.body.date,
        Correo: req.body.email,
        País: req.body.paistext
    }
    console.log(userObj);
    connection.query('INSERT INTO usuario SET ?', userObj, error=>{
        if(error){
            throw error;
        }else{
            res.redirect('/public/Home.html')
        }
        
    })
});

//logging user

router.post('/logging',async (req,res)=>{
    const pass=await encriptar(req.body.password);
    const user=req.body.username
  
    connection.query('SELECT * FROM usuario WHERE Nickname LIKE ? AND Contraseña LIKE ?',[user,pass],(error,result)=>{
        if (error) throw error;
            if (result.length>0) {
                res.redirect('../public/Home.html')
            }else{
                res.redirect('../public/Login.html')
               
            }
        
    })
    
})

//Get User
router.get('/get', (req, res) =>{
    const sql = 'SELECT * FROM usuario';
    connection.query(sql, (error, results)=> {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('No hay resultados :(')
        }
    });
});

module.exports = router;