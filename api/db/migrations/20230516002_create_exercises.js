exports.up = function (knex) {
  return knex.schema.createTable('exercises', table => {
    table.increments('id');
    table.string('exercise_name');
    table.string('start_date').nullable();
    table.string('end_date').nullable();
    table.string('location').nullable();
    table.string('majcom').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('exercises');
};