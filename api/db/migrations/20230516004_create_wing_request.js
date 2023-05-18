exports.up = function (knex) {
  return knex.schema.createTable('wing_request', table => {
    table.integer('exercises_id').references('id').inTable('exercises').onDelete('CASCADE');
    table.string('unit_name');
    table.string('tdy_from').nullable();
    table.string('tdy_to').nullable();
    table.string('airfare_type').nullable();
    table.integer('days_qty').nullable();
    table.integer('personnel_qty').nullable();
    table.string('acft_type').nullable();
    table.integer('acft_qty').nullable();
    table.integer('lodging_qty_gov').nullable();
    table.integer('lodging_qty_comm').nullable();
    table.integer('lodging_qty_field').nullable();
    table.boolean('meals_provided_gov').nullable();
    table.boolean('meals_provided_comm').nullable();
    table.boolean('meals_provided_field').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('wing_request');
};