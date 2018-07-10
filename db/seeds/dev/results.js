const resultsData = require('../../../data/resultsData');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('results').del()
    .then(function () {
      // Inserts seed entries
      return knex('results').insert(resultsData);
    });
};
