let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Inicio Usuario',()=>{
    it('Register', function(done){
        chai.request(url)
        .post('/user/add')
        .send({
            Nickname:'pakito',
            Contraseña:'pakito',
            Fecha_Nac: '6969-06-31',
            Correo: 'pakitooo@gmail.com',
            País: 'España'
        })
        done();
    })

    it('Login', function(done){
        chai.request(url)
        .post('/user/logging')
        .send({
            firstname:'admin',
            password:'admin'
        })
        done();
    })
})
describe('cambiar el rango del usuario',()=>{
    it('update rank',function(done){
        chai.request(url)
        .post('../user/updatepriv')
        .send({
            Name:'abeja21',
            Range:'1'
        })
        done();
    })
})