exports.up = function (knex) {
  return knex.schema.createTable('aircraft_annual_reference', table => {
    table.integer('fiscal_year');
    table.string('airframe');
    table.integer('1acft').nullable();
    table.integer('2acft').nullable();
    table.integer('3acft').nullable();
    table.integer('4acft').nullable();
    table.integer('5acft').nullable();
    table.integer('6acft').nullable();
    table.integer('7acft').nullable();
    table.integer('8acft').nullable();
    table.integer('9acft').nullable();
    table.integer('10acft').nullable();
    table.integer('11acft').nullable();
    table.integer('12acft').nullable();
    table.integer('13acft').nullable();
    table.integer('14acft').nullable();
    table.integer('15acft').nullable();
    table.integer('16acft').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('aircraft_annual_reference');
};