let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('registrar a un equipo',()=>{
    it('registrando a pepeteam',function(done){
        chai.request(url)
        .post('/equipo/add')
        .send({
            name:'pepeteam',
            Capitan:'pepe',
            joggo:'2',
            NumJugadores:'10'
    })
    
        done(); 
    })
})
describe('modificar a un equipo',()=>{
    it('modificando a pepeteam',function(done){
        chai.request(url)
        .post('/equipo/update')
        .send({
            id:"1",
            equipo:'manolo',
            joggo:'3',
            Captain:'sergio'
        })
        done();
    })
})
