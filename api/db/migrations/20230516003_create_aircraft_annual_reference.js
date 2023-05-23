exports.up = function (knex) {
  return knex.schema.createTable("aircraft_annual_reference", (table) => {
    table.increments("id");
    table.string("fiscal_year");
    table.string("airframe");
    table.string("acft1").nullable();
    table.string("acft2").nullable();
    table.string("acft3").nullable();
    table.string("acft4").nullable();
    table.string("acft5").nullable();
    table.string("acft6").nullable();
    table.string("acft7").nullable();
    table.string("acft8").nullable();
    table.string("acft9").nullable();
    table.string("acft10").nullable();
    table.string("acft11").nullable();
    table.string("acft12").nullable();
    table.string("acft13").nullable();
    table.string("acft14").nullable();
    table.string("acft15").nullable();
    table.string("acft16").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("aircraft_annual_reference");
};
