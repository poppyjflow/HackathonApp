exports.up = function (knex) {
  return knex.schema.createTable('airfare_costs', table => {
    table.increments('id');
    table.string('airline').nullable();
    table.string('to_date').nullable();
    table.string('from_date').nullable();
    table.string('src_country').nullable();
    table.string('src_city').nullable();
    table.integer('src_price').nullable();
    table.string('dst_country').nullable();
    table.string('dst_city').nullable();
    table.integer('dst_price').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('airfare_costs');
};