let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Registrar a un equipo',()=>{
    it('Registrando a pepeteam',function(done){
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
describe('Modificar a un equipo',()=>{
    it('Modificando a pepe',function(done){
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
