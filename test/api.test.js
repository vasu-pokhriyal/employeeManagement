import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index.js';
const should = chai.should();

chai.use(chaiHttp);
describe('testing get project api', () => {
  it('get projects', (done) => {
    chai.request(server)
      .get('/api/v1/project')
      .then(res => {

        expect(res.status).to.be.equal(200);
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
     
  });

  it('get single project', (done) => {
    chai.request(server)
      .get('/api/v1/project/63d3acdbb009470966f89cb2')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
     
  });

  it('create single project', (done) => {
    const data = {
      "name":"project2",
      "description":"online delivery based project",
      "projectLengthEstimate":8
    };
    chai.request(server)
      .post('/api/v1/project/')
      .send(data)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('name',data.name);
        expect(res.body.data).to.have.property('_id');
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
     
  });


  it('update single project', (done) => {
    const data = {
      "name":"project2",
      "description":"online delivery based project",
      "projectLengthEstimate":8,
      "projectLengthActual":9
    };
    chai.request(server)
      .put('/api/v1/project/63d3acdbb009470966f89cb2')
      .send(data)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('name',data.name);
        expect(res.body.data).to.have.property('_id');
        done();
      }).catch(err => {
        console.error(err);
        throw err;
      });
     
  });


});