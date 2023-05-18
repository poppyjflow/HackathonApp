/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('exercises').del()
  await knex('exercises').insert([
    {
      exercise_name: 'Exercise PACIFIC SQUANCH',
      start_date: '2023-07-13',
      end_date: '2023-07-29',
      location: 'Guam',
      status: 'OPEN',
    },
    {
      exercise_name: 'Exercise CROMULON SCHWIFTY',
      start_date: '2023-11-04',
      end_date: '2023-11-26',
      location: 'Australia',
      status: 'OPEN',
    },
    {
      exercise_name: 'Exercise PICKLE RICK',
      start_date: '2024-02-26',
      end_date: '2024-03-10',
      location: 'Philippines',
      status: 'OPEN',
    },
    {
      exercise_name: 'Exercise GLIP GLOP',
      start_date: '2023-09-04',
      end_date: '2023-09-12',
      location: 'Marshall Islands',
      status: 'OPEN',
    },
    {
      exercise_name: 'Exercise ABRADOLPH LINCLER',
      start_date: '2023-11-28',
      end_date: '2023-12-15',
      location: 'Korea, South',
      status: 'OPEN',
    },
    {
      exercise_name: 'Exercise REVERSE GIRAFFE',
      start_date: '2023-08-14',
      end_date: '2023-08-22',
      location: 'Japan',
      status: 'OPEN',
    },
  ]);
};
