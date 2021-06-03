let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Gestion de Resultados de los Partidos',()=>{
    it('Asignar Resultados', function(done){
        chai.request(url)
        .post('/resultado/addresult')
        .send({
            ID_Visitante:'1',
            ID_Local:'2',
            ID_Torneo: '1',
            ID_Ronda: '1',
            Resultado_Local: '5',
            Resultado_Visitante: '10',
            Ganador: '2',
            NombreTorneo: 'Torneo Ejemplo'
        })
        done();
    })
})