exports.up = function (knex) {
  return knex.schema.createTable('aircraft_annual_reference', table => {
    table.increments('id');
    table.integer('fiscal_year');
    table.string('airframe');
    table.integer('acft1').nullable();
    table.integer('acft2').nullable();
    table.integer('acft3').nullable();
    table.integer('acft4').nullable();
    table.integer('acft5').nullable();
    table.integer('acft6').nullable();
    table.integer('acft7').nullable();
    table.integer('acft8').nullable();
    table.integer('acft9').nullable();
    table.integer('acft10').nullable();
    table.integer('acft11').nullable();
    table.integer('acft12').nullable();
    table.integer('acft13').nullable();
    table.integer('acft14').nullable();
    table.integer('acft15').nullable();
    table.integer('acft16').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('aircraft_annual_reference');
};