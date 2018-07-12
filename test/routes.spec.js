const environment = process.env.NODE_ENV = 'test';
require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('CLIENT routes', () => {
  it('should', () => {
    
  });
});

describe('API routes', () => {
  let token;
  let email = 'shooter.mcgavin@protour.com';
  let appName = 'Leader Board';
  let admin = true;

  beforeEach(function (done) {
    token = jwt.sign({
      email, appName, admin
    }, process.env.SECRET_KEY); 
    knex.migrate.rollback()
      .then(function () {
        knex.migrate.latest()
          .then(function () {
            return knex.seed.run()
              .then(function () {
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    knex.migrate.rollback()
      .then(function () {
        done();
      });
  });

  describe('POST /authenticate', () => {
    it('should return a jwt', (done) => {
      chai.request(server)
        .post('/authenticate')
        .send({
          email: 'shooter.mcgavin@protour.com',
          appName: 'Leader Board'
        })
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('token');
          done();
        });
    });

    it('should return an error if parameters are missing', (done) => {
      chai.request(server)
        .post('/authenticate')
        .send({
          email: 'shooter.mcgavin@protour.com'
        })
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(422);
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('You need to include an email AND appName in the request body.');
          done();
        });
    });
  });

  describe('GET /api/v1/events', () => {
    it('should return an array of events', done => {
      chai.request(server)
        .get('/api/v1/events')
        .set('authorization', token)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.events.should.be.a('array');
          response.body.events.length.should.equal(1);
          response.body.events[0].should.have.property('name');
          response.body.events[0].name.should.equal('Olympics');
          response.body.events[0].should.have.property('year');
          response.body.events[0].year.should.equal('2018');
          response.body.events[0].should.have.property('location');
          response.body.events[0].location.should.equal('PyeongChang');
          done();
        });
    });
  });
});