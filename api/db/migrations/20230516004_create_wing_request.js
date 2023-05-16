exports.up = function (knex) {
  return knex.schema.createTable('wing_request', table => {
    table.increments('id');
    table.string('unit_name');
    table.string('tdy_from').nullable();
    table.string('tdy_to').nullable();
    table.string('airfare_type').nullable();
    table.integer('days_qty').nullable();
    table.integer('personnel_qty').nullable();
    table.string('acft_type').nullable();
    table.string('lodging_type').nullable();
    table.integer('per_diem').nullable();
    table.boolean('meals_provided').defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('wing_request');
};