exports.up = function (knex) {
  return knex.schema.createTable('per_diem_chart', table => {
    table.string('country').nullable();
    table.string('location').nullable();
    table.string('season_code').nullable();
    table.string('season_start_date').nullable();
    table.string('season_end_date').nullable();
    table.integer('lodging_rate').nullable();
    table.integer('meals_incidentals').nullable();
    table.integer('per_diem').nullable();
    table.string('effective_date').nullable();
    table.string('footnote_reference').nullable();
    table.integer('location_code').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('per_diem_chart');
};