
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          name: 'Olympics', year: '2018', location: 'PyeongChang'},
      ]);
    });
};
