let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Gestion de Torneos', ()=>{
    it('Añadir un Torneo', function(done){
        chai.request(url)
        .post('/torneo/add')
        .send({
            NombreTorneo: 'Torneo Ejemplo',
            ID_Juego: '1',
            Cantidad: '12',
            Fecha: '2021-07-28',
            Premio: 'Un RonCola'
        })
        done();
    })
    it('Modificar un Torneo', function(done){
        chai.request(url)
        .post('/torneo/update')
        .send({
            ID_Torneo: '1',
            NombreTorneo: 'Ejemplo Torneo',
            ID_Juego: '2',
            Cantidad: '10',
            Fecha: '2021-08-19',
            Premio: 'Un Jagger con Redbull'
        })
        done();
    })
})