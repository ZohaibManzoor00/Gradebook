/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('assignments').del()
  await knex('assignments').insert([
    {assignment_name: 'Unit 1 HW', grade: 100, start_date: '01/07/2022', due_date: '01/09/2022', subject: 'Math'},
    {assignment_name: 'Unit 1 Quiz', grade: 100, start_date: '01/10/2022', due_date: '01/11/2022', subject: 'Math'},
    {assignment_name: 'Unit 2 HW', grade: 100, start_date: '01/15/2022', due_date: '01/16/2022', subject: 'Science'},
  ]);
};