
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('divisions').del()
    .then(function () {
      // Inserts seed entries
      return knex('divisions').insert([
        {gender: 'womens', title: 'Big Air', sport: 'Snowboarding', event_id: 1, rounds: 3},
        {gender: 'womens', title: 'Slopestyle', sport: 'Snowboarding', event_id: 1, rounds: 3},
        {gender: 'womens', title: 'Halfpipe', sport: 'Snowboarding', event_id: 1, rounds: 3},
        {gender: 'womens', title: 'Snowboard Cross', sport: 'Snowboarding', event_id: 1, rounds: 3},
        {gender: 'womens', title: 'Parallel Giant Slalom', sport: 'Snowboarding', event_id: 1, rounds: 3},
        {gender: 'mens', title: 'Big Air', sport: 'Snowboarding', event_id: 1, rounds: 3},
        {gender: 'mens', title: 'Slopestyle', sport: 'Snowboarding', event_id: 1, rounds: 3},
        {gender: 'mens', title: 'Halfpipe', sport: 'Snowboarding', event_id: 1, rounds: 3},
        {gender: 'mens', title: 'Snowboard Cross', sport: 'Snowboarding', event_id: 1, rounds: 3},
        {gender: 'mens', title: 'Parallel Giant Slalom', sport: 'Snowboarding', event_id: 1, rounds: 3}
      ]);
    });
};
