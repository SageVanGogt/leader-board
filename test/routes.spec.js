const environment = process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);

chai.use(chaiHttp);

describe('CLIENT routes', () => {
  it('should', () => {
    
  });
});

describe('API routes', () => {
  it('should', () => {

  });
});