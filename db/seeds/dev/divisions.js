
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('divisions').del()
    .then(function () {
      // Inserts seed entries
      return knex('divisions').insert([
        {id: 1, gender: 'womens', title: 'Big Air', sport: 'Snowboarding'},
        {id: 2, gender: 'womens', title: 'Slopestyle', sport: 'Snowboarding'},
        {id: 3, gender: 'womens', title: 'Halfpipe', sport: 'Snowboarding'},
        {id: 4, gender: 'womens', title: 'Snowboard Cross', sport: 'Snowboarding'},
        {id: 5, gender: 'womens', title: 'Parallel Giant Slalom', sport: 'Snowboarding'},
        {id: 6, gender: 'mens', title: 'Big Air', sport: 'Snowboarding'},
        {id: 7, gender: 'mens', title: 'Slopestyle', sport: 'Snowboarding'},
        {id: 8, gender: 'mens', title: 'Halfpipe', sport: 'Snowboarding'},
        {id: 9, gender: 'mens', title: 'Snowboard Cross', sport: 'Snowboarding'},
        {id: 10, gender: 'mens', title: 'Parallel Giant Slalom', sport: 'Snowboarding'}
      ]);
    });
};
