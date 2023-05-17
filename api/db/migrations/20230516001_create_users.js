exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('unit_name');
    table.string('rank');
    table.string('fname').notNullable();
    table.string('lname').notNullable();
    table.string('email_addy').notNullable().unique();
    table.string('passwd').notNullable();
    table.string('access_level').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};