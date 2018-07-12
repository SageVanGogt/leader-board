
exports.seed = function(knex, Promise) {
  return knex('media').del()
    .then(function () {
      return knex('media').insert([
        {event_id: 1, division_id: 3, rider_id: 3, result_id: 3, media_url: 'dankocean.youtube.com'},
        {event_id: 1, division_id: 8, rider_id: 53, result_id: 53, media_url: 'lhoser.youtube.com'}
      ]);
    });
};
