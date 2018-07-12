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

  describe('GET /api/v1/riders', () => {
    it('should return an array of riders', done => {
      chai.request(server)
        .get('/api/v1/riders')
        .set('authorization', token)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.riders.should.be.a('array');
          response.body.riders.length.should.equal(53);
          response.body.riders[0].should.have.property('name');
          response.body.riders[0].name.should.equal('Chloe KIM');
          response.body.riders[0].should.have.property('gender');
          response.body.riders[0].gender.should.equal('womens');
          response.body.riders[0].should.have.property('img');
          response.body.riders[0].img.should.equal('https://stillimg.olympic.org/flags/1x1/340x340/usa.png?interpolation=lanczos-none&resize=45:45, https://stillimg.olympic.org/flags/1x1/340x340/usa.png?interpolation=lanczos-none&resize=90:90 2x');
          response.body.riders[0].should.have.property('country');
          response.body.riders[0].country.should.equal('USA');
          done();
        });
    });
  });
  
  describe('GET /api/v1/riders/:id/results', () => {
    it('should return an array of results for one rider', done => {
      chai.request(server)
        .get('/api/v1/riders/1/results')
        .set('authorization', token)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.results.should.be.a('array');
          response.body.results.length.should.equal(1);
          response.body.results[0].should.have.property('event_id');
          response.body.results[0].event_id.should.equal(1);
          response.body.results[0].should.have.property('division_id');
          response.body.results[0].division_id.should.equal(3);
          response.body.results[0].should.have.property('rider_id');
          response.body.results[0].rider_id.should.equal(1);
          response.body.results[0].should.have.property('run_1');
          response.body.results[0].run_1.should.equal('no data');
          response.body.results[0].should.have.property('run_2');
          response.body.results[0].run_2.should.equal('no data');
          response.body.results[0].should.have.property('run_3');
          response.body.results[0].run_3.should.equal('no data');
          response.body.results[0].should.have.property('final');
          response.body.results[0].final.should.equal('1');
          done();
        });
    });

    it('should return results not found if rider does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/riders/:id/results')
        .set('authorization', token)
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(500);
          response.body.should.have.property('message');
          response.body.message.should.equal('results not found');
          done();
        });
    });
  });

  describe('GET /api/v1/events/:eventId/division/:divId/results', () => {
    it('should return an array of results for a division of an event', done => {
      chai.request(server)
        .get('/api/v1/events/1/division/3/results')
        .set('authorization', token)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.results.should.be.a('array');
          response.body.results.length.should.equal(24);
          response.body.results[0].should.have.property('event_id');
          response.body.results[0].event_id.should.equal(1);
          response.body.results[0].should.have.property('division_id');
          response.body.results[0].division_id.should.equal(3);
          response.body.results[0].should.have.property('rider_id');
          response.body.results[0].rider_id.should.equal(1);
          response.body.results[0].should.have.property('run_1');
          response.body.results[0].run_1.should.equal('no data');
          response.body.results[0].should.have.property('run_2');
          response.body.results[0].run_2.should.equal('no data');
          response.body.results[0].should.have.property('run_3');
          response.body.results[0].run_3.should.equal('no data');
          response.body.results[0].should.have.property('final');
          response.body.results[0].final.should.equal('1');
          done();
        });
    });

    it('should return results not found if event division does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/events/:eventId/division/:divId/results')
        .set('authorization', token)
        .end((error, response) => {
          response.should.be.json;
          response.should.have.status(500);
          response.body.should.have.property('message');
          response.body.message.should.equal('results not found');
          done();
        });
    });
  });

  describe('POST /api/v1/results', () => {
    it('should create a new result', done => {
      chai.request(server)
        .post('/api/v1/results')
        .send({
          event_id:1,
          division_id:3,
          rider_id: 1,
          run_1: "23",
          run_2: "29",
          run_3: "21",
          final: "80"
        })
        .set('authorization', token)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('status');
          response.body.status.should.equal('Success! Your result has been added.');
          response.body.should.have.property('resultId');
          response.body.resultId.should.equal(54);
          done();
        });
    });

    it.skip('should not create a record if the post body is missing info', done => {
      chai.request(server)
        .post('/api/v1/projects')
        .send({
        })
        .end((err, response) => {
          response.should.have.status(404);
          response.body.error.should.equal('No project name has been provided');
          done();
        })
    })
  })
});