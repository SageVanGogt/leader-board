
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('events', function (table) {
      table.increments('id')
      table.string('name')
      table.string('year')
      table.string('location')
    }),
    knex.schema.createTable('riders', function (table) {
      table.increments('id')
      table.string('name')
      table.string('gender')
      table.string('img')
      table.string('country')
    }),
    knex.schema.createTable('divisions', function (table) {
      table.increments('id')
      table.string('title')
      table.string('gender')
      table.string('sport')
    }),
    knex.schema.createTable('results', function (table) {
      table.increments('id');
      table.integer('event_id').unsigned()
      table.foreign('event_id')
        .references('events.id');  
      table.integer('division_id').unsigned()
      table.foreign('division_id')
        .references('divisions.id');
      table.integer('rider_id').unsigned()
      table.foreign('rider_id')
        .references('riders.id');
      table.string('run_1')
      table.string('run_2')
      table.string('run_3')
      table.string('final')
    }),
    knex.schema.createTable('media', function (table) {
      table.increments('id')
      table.integer('event_id').unsigned()
      table.foreign('event_id')
        .references('events.id');  
      table.integer('division_id').unsigned()
      table.foreign('division_id')
        .references('divisions.id');
      table.integer('rider_id').unsigned()
      table.foreign('rider_id')
        .references('riders.id');
      table.integer('result_id').unsigned()
      table.foreign('result_id')
        .references('results.id');
    })
  ])
};

exports.down = function (knex, Promise) {

};
