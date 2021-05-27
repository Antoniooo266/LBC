let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url='http://localhost:3000/public/Registrar.html'
describe('registrando a un usuario sin error:',()=>{
it('todo deberia de salir bien',(done)=>{
    chai.require(url)
    .post('../usersrouter/add')
    .send({cd:"angel",password:"asdeasde2",email:"moro@gmail.com",paistext:"españa"})
    .end(function(err,res){
        console.log(res.body)
        expect(res).to.have.status(500);
        done();
    })
})
})