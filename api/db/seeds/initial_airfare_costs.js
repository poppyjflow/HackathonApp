/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('users').del()

  await knex('airfare_costs').insert([
    {
      airline: 'United Airlines',
      to_date: '2023-07-13',
      from_date: '2023-07-29',
      src_country: 'USA',
      src_city: 'Burlington, VT',
      src_price: 1285,
      dst_country: 'Marshall Islands',
      dst_city: 'Majuro',
      dst_price: 1339,
    },
    
    {
      airline: 'United Airlines',
      to_date: '2023-07-13',
      from_date: '2023-07-29',
      src_country: 'USA',
      src_city: 'Burlington, VT',
      src_price: 1285,
      dst_country: 'Marshall Islands',
      dst_city: 'Likiep Atoll',
      dst_price: 1339,
    },
    {
      airline: 'United Airlines',
      to_date: '2023-09-04',
      from_date: '2023-09-12',
      src_country: 'USA',
      src_city: 'Burlington, VT',
      src_price: 1122,
      dst_country: 'Marshall Islands',
      dst_city: 'Likiep Atoll',
      dst_price: 1133,
    },
    {
      airline: 'American Airlines',
      to_date: '2023-09-04',
      from_date: '2023-09-12',
      src_country: 'USA',
      src_city: 'Burlington, VT',
      src_price: 1144,
      dst_country: 'Marshall Islands',
      dst_city: 'Likiep Atoll',
      dst_price: 1155,
    },
    {
      airline: 'Delta Airlines',
      to_date: '2023-09-04',
      from_date: '2023-09-12',
      src_country: 'USA',
      src_city: 'Burlington, VT',
      src_price: 1111,
      dst_country: 'Marshall Islands',
      dst_city: 'Likiep Atoll',
      dst_price: 1122,
    },
  ]);
};
