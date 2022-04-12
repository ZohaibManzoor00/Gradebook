/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teachers').del()
  await knex('teachers').insert([
    {first_name: 'Erwins', last_name: 'Saget', email: 'e@gmail.com', subject: 'CS'},
    {first_name: 'Carmen', last_name: 'Salas', email: 'carmen@gmail.com', subject: 'CS'},
    {first_name: 'John', last_name: 'Doe', email: 'johnDoe@gmail.com', subject: 'History'},
  ]);
};
