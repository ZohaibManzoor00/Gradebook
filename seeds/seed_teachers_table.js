/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teachers').del()
  await knex('teachers').insert([
    {first_name: 'Erwins', last_name: 'Saget', email: 'e@gmail.com', subject: 'CS'},
  ]);
};
