/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('students').del()
  await knex('students').insert([
    {first_name: 'Charles', last_name: 'Yarney', email: 'charles@gmail.com', grade: 90},
    {first_name: 'Jan', last_name: 'Morales', email: 'jan@gmail.com', grade: 60},
    {first_name: 'Jared', last_name: 'Moore', email: 'jared@gmail.com', grade: 85}
  ]);
};
