/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      unit_name: 'PACAF',
      rank: 'SSgt',
      fname: 'Rick',
      lname: 'Sanchez',
      email_addy: 'rick@pacaf.mil',
      passwd: '$2b$10$nF4C8D9.L379cvptF3.8Du2QCP0Ccaqv4BFyWQ3GmluQOPTG.2iQK',
      access_level: 'PACAF',
    },
    {
      id: 2,
      unit_name: '161 ARW',
      rank: '1Lt',
      fname: 'Morty',
      lname: 'Smith',
      email_addy: 'morty@wing1.mil',
      passwd: '$2b$10$tQQufazpYLdbUX/T9cBpa.4rQ/O.V31ZkFrRCJ9RIJaY/RVe2igYW',
      access_level: 'WING',
    },
    {
      id: 3,
      unit_name: '134 FS',
      rank: 'A1C',
      fname: 'Glootie',
      lname: 'Allen',
      email_addy: 'glootie@wing2.mil',
      passwd: 'somehash',
      access_level: 'WING',
    },
  ]);
};
