let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Gestion de Resulatdos de los Partidos',()=>{
    it('Asignar Resultados', function(done){
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
})