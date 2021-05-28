let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('loguing a user',()=>{
    it('loging a user',()=>{
        chai.request(url)
        .post('/user/logging')
        .send({firstname:'admin',password:'admin'})
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            done();})
    })
})